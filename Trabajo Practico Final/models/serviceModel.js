const mongoose=require('mongoose')

const serviceSchema=new mongoose.Schema({
 
  name: String,
  price: Number,
  description: String,
  image: String,


  supplier_name: String,


})


const Service=mongoose.model('Service',serviceSchema)

module.exports=Service