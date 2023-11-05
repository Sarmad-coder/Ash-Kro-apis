const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const AdminWallet = db.adminWallet;

// main work




// 1.create product
const addadminWallet = async (req, res) => {

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


           

                const adminWallet = await adminWallet.create(info)
                res.status(200).json({
                    status: 'ok',
                    data: adminWallet,
                })

        // }

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getadminWallet = async (req, res) => {

    try {
        let adminWallets = await AdminWallet.findAll({})
        res.status(200).json({
            status: 'ok',
            data: adminWallets
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getadminWalletById = async (req, res) => {


    try {
        let id = req.params.id

        let adminWallet = await AdminWallet.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: adminWallet
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updateadminWallet = async (req, res) => {

    try {
        let id = req.params.id


        let getadminWallet = await AdminWallet.findOne({
            where: { id: id }
        })



        const adminWallet = await AdminWallet.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: adminWallet
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deleteadminWallet = async (req, res) => {

    try {
        let id = req.params.id

        const adminWallet = await AdminWallet.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: adminWallet
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addadminWallet,
    getadminWallet,
    getadminWalletById,
    updateadminWallet,
    deleteadminWallet,
}

