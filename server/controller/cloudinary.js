const { getSignature } = require('../util/cloudinary');
const Post = require('../model/post');
const User = require('../model/user');

exports.getSignature = (req, res) => {
  const { title } = req.query;
  if (!title) {
    return res.status(422).send({ msg: 'title is required' });
  } else if (title.trim().length > 120) {
    return res
      .status(422)
      .send({ msg: 'title should have characters between 1 and 120' });
  }
  const context = `title=${title}`;
  console.log(req.query);
  const signature = getSignature(req.user._id.toString(), context);
  res.json(signature);
};

exports.postWebhook = async (req, res) => {
  try {
    const { body } = req;

    if (body.notification_type === 'upload') {
      const userId = body.public_id.split('/')[1];

      const user = await User.exists({ _id: userId });

      if (!user) {
        return res.status(422).json({ msg: 'user does not exist' });
      }

      const post = new Post({
        gifSrc: body.secure_url,
        gifPublicId: body.public_id,
        userId,
        title: body.context.custom.title,
      });

      await post.save();
    }
    // else if (body.notification_type === 'moderation') {
    //   if (body.moderation_status === 'approved') {
    //   } else {
    //   }
    // }
    res.send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};
