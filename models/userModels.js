const mongoose = require('mongoose')
const Schema = mongoose.Schema
const createError = require('http-errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const videoSchema = new Schema({
    uri:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    comments:[{
        cid:{
            type:Number,
        },
        ctext:{
            type:String
        }
    }],
    bComments:[{
        cid:{
            type:Number
        },
        ctext:{
            type:String
        }
    }],
    likes:[{lid:{
        type:Number
    }}],
    views:[{viewid:{
        type:Number
    }}],
    superLikes:[{
        lid:{
        type:Number
        },
        amount:{
            type:Number
        }

}],
    sharedId:{
        
    }
},{collection:'video'})

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    surName:{
        type:String,
        required:true,
        trim:true,
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        uniqe:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        uniqe:true

    },
    age:{
        type:String,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        required:true,
        trim:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    follower : [
        {
            id:{
                type:String
            }
        }
    ],
    follow : [{
        id:{
            type:String
        }
    }],
    videos: [{
        type:String
    }]
},{collection:'user'})

userSchema.methods.generateToken = async function()
{
    const loggedUser = this
    const token = await jwt.sign({_id:loggedUser._id},'12345')
    return token
}
userSchema.statics.login = async (email,password) =>{
    const user = await User.findOne({email})
    if(!user)
    {

        throw createError(400,"Girilen Bilgilere Ait Kullanıcı1 Bulunamadi")

    }
    const checkPassword = await bcrypt.compare(password,user.password)
    if(checkPassword)
    {
        return user
    }
    else
    {
        throw createError(400,"Girilen Bilgilere Ait Kullanıcı Bulunamadi")
    }
}

const User = mongoose.model('User',userSchema)
const Video = mongoose.model('Video',videoSchema)
module.exports = {User,Video}
