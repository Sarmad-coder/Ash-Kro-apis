const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const Invoice = db.invoice;

// main work




// 1.create product
const addinvoice = async (req, res) => {

    try {

        if (req.files === undefined) {
            res.status(200).json({
                status: 'fail',
                message: 'Must add image',
            })

        }
        else {

            let info = {
                image: dbConfig.mainUrl + req.files[0].filename,
                companyName: req.body.companyName, 
                companyAddress: req.body.companyName, 
                companyEmail: req.body.companyEmail, 
                companyContact: req.body.companyContact, 
                note: req.body.note, 
            }


            const invoice = await Invoice.create(info)
            res.status(200).json({
                status: 'ok',
                data: invoice,
            })


        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getinvoice = async (req, res) => {

    try {
        let invoices = await Invoice.findAll({})
        res.status(200).json({
            status: 'ok',
            data: invoices
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getinvoiceById = async (req, res) => {


    try {
        let id = req.params.id

        let invoice = await Invoice.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: invoice
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updateinvoice = async (req, res) => {

    try {
        let id = req.params.id

        const info = await Invoice.findAll({})


        if (info.length === 0) {
            await Invoice.create({ companyName: 'test', companyAddress: 'test', companyEmail: 'test', companyContact: 'test', note: 'test' })
        }
        else if (info.length > 1) {
            res.status(200).json({
                status: 'fail',
                message: "Only update previous Invoice"
            })
        }
        else {

            let getinvoice = await Invoice.findOne({
                where: { id: id }
            })

            const image = req.files[0] === undefined ? getinvoice.dataValues.image : dbConfig.mainUrl + req.files[0].filename


            const invoice = await Invoice.update({ ...req.body, image }, {
                where: { id: id }
            }
            )
            res.status(200).json({
                status: 'ok',
                data: invoice
            })

        }


    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deleteinvoice = async (req, res) => {

    try {
        let id = req.params.id

        const invoice = await Invoice.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: invoice
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addinvoice,
    getinvoice,
    getinvoiceById,
    updateinvoice,
    deleteinvoice,
}

