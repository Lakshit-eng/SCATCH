const express = require ("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");


router.post("/create",upload.single("image"),async (req,res)=>{
 try{
   const{ name,price,discount,bgcolor,panelcolor,textcolor} = req.body;
   let product =await productModel.create({
     image:req.file.buffer,
     name,
     price,
     discount,
     bgcolor,
     panelcolor,
     textcolor,
   });
   console.log(product);
   req.flash("success","product created Successfully");
   res.redirect("/owners/admin");
 }
 catch(err){
    res.send(err.message);
 }
})

router.post("/delete/:id",async(req,res)=>{
  let productId = req.params.id;
  let product = await productModel.findByIdAndDelete(productId);
  res.redirect("/owners/admin");
})

module.exports = router;