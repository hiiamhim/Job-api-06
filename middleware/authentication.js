const user=require("../models/User")
const {UnauthenticatedError}=require("../errors/unauthenticated")
const jwt=require("jsonwebtoken")
const { findOne } = require("../models/User")
const auth=async(req,res,next)=>{
    const authheader=req.headers.authorization
    
    if(!authheader || !authheader.startsWith("Bearer")){
        throw new UnauthenticatedError("Token is not provided")

    }
    try{
        const token_rcv=authheader.replace("Bearer",'').trim()
        const payload=jwt.verify(token_rcv,'jwtSecret')
        req.user={userId:payload._id,name:payload.name}
        next()
    }
    catch(err){
        throw new Error("Unable to fetch the details")
    }
   


}



module.exports=auth