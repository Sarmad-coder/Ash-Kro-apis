const brandController=require('../controllers/brandController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',brandController.getbrand)
router.post('/create',upload.any('image'),brandController.addbrand)


router.get('/get/:id',brandController.getbrandById)
router.put('/update/:id',upload.any('image'),brandController.updatebrand)
router.delete('/delete/:id',brandController.deletebrand)


module.exports=router

