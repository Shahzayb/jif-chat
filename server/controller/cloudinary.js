const { getSignature } = require('../util/cloudinary');
const cloudinary = require('../lib/cloudinary');
const Post = require('../model/post');
const User = require('../model/user');
const Ticket = require('../model/ticket');

exports.getSignature = (req, res) => {
  const signature = getSignature(req.user._id.toString());
  res.json(signature);
};

exports.getPublicSignature = (req, res) => {
  const signature = getSignature(process.env.ANONYMOUS_USER_ID);
  res.json(signature);
};

exports.postWebhook = async (req, res) => {
  try {
    const { body } = req;

    if (body.notification_type === 'upload') {
      const ticket = await Ticket.findOne({ publicId: body.public_id }).lean();

      if (!ticket) {
        await cloudinary.uploader.destroy(body.public_id);
        return res.status(422).send({ msg: 'This asset is not expected here' });
      }

      const userId = body.public_id.split('/')[1];

      const user = await User.exists({ _id: userId });

      if (!user) {
        return res.status(422).json({ msg: 'user does not exist' });
      }

      const post = new Post({
        gifSrc: body.secure_url,
        gifPublicId: body.public_id,
        userId,
        title: ticket.title,
      });

      await post.save();
      await Ticket.deleteOne({ publicId: body.public_id });

      return res.end();
    }
    // else if (body.notification_type === 'moderation') {
    //   if (body.moderation_status === 'approved') {
    //   } else {
    //   }
    // }
    res.status(422).send({ msg: 'not expecting this event' });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};
