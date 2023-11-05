const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const SubCategory = db.subCategory;

// main work




// 1.create product
const addsubCategory = async (req, res) => {

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
                categoryId: req.body.categoryId,
                priority: req.body.priority,
            }


           

                const subCategory = await SubCategory.create(info)
                res.status(200).json({
                    status: 'ok',
                    data: subCategory,
                })

        // }

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getsubCategory = async (req, res) => {

    try {
        let subCategorys = await SubCategory.findAll({})
        res.status(200).json({
            status: 'ok',
            data: subCategorys
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getsubCategoryById = async (req, res) => {


    try {
        let id = req.params.id

        let subCategory = await SubCategory.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: subCategory
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatesubCategory = async (req, res) => {

    try {
        let id = req.params.id


        let getsubCategory = await SubCategory.findOne({
            where: { id: id }
        })


        console.log(req.body)



        const subCategory = await SubCategory.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: subCategory
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletesubCategory = async (req, res) => {

    try {
        let id = req.params.id

        const subCategory = await SubCategory.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: subCategory
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addsubCategory,
    getsubCategory,
    getsubCategoryById,
    updatesubCategory,
    deletesubCategory,
}

