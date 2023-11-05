const profileController=require('../controllers/profileController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.post('/login',profileController.getprofile)
router.post('/create',upload.any('image','banner','logo'),profileController.addprofile)


router.get('/get/:id',profileController.getprofileById)
router.get('/get',profileController.getprofileAll)
router.put('/update/:id',upload.any('image','banner','logo'),profileController.updateprofile)
router.delete('/delete/:id',profileController.deleteprofile)


module.exports=router

