const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model")
const { validateUser } = require("../validators/user-validator");

//routes


//Test Route
router.get("/", (req, res) => {
   res.send("router is working for users");
});


// Register route
router.post("/register", async (req, res) => {
   try {
      const { error } = validateUser(req.body);
      if (error) {
         return res.status(400).send(error.details[0].message);   // Return Joi validation error
      }
      const { email, fullname, password } = req.body;

      //check if email already exist
      let userExists = await userModel.findOne({ email });
      if (userExists) {
         return res.status(409).send("This email address is already registered!");
      }

      //Create a new User
      let user = await userModel.create({
         fullname,
         email,
         password
      });
       res.status(201).send(user);     //Successfully created user

   }
   catch (err) {
      console.error(err.message);
      res.status(500).send("Something went wrong on the server."); // Server error response
   }
});


module.exports = router;