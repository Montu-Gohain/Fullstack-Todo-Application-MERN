const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { hashSync, genSaltSync, compareSync} = require('bcryptjs')
const { isEmail } = require("validator")
const createAuthResObj = require("../scripts/createAuthResObj")

router.post("/register", async (req, res) => {
    try {
        if(!isEmail(req.body.email)) throw new Error("Invalid Email") // Validate Inputs
        const count = await User.count({ email : req.body.email })// Check If User Already Exists
        if (count) throw new Error("Email Is Not Unique")
        const user = new User (req.body)// Create instance of User
        user.password = hashSync(user.password, genSaltSync(+process.env.SALT_ROUNDS))// Hash the password
        await user.save()// Save In DB
        res.send(createAuthResObj(user))//Send back the jwt
    } catch ({message}) { res.status(400).send({message}) }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email : req.body.email })
        if (!user) throw new Error ("No User Found")
        const passwordIsValid = compareSync(req.body.password, user.password)
        if (!passwordIsValid) throw new Error ("Invalid Password!")
        res.send(createAuthResObj(user)) // Send back the jwt
    } catch ({message}) { res.status(400).send({message}) }
})

module.exports = router