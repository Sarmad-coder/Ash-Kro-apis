const unitController=require('../controllers/unitController')

const router=require('express').Router()

router.get('/get',unitController.getunit)
router.post('/create',unitController.addunit)


router.get('/get/:id',unitController.getunitById)
router.put('/update/:id',unitController.updateunit)
router.delete('/delete/:id',unitController.deleteunit)


module.exports=router

