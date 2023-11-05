const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const FeatureDealProduct = db.featureDealProduct;
const Product = db.product;
const FeatureDeal = db.featureDeal;

// main work




// 1.create product
const addfeatureDealProduct = async (req, res) => {

    try {


        let info = {
            featureDealId: req.body.featureDealId,
            productId: req.body.productId,
        }



           const featureDealProduct= await FeatureDealProduct.create(info)
           res.status(200).json({
            status: 'ok',
            data: featureDealProduct,
        })

    
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getfeatureDealProduct = async (req, res) => {

    try {
        let featureDealProducts = await FeatureDealProduct.findAll({
            include: [
                {
                    model: Product,
                    as: 'product',
                },
                {
                    model: FeatureDeal,
                    as: 'featureDeal',
                },
               
            ],
        })
        res.status(200).json({
            status: 'ok',
            data: featureDealProducts
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 2.get all products
const getAllSingfeatureDealProduct = async (req, res) => {

    try {

        let featureDealProducts = await FeatureDealProduct.findAll({
            include: [
                {
                    model: Product,
                    as: 'product',
                },
                {
                    model: FeatureDeal,
                    as: 'featureDeal',
                },
               
            ],
            where:{
                featureDealId:req.params.id
            }
        })
        res.status(200).json({
            status: 'ok',
            data: featureDealProducts
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getfeatureDealProductById = async (req, res) => {


    try {
        let id = req.params.id

        let featureDealProduct = await FeatureDealProduct.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: featureDealProduct
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatefeatureDealProduct = async (req, res) => {

    try {
        let id = req.params.id


        let getfeatureDealProduct = await FeatureDealProduct.findOne({
            where: { id: id }
        })

        

        const featureDealProduct = await FeatureDealProduct.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: featureDealProduct
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletefeatureDealProduct = async (req, res) => {

    try {
        let id = req.params.id

        const featureDealProduct = await FeatureDealProduct.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: featureDealProduct
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addfeatureDealProduct,
    getfeatureDealProduct,
    getfeatureDealProductById,
    updatefeatureDealProduct,
    deletefeatureDealProduct,
    getAllSingfeatureDealProduct,
}

