var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('admin/login',{
    layout:'admin/layout'
  });
});

module.exports = router;
