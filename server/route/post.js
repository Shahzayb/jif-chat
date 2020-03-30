const express = require('express');
// const Post = require('../model/post');
const multer = require('multer');

const router = express.Router();
const upload = multer();

router.post('/', upload.single('gif'), (req, res) => {
  console.log(req.file, req.body);
  res.end();
});

module.exports = router;
