const refundOrderController=require('../controllers/refundOrderController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',refundOrderController.getrefundOrder)
router.post('/create',refundOrderController.addrefundOrder)


router.get('/get/:id',refundOrderController.getrefundOrderById)
router.put('/update/:id',refundOrderController.updaterefundOrder)
router.delete('/delete/:id',refundOrderController.deleterefundOrder)


module.exports=router

