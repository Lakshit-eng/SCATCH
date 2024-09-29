const express = require("express");

const router = express.Router();
const isloggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");

router.get("/", (req, res) => {
    // Pass the flash messages to the view
    res.render("index", {
       
            error: req.flash("error")
        
    });
});
router.get("/shop",isloggedIn,async (req,res)=>{
    let products = await productModel.find();
    res.render("shop",{ products });
})

module.exports= router;