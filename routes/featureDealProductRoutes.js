const featureDealProductController=require('../controllers/featureDealProductController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',featureDealProductController.getfeatureDealProduct)
router.post('/create',featureDealProductController.addfeatureDealProduct)


router.get('/get/:id',featureDealProductController.getfeatureDealProductById)
router.get('/getS/:id',featureDealProductController.getAllSingfeatureDealProduct)
router.put('/update/:id',featureDealProductController.updatefeatureDealProduct)
router.delete('/delete/:id',featureDealProductController.deletefeatureDealProduct)


module.exports=router

