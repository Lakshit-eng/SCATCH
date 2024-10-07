
const ownerModel = require("../models/owners-model");
const { validateUser } = require("../validators/user-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const{generateTokenOwner} = require("../utils/generateToken");

module.exports.loginOwner =async(req,res)=>{
    let{email,password} = req.body;

   let owner= await ownerModel.findOne({email});
   if(!owner){
      req.flash("error", "Incorrect Email or Password"); // Flash error
      return res.redirect("/owners"); // Redirect back to the index page
   }
   
   if(password!== owner.password){
    req.flash("error", "Incorrect Email or Password"); // Flash error
      return res.redirect("/owners"); // Redirect back to the index page
   }
   if(owner){
    let  token = generateTokenOwner(owner);
    res.cookie("token",token,{ httpOnly: true, secure: true });
    res.redirect("/owners/admin");
}
else{
  req.flash("error", "Incorrect Email or Password"); // Flash error
  return res.redirect("/"); // Redirect back to the index page
}
    
   
}
//logout

module.exports.logout =(req,res)=>{
    res.cookie("token","");
    res.redirect("/owners");
  };