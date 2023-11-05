const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const FeatureDeal = db.featureDeal;

// main work




// 1.create product
const addfeatureDeal = async (req, res) => {

    try {


        let info = {
            title: req.body.title,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            status: false,
            publish: false,
        }


        const namefeatureDeal = await FeatureDeal.findOne({
            where: {
                title: info.title
            }
        })
        if (namefeatureDeal) {
            res.status(200).json({
                status: 'fail',
                message: 'featureDeal already exists',
            })
        } else {

            const featureDeal = await FeatureDeal.create(info)
            res.status(200).json({
                status: 'ok',
                data: featureDeal,
            })

        }


    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getfeatureDeal = async (req, res) => {

    try {
        let featureDeals = await FeatureDeal.findAll({})
        res.status(200).json({
            status: 'ok',
            data: featureDeals
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getfeatureDealById = async (req, res) => {


    try {
        let id = req.params.id

        let featureDeal = await FeatureDeal.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: featureDeal
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatefeatureDeal = async (req, res) => {

    try {
        let id = req.params.id


        let getfeatureDeal = await FeatureDeal.findOne({
            where: { id: id }
        })


        let allflashDeal = await FeatureDeal.findAll({})

        allflashDeal.map(async (i) => {
            const publish = false



            const flashDeal = await FeatureDeal.update({ ...req.body, publish }, {
                where: { id: i?.id }
            })
        })



        const featureDeal = await FeatureDeal.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: featureDeal
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletefeatureDeal = async (req, res) => {

    try {
        let id = req.params.id

        const featureDeal = await FeatureDeal.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: featureDeal
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addfeatureDeal,
    getfeatureDeal,
    getfeatureDealById,
    updatefeatureDeal,
    deletefeatureDeal,
}

