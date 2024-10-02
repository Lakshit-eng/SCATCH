const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model");

//routes

router.get("/login",(req,res)=>{
   res.render("owner-login");
})

router.get("/createproduct", (req, res) => {
   let success =req.flash("success");
   res.render("createproducts",{success});
})
router.get("/admin",(req,res)=>{
   res.render("admin");
})



module.exports = router;