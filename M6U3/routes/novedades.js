var express = require('express');
var router = express.Router();
const novedaesModel = require('../src/novedadModel');

router.get('/', async function (req, res, next) {
  const novedades = await novedaesModel.get();
  return res.render(
    'novedades', 
    { 
      title: 'Novedades', 
      loggedIn: req.session?.store?.loggedIn,
      novedades,
    }
  );
});

module.exports = router;