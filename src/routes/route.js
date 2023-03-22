const express = require("express")

const router = express.Router()


router.get("/",(req ,res)=>{
res.send({status:true , message:"I am running broo "})

})

module.exports = router


