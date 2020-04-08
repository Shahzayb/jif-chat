const Post = require('../model/post');
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

    // const page = parseInt(req.query.page, 10);
    // const size = parseInt(req.query.size, 10);
    // const errors = [];
    // if (!page || !Number.isInteger(page)) {
    //   errors.push({ page: 'page number is invalid' });
    // } else if (!size || !Number.isInteger(size)) {
    //   errors.push({ size: 'size is invalid' });
    // }
    // if (errors.length) {
    //   return res.status(422).send(errors);
    // }

    // const posts = await Post.aggregate([
    //   { $sort: { _id: -1 } },
    //   { $skip: (page - 1) * size },
    //   { $limit: size },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       let: { id: '$userId' },
    //       pipeline: [
    //         { $match: { $expr: { $eq: ['$_id', '$$id'] } } },
    //         { $project: { firstName: 1, lastName: 1, profilePic: 1 } },
    //       ],
    //       as: 'userDetail',
    //     },
    //   },
    //   { $addFields: { user: { $arrayElemAt: ['$userDetail', 0] } } },
    //   { $project: { userDetail: 0, userId: 0, __v: 0 } },
    // ]);

    // res.send(posts);
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
