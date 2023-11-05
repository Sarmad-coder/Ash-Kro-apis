const otpController=require('../controllers/otpController')

const router=require('express').Router()

router.post('/verify',otpController.VerifyOtp)



module.exports=router

