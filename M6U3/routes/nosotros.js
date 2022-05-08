var express = require('express');
var router = express.Router();
var staffModel = require('../src/staffModel');

router.get('/', async function (req, res, next) {
  try {
    const staff = await staffModel.get();
    return res.render('nosotros', {title: 'Nosotros', loggedIn: req.session?.store?.loggedIn, staff });
  } catch (error) {
    console.error(error);
    return res.redirect('/error');
  }
});

module.exports = router;