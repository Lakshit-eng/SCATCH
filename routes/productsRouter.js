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
   req.flash("success","product created Successfully");
   res.redirect("/owners/admin");
 }
 catch(err){
    res.send(err.message);
 }
})
router.get("/update/:id",async(req,res)=>{
  let productId = req.params.id;
  let product = await productModel.findById(productId);
  res.render("UpdateProduct",{product});
})

router.post("/update/:id", upload.single("image"), async (req, res) => {
  try {
      const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
      const productId = req.params.id;

      // Create an object to store the update data
      let updateData = {};

      // Only update fields if they are provided (not empty)
      if (name) updateData.name = name;
      if (price) updateData.price = price;
      if (discount) updateData.discount = discount;
      if (bgcolor) updateData.bgcolor = bgcolor;
      if (panelcolor) updateData.panelcolor = panelcolor;
      if (textcolor) updateData.textcolor = textcolor;

      // Check if a new image is uploaded
      if (req.file) {
          updateData.image = req.file.buffer; // Only update image if a new file is uploaded
      }

      // Update the product only if there's something to update
      if (Object.keys(updateData).length > 0) {
          await productModel.findByIdAndUpdate(productId, updateData);
          req.flash("success", "Product Updated Successfully");
      } else {
          req.flash("info", "No changes made to the product.");
      }

      res.redirect("/owners/admin");
  } catch (err) {
      res.send(err.message); // Show the error message for debugging
  }
});


router.post("/delete/:id",async(req,res)=>{
  let productId = req.params.id;
  let product = await productModel.findByIdAndDelete(productId);
  res.redirect("/owners/admin");
})

module.exports = router;