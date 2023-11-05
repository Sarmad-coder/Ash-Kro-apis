const db = require('../models');
const dbConfig = require('../config/dbConfig.js');


// create main model
const UserWallet = db.userWallet;

// main work




// 1.create product
const adduserWallet = async (req, res) => {

    try {

        // if (req.files === undefined) {
        //     res.status(200).json({
        //         status: 'fail',
        //         message: 'Must add image',
        //     })

        // }
        // else {



            let info = {
                type: req.body.type,
                credit: req.body.credit,
                debit: req.body.debit,
                userId: req.body.userId,
                image: req.files?dbConfig.mainUrl + req.files[0].filename:'',
                type:'bank',
                status:false,
                amount:0

            }
           

                const userWallet = await UserWallet.create(info)
                res.status(200).json({
                    status: 'ok',
                    data: userWallet,
                })

        // }

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getuserWallet = async (req, res) => {

    try {
        let userWallets = await UserWallet.findAll({})
        res.status(200).json({
            status: 'ok',
            data: userWallets
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 2.get all products
const getSuserWallet = async (req, res) => {

    try {
        let userWallets = await UserWallet.findAll({
            where:{userId:req.params.id}
        })
        res.status(200).json({
            status: 'ok',
            data: userWallets
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getuserWalletById = async (req, res) => {


    try {
        let id = req.params.id

        let userWallet = await UserWallet.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: userWallet
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updateuserWallet = async (req, res) => {

    try {
        let id = req.params.id


        let getuserWallet = await UserWallet.findOne({
            where: { id: id }
        })



        
        const allUserWallet=await UserWallet.findAll({
            where:{
                userId: getuserWallet.userId
            }
        })

        console.log(allUserWallet)
            
        // let result=allUserWallet.reduce((accumulator, currentValue) => { return accumulator + parseInt(currentValue.amount) } , 0);

        let amount=allUserWallet.length===0?0:parseInt(allUserWallet[allUserWallet.length-1].amount)

        console.log(amount,'sasasassaaasasasasas')

        allUserWallet.map(i=>{
            console.log('check main')
            if(i?.credit==='-'){
                console.log('check cred -')
                amount=parseInt(amount)-parseInt(req.body.debit)
            }
            else if(i?.debit==='-'){
                console.log('check deb -')
                amount=parseInt(amount)+parseInt(req.body.credit)
                console.log(amount)
            }
        })

        console.log(amount)



        const userWallet = await UserWallet.update({ ...req.body,amount }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: userWallet
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deleteuserWallet = async (req, res) => {

    try {
        let id = req.params.id

        const userWallet = await UserWallet.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: userWallet
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    adduserWallet,
    getuserWallet,
    getuserWalletById,
    updateuserWallet,
    deleteuserWallet,
    getSuserWallet
}

