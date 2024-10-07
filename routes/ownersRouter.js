const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");
const {loginOwner} = require("../controllers/ownerAuth");
const isOwnwerLoggedIn =require("../middlewares/isOwnerLoggedIn");
const{logout} =require("../controllers/ownerAuth");
const productModel = require("../models/product-model");


//routes

router.get("/",(req,res)=>{
   // Pass the flash messages to the view
   let error = req.flash("error");
   res.render("owner-login",{error, loggedin:false});
})

// login route
router.post("/login",loginOwner);

// Apply the redirectOwner middleware globally to all routes


router.get("/createproduct",isOwnwerLoggedIn , (req, res) => {
   let success =req.flash("success");
   res.render("createproducts",{success});
})
router.get("/admin",isOwnwerLoggedIn,async(req,res)=>{
   let products = await productModel.find();
   res.render("admin",{products});
})

//logout

router.get("/logout",logout);


module.exports = router;
