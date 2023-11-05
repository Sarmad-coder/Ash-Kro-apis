const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const DealDay = db.dealDay;
const Product = db.product;

// main work




// 1.create product
const adddealDay = async (req, res) => {

    try {


        let info = {
            title: req.body.title,
            productId: req.body.productId,
        }


        const namedealDay = await DealDay.findOne({
            where: {
                title: info.title
            }
        })
        if (namedealDay) {
            res.status(200).json({
                status: 'fail',
                message: 'dealDay already exists',
            })
        } else {


            const namedealDay = await DealDay.findAll({
                where: {
                    title: info.title
                }
            })

            if (namedealDay.lenngth > 0) {
                res.status(200).json({
                    status: 'fail',
                    message: 'dealDay already exists first delete previous',
                })
            }
            else {
                const dealDay = await DealDay.create(info)
                res.status(200).json({
                    status: 'ok',
                    data: dealDay,
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
const getdealDay = async (req, res) => {

    try {
        let dealDays = await DealDay.findAll({
            include: [
                {
                    model: Product,
                    as: 'product'
                },

            ],
        })
        res.status(200).json({
            status: 'ok',
            data: dealDays
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getdealDayById = async (req, res) => {


    try {
        let id = req.params.id

        let dealDay = await DealDay.findOne({
            include: [
                {
                    model: Product,
                    as: 'product'
                },

            ],
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: dealDay
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatedealDay = async (req, res) => {

    try {
        let id = req.params.id


        let getdealDay = await DealDay.findOne({
            where: { id: id }
        })



        const dealDay = await DealDay.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: dealDay
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletedealDay = async (req, res) => {

    try {
        let id = req.params.id

        const dealDay = await DealDay.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: dealDay
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    adddealDay,
    getdealDay,
    getdealDayById,
    updatedealDay,
    deletedealDay,
}

