const saleProductController=require('../controllers/saleProductController')

const router=require('express').Router()


router.get('/get',saleProductController.getsaleProduct)
router.get('/getSingleUser/:id',saleProductController.getSingleUsersaleProduct)
router.post('/create',saleProductController.addsaleProduct)


router.get('/get/:id',saleProductController.getsaleProductById)
router.put('/update/:id',saleProductController.updatesaleProduct)
router.delete('/delete/:id',saleProductController.deletesaleProduct)


module.exports=router

