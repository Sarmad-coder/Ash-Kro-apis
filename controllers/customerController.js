const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const Customer = db.customer;

// main work




// 1.create product
const addcustomer = async (req, res) => {

    try {

        let info = {
            name: req.body.name,
            city: req.body.city,
            address: req.body.address,
            cost: req.body.cost,
            orderId: req.body.orderId,
            storeOrderNumber: req.body.storeOrderNumber,
            reference: req.body.reference,
            note: req.body.note,
            state:'approved'
        }




        const customer = await Customer.create(info)
        res.status(200).json({
            status: 'ok',
            data: customer,
        })


    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getcustomer = async (req, res) => {

    try {
        let customers = await Customer.findAll({})
        res.status(200).json({
            status: 'ok',
            data: customers
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getcustomerById = async (req, res) => {


    try {
        let id = req.params.id

        let customer = await Customer.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: customer
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatecustomer = async (req, res) => {

    try {
        let id = req.params.id


        let getcustomer = await Customer.findOne({
            where: { id: id }
        })

        const customer = await Customer.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: customer
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletecustomer = async (req, res) => {

    try {
        let id = req.params.id

        const customer = await Customer.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: customer
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addcustomer,
    getcustomer,
    getcustomerById,
    updatecustomer,
    deletecustomer,
}

