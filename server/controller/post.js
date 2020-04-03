const Post = require('../model/post');

exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10);
    const size = parseInt(req.query.size, 10);
    const errors = [];
    if (!page || !Number.isInteger(page)) {
      errors.push({ page: 'page number is invalid' });
    } else if (!size || !Number.isInteger(size)) {
      errors.push({ size: 'size is invalid' });
    }
    if (errors.length) {
      return res.status(422).send(errors);
    }

    const posts = await Post.aggregate([
      { $sort: { _id: -1 } },
      { $skip: (page - 1) * size },
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
    ]);

    res.send(posts);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};
