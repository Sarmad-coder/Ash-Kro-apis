const userWalletController=require('../controllers/userWalletController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',userWalletController.getuserWallet)
router.post('/create',upload.any('image'),userWalletController.adduserWallet)


router.get('/get/:id',userWalletController.getuserWalletById)
router.get('/getSingle/:id',userWalletController.getSuserWallet)
router.put('/update/:id',userWalletController.updateuserWallet)
router.delete('/delete/:id',userWalletController.deleteuserWallet)


module.exports=router

