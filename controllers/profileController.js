const db = require('../models');
const { hashSync, genSaltSync } = require('bcrypt')
const dbConfig = require('../config/dbConfig.js');
const { sendMail } = require('../otp/OTPVerification');
const { sign } = require('jsonwebtoken')


// create main model
const Profile = db.profile;
const Product = db.product;

// main work




// 1.create product
const addprofile = async (req, res) => {

    try {

        console.log(req.files)

        if(req.files===undefined){
            res.status(200).json({
                status: 'fail',
                message: 'Must add image',
            })    

        }
        else if(req.body.password===undefined){
            res.status(200).json({
                status: 'fail',
                message: 'Must add password',
            })    

        }
        else{
        const salt = genSaltSync(10)
        const gotp = `${Math.floor(1000 + Math.random() * 9000)}`

        let info = {
            image: dbConfig.mainUrl + req.files[0].filename,
            banner: dbConfig.mainUrl + req.files[1].filename,
            logo: dbConfig.mainUrl + req.files[2].filename,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            address: req.body.address,
            shopName: req.body.shopName,
            wallet: 0,
            status:false
        }


            const profile=await Profile.create(info)
            res.status(200).json({
                status: 'ok',
                data: profile,
            }) 

           

    }

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getprofile = async (req, res) => {
    try {
        let info = {
            email: req.body.email,
            password: req.body.password,
        }


        const userData = await Profile.findOne({
            where:{
                email: info.email,
                status:true,
            }
        })
        const result = await Profile.findOne({
            where:{
                password: info.password,
                status:true,
            }
        })

        if(userData) {
            if(result){
                result.password=undefined
                
                const jsontoken = sign({ result:userData }, dbConfig.KEY_NAME);
                res.cookie('verifytoken', jsontoken)


                res.status(200).json({
                    status: 'ok',
                    state: "Successfully logged in",
                    data: userData,
                    token:jsontoken
                })
            }else{
                res.status(200).json({
                    status: 'fail',
                    message: 'Wrong Password',
                })
            }
            
        } else{
            res.status(200).json({
                status: 'fail',
                message: 'Email not found',
            })

        }



    }
    catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getprofileAll = async (req, res) => {


    try {

        let profile = await Profile.findAll({
            include: [
                {
                    model: Product,
                    as: 'product'
                },
                {
                    model: db.saleProduct,
                    as: 'saleProduct'
                },
               
            ],
        })
        res.status(200).json({
            status: 'ok',
            data: profile
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}

// 3.get product by id
const getprofileById = async (req, res) => {


    try {
        let id = req.params.id

        let profile = await Profile.findOne({
            include: [
                {
                    model: Product,
                    as: 'product'
                },
            ],
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: profile
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updateprofile = async (req, res) => {

    try {
        let id = req.params.id


        let getprofile = await Profile.findOne({
            where: { id: id }
        })

        const image = req.files[0] === undefined ? getprofile.dataValues.image : dbConfig.mainUrl + req.files[0].filename
        const banner = req.files[1] === undefined ? getprofile.dataValues.banner : dbConfig.mainUrl + req.files[1].filename
        const logo = req.files[2] === undefined ? getprofile.dataValues.logo : dbConfig.mainUrl + req.files[1].filename


        const profile = await Profile.update({ ...req.body,image,banner,logo }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: profile
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deleteprofile = async (req, res) => {

    try {
        let id = req.params.id

        const profile = await Profile.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: profile
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addprofile,
    getprofile,
    getprofileById,
    updateprofile,
    deleteprofile,
    getprofileAll
}

