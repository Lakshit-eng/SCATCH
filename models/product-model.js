const mongoose = require("mongoose");

const userProduct = new mongoose.Schema({
    image :{
        type:Buffer
    },
    name :{
        type:String
    },
    price :{
        type:Number
    },
    discount:{
        type:Number,
        default:0,
    },
    bgcolor :{
        type:String
    },
    panelcolor:{
        type:String
    },
    textcolor:{
        type:String
    },
  
});



module.exports = mongoose.model("product",userProduct);