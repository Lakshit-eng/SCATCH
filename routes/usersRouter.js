const express = require ("express");
const router = express.Router();

router.get("/",(req,res)=>{
   res.send("router is working for users");
})

module.exports = router;