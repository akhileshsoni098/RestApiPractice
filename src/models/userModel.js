
const mogoose = require(mongoose)

const userSchema =  mongoose.Schema ({

fname:{
    type: String,
     required: true
},
 lname:{
    type:String,
    required: true
 },
 email:{
    type:true,
    required:true,
    unique:true
 },
 password:{
    type:true,
    required: true
 },
  isDeleted:{
    type:Boolean,
    default:false
  }


}, {timestamp:true})



module.export = mongoose.model("newUser", userSchema)