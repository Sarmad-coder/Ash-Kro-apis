const db = require('../models');

// create main model
const SaleProduct = db.saleProduct;
const Profile = db.profile;
const Staff = db.staff;
const User = db.users;
const Product = db.product;
const Sale = db.sale;
const AdminWallet = db.adminWallet;
const SellerWallet = db.sellerWallet;
const UserWallet = db.userWallet;


// main work




// 1.create product
const addsaleProduct = async (req, res) => {

    try {

        let info = {
            userId: req.body.userId,
            productId: req.body.productId,
            saleId: req.body.saleId,
            quantity: req.body.quantity,
            bill: req.body.bill,
            profit: req.body.profit,
            purchase: req.body.purchase,
            color:req.body.color,
            size:req.body.size,
            state: 'pending',

        }

        const checkCustomer = await User.findOne({
            where: { id: info.userId }
        })
        const checkProduct = await Product.findOne({
            where: { id: info.productId }
        })
        const checkSale = await Sale.findOne({
            where: { id: info.saleId }
        })

        if (!checkCustomer) {
            return res.status(200).json({
                status: 'fail',
                message: 'Must add customer',
            })
        }
        else if (!checkProduct) {
            return res.status(200).json({
                status: 'fail',
                message: 'Must add product',
            })
        }
        else if (parseInt(checkProduct.quantity) < 2) {
            const sale = await Sale.destroy({
                where: { id: info.saleId }
            })
            return res.status(200).json({
                status: 'fail',
                message: 'First add stock of' + ' ' + checkProduct?.name,
            })
        }
        else if (!checkSale) {
            return res.status(200).json({
                status: 'fail',
                message: 'Must add sale bill',
            })
        }
        else {



            const quantity = parseInt(checkProduct.quantity) - parseInt(info.quantity)



            const product = await Product.update({ quantity }, {
                where: { id: checkProduct.id }
            }
            )


            let getproduct = await Product.findOne({
                where: { id: checkProduct.id }
            })


            let singleSale = await Sale.findOne({
                where: { id: info.saleId }
            })


            if (singleSale?.method === 'bank') {



                let lastUserwallet = await UserWallet.findAll({
                    where: {
                        status: true,
                        userId: req.body.userId,
                    }
                })


                console.log(lastUserwallet)
                
                
                if(lastUserwallet.length>0){
                    const lastwallet = lastUserwallet[lastUserwallet.length - 1]

                if (parseInt(lastwallet.amount) > 0) {

                    const newWallet=parseInt(lastwallet.amount)-parseInt(info.bill)

                    const userWallet = {
                        userId: info.userId,
                        credit: '-',
                        debit: info.bill,
                        status: true,
                        type: 'bank',
                        amount:newWallet
                    }

                    let userAmount = await UserWallet.create(userWallet)






                    if (getproduct.staffId !== null && getproduct.profileId === null) {


                        // const adminCom={
                        //     amount: getproduct.adminCommission,
                        //     staffId: 1,
                        //     type:'commision'
                        // }


                        // let adminComAmount = await AdminWallet.create(adminCom)


                        const adminTax = {
                            amount: getproduct.tax,
                            staffId: 1,
                            type: 'tax'
                        }


                        let adminTaxAmount = await AdminWallet.create(adminTax)

                        const adminShipp = {
                            amount: getproduct.shippingCostMulti,
                            staffId: 1,
                            type: 'ship'
                        }


                        let adminShippAmount = await AdminWallet.create(adminShipp)


                        let getAdminWallet = await Staff.findOne({
                            where: { id: 1 }
                        })


                        const adminWallet = parseInt(getAdminWallet?.wallet) + parseInt(info.bill)

                        let updateAdminWallet = await Staff.update({ wallet: adminWallet }, {
                            where: { id: 1 }
                        })



                        const saleProduct = await SaleProduct.create(info)

                        return res.status(200).json({
                            status: 'ok',
                            data: saleProduct,
                        })



                    }
                    else if (getproduct.profileId !== undefined && getproduct.staffId === null) {



                        const adminCom = {
                            amount: getproduct.adminCommission,
                            staffId: 1,
                            type: 'commision'
                        }


                        let adminComAmount = await AdminWallet.create(adminCom)


                        // const adminTax={
                        //     amount: getproduct.tax,
                        //     staffId: 1,
                        //     type:'tax'
                        // }


                        // let adminTaxAmount = await AdminWallet.create(adminTax)

                        // const adminShipp={
                        //     amount: getproduct.shippingCostMulti,
                        //     staffId: 1,
                        //     type:'ship'
                        // }


                        // let adminShippAmount = await AdminWallet.create(adminShipp)




                        // const sellCom={
                        //     amount: getproduct.adminCommission,
                        //     profileId: getproduct?.profileId,
                        //     type:'commision'
                        // }


                        // let sellComAmount = await SellerWallet.create(sellCom)


                        const sellTax = {
                            amount: getproduct.tax,
                            profileId: getproduct?.profileId,
                            type: 'tax'
                        }


                        let sellTaxAmount = await SellerWallet.create(sellTax)

                        const sellShipp = {
                            amount: getproduct.shippingCost,
                            profileId: getproduct?.profileId,
                            type: 'ship'
                        }


                        let admShippAmount = await SellerWallet.create(sellShipp)


                        // let getAdminWallet = await Staff.findOne({
                        //     where: { id: 1 }
                        // })


                        // const adminWallet=parseInt(getAdminWallet?.wallet)+parseInt(info.bill)

                        // let updateAdminWallet = await Staff.update({wallet:adminWallet},{
                        //     where: { id: 1 }
                        // })



                        let getSellerWallet = await Profile.findOne({
                            where: { id: getproduct?.profileId, }
                        })




                        const sellerWallet = parseInt(getSellerWallet?.wallet) + parseInt(info.bill)

                        let updateSellerWallet = await Profile.update({ wallet: sellerWallet }, {
                            where: { id: 1 }
                        })






                        const saleProduct = await SaleProduct.create(info)

                        return res.status(200).json({
                            status: 'ok',
                            data: saleProduct,
                        })



                    }

                }

                else {
                    const sale = await Sale.destroy({
                        where: { id: info.saleId }
                    })
                    return res.status(200).json({
                        status: 'fail',
                        message: 'Insufficient amount in your wallet.'
                    })
                }
            }
            else{

                const sale = await Sale.destroy({
                    where: { id: info.saleId }
                })

                return res.status(200).json({
                    status: 'fail',
                    message: 'No amount in your wallet.'
                })

            }

            }
            else{

                

                // const userWallet = {
                //     userId: info.userId,
                //     credit: '-',
                //     debit: info.bill,
                //     status: true,
                //     type: 'cod'
                // }

                // let userAmount = await UserWallet.create(userWallet)






                if (getproduct.staffId !== null && getproduct.profileId === null) {


                    // const adminCom={
                    //     amount: getproduct.adminCommission,
                    //     staffId: 1,
                    //     type:'commision'
                    // }


                    // let adminComAmount = await AdminWallet.create(adminCom)


                    const adminTax = {
                        amount: getproduct.tax,
                        staffId: 1,
                        type: 'tax'
                    }


                    let adminTaxAmount = await AdminWallet.create(adminTax)

                    const adminShipp = {
                        amount: getproduct.shippingCostMulti,
                        staffId: 1,
                        type: 'ship'
                    }


                    let adminShippAmount = await AdminWallet.create(adminShipp)


                    let getAdminWallet = await Staff.findOne({
                        where: { id: 1 }
                    })


                    const adminWallet = parseInt(getAdminWallet?.wallet) + parseInt(info.bill)

                    let updateAdminWallet = await Staff.update({ wallet: adminWallet }, {
                        where: { id: 1 }
                    })



                    const saleProduct = await SaleProduct.create(info)

                    return res.status(200).json({
                        status: 'ok',
                        data: saleProduct,
                    })



                }
                else if (getproduct.profileId !== undefined && getproduct.staffId === null) {



                    const adminCom = {
                        amount: getproduct.adminCommission,
                        staffId: 1,
                        type: 'commision'
                    }


                    let adminComAmount = await AdminWallet.create(adminCom)


                    // const adminTax={
                    //     amount: getproduct.tax,
                    //     staffId: 1,
                    //     type:'tax'
                    // }


                    // let adminTaxAmount = await AdminWallet.create(adminTax)

                    // const adminShipp={
                    //     amount: getproduct.shippingCostMulti,
                    //     staffId: 1,
                    //     type:'ship'
                    // }


                    // let adminShippAmount = await AdminWallet.create(adminShipp)




                    // const sellCom={
                    //     amount: getproduct.adminCommission,
                    //     profileId: getproduct?.profileId,
                    //     type:'commision'
                    // }


                    // let sellComAmount = await SellerWallet.create(sellCom)


                    const sellTax = {
                        amount: getproduct.tax,
                        profileId: getproduct?.profileId,
                        type: 'tax'
                    }


                    let sellTaxAmount = await SellerWallet.create(sellTax)

                    const sellShipp = {
                        amount: getproduct.shippingCost,
                        profileId: getproduct?.profileId,
                        type: 'ship'
                    }


                    let admShippAmount = await SellerWallet.create(sellShipp)


                    // let getAdminWallet = await Staff.findOne({
                    //     where: { id: 1 }
                    // })


                    // const adminWallet=parseInt(getAdminWallet?.wallet)+parseInt(info.bill)

                    // let updateAdminWallet = await Staff.update({wallet:adminWallet},{
                    //     where: { id: 1 }
                    // })



                    let getSellerWallet = await Profile.findOne({
                        where: { id: getproduct?.profileId, }
                    })




                    const sellerWallet = parseInt(getSellerWallet?.wallet) + parseInt(info.bill)

                    let updateSellerWallet = await Profile.update({ wallet: sellerWallet }, {
                        where: { id: 1 }
                    })






                    const saleProduct = await SaleProduct.create(info)

                    return res.status(200).json({
                        status: 'ok',
                        data: saleProduct,
                    })



                }


            }
        }

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getsaleProduct = async (req, res) => {

    try {
        let saleProduct = await SaleProduct.findAll({
            include: [
                {
                    model: User,
                    as: 'usersSP'
                },
                {
                    model: Sale,
                    as: 'sale'
                },
                {
                    model: Product,
                    as: 'product',
                    include: [
                        {
                            model: Profile,
                            as: 'profile'
                        },
                    ],
                },
            ],
        })
        res.status(200).json({
            status: 'ok',
            data: saleProduct
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



const getSingleUsersaleProduct = async (req, res) => {

    try {
        let id = req.params.id

        let saleProduct = await SaleProduct.findAll({
            include: [
                {
                    model: User,
                    as: 'usersSP'
                },
                {
                    model: Sale,
                    as: 'sale'
                },
                {
                    model: Product,
                    as: 'product',
                    include: [
                        {
                            model: Profile,
                            as: 'profile'
                        },
                    ],
                },
            ],
            where: { userId: id }
        })
        res.status(200).json({
            status: 'ok',
            data: saleProduct
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}




// 3.get product by id


const getsaleProductById = async (req, res) => {

    try {
        let id = req.params.id

        let saleProduct = await SaleProduct.findOne({
            include: [
                {
                    model: User,
                    as: 'usersSP'
                },
                {
                    model: Sale,
                    as: 'sale'
                },
                {
                    model: Product,
                    as: 'product',
                    include: [
                        {
                            model: Profile,
                            as: 'profile'
                        },
                    ],
                },
            ],
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: saleProduct
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updatesaleProduct = async (req, res) => {

    try {
        let id = req.params.id

        const checkCustomer = await Customer.findOne({
            where: { id: req.body.customerId }
        })
        const checkProduct = await Product.findOne({
            where: { id: req.body.productId }
        })
        const checkSale = await Sale.findOne({
            where: { id: req.body.saleId }
        })

        if (!checkCustomer) {
            return res.status(200).json({
                status: 'fail',
                message: 'Must add customer',
            })
        }
        else if (!checkProduct) {
            return res.status(200).json({
                status: 'fail',
                message: 'Must add product',
            })
        }
        else if (!checkSale) {
            return res.status(200).json({
                status: 'fail',
                message: 'Must add sale bill',
            })
        }

        else {

            console.log(id, '=========>id')

            const saleProduct = await SaleProduct.update({ ...req.body }, {
                where: { id: id }
            })
            console.log(id, '=========>id==========')
            return res.status(200).json({
                status: 'ok',
                data: saleProduct
            })

        }


    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletesaleProduct = async (req, res) => {

    try {
        let id = req.params.id

        const saleProduct = await SaleProduct.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: saleProduct
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}




module.exports = {
    addsaleProduct,
    getsaleProduct,
    getsaleProductById,
    updatesaleProduct,
    deletesaleProduct,
    getSingleUsersaleProduct
}