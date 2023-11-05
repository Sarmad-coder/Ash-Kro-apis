const db = require('../models');

// create main model
const Customer = db.customer;
const User = db.users;
const Sale = db.sale;


// main work




// 1.create product
const addsale = async (req, res) => {

    try {

        let info = {
            userId: req.body.userId,
            saleDate: req.body.saleDate,
            totalBill: req.body.totalBill,
            profit: req.body.profit,
            purchaseBill: req.body.purchaseBill,
            shipAddressId: req.body.shipAddressId,
            state: 'pending',
            method: req.body.method,
            note: req.body.note,

        }

        const checkCustomer = await User.findOne({
            where: { id: info.userId }
        })


        console.log(info)
        console.log(req.body.shipAddressId.length,'shippaddress')

        if (!checkCustomer) {
            return res.status(200).json({
                status: 'fail',
                message: 'First Login',
            })
        }

        
        else if(!info.method){
            return res.status(200).json({
                status: 'fail',
                message: 'Must select payment method',
            })
        }

        

        else if (info.shipAddressId === undefined || info.shipAddressId === null || info.shipAddressId.length === 0 || info.shipAddressId === '') {
            return res.status(200).json({
                status: 'fail',
                message: 'Must select shipping address',
            })
        }

        else {

            const sale = await Sale.create(info)
            return res.status(200).json({
                status: 'ok',
                data: sale,
            })

        }

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getsale = async (req, res) => {

    try {
        let sale = await Sale.findAll({
            include: [
                {
                    model: User,
                    as: 'users'
                },

            ],
        })
        res.status(200).json({
            status: 'ok',
            data: sale
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}




// 3.get product by id
const getsaleById = async (req, res) => {

    try {
        let id = req.params.id

        let sale = await Sale.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: sale
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatesale = async (req, res) => {

    try {
        let id = req.params.id

        console.log(id, '=========>id')

        const sale = await Sale.update({ ...req.body }, {
            where: { id: id }
        })
        console.log(id, '=========>id==========')
        return res.status(200).json({
            status: 'ok',
            data: sale
        })




    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletesale = async (req, res) => {

    try {
        let id = req.params.id

        const sale = await Sale.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: sale
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}




module.exports = {
    addsale,
    getsale,
    getsaleById,
    updatesale,
    deletesale,
}