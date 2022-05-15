const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

dotenv.config({ path: './.env' });

const URL = process.env.DB;
console.log(URL);
mongoose.connect(URL, {}).then(() => {
  console.log('DB connected Successfully!');
});

const app = require('./app');
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('project1-client/build'));
// }
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('project1-client/build'));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, './project1-client/build/index.html'));
  });
}
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
