const staffController=require('../controllers/staffController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',staffController.getstaff)
router.post('/create',staffController.addstaff)
router.post('/login',staffController.loginStaff)


router.get('/get/:id',staffController.getstaffById)
router.put('/update/:id',staffController.updatestaff)
router.delete('/delete/:id',staffController.deletestaff)


module.exports=router

