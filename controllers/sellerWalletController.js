const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const SellerWallet = db.sellerWallet;

// main work




// 1.create product
const addsellerWallet = async (req, res) => {

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


           

                const sellerWallet = await SellerWallet.create(info)
                res.status(200).json({
                    status: 'ok',
                    data: sellerWallet,
                })

        // }

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getsellerWallet = async (req, res) => {

    try {
        let sellerWallets = await SellerWallet.findAll({})
        res.status(200).json({
            status: 'ok',
            data: sellerWallets
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getsellerWalletById = async (req, res) => {


    try {
        let id = req.params.id

        let sellerWallet = await SellerWallet.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: sellerWallet
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatesellerWallet = async (req, res) => {

    try {
        let id = req.params.id


        let getsellerWallet = await SellerWallet.findOne({
            where: { id: id }
        })



        const sellerWallet = await SellerWallet.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: sellerWallet
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletesellerWallet = async (req, res) => {

    try {
        let id = req.params.id

        const sellerWallet = await SellerWallet.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: sellerWallet
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addsellerWallet,
    getsellerWallet,
    getsellerWalletById,
    updatesellerWallet,
    deletesellerWallet,
}

