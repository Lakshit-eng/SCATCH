const express = require("express");
const isloggedIn = require("../middlewares/isloggedIn");
const router = express.Router();

router.get("/",(req,res)=>{
    let error = req.flash("error");
    res.render("index",{err:[],error:null});
});

router.get("/shop",isloggedIn,(req,res)=>{
    res.render("shop");
})

module.exports= router;