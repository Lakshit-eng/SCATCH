const express = require("express");

const router = express.Router();
const isloggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
    // Pass the flash messages to the view
    let error = req.flash("error");
    res.render("index",{error, loggedin:false});
});


router.get("/shop",isloggedIn,async (req,res)=>{
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop",{ products ,success});
});
router.get("/cart",isloggedIn,async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email})
    .populate("cart");
     //calculate price here
     

    res.render("cart",{user});
});

router.get("/addtocart/:productid",isloggedIn,async (req,res)=>{
    let user= await userModel.findOne({email:req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
   req.flash("success","Added to Cart");
   res.redirect("/shop");
});

router.get("/logout",isloggedIn,function(req,res){
    res.render("shop");
})

//remove from cart

router.post("/removefromcart/:productid", isloggedIn, async (req, res) => {
    try {
        // Find the user
        let user = await userModel.findOne({ email: req.user.email });

        if (!user) {
            req.flash("error", "User not found");
            return res.redirect("/cart");
        }

        // Remove the product ID from the cart
        user.cart = user.cart.filter(productId => productId.toString() !== req.params.productid);

        // Save the updated user document
        await user.save();

        req.flash("success", "Item removed from cart");
        res.redirect("/cart");
    } catch (error) {
        console.error(error); // Log the error for debugging
        req.flash("error", "Could not remove items from cart");
        res.redirect("/cart");
    }
});


module.exports= router;