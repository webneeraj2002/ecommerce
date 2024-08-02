const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
   image:Buffer,
   name:String,
   price:Number,
   discount:{
    type:Number,
    default:0
   },
   bgcolor:String,
   panecolor:String,
   textcolor:String
});

module.exports = mongoose.model("Product", productSchema);
