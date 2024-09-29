const express = require("express");

const router = express.Router();
const isloggedIn = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
    // Pass the flash messages to the view
    res.render("index", {
       
            error: req.flash("error")
        
    });
});
router.get("/shop",isloggedIn,(req,res)=>{
    res.render("shop");
})

module.exports= router;