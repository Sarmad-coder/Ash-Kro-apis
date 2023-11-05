const shipAddressController=require('../controllers/shipAddressController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',shipAddressController.getshipAddress)
router.post('/create',shipAddressController.addshipAddress)


router.get('/get/:id',shipAddressController.getshipAddressById)
router.put('/update/:id',shipAddressController.updateshipAddress)
router.delete('/delete/:id',shipAddressController.deleteshipAddress)


module.exports=router

