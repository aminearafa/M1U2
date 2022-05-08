var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  if (req.session?.store?.isAdmin) 
    return res.render('admin/home', { title: 'Home', loggedIn: req.session?.store?.loggedIn, isAdmin: req.session?.store?.isAdmin });
  return res.redirect('/home');
});

module.exports = router;