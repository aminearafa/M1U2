const express=require('express')
const cors=require('cors')
const serviceRoutes=require('./Routes/serviceRoutes')
const emailRoute = require('./Routes/emailRoute');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));



app.use('/api/v1', serviceRoutes);
// app.use('/api/v1/email', emailRoute);

module.exports=app