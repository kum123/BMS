const router = require("express").Router()
const User = require("../models/userModel")
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middleware/authMiddleware');
router.post("/register", async (req, res) => {
    try {
        const requestBody = req.body

        const userData = await User.findOne({email:req.body.email});

        // hash the password
        // Generate a SALT -> Salt is a string of random value that is store
        // With my hashed value to make it more secure
            if(userData){
                res.json({ success: false, message: "User already exist"});
                return;
            }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password , salt)
        req.body.password = hashedPassword

        console.log(req.body)
        

        const newUser = new User(req.body)
        
        await newUser.save()
    
        res.status(200).json({ success: true, message: "User has been created"})
    } catch(e) {
        console.log(e)
        res.status(500).json({ success: false, message: "Internal server error"})
    }

})

router.get("/getData",async(req,res)=>{

    const userMailId = req.body.email;
    const userData = await User.findOne({email:userMailId});
    console.log(userData)
    res.status(200).json({ success: true, data: userData})
})

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
try{
    if(!user) {
        return res.send({
            success: false,
            message: "User does not exist"
        })
    }

    const isPassWordValid = await bcrypt.compare(req.body.password , user.password)

    // const isPassWordValid = user.password === req.body.password


    if(!isPassWordValid) {
        return res.send({
            success: false,
            message: "Password is invalid"
        })
    }
    const token = jwt.sign({userId:user._id,randomKey:"randomval"},"RANDOM_KEY",{expiresIn:"1d"});
    res.status(200).json({ success:true, message: "Logged in",data:token})
} catch (err) {
    throw err;
}
})
router.get('/get-current-user',authMiddleware,async (req,res) => {
    try {
        console.log("I am here");
        const user = await User.findById(req.body.userId).select("-password");
        console.log("user",user)
        res.send({
            success:true,
            message:"User is fetched",
            data: user
        });
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})
module.exports = router