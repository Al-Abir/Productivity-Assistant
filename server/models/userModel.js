const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const mongoose = require('mongoose')
const cookie = require('cookie')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'User name is Required']
        
    },
    email:{
        type:String,
        required:[true,'Email name is Required'],
        unique:true
    },
    password:{
        type:String,
        required: [true,'Password name is Required'],
        minlength:[6,"Password length should ve 6 character long"]

    },
    coustmerId:{
        type:String,
        default:""
    },
    subscription:{
        type:String,
        default:""
    },
  

},{timestamps:true})


//hashed password
userSchema.pre("save",async function(next){
    //update handle
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

// match password
userSchema.method.matchPassword = async function(password) {
    return await bcrypt.compare(password,this.password)
    
}

// JWT token
userSchema.method.getSingndToken = function(res){
     const accessToken = JWT.sign({id:this._id},process.env.JWT_ACCESS_SECRET,{expiresIn:process.env.JWT_ACCESS_EXPIREIN})
     const refreshToken = JWT.sign({id:this._id},process.env.JWT_REFRESH_TOKEN,{expiresIn:process.env.JWT_REFRESH_EXPIREIN})
     res.cookie('refeshToken',`${refreshToken}`,{maxAge:86400*7000, httpOnly:true})
     
}
const User = mongoose.model('users',userSchema);

module.exports = User;
