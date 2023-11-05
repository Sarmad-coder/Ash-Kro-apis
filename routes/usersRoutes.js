const { checkToken } = require('../auth/token_validation')
const userController=require('../controllers/usersController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',userController.getUsers)
router.post('/create',upload.any('image'),userController.addUsers)
router.post('/trackOrder/:id',userController.trackUserOrder)


router.get('/get/:id',userController.getUserById)
router.put('/update/:id',upload.any('image'),userController.updateUser)
router.delete('/delete/:id',userController.deleteUser)


module.exports=router

