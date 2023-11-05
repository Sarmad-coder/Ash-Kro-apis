const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const Withdraw = db.withdraw;

// main work




// 1.create product
const addwithdraw = async (req, res) => {

    try {

        // if (req.files === undefined) {
        //     res.status(200).json({
        //         status: 'fail',
        //         message: 'Must add image',
        //     })

        // }
        // else {

            let info = {
                profileId: req.body.profileId,
                bankName: req.body.bankName,
                bankName: req.body.bankName,
                accountName: req.body.accountName,
                accountNumber: req.body.accountNumber,
                amount: req.body.amount,
                status: false,
            }


           

                const withdraw = await Withdraw.create(info)
                res.status(200).json({
                    status: 'ok',
                    data: withdraw,
                })

        // }

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getwithdraw = async (req, res) => {

    try {
        let withdraws = await Withdraw.findAll({})
        res.status(200).json({
            status: 'ok',
            data: withdraws
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getwithdrawById = async (req, res) => {


    try {
        let id = req.params.id

        let withdraw = await Withdraw.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: withdraw
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatewithdraw = async (req, res) => {

    try {
        let id = req.params.id


        let getwithdraw = await Withdraw.findOne({
            where: { id: id }
        })

        let getSeller = await db.profile.findOne({
            where: { id: getwithdraw.profileId }
        })


        if(getSeller?.wallet<=0){
            res.status(200).json({
                status: 'fail',
                message: "Insufficient Amount in wallet to withdraw."
            })
        }
        else{

        if(getwithdraw){


            let getSeller = await db.profile.findOne({
                where: { id: getwithdraw.profileId }
            })
            const wallet = parseInt(getSeller?.wallet)-parseInt(getwithdraw.amount)

            let updateSeller = await db.profile.update({...req.body,wallet},{
                where: { id: getwithdraw.profileId }
            })

            const withdraw = await Withdraw.update({ ...req.body }, {
                where: { id: id }
            }
            )
            res.status(200).json({
                status: 'ok',
                data: withdraw
            })

        }
        else{

            res.status(200).json({
                status: 'fail',
                message: 'Withdraw not found.'
            })

        }
    }


        
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletewithdraw = async (req, res) => {

    try {
        let id = req.params.id

        const withdraw = await Withdraw.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: withdraw
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addwithdraw,
    getwithdraw,
    getwithdrawById,
    updatewithdraw,
    deletewithdraw,
}

