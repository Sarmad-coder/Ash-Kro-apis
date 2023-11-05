const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const Staff = db.staff;

// main work




// 1.create product
const addstaff = async (req, res) => {

    try {


        let info = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            wallet: 0,
        }


           const staff= await Staff.create(info)
           res.status(200).json({
            status: 'ok',
            data: staff,
        })


    
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}






const loginStaff = async (req, res) => {
    try {
        let info = {
            email: req.body.email,
            password: req.body.password,
        }


        const userData = await Staff.findOne({
            where:{
                email: info.email,
            }
        })
        const result = await Staff.findOne({
            where:{
                password: info.password,
            }
        })

        if(userData) {
            if(result){


                res.status(200).json({
                    status: 'ok',
                    state: "Successfully logged in",
                    data:result
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



// 2.get all products
const getstaff = async (req, res) => {

    try {
        let staffs = await Staff.findAll({})
        res.status(200).json({
            status: 'ok',
            data: staffs
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getstaffById = async (req, res) => {


    try {
        let id = req.params.id

        let staff = await Staff.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: staff
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatestaff = async (req, res) => {

    try {
        let id = req.params.id


        let getstaff = await Staff.findOne({
            where: { id: id }
        })

        

        const staff = await Staff.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: staff
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletestaff = async (req, res) => {

    try {
        let id = req.params.id

        const staff = await Staff.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: staff
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addstaff,
    getstaff,
    getstaffById,
    updatestaff,
    deletestaff,
    loginStaff,
}

