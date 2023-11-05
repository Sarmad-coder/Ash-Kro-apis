const saleController=require('../controllers/saleController')

const router=require('express').Router()

router.get('/get',saleController.getsale)
router.post('/create',saleController.addsale)


router.get('/get/:id',saleController.getsaleById)
router.put('/update/:id',saleController.updatesale)
router.delete('/delete/:id',saleController.deletesale)


module.exports=router

