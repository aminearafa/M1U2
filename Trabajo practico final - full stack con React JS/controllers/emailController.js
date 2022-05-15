const Email = require('./../utils/email');

exports.sentEmail = async (req, res, next) => {
  console.log(req.body);
  const url = `${req.protocol}://${req.get('host')}/api/v1/teacher`;
  console.log(url);
  //await new Email(req.body, url).sendWelcome();
  res.status(200).json({
    message: 'Success',
  });
};
