const sha1 = require('sha1');

module.exports = (req, res, next) => {
  const reqData = req.rawBody;
  const reqTimestamp = req.headers['x-cld-timestamp'];
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const reqSig = req.headers['x-cld-signature'];
  const sigPayload = reqData + reqTimestamp + apiSecret;

  const computedSig = sha1(sigPayload);

  console.log(sigPayload, reqSig, computedSig);

  if (computedSig === reqSig) {
    console.log('valid cloudinary request');
    next();
  } else {
    console.log('invalid cloudinary request');
    res.status(422).json({ msg: 'invalid request' });
  }
};
