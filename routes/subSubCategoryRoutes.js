const subSubCategoryController=require('../controllers/subSubCategoryController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',subSubCategoryController.getsubSubCategory)
router.post('/create',subSubCategoryController.addsubSubCategory)


router.get('/get/:id',subSubCategoryController.getsubSubCategoryById)
router.put('/update/:id',subSubCategoryController.updatesubSubCategory)
router.delete('/delete/:id',subSubCategoryController.deletesubSubCategory)


module.exports=router

