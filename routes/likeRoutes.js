const likeController=require('../controllers/likeController')

const router=require('express').Router()

router.get('/get',likeController.getlike)
router.post('/create',likeController.addlike)


router.get('/get/:id',likeController.getlikeById)
router.put('/update/:id',likeController.updatelike)
router.delete('/delete/:id',likeController.deletelike)


module.exports=router

