const subCategoryController=require('../controllers/subCategoryController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',subCategoryController.getsubCategory)
router.post('/create',subCategoryController.addsubCategory)


router.get('/get/:id',subCategoryController.getsubCategoryById)
router.put('/update/:id',subCategoryController.updatesubCategory)
router.delete('/delete/:id',subCategoryController.deletesubCategory)


module.exports=router

