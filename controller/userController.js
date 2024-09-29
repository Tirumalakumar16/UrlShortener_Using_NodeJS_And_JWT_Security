const User = require('../models/user')
const {v4: uuidv4} = require('uuid')
const {setUserId,getUserId} = require('../service/auth')

async function handleUserSignUp(req,res) {
    const {name,email,password} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({message : "Please provide all the details"})
    }
    if(password.length < 6) {
        return res.status(400).json({message : "Password should be atleast 6 characters long"})
    }
    if(!email.includes('@')) {
        return res.status(400).json({message : "Please provide a valid email"})
    }
    if(await User.findOne({email})) {
        return res.status(400).json({message : "User already exists"})
    }
    if(await User.findOne({name})) {
        return res.status(400).json({message : "User already exists"})
    }
    const sessionId = uuidv4();
    setUserId(sessionId,user);
    res.cookie('sessionId',sessionId);
    await User.create({name,email,password})
    return res.redirect('/');
}


async function handleUserSignIn(req,res) {
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({message : "Please provide all the details"})
    }
    const user = await User.findOne({
        email,
        password
    })
    if(!user) {
        return res.render('signIn',{err : "Invalid credentials"})
    }

    const sessionId = uuidv4();
    setUserId(sessionId,user);
    res.cookie('sessionId',sessionId);
    return res.redirect('/');
}



module.exports = {
    handleUserSignUp,
    handleUserSignIn,
}
