const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const Like = db.like;
const Product = db.product;

// main work




// 1.create product
const addlike = async (req, res) => {

    try {

        let info = {
            like: true,
            userId: req.body.userId,
            productId: req.body.productId,
        }


        let getlike = await Like.findOne({
            where: { productId: info.productId, userId: info.userId }
        })



        

        const getUserFollow = await Product.findOne({
            where: { id: info.productId }
        })

        


        if (getUserFollow.myLike.includes(info?.userId)) {
            const myFollow = getUserFollow?.myLike.filter(i => i !== (info?.userId))
            console.log(myFollow,'abc')
            const newUserFollow = await Product.update({ myLike: myFollow }, {
                where: { id: info.productId }
            })

            res.status(200).json({
                    status: 'ok',
                    message: 'You dislike the product!',
                   })

        }
        else {
            const newUserFollow = await Product.update({ myLike: [...getUserFollow?.myLike, info?.userId] }, {
                where: { id: info.productId }

            })

            res.status(200).json({
                status: 'ok',
                message: 'You like the product!',
               })

          

        }





        

        // if(getlike){

        //     if(getlike.like===false){
        //         const like=true
        //         const mylike = await Like.update({ ...req.body,like }, {
        //             where: { productId: info.productId, userId: info.userId}
        //         }
        //         )
        //         res.status(200).json({
        //     status: 'ok',
        //     data: mylike,
        //    })
                
        //     }
        //     else if(getlike.like===true){
        //         const like=false
        //         const mylike = await Like.update({ ...req.body,like }, {
        //             where: { productId: info.productId, userId: info.userId}
        //         }
        //         )
        //         res.status(200).json({
        //     status: 'ok',
        //     data: mylike,
        //    })
        //     }
        // }
        // else{
        //     const like= await Like.create(info)
        //    res.status(200).json({
        //     status: 'ok',
        //     data: like,
        //    })
        // }



           
        



    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getlike = async (req, res) => {

    try {
        let likes = await Like.findAll({
            include: [
                {
                    model: Product,
                    as: 'userProduct'
                },
            ],
        })
        res.status(200).json({
            status: 'ok',
            data: likes
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getlikeById = async (req, res) => {


    try {
        let id = req.params.id

        let like = await Like.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: like
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatelike = async (req, res) => {

    try {
        let id = req.params.id


        let getlike = await Like.findOne({
            where: { id: id }
        })

        const like = await Like.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: like
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletelike = async (req, res) => {

    try {
        let id = req.params.id

        const like = await Like.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: like
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addlike,
    getlike,
    getlikeById,
    updatelike,
    deletelike,
}

