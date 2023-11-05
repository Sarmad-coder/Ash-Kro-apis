const featureDealController=require('../controllers/featureDealController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',featureDealController.getfeatureDeal)
router.post('/create',featureDealController.addfeatureDeal)


router.get('/get/:id',featureDealController.getfeatureDealById)
router.put('/update/:id',featureDealController.updatefeatureDeal)
router.delete('/delete/:id',featureDealController.deletefeatureDeal)


module.exports=router

