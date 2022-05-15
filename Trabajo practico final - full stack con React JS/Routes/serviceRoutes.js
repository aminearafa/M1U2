const express = require('express');
const serviceController = require('../controllers/serviceController');
const router = express.Router();

router
  .route('/service')
  .get(serviceController.getAllServices)
  .post(serviceController.careteService);

router
  .route('/service/:id')
  .get(serviceController.getService)
  .patch(serviceController.updateService)
  .delete(serviceController.deleteService);
module.exports = router;
