const flashDealProductController=require('../controllers/flashDealProductController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',flashDealProductController.getflashDealProduct)
router.post('/create',flashDealProductController.addflashDealProduct)


router.get('/get/:id',flashDealProductController.getflashDealProductById)
router.get('/getS/:id',flashDealProductController.getAllSingflashDealProduct)
router.put('/update/:id',flashDealProductController.updateflashDealProduct)
router.delete('/delete/:id',flashDealProductController.deleteflashDealProduct)


module.exports=router

