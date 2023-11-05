const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const FlashDeal = db.flashDeal;

// main work




// 1.create product
const addflashDeal = async (req, res) => {

    try {

        if(req.files===undefined){
            res.status(200).json({
                status: 'fail',
                message: 'Must add image',
            })    

        }
        else{

        let info = {
            title: req.body.title,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            productId: req.body.productId,
            image: dbConfig.mainUrl + req.files[0].filename,
            status:false,
            publish:false
        }


        const nameflashDeal = await FlashDeal.findOne({
            where: {
                title: info.title
            }
        })
        if (nameflashDeal) {
            res.status(200).json({
                status: 'fail',
                message: 'flashDeal already exists',
            })
        } else {

           const flashDeal= await FlashDeal.create(info)
           res.status(200).json({
            status: 'ok',
            data: flashDeal,
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
const getflashDeal = async (req, res) => {

    try {
        let flashDeals = await FlashDeal.findAll({})
        res.status(200).json({
            status: 'ok',
            data: flashDeals
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getflashDealById = async (req, res) => {


    try {
        let id = req.params.id

        let flashDeal = await FlashDeal.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: flashDeal
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updateflashDeal = async (req, res) => {

    try {
        let id = req.params.id


        let getflashDeal = await FlashDeal.findOne({
            where: { id: id }
        })
        let allflashDeal = await FlashDeal.findAll({})

        allflashDeal.map(async(i)=>{
            const publish=false

            const image = req.files[0] === undefined ? getflashDeal.dataValues.image : dbConfig.mainUrl + req.files[0].filename
        

        const flashDeal = await FlashDeal.update({ ...req.body,image,publish }, {
            where: { id: i?.id }
        })
        })

        const image = req.files[0] === undefined ? getflashDeal.dataValues.image : dbConfig.mainUrl + req.files[0].filename
        

        const flashDeal = await FlashDeal.update({ ...req.body,image }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: flashDeal
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deleteflashDeal = async (req, res) => {

    try {
        let id = req.params.id

        const flashDeal = await FlashDeal.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: flashDeal
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addflashDeal,
    getflashDeal,
    getflashDealById,
    updateflashDeal,
    deleteflashDeal,
}

