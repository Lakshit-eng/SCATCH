const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/shop");

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