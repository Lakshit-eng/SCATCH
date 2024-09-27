const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    fullname :{
        type:String
    },
    email :{
        type:String
    },
    password :{
        type:String
    },
    cart:{
        type:Array,
        default:[]
    },
    isadmin :{
        type:Boolean
    },
    orders :{
        type:Array,
        default:[]
    },
    contact:{
        type:Number
    },
    picture :{
        type:String
    },

})

module.exports = mongoose.model("user",userSchema);