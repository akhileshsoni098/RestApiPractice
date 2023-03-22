 const { isValidObjectId } = require("mongoose")
const  userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")



//======================================================Register=========================


 const userdata = async (req,res)=>{
try{
const data = req.body 
const {fname , lname , email, password} = data
if(!fname){return res.status(400).send({status:false , message: "fname is required "})}
if(!lname){return res.status(400).send({status:false , message:"lname is required"})}
if(!email){return res.status(400).send({status:false , messsage:"email is required "})}
// let emailCheck = await userModel.find({email:email})
// if(emailCheck.length==0){return res.status(400).send({status:false , message:"email is already exist"})}
if(!password){return res.status(400).send({status:false , message:"password is required"})}

const saveUser = await userModel.create(data)

res.status(201).send({status:true , data:saveUser})

}catch(err){
res.status(500).send({status:false , message:err.message})
}
 }



 //=============================================== log In =================================


const logIn = async (req,res)=>{
try{
    let data = req.body
    let {email , password}= data
    if(!email){return res.status(400).send({status:false , messsage:"email is required "})}
    let emailCheck = await userModel.findOne({email:email})
    if(!emailCheck){ return res.status(400).send({staus:false , message:"email not exist "})}
    if(!password){return res.status(400).send({status:false , message:"password is required"})}
    if(emailCheck.password !=password){return res.status(400).send({status:false , message:"password is incorrect"})}
    
    let userCredentials = await userModel.findOne({email:email , password:password})
    /* 
    jwt 
    */
    let token =  jwt.sign({userId:userCredentials._id}, "secretKey")
    
    res.status(200).send({status:true , message:"successfully Loged in", token:token})
    
}catch(err){
    res.status(500).send({status:false, message:err.message})
}
}

//======================================  get user ==================================


const getUser = async (req, res)=>{
   try{
    const userId = req.params.userId
    if(!isValidObjectId(userId)){ return res.status(400).send({status:false , message:"invalid useriD"})}
    const showdata = await userModel.find()
    res.status(200).send({status:true , data: showdata})
   }catch(err){
    res.status(500).send({status:false , message:err.message})
   }

}







// =============================== update user ================================================

const updateUser = async (req,res)=>{
try{
    const userId = req.params.userdId
    if(!isValidObjectId(userId)){
        return res.status(400).send({status:false , message:"userId is Invalid"})
    }

    let data = req.body

let {fname , lname , email , password } = data

if(fname){
    if(!data.fname){return res.status(400).send({status:false , message:" fill fname field to update"})}
}
if(lname){
    if(!data.lname){return res.status(400).send({status:false , message:" fill lname field to update"})}
}
if(email){
    if(!data.email){return res.status(400).send({status:false , message:" fill email field to update"})}
    let checkEmail = await userModel.findOne({email:email})
    if(checkEmail){return res.status(400).send({status:false , message: "this email is already exist try another email"})}
}
if(password){
    if(!data.password){return res.status(400).send({status:false , message:" fill password field to update"})}
}


let updateData = await userModel.findOneAndUpdate({_id:userId}, {$set:{fname:data.fname, lname:data.lname ,email:data.email ,password:password}})

return res.status(200).send({status:true , message:"succesfully updated", data:updateData})
}catch(err){
    res.status(500).send({status:false , message:err.message})
}
}

//========================================= delete user ========================


const delUser = async (req, res)=>{
    try{
    const userId = req.params.userId
    if(!isValidObjectId(userId)){
        return res.status(400).send({status:false , message:"userId is Invalid"})
    }
let checkDeleted = await userModel.findOne({_id:userId, isDeleted:true})
if(checkDeleted){ return res.status(400).send({status:false , message:"Already deleted"})}
let deleteUser = await userModel.findByIdAndUpdate({_id:userId, isdeleted:false},{isdeleted:true})
res.status(200).send({status:true , message:"deleted Successfully"})

    }catch(err){
        res.status(500).send({status:false , message:err.message})
    }


}





 module.exports = {userdata,logIn,getUser, updateUser,delUser}



