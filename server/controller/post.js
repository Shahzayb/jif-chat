const Post = require('../model/post');
const User = require('../model/user');
const ObjectId = require('mongoose').Types.ObjectId;
const cloudinary = require('../lib/cloudinary');

exports.getPosts = async (req, res) => {
  try {
    const size = parseInt(req.query.size, 10);
    const afterId = req.query.after_id;

    const errors = [];
    if (!size || !Number.isInteger(size)) {
      errors.push({ size: 'size is invalid' });
    } else if (afterId && !ObjectId.isValid(afterId)) {
      errors.push({ after_id: 'after_id is not valid' });
    }
    if (errors.length) {
      return res.status(422).send(errors);
    }

    const aggs = [
      { $sort: { _id: -1 } },
      { $limit: size },
      {
        $lookup: {
          from: 'users',
          let: { id: '$userId' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
            { $project: { firstName: 1, lastName: 1, profilePic: 1 } },
          ],
          as: 'userDetail',
        },
      },
      { $addFields: { user: { $arrayElemAt: ['$userDetail', 0] } } },
      { $project: { userDetail: 0, userId: 0, __v: 0 } },
    ];

    if (afterId) {
      aggs.splice(0, 0, { $match: { _id: { $lt: ObjectId(afterId) } } });
    }

    const posts = await Post.aggregate(aggs);

    res.send(posts);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).send({ msg: 'invalid post id' });
    }

    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).send({ msg: "cannot delete other's post" });
    }

    await Promise.all([
      cloudinary.uploader.destroy(post.gifPublicId),
      post.remove(),
    ]);

    res.status(204).send({ msg: 'post is deleted successfully' });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

exports.getEvents = (req, res) => {
  const baseId = req.query.base_id;
  const errors = [];
  if (baseId && !ObjectId.isValid(baseId)) {
    errors.push({ base_id: 'base_id is not valid' });
  }
  if (errors.length) {
    return res.status(422).send(errors);
  }

  // Mandatory headers and http status to keep connection open
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };

  res.writeHead(200, headers);
  res.write('\n');

  const changeStream = Post.watch([
    { $match: { 'documentKey._id': { $gt: ObjectId(baseId) } } },
  ]);

  changeStream.on('change', (change) => {
    const event = {};
    if (change.operationType === 'delete') {
      event.action = 'delete';
      event.payload = change.documentKey;
      const data = `data: ${JSON.stringify(event)}\n\n`;
      res.write(data);
      res.flush();
    } else if (change.operationType === 'insert') {
      event.action = 'insert';
      event.payload = change.fullDocument;
      User.findOne(
        { _id: event.payload.userId },
        { firstName: 1, lastName: 1, profilePic: 1 }
      )
        .lean()
        .then((user) => {
          event.payload.user = user;
          const data = `data: ${JSON.stringify(event)}\n\n`;
          res.write(data);
          res.flush();
        })
        .catch(console.log);
    }
  });

  req.on('close', () => {
    changeStream.close();
    console.log(`Connection closed: ${id}`);
  });
};
