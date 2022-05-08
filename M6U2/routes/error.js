var express = require('express');
var router = express.Router();
const novedaesModel = require('../src/novedadModel');

router.get('/', async function (req, res, next) {
  return res.render('error', {layout: false});
});

module.exports = router;