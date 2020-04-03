const sha1 = require('sha1');

module.exports = (req, res, next) => {
  try {
    const reqData = JSON.stringify(req.body);
    const reqTimestamp = String(req.headers['x-cld-timestamp']);
    const apiSecret = String(process.env.CLOUDINARY_API_SECRET);
    const reqSig = String(req.headers['x-cld-signature']);

    const computedSig = String(sha1(reqData + reqTimestamp + apiSecret));

    console.log(reqData, reqTimestamp, apiSecret, reqSig, computedSig);

    if (computedSig === reqSig) {
      console.log('valid cloudinary request');
      return next();
    } else {
      console.log('invalid cloudinary request');
      return res.end();
    }
  } catch (e) {
    console.log(e);
    res.status(422).send();
  }
};
