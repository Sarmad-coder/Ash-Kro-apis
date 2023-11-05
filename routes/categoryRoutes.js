const categoryController=require('../controllers/categoryController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',categoryController.getcategory)
router.post('/create',upload.any('image'),categoryController.addcategory)


router.get('/get/:id',categoryController.getcategoryById)
router.put('/update/:id',upload.any('image'),categoryController.updatecategory)
router.delete('/delete/:id',categoryController.deletecategory)


module.exports=router

