 const  userModel = require("../models/userModel")


 const userdata = async (req,res)=>{
try{
    const data = req.body 
    const {fname , lname , email, password} = data
if(!fname){return res.status(400).send({status:false , message: "fname is required "})}
if(!lname){return res.status(400).send({status:false , message:"lname is required"})}
if(!email){return res.status(400).send({status:false , messsage:"email is required "})}
let emailCheck = await userModel.findOne({email:email})
if(emailCheck){return res.status(400).send({status:false , message:"email is already exist"})}
if(!password){return res.status(400).send({status:false , message:"password is required"})}

const saveUser = await userModel.create(data)

res.status(201).send({status:true , data:saveUser})

}catch(err){
res.status(500).send({status:false , message:err.message})
}
 }


const logIn = async (req,res)=>{
let data = req.body
let {email , password}= data
if(!email){return res.status(400).send({status:false , messsage:"email is required "})}
let emailCheck = await userModel.findOne({email:email})
if(!emailCheck){ return res.status(400).send({staus:false , message:"email not exist "})}
if(!password){return res.status(400).send({status:false , message:"password is required"})}
if(emailCheck.password !=password){return res.status(400).send({status:false , message:"password is incorrect"})}
/* 
jwt authentication authorization remains 

*/

}




 module.export = {userdata}



