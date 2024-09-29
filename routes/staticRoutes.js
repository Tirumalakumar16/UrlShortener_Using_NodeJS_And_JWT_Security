const express = require('express');
const router = express.Router();

const Url = require('../models/url')


router.get('/', async (req, res) => {
        
    if(!req.user) {
        return res.redirect('/signIn')
    }
        const allUrls = await Url.find({createdBy : req.user._id});

    return res.render('home', {
        urls : allUrls,
    })
})

router.get('/signUp', (req,res) => {
    const user = req.user;
    if(user) {
        return res.redirect('/')
    }
    return res.render('signUp')
});

router.get('/signIn', (req,res) => {
    const user = req.user;
    if(user) {
        return res.redirect('/')
    }
    return res.render('signIn')
});



module.exports = router;
