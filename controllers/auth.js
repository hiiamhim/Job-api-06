const User=require("../models/User")
const {StatusCodes}=require("http-status-codes")
const{BadRequestError,UnauthenticatedError}=require("../errors/index")


const register=async(req,res)=>{
    const user= await User.create({...req.body})
    const token=user.getToken()
   
   res.status(StatusCodes.CREATED).json({user:{name:user.name},token})
   
}

const login=async(req,res)=>{
  const {email,password}=req.body
  if(!email || !password){
    throw new BadRequestError("Please provide all the credentials required")
  }
  const user=await User.findOne({email})
  if(!user){
    throw new UnauthenticatedError("User doesnt exist")
  }
  const isUserRight=await user.comparePassword(password)
  if(!isUserRight){
    throw new BadRequestError("incorrect password")
  }
  const token=user.getToken()
  
  res.status(StatusCodes.OK).json({user:{name:user.name},token})
}

module.exports={
register,
login
}