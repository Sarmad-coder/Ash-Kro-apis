const customerController=require('../controllers/customerController')

const router=require('express').Router()

router.get('/get',customerController.getcustomer)
router.post('/create',customerController.addcustomer)


router.get('/get/:id',customerController.getcustomerById)
router.put('/update/:id',customerController.updatecustomer)
router.delete('/delete/:id',customerController.deletecustomer)


module.exports=router

