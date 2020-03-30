const googleOAuth = require('../util/googleOAuth');
const jwt = require('../util/jwt');
const User = require('../model/user');

exports.login = async (req, res) => {
  try {
    const code = req.body.code;

    const profile = await googleOAuth.getProfileInfo(code);

    let user = await User.findOne({ googleId: profile.sub });

    if (!user) {
      user = new User({
        googleId: profile.sub,
        firstName: profile.given_name,
        lastName: profile.family_name,
        email: profile.email,
        profilePic: profile.picture
      });
      await user.save();
    }

    const token = jwt.sign({ id: user.id });

    res.send({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePic: user.profilePic
      },
      token
    });
  } catch (e) {
    console.log(e);
    res.status(401).send();
  }
};
