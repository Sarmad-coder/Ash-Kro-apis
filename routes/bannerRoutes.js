const bannerController=require('../controllers/bannerController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',bannerController.getbanner)
router.post('/create',upload.any('image'),bannerController.addbanner)


router.get('/get/:id',bannerController.getbannerById)
router.put('/update/:id',upload.any('image'),bannerController.updatebanner)
router.delete('/delete/:id',bannerController.deletebanner)


module.exports=router

