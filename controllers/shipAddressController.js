const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const ShipAddress = db.shipAddress;

// main work




// 1.create product
const addshipAddress = async (req, res) => {

    try {

        // if (req.files === undefined) {
        //     res.status(200).json({
        //         status: 'fail',
        //         message: 'Must add image',
        //     })

        // }
        // else {

            let info = {
                userId: req.body.userId,
                name: req.body.name,
                phone: req.body.phone,
                city: req.body.city,
                zipCode: req.body.zipCode,
                country: req.body.country,
                address: req.body.address,
                resident: req.body.resident,
            }


           
            if(!info.userId){
                res.status(200).json({
                    status: 'fail',
                    message:'First Login',
                })

            }
            else{

                const shipAddress = await ShipAddress.create(info)
                res.status(200).json({
                    status: 'ok',
                    data: shipAddress,
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
const getshipAddress = async (req, res) => {

    try {
        let shipAddresss = await ShipAddress.findAll({})
        res.status(200).json({
            status: 'ok',
            data: shipAddresss
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getshipAddressById = async (req, res) => {


    try {
        let id = req.params.id

        let shipAddress = await ShipAddress.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: shipAddress
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updateshipAddress = async (req, res) => {

    try {
        let id = req.params.id


        let getshipAddress = await ShipAddress.findOne({
            where: { id: id }
        })


        console.log(req.body)



        const shipAddress = await ShipAddress.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: shipAddress
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deleteshipAddress = async (req, res) => {

    try {
        let id = req.params.id

        const shipAddress = await ShipAddress.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: shipAddress
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addshipAddress,
    getshipAddress,
    getshipAddressById,
    updateshipAddress,
    deleteshipAddress,
}

