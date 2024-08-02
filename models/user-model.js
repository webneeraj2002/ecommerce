const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type: String
    },
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    orders:{
        type:Array,
        default:[]
    },
    contact:{
        type:Number
    },
    picture: String
});

module.exports = mongoose.model("User", userSchema);
