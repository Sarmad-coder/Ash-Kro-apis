const productController=require('../controllers/productController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',productController.getproduct)
router.post('/create',upload.any('metaImage','productImage','thumbnail'),productController.addproduct)


router.get('/get/:id',productController.getproductById)
router.put('/update/:id',upload.any('metaImage','productImage','thumbnail'),productController.updateproduct)
router.delete('/delete/:id',productController.deleteproduct)


module.exports=router

