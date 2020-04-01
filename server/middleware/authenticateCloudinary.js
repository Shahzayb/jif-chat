const sha1 = require('sha1');

module.exports = (req, res, next) => {
  try {
    const reqData = JSON.stringify(req.body);
    const reqTimestamp = req.headers['x-cld-timestamp'];
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const reqSig = req.headers['x-cld-signature'];

    const signedPayload = reqData + reqTimestamp + apiSecret;

    const computedSig = sha1(signedPayload);

    // console.log(
    //   reqData,
    //   reqTimestamp,
    //   apiSecret,
    //   reqSig,
    //   signedPayload,
    //   computedSig
    // );

    if (computedSig === reqSig) {
      // console.log('valid');
      next();
    } else {
      // console.log('invalid');
      res.end();
    }
  } catch (error) {
    console.log(error);
    res.status(422).send();
  }
};
