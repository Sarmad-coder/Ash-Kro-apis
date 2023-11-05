const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const Category = db.category;
const SubCategory = db.subCategory;
const SubSubCategory = db.subSubCategory;
const Product = db.product;
const Rating = db.rating;
const Like = db.like;

// main work




// 1.create product
const addcategory = async (req, res) => {

    try {

        if(req.files===undefined){
            res.status(200).json({
                status: 'fail',
                message: 'Must add image',
            })    

        }
        else{

        let info = {
            name: req.body.name,
            priority: req.body.priority,
            adminComission: req.body.adminComission,
            image: dbConfig.mainUrl + req.files[0].filename,
        }


        const namecategory = await Category.findOne({
            where: {
                name: info.name
            }
        })
        if (namecategory) {
            res.status(200).json({
                status: 'fail',
                message: 'Category already exists',
            })
        } else {

           const category= await Category.create(info)
           res.status(200).json({
            status: 'ok',
            data: category,
        })

        }
    }

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getcategory = async (req, res) => {

    try {
        let categorys = await Category.findAll({
            include: [
                {
                    model: SubCategory,
                    as: 'subCategory',
                    include: [
                        {
                            model: SubSubCategory,
                            as: 'subSubCategory',
                            include: [
                                {
                                    model: Product,
                                    as: 'product',
                                    include: [
                                        {
                                            model: Rating,
                                            as: 'ratingP'
                                        },
                                        {
                                            model: Like,
                                            as: 'likeP'
                                        },
                                    ]
                                    
                                },
                               
                            ],
                            
                        },

                       
                    ],
                },
                {
                    model: Product,
                    as: 'product',
                    include: [
                        {
                            model: Rating,
                            as: 'ratingP'
                        },
                        {
                            model: Like,
                            as: 'likeP'
                        },
                    ]
                },
            ],
        })
        res.status(200).json({
            status: 'ok',
            data: categorys
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getcategoryById = async (req, res) => {


    try {
        let id = req.params.id

        let category = await Category.findOne({
            include: [
                {
                    model: SubCategory,
                    as: 'subCategory',
                    include: [
                        {
                            model: SubSubCategory,
                            as: 'subSubCategory',
                            include: [
                                {
                                    model: Product,
                                    as: 'product',
                                    include: [
                                        {
                                            model: Rating,
                                            as: 'ratingP'
                                        },
                                        {
                                            model: Like,
                                            as: 'likeP'
                                        },
                                    ]
                                },
                               
                            ],
                            
                        },

                       
                    ],
                },
                {
                    model: Product,
                    as: 'product',
                    include: [
                        {
                            model: Rating,
                            as: 'ratingP'
                        },
                        {
                            model: Like,
                            as: 'likeP'
                        },
                    ]
                },
               
            ],
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: category
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatecategory = async (req, res) => {

    try {
        let id = req.params.id


        let getcategory = await Category.findOne({
            where: { id: id }
        })

        console.log(req.files)
        console.log(getcategory.dataValues.image)

        const image = req.files[0] === undefined ? getcategory.dataValues.image : dbConfig.mainUrl + req.files[0].filename
        

        const category = await Category.update({ ...req.body,image }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: category
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletecategory = async (req, res) => {

    try {
        let id = req.params.id

        const category = await Category.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: category
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addcategory,
    getcategory,
    getcategoryById,
    updatecategory,
    deletecategory,
}

