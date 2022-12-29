const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError={
    statuscode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR ,
    msg:err.message || 'Something went wrong'
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if(err.name==="ValidationError"){
    customError.msg=Object.values(err.errors).map((item)=> item.message
    ).join(' , ')
    customError.statusCode=400
  }

  
   
  if(err.code===11000){
    customError.msg=`Duplicate value of ${Object.keys(err.keyValue)} is provided`
    customError.statusCode=400
  }

  if(err.name==='CastError'){
    customError.msg=`No job found with such id: ${Object.values(err.value)}`
    customError.statuscode=404
  }

  return res.status(customError.statuscode).json({ msg:customError.msg})
  return res.status(customError.statuscode).json({err})
  
}

  

module.exports = errorHandlerMiddleware
