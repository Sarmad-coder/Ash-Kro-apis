const saleQuotationController=require('../controllers/saleQuotationController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',saleQuotationController.getsaleQuotation)
router.post('/create',upload.any('image'),saleQuotationController.addsaleQuotation)


router.get('/get/:id',saleQuotationController.getsaleQuotationById)
router.put('/update/:id',upload.any('image'),saleQuotationController.updatesaleQuotation)
router.delete('/delete/:id',saleQuotationController.deletesaleQuotation)


module.exports=router

