const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const RefundOrder = db.refundOrder;

// main work




// 1.create product
const addrefundOrder = async (req, res) => {

    try {

        // if (req.files === undefined) {
        //     res.status(200).json({
        //         status: 'fail',
        //         message: 'Must add image',
        //     })

        // }
        // else {

            let info = {
                saleProductId: req.body.saleProductId,
                state: 'pending',
            }


            let chrefundOrder = await RefundOrder.findOne({
                where: { id: req.body.id }
            })


            if(chrefundOrder){

                const refundOrder = await RefundOrder.update(info)
                res.status(200).json({
                    status: 'ok',
                    data: refundOrder,
                })

            }
            else{
                const refundOrder = await RefundOrder.create(info)
                res.status(200).json({
                    status: 'ok',
                    data: refundOrder,
                })

            }
           

                

        // }

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getrefundOrder = async (req, res) => {

    try {
        let refundOrders = await RefundOrder.findAll({
            include: [
                
                {
                    model: db.saleProduct,
                    as: 'saleProduct',
                    include: [
                        {
                            model: db.users,
                            as: 'usersSP'
                        },
                        {
                            model: db.sale,
                            as: 'sale'
                        },
                        {
                            model: db.product,
                            as: 'product',
                            include: [
                                {
                                    model: db.profile,
                                    as: 'profile'
                                },
                            ],
                        },
                    ],
                },


            ],

        })
        res.status(200).json({
            status: 'ok',
            data: refundOrders
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getrefundOrderById = async (req, res) => {


    try {
        let id = req.params.id

        let refundOrder = await RefundOrder.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: refundOrder
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updaterefundOrder = async (req, res) => {

    try {
        let id = req.params.id


        let getrefundOrder = await RefundOrder.findOne({
            where: { id: id }
        })

        let getSeller = await db.profile.findOne({
            where: { id: getrefundOrder.profileId }
        })


        if(getSeller?.wallet<=0){
            res.status(200).json({
                status: 'fail',
                message: "Insufficient Amount in wallet to refundOrder."
            })
        }
        else{

        if(getrefundOrder){


            let getSeller = await db.profile.findOne({
                where: { id: getrefundOrder.profileId }
            })
            const wallet = parseInt(getSeller?.wallet)-parseInt(getrefundOrder.amount)

            let updateSeller = await db.profile.update({...req.body,wallet},{
                where: { id: getrefundOrder.profileId }
            })

            const refundOrder = await RefundOrder.update({ ...req.body }, {
                where: { id: id }
            }
            )
            res.status(200).json({
                status: 'ok',
                data: refundOrder
            })

        }
        else{

            res.status(200).json({
                status: 'fail',
                message: 'refundOrder not found.'
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

const deleterefundOrder = async (req, res) => {

    try {
        let id = req.params.id

        const refundOrder = await RefundOrder.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: refundOrder
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addrefundOrder,
    getrefundOrder,
    getrefundOrderById,
    updaterefundOrder,
    deleterefundOrder,
}

