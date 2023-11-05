const express = require('express')
const cors=require('cors')
const cookieParser = require('cookie-parser')

const app=express()




// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



// routers
const userRouter = require('./routes/usersRoutes.js')
const loginRouter = require('./routes/loginRoutes.js')
// const otpRouter = require('./routes/otpRoutes.js')
// const unitRouter = require('./routes/unitRoutes.js')
// const currencyRouter = require('./routes/currencyRoutes.js')
const brandRouter = require('./routes/brandRoutes.js')
const categoryRouter = require('./routes/categoryRoutes.js')
const subCategoryRouter = require('./routes/subCategoryRoutes.js')
const subSubCategoryRouter = require('./routes/subSubCategoryRoutes.js')
const customerRouter = require('./routes/customerRoutes.js')
const productRouter = require('./routes/productRoutes.js')
// const supplierRouter = require('./routes/supplierRoutes.js')
// const expenseCategoryRouter = require('./routes/expenseCategoryRoutes.js')
const shipAddressRouter = require('./routes/shipAddressRoutes.js')
const staffRouter = require('./routes/staffRoutes.js')
// const websiteSettingRouter = require('./routes/websiteSettingRoutes.js')
// const warehouseRouter = require('./routes/warehouseRoutes.js')
const userWalletRouter = require('./routes/userWalletRoutes.js')
const saleProductRouter = require('./routes/saleProductRoutes.js')
const saleRouter = require('./routes/saleRoutes.js')
const profileRouter = require('./routes/profileRoutes.js')
const refundOrderRouter = require('./routes/refundOrderRoutes.js')
const adminUsersChatRouter = require('./routes/adminUsersChatRoutes.js')
const likeRouter = require('./routes/likeRoutes.js')
const ratingRouter = require('./routes/ratingRoutes.js')
const bannerRouter = require('./routes/bannerRoutes.js')
const flashDealRouter = require('./routes/flashDealRoutes.js')
const dealDayRouter = require('./routes/dealDayRoutes.js')
const featureDealRouter = require('./routes/featureDealRoutes.js')
const withdrawRouter = require('./routes/withdrawRoutes.js')
const flashDealProductRouter = require('./routes/flashDealProductRoutes.js')
const featureDealProductRouter = require('./routes/featureDealProductRoutes.js')
const adminWalletRouter = require('./routes/adminWalletRoutes.js')
const sellerWalletRouter = require('./routes/sellerWalletRoutes.js')





app.use('/ecommerce/users',userRouter)
app.use('/ecommerce/login',loginRouter)
// app.use('/ecommerce/otp',otpRouter)
app.use('/ecommerce/userWallet',userWalletRouter)
// app.use('/ecommerce/currency',currencyRouter)
app.use('/ecommerce/brand',brandRouter)
app.use('/ecommerce/category',categoryRouter)
app.use('/ecommerce/subCategory',subCategoryRouter)
app.use('/ecommerce/subSubCategory',subSubCategoryRouter)
app.use('/ecommerce/customer',customerRouter)
app.use('/ecommerce/product',productRouter)
app.use('/ecommerce/refundOrder',refundOrderRouter)
// app.use('/ecommerce/expenseCategory',expenseCategoryRouter)
app.use('/ecommerce/shipAdrress',shipAddressRouter)
app.use('/ecommerce/staff',staffRouter)
// app.use('/ecommerce/websiteSetting',websiteSettingRouter)
// app.use('/ecommerce/warehouse',warehouseRouter)
// app.use('/ecommerce/invoice',invoiceRouter)
app.use('/ecommerce/saleProduct',saleProductRouter)
app.use('/ecommerce/sale',saleRouter)
app.use('/ecommerce/seller',profileRouter)
app.use('/ecommerce/adminWallet',adminWalletRouter)
app.use('/ecommerce/sellerWallet',sellerWalletRouter)
// app.use('/ecommerce/saleQuotation',saleQuotationRouter)
app.use('/ecommerce/adminUsersChat',adminUsersChatRouter)
app.use('/ecommerce/like',likeRouter)
app.use('/ecommerce/rating',ratingRouter)
app.use('/ecommerce/banner',bannerRouter)
app.use('/ecommerce/flashDeal',flashDealRouter)
app.use('/ecommerce/dealDay',dealDayRouter)
app.use('/ecommerce/featureDeal',featureDealRouter)
app.use('/ecommerce/withdraw',withdrawRouter)
app.use('/ecommerce/flashDealProduct',flashDealProductRouter)
app.use('/ecommerce/featureDealProduct',featureDealProductRouter)



app.use(express.static(__dirname + '/Images'))




// testing
app.get('/',(req,res)=>{
    res.json({ message:'Success'})
})


const PORT=process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})