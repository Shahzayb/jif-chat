exports.getMyProfile = (req, res) => {
  try {
    res.json({
      _id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      profilePic: req.user.profilePic
    });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};
