const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const SubSubCategory = db.subSubCategory;

// main work




// 1.create product
const addsubSubCategory = async (req, res) => {

    try {

        // if (req.files === undefined) {
        //     res.status(200).json({
        //         status: 'fail',
        //         message: 'Must add image',
        //     })

        // }
        // else {

            let info = {
                name: req.body.name,
                subCategoryId: req.body.subCategoryId,
                priority: req.body.priority,
            }


           

                const subSubCategory = await SubSubCategory.create(info)
                res.status(200).json({
                    status: 'ok',
                    data: subSubCategory,
                })

        // }

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getsubSubCategory = async (req, res) => {

    try {
        let subSubCategorys = await SubSubCategory.findAll({})
        res.status(200).json({
            status: 'ok',
            data: subSubCategorys
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getsubSubCategoryById = async (req, res) => {


    try {
        let id = req.params.id

        let subSubCategory = await SubSubCategory.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: subSubCategory
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatesubSubCategory = async (req, res) => {

    try {
        let id = req.params.id


        let getsubSubCategory = await SubSubCategory.findOne({
            where: { id: id }
        })



        const subSubCategory = await SubSubCategory.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: subSubCategory
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletesubSubCategory = async (req, res) => {

    try {
        let id = req.params.id

        const subSubCategory = await SubSubCategory.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: subSubCategory
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addsubSubCategory,
    getsubSubCategory,
    getsubSubCategoryById,
    updatesubSubCategory,
    deletesubSubCategory,
}

