const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const Brand = db.brand;
const Product = db.product;

// main work




// 1.create product
const addbrand = async (req, res) => {

    try {

        if(req.files===undefined){
            res.status(200).json({
                status: 'fail',
                message: 'Must add image',
            })    

        }
        else{

        let info = {
            name: req.body.name,
            image: dbConfig.mainUrl + req.files[0].filename,
        }


        const namebrand = await Brand.findOne({
            where: {
                name: info.name
            }
        })
        if (namebrand) {
            res.status(200).json({
                status: 'fail',
                message: 'brand already exists',
            })
        } else {

           const brand= await Brand.create(info)
           res.status(200).json({
            status: 'ok',
            data: brand,
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
const getbrand = async (req, res) => {

    try {
        let brands = await Brand.findAll({
            include: [
                {
                    model: Product,
                    as: 'product'
                },
               
            ],
        })
        res.status(200).json({
            status: 'ok',
            data: brands
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getbrandById = async (req, res) => {


    try {
        let id = req.params.id

        let brand = await Brand.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: brand
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatebrand = async (req, res) => {

    try {
        let id = req.params.id


        let getbrand = await Brand.findOne({
            where: { id: id }
        })

        const image = req.files[0] === undefined ? getbrand.dataValues.image : dbConfig.mainUrl + req.files[0].filename
        

        const brand = await Brand.update({ ...req.body,image }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: brand
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletebrand = async (req, res) => {

    try {
        let id = req.params.id

        const brand = await Brand.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: brand
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addbrand,
    getbrand,
    getbrandById,
    updatebrand,
    deletebrand,
}

