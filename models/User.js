const mongoose=require("mongoose")
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide the name'],
        minlength:3
    },
    email:{
        type:String,
        required:[true,'Please provide the email'],
        unique:true,
        match:[
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ,'Please provide valid email']
        
    },
    password:{
        type:String,
        required:[true,"Pleae provide the password"],
        minlength:3,
       
    }
})

//mongoose middleware
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
})
userSchema.methods.comparePassword=async function (password){
    const isValid=await bcrypt.compare(password,this.password)
    return isValid
}

userSchema.methods.getToken= function(){
    return jwt.sign({_id:this._id,name:this.name},'jwtSecret',{
        expiresIn:'30d'
    })
}


module.exports=mongoose.model('User',userSchema)