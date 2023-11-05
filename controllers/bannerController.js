const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const Banner = db.banner;

// main work




// 1.create product
const addbanner = async (req, res) => {

    try {

        if(req.files===undefined){
            res.status(200).json({
                status: 'fail',
                message: 'Must add image',
            })    

        }
        else{

        let info = {
            type: req.body.type,
            bannerType: req.body.bannerType,
            image: dbConfig.mainUrl + req.files[0].filename,
        }



           const banner= await Banner.create(info)
           res.status(200).json({
            status: 'ok',
            data: banner,
        })

        

    }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getbanner = async (req, res) => {

    try {
        let banners = await Banner.findAll({})
        res.status(200).json({
            status: 'ok',
            data: banners
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getbannerById = async (req, res) => {


    try {
        let id = req.params.id

        let banner = await Banner.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: banner
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatebanner = async (req, res) => {

    try {
        let id = req.params.id


        let getbanner = await Banner.findOne({
            where: { id: id }
        })

        const image = req.files[0] === undefined ? getbanner.dataValues.image : dbConfig.mainUrl + req.files[0].filename
        

        const banner = await Banner.update({ ...req.body,image }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: banner
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletebanner = async (req, res) => {

    try {
        let id = req.params.id

        const banner = await Banner.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: banner
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addbanner,
    getbanner,
    getbannerById,
    updatebanner,
    deletebanner,
}

