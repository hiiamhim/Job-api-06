const mongoose=require('mongoose')

const jobSchema=new mongoose.Schema({
    company:{
        type:'String',
        maxlength:50,
        required:[true,"Please provide the company name"]
    },
    position:{
        type:'String',
        maxlength:100,
        required:[true,'Please provide the position']
    },
    status:{
        type:'String',
        enum:['interview','Pending','rejected'],
        default:'Pending'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

module.exports= mongoose.model('Job',jobSchema)