const User = require('../model/user');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: verifiedToken.id
    }).lean();

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send();
  }
};

module.exports = auth;
