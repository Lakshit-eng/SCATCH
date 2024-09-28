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
          console.log("Validation error:", error.message);                      // Debug log
          return res.status(400).send(error.message);                    // Return Joi validation error
       }
 
       const { email, fullname, password } = req.body;
 
                                                           // Check if email already exists
       let userExists = await userModel.findOne({ email });
       if (userExists) {
          console.log("User already exists:", email);                  // Debug log
          return res.status(409).send("You already havea an account please login!");
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
       res.send("user created successfully");
 
 
    } catch (err) {
       console.error("Server error:", err.message); // Debug log
       return res.status(500).send("Something went wrong on the server."); // Server error response
    }
 }

 module.exports.loginUser =async(req,res)=>{
    let{email,password} = req.body;

   let user= await userModel.findOne({email});
   if(!user){
    return res.send("Incorrect Email or Password");
   }
   bcrypt.compare(password,user.password,function(err,result){
    if(result){
        let  token = generateToken(user);
        res.cookie("token",token);
        res.send("you can login");
    }
    else{
        res.send("Incorrect Email or Password")
    }
   })
 }