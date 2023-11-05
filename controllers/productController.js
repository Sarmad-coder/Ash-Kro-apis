const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const Product = db.product;
const Category = db.category;
const SubCategory = db.subCategory;
const Brand = db.brand;
const Like = db.like;
const Rating = db.rating;
const Profile = db.profile;
const SaleProduct = db.saleProduct;

// main work




// 1.create product
const addproduct = async (req, res) => {

    try {

        if (req.files === undefined) {
            res.status(200).json({
                status: 'fail',
                message: 'Must add images',
            })

        }
        else {

            let info = {
                metaImage: dbConfig.mainUrl + req.files[0].filename,
                productImage: dbConfig.mainUrl + req.files[1].filename,
                thumbnail: dbConfig.mainUrl + req.files[2].filename,
                addedAs: req.body.addedAs,
                name: req.body.name,
                description: req.body.description,
                profileId: req.body.profileId,
                staffId: req.body.staffId,
                productType: req.body.productType,
                tags: req.body.tags,
                metaTitle: req.body.metaTitle,
                metaDescription: req.body.metaDescription,
                youtubeLink: req.body.youtubeLink,
                color: req.body.color,
                attributes: req.body.attributes,
                discount: req.body.discount,
                discountType: req.body.discountType,
                productCode: req.body.productCode,
                purchasePrice: req.body.purchasePrice,
                shippingCost: req.body.shippingCost,
                shippingCostMulti: req.body.shippingCostMulti,
                tax: req.body.tax,
                quantity: req.body.quantity,
                minimumOrderQuantity: req.body.minimumOrderQuantity,
                unit: req.body.unit,
                unitPrice: req.body.unitPrice,
                sellPrice: req.body.sellPrice,
                adminCommission: req.body.adminCommission,
                brandId: req.body.brandId,
                categoryId: req.body.categoryId,
                subCategoryId: req.body.subCategoryId,
                subSubCategoryId: req.body.subSubCategoryId,
                status: req.body.status,
            }


            console.log(info)

            const product = await Product.create(info)
            console.log(product)
            return res.status(200).json({
                status: 'ok',
                data: product,
            })

        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getproduct = async (req, res) => {

    try {
        let products = await Product.findAll({
            include: [
                {
                    model: Profile,
                    as: 'profile'
                },
                {
                    model: Rating,
                    as: 'ratingP'
                },
                {
                    model: Like,
                    as: 'likeP'
                },
                {
                    model: SaleProduct,
                    as: 'saleProduct'
                },
                {
                    model: Brand,
                    as: 'brand'
                },


            ],
        })
        res.status(200).json({
            status: 'ok',
            data: products
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getproductById = async (req, res) => {


    try {
        let id = req.params.id

        let product = await Product.findOne({
            include: [
                {
                    model: Rating,
                    as: 'ratingP'
                },
                {
                    model: Profile,
                    as: 'profile',
                    include: [
                        {
                            model: Product,
                            as: 'product'
                        },
                    ],
                    
                },
                {
                    model: SaleProduct,
                    as: 'saleProduct'
                },
                {
                    model: Brand,
                    as: 'brand'
                },
            ],
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: product
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updateproduct = async (req, res) => {

    try {
        let id = req.params.id

        console.log(id, '======================...............')


        let getproduct = await Product.findOne({
            where: { id: id }
        })

        console.log(req.files)

        const metaImage = req.files === undefined || req.files.length === 0 ? getproduct.dataValues.metaImage : dbConfig.mainUrl + req.files[0].filename
        const productImage = req.files === undefined || req.files.length === 0 ? getproduct.dataValues.productImage : dbConfig.mainUrl + req.files[1].filename
        const thumbnail = req.files === undefined || req.files.length === 0 ? getproduct.dataValues.thumbnail : dbConfig.mainUrl + req.files[2].filename

        console.log(req.body.status, '==============================================================')

        const product = await Product.update({ ...req.body, metaImage, productImage, thumbnail }, {
            where: { id: id }
        }
        )


        res.status(200).json({
            status: 'ok',
            data: product
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deleteproduct = async (req, res) => {

    try {
        let id = req.params.id

        const product = await Product.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: product
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addproduct,
    getproduct,
    getproductById,
    updateproduct,
    deleteproduct,
}

