const withdrawController=require('../controllers/withdrawController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',withdrawController.getwithdraw)
router.post('/create',withdrawController.addwithdraw)


router.get('/get/:id',withdrawController.getwithdrawById)
router.put('/update/:id',withdrawController.updatewithdraw)
router.delete('/delete/:id',withdrawController.deletewithdraw)


module.exports=router

