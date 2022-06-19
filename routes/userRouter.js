const Router = require('express').Router()
const { nextTick } = require('process')
const {User,Video} = require('../models/userModels')
const authMiddleware = require('../middleware/authMiddleware')

const bcrypt = require('bcrypt')

Router.post('/login', async (req,res)=>{
    try{

        const user = await User.login(req.body.email,req.body.password)
        const token = await user.generateToken()
        res.json({user,token})
    }
    catch(error)
    {
        res.json({error})
    }
})

Router.post('/register',async (req,res)=>{
    try{
        const registerUser = new User(req.body)
        registerUser.password = await bcrypt.hash(registerUser.password,8)
        const response = await registerUser.save()
        res.json(response)
    }
    catch(error)
    {
        res.json({error})
    }
})


Router.post('/addPost',authMiddleware,async(req,res)=>{
    try{
        const postAdd = new Video(req.body)
        postAdd.sharedId = await req.user._id
        const response = await postAdd.save()
        res.json(response)
    }
    catch(error)
    {
        res.json({error})
    }
})

Router.get('/testConnect',authMiddleware,async(req,res)=>{
    res.json({'mesaj':'sdfsdf'})
})

Router.get('/getPost',authMiddleware,async(req,res)=>{
    try{
        const sonuc = await Video.find({})
        res.json(sonuc)
    }
    catch(error)
    {
        res.json({error})
    }
})
module.exports = Router