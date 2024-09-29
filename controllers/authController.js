const userModel = require("../models/user-model");
const { validateUser } = require("../validators/user-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const{generateToken} = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
    try {
                                                                       // Joi validation
       const { error } = validateUser(req.body);
       if (error) {
          console.log("Validation error:", error.message); 
          req.flash("error", error.message); // Use flash to store the error                     // Debug log
          return res.redirect("/"); // Redirect back to the index page                   // Return Joi validation error
       }
 
       const { email, fullname, password } = req.body;
 
                                                           // Check if email already exists
       let userExists = await userModel.findOne({ email });
       if (userExists) {
          console.log("User already exists:", email);                  // Debug log
          req.flash("error", "You already have an account. Please log in!"); // Flash error
          return res.redirect("/"); // Redirect back to the index page
       }
 
       // Hash password using bcrypt
       const salt = await bcrypt.genSalt(10);                    // Use await for better control
       const hash = await bcrypt.hash(password, salt); // Await here too
 
       // Create a new user with the hashed password
       let user = await userModel.create({
          fullname,
          email,
          password: hash                            // Store hashed password
       });
 
 
                                                //now we will setup jwt       
                                                //now ab mai yha pe generate token use krunga
       let token =  generateToken(user);
       res.cookie("token", token);         //user ke browser pe token set hoga isse
       res.redirect("/");
 
 
    } catch (err) {
       console.error("Server error:", err.message); // Debug log
       req.flash("error", "Something went wrong on the server.");
       return res.redirect("/"); // Redirect back to the index page
    }
 }

 module.exports.loginUser =async(req,res)=>{
    let{email,password} = req.body;

   let user= await userModel.findOne({email});
   if(!user){
      req.flash("error", "Incorrect Email or Password"); // Flash error
      return res.redirect("/"); // Redirect back to the index page
   }
   bcrypt.compare(password,user.password,function(err,result){
    if(result){
        let  token = generateToken(user);
        res.cookie("token",token);
        res.redirect("/shop");
    }
    else{
      req.flash("error", "Incorrect Email or Password"); // Flash error
      return res.redirect("/"); // Redirect back to the index page
    }
   })
 }

 //logout

 module.exports.logout =(req,res)=>{
   res.cookie("token","");
   res.redirect("/");
 };