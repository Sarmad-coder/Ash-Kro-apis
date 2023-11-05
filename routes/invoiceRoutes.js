const invoiceController=require('../controllers/invoiceController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',invoiceController.getinvoice)
router.post('/create',upload.any('image'),invoiceController.addinvoice)


router.get('/get/:id',invoiceController.getinvoiceById)
router.put('/update/:id',upload.any('image'),invoiceController.updateinvoice)
router.delete('/delete/:id',invoiceController.deleteinvoice)


module.exports=router

