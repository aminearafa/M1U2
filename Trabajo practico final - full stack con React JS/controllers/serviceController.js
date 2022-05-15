const Service = require('../models/serviceModel');

exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();

    res.status(200).json({
      message: 'Success',
      data: {
        services,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: 'failed',
    });
  }
};

exports.careteService = async (req,res) => {
  try {
    console.log(req.body.item)
    const service = await Service.create(req.body.item);
    console.log(service)
    res.status(201).json({
      status: 'success',
      data: {
        service,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: 'failed',
    });
  }
};

exports.getService =async (req, res, next) => {
  const service = await Service.findById(req.params.id);
  // Tour.findOne({ _id: req.params.id })


  res.status(200).json({
    status: 'success',
    data: {
      service
    }
  });
};

exports.updateService = async (req, res, next) => {
  console.log(req.params.id)
  const item=req.body.item
  const service = await Service.findByIdAndUpdate(req.params.id, req.body.item, {
    new: true,
    runValidators: true
  });
  console.log(service)
  // if (!service) {
  //   return next(new AppError('No service found with that ID', 404));
  // }

  res.status(200).json({
    status: 'success',
    data: {
      service
    }
  });
};





exports.deleteService = async (req, res, next) => {
  const service = await Service.findByIdAndDelete(req.params.id);
console.log(req.params)
  // if (!service) {
  //   return next(new AppError('No service found with that ID', 404));
  // }

  res.status(204).json({
    status: 'success',
    data: service
  });
};
