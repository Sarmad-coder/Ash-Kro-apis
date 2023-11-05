const sellerWalletController=require('../controllers/sellerWalletController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',sellerWalletController.getsellerWallet)
router.post('/create',sellerWalletController.addsellerWallet)


router.get('/get/:id',sellerWalletController.getsellerWalletById)
router.put('/update/:id',sellerWalletController.updatesellerWallet)
router.delete('/delete/:id',sellerWalletController.deletesellerWallet)


module.exports=router

