const express = require('express');
const emailController = require('./../controllers/emailController');
const router = express.Router();

router
  .route('/sent')

  .post(emailController.sentEmail);

module.exports = router;
