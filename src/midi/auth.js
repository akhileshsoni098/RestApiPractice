const userContro = require("../controllers/userContro")

const userModel =require("../models/userModel")

const jwt = require("jsonwebtoken")
// ============================= authentication ============================



const auth = async (req ,res, next)=>{
try{
let token = req.headers["x-auth-token"]
if(!token){return res.status(400).send({status:false , message:"token is not present"})}

jwt.verify(token, "secretKey", function(err, decoded){
    if(err) res.status(401).send({stauts:false , message:err.message})
    else {
        req.userId = decoded.userId
        next()
    }
})
}catch(err){
    res.status(500).send({status:false , message:err.message})
}
}


//==================== authorization ===============================



const authorization = async (req,res,next)=>{
   try{
const userId = req.params.userId
    let userVerify = req.userId

let check = await userModel.findById(userId)
if(!check){return res.status(404).send({status:false , message:"no data found by this id "})}

if(check.userId != userVerify){return res.status(403).send({status:false , message:" Unauthorized access"})}
else{
    next()
}
   }catch(err){
    res.status(500).send({status:false , message:err.message })
   }
}


module.exports = {auth, authorization}

