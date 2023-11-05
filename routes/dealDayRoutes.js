const dealDayController=require('../controllers/dealDayController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',dealDayController.getdealDay)
router.post('/create',dealDayController.adddealDay)


router.get('/get/:id',dealDayController.getdealDayById)
router.put('/update/:id',dealDayController.updatedealDay)
router.delete('/delete/:id',dealDayController.deletedealDay)


module.exports=router

