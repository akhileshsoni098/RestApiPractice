const express = require("express")

const router = express.Router()

const usercontro = require("../controllers/userContro")
const midi = require("../midi/auth")

router.post("/createUser", usercontro.userdata )
router.post("/logIn", usercontro.logIn )
router.get("/get/:userId", midi.auth, usercontro.getUser)
router.put("/update/:userId", midi.auth, midi.authorization, usercontro.updateUser)
router.delete("/delete/:userId", midi.auth, midi.authorization, usercontro.delUser)

// router.get("/",(req ,res)=>{
// res.send({status:true , message:"I am running broo "})

// })

module.exports = router


