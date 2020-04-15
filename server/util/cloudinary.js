const { v4: uuidv4 } = require('uuid');
const cloudinary = require('../lib/cloudinary');

exports.getSignature = (userId) => {
  const data = {
    folder: `jifchat/${userId}`,
    public_id: uuidv4(),
    timestamp: String(Math.floor(Date.now() / 1000)),
    upload_preset: 'jifchat',
  };

  const signature = cloudinary.utils.api_sign_request(
    data,
    process.env.CLOUDINARY_API_SECRET
  );

  data.signature = signature;
  data.api_key = process.env.CLOUDINARY_API_KEY;
  return data;
};
