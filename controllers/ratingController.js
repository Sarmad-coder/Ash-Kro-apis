const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const Rating = db.rating;
const User = db.users;
const Product = db.product;
// main work




// 1.create product
const addrating = async (req, res) => {

    try {

        let info = {
            rating: req.body.rating,
            reviews: req.body.reviews,
            userId: req.body.userId,
            productId: req.body.productId,
        }



           const rating= await Rating.create(info)
           res.status(200).json({
            status: 'ok',
            data: rating,
        })



    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getrating = async (req, res) => {

    try {
        let ratings = await Rating.findAll({
            include: [
                {
                    model: User,
                    as: 'usersR'
                },
                {
                    model: Product,
                    as: 'productR'
                },
            ],
        })
        res.status(200).json({
            status: 'ok',
            data: ratings
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



const getSingleUserrating = async (req, res) => {

    try {
        
        let id = req.params.id
        
        let ratings = await Rating.findAll({
            include: [
                {
                    model: User,
                    as: 'usersR'
                },
                {
                    model: Product,
                    as: 'productR'
                },
            ],
            where: { userId: id }
        })
        res.status(200).json({
            status: 'ok',
            data: ratings
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getratingById = async (req, res) => {


    try {
        let id = req.params.id

        let rating = await Rating.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: rating
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updaterating = async (req, res) => {

    try {
        let id = req.params.id


        let getrating = await Rating.findOne({
            where: { id: id }
        })

        const rating = await Rating.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: rating
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deleterating = async (req, res) => {

    try {
        let id = req.params.id

        const rating = await Rating.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: rating
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addrating,
    getrating,
    getratingById,
    updaterating,
    deleterating,
    getSingleUserrating,
}

