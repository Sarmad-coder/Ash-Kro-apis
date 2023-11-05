const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const FlashDealProduct = db.flashDealProduct;
const Product = db.product;
const FlashDeal = db.flashDeal;

// main work




// 1.create product
const addflashDealProduct = async (req, res) => {

    try {


        let info = {
            flashDealId: req.body.flashDealId,
            productId: req.body.productId,
        }



           const flashDealProduct= await FlashDealProduct.create(info)
           res.status(200).json({
            status: 'ok',
            data: flashDealProduct,
        })

    
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getflashDealProduct = async (req, res) => {

    try {
        let flashDealProducts = await FlashDealProduct.findAll({
            include: [
                {
                    model: Product,
                    as: 'product',
                },
                {
                    model: FlashDeal,
                    as: 'flashDeal',
                    where:{
                        publish: true,
                    }
                },
               
            ],
        })
        res.status(200).json({
            status: 'ok',
            data: flashDealProducts
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 2.get all products
const getAllSingflashDealProduct = async (req, res) => {

    try {

        let flashDealProducts = await FlashDealProduct.findAll({
            include: [
                {
                    model: Product,
                    as: 'product',
                },
                {
                    model: FlashDeal,
                    as: 'flashDeal',
                },
               
            ],
            where:{
                flashDealId:req.params.id
            }
        })
        res.status(200).json({
            status: 'ok',
            data: flashDealProducts
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getflashDealProductById = async (req, res) => {


    try {
        let id = req.params.id

        let flashDealProduct = await FlashDealProduct.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: flashDealProduct
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updateflashDealProduct = async (req, res) => {

    try {
        let id = req.params.id


        let getflashDealProduct = await FlashDealProduct.findOne({
            where: { id: id }
        })

        

        const flashDealProduct = await FlashDealProduct.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: flashDealProduct
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deleteflashDealProduct = async (req, res) => {

    try {
        let id = req.params.id

        const flashDealProduct = await FlashDealProduct.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: flashDealProduct
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addflashDealProduct,
    getflashDealProduct,
    getflashDealProductById,
    updateflashDealProduct,
    deleteflashDealProduct,
    getAllSingflashDealProduct,
}

