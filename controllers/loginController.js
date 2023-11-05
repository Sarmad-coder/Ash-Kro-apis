const db = require('../models');
const { compareSync } = require('bcrypt')
const { sign }=require('jsonwebtoken')
const dbConfig = require('../config/dbConfig.js')

const User = db.users;

const getUser = async (req, res) => {
    try {
        let info = {
            // phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            password: req.body.password,
        }


        // const userData = await User.findOne({
        //     where:{
        //         phoneNumber: info.phoneNumber,
        //     }
        // })
        
        
        const userMail = await User.findOne({
            where:{
                email: info.email,
            }
        })

        if(userMail) {
            const result=compareSync(info.password, userMail.password)
            if(result){
                result.password=undefined
                
                const jsontoken = sign({ result:userMail }, dbConfig.KEY_NAME);
                res.cookie('verifytoken', jsontoken)


                res.status(200).json({
                    status: 'ok',
                    state: "Successfully logged in",
                    data: userMail,
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



module.exports = {
    getUser
}