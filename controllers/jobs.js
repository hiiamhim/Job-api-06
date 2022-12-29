const Job=require('../models/Job')
const {StatusCodes}=require('http-status-codes')
const {BadRequestError}=require("../errors")
const getAllJobs=async(req,res)=>{
   
    const jobs=await Job.find({createdBy:req.user.userId})
    res.status(StatusCodes.OK).json({jobs,count:jobs.length})
}

const getJob=async(req,res)=>{
const{user:{userId},params:{id:jobId}}=req
const job=await Job.findOne({
    _id:jobId,
     createdBy:userId
})
res.status(StatusCodes.OK).json({job})
}

const createJob=async(req,res)=>{
    req.body.createdBy=req.user.userId
 
    const job=await Job.create(req.body)
    console.log(job)
    res.status(StatusCodes.CREATED).json({job})

}

const deleteJob=async(req,res)=>{
const{user:{userId},params:{id:jobId}} =req
const job=await Job.findByIdAndDelete({
    _id:jobId,
    createdBy:userId
})
res.status(StatusCodes.OK).send()
}

const updateJob=async(req,res)=>{
    const{user:{userId},params:{id:jobId},body:{
        company,position
    }}=req
 if(!position || !company){
  throw new BadRequestError("Either position or company name not provided")
 }
 const job=await Job.findByIdAndUpdate({_id:jobId,createdBy:userId},req.body,{new:true,runValidators:true})
 if(!job) {
    throw new BadRequestError("No such job exist")
 }
 res.status(StatusCodes.OK).json({job})
}


module.exports={
    createJob,
    updateJob,
    deleteJob,
    getAllJobs,
    getJob
}