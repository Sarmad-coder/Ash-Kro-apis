const flashDealController=require('../controllers/flashDealController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',flashDealController.getflashDeal)
router.post('/create',upload.any('image'),flashDealController.addflashDeal)


router.get('/get/:id',flashDealController.getflashDealById)
router.put('/update/:id',upload.any('image'),flashDealController.updateflashDeal)
router.delete('/delete/:id',flashDealController.deleteflashDeal)


module.exports=router

