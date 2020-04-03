const sha1 = require('sha1');

module.exports = (req, res, next) => {
  try {
    const reqData = JSON.stringify(req.body);
    const reqTimestamp = req.headers['x-cld-timestamp'];
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const reqSig = req.headers['x-cld-signature'];

    const computedSig = sha1(reqData + reqTimestamp + apiSecret);

    console.log(reqData, reqTimestamp, apiSecret, reqSig, computedSig);

    if (computedSig === reqSig) {
      console.log('valid cloudinary request');
      next();
    } else {
      console.log('invalid cloudinary request');
      res.end({ msg: 'invalid cloudinary request' });
    }
  } catch (error) {
    console.log(error);
    res.status(422).send();
  }
};
