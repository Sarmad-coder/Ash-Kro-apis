const db = require('../models');
const { hashSync, genSaltSync } = require('bcrypt')
const dbConfig = require('../config/dbConfig.js');
const { sendMail } = require('../otp/OTPVerification');
const { sign } = require('jsonwebtoken')


// create main model
const Product = db.product;
const User = db.users;
const Like = db.like;
const SaleProduct = db.saleProduct;
const Sale = db.sale;
const Brand = db.brand;
// const Comment = db.comment;

// main work




// 1.create product
const addUsers = async (req, res) => {

    try {

        if (req.body.password === undefined) {
            res.status(200).json({
                status: 'fail',
                message: 'Must add password',
            })

        }
        else {
            const salt = genSaltSync(10)
            const gotp = `${Math.floor(1000 + Math.random() * 9000)}`

            let info = {
                image: req.files ? dbConfig.mainUrl + req.files[0].filename : '',
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashSync(req.body.password, salt),
                phoneNumber: req.body.phoneNumber,
                status: true
            }


            const gphone = await User.findOne({
                where: {
                    phoneNumber: info.phoneNumber
                }
            })
            const gmil = await User.findOne({
                where: {
                    email: info.email
                }
            })
            if (gphone) {
                res.status(200).json({
                    status: 'fail',
                    message: 'Phone Number Already exists',
                })
            }
            else if (gmil) {
                res.status(200).json({
                    status: 'fail',
                    message: 'Email already exists',
                })
            } else {


                const myuser = await User.create(info)
                return res.status(200).json({
                    status: 'ok',
                    data: myuser,
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
const getUsers = async (req, res) => {

    try {
        let users = await User.findAll({
            include: [
                {
                    model: Like,
                    as: 'likeU',
                    include: [
                        {
                            model: Product,
                            as: 'userProduct',
                            include:[
                                {
                                    model: Brand,
                                    as: 'brand'
                                },
                            ]
                        },
                        


                    ],
                },
                {
                    model:Sale,
                    as:'sale'
                }


            ],
        })
        res.status(200).json({
            status: 'ok',
            data: users
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getUserById = async (req, res) => {


    try {
        let id = req.params.id

        let user = await User.findOne({
            include: [
                {
                    model: Like,
                    as: 'likeU',
                    include: [
                        {
                            model: Product,
                            as: 'userProduct',
                            include:[
                                {
                                    model: Brand,
                                    as: 'brand'
                                },
                            ]
                        },
                        


                    ],
                },
                {
                    model:Sale,
                    as:'sale'
                }


            ],
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: user
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}





// 3.get product by id
const trackUserOrder = async (req, res) => {


    try {
        let id = req.params.id

        let user = await User.findOne({
            include: [
                {
                    model:Sale,
                    as:'sale',
                    where: { id: req.body.orderId}
                }


            ],
            where: { id: id, phoneNumber:req.body.phoneNumber }
        })

        if(user){
            res.status(200).json({
                status: 'ok',
                data: user
            })
        }
        else{
            res.status(200).json({
                status: 'fail',
                message: 'No order found!'
            })
        }
        
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}









// 4.update product

const updateUser = async (req, res) => {

    try {
        let id = req.params.id

        console.log(req.files)


        let getUser = await User.findOne({
            where: { id: id }
        })

        const image = req.files[0] === undefined ? getUser.dataValues.image : dbConfig.mainUrl + req.files[0].filename


        const user = await User.update({ ...req.body, image }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: user
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deleteUser = async (req, res) => {

    try {
        let id = req.params.id

        const user = await User.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: user
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addUsers,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    trackUserOrder
}

