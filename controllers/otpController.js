const db = require('../models');

// create main model
const User = db.users;

// main work



// 1.create product
const VerifyOtp = async (req, res) => {

    try {

        let info = {
            email: req.body.email,
            otp: req.body.otp,
        }

        console.log(info);


        const user = await User.update({verify:true},{
            where: { 
                email: info.email,
                otp: info.otp
             }
        })

        if(user[0]===1)
        {
            res.status(200).json({
                status: 'ok',
                data: user,
            })
        }
        else{
            res.status(200).json({
                status: 'Enter correct otp number',
            })
        }


    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}







module.exports = {
    VerifyOtp
}

