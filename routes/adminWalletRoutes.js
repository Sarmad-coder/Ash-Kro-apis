const adminWalletController=require('../controllers/adminWalletController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',adminWalletController.getadminWallet)
router.post('/create',adminWalletController.addadminWallet)


router.get('/get/:id',adminWalletController.getadminWalletById)
router.put('/update/:id',adminWalletController.updateadminWallet)
router.delete('/delete/:id',adminWalletController.deleteadminWallet)


module.exports=router

