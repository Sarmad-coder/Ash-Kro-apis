const dbConfig = require('../config/dbConfig.js')
const { Sequelize, DataTypes } = require('sequelize')


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            idle: dbConfig.pool.idle,
            acquire: dbConfig.pool.acquire,
        }
    }
)


sequelize.authenticate().then(() => {
    console.log('Connected to database')
    console.log('Creating tables')
}).catch((err) => {
    console.log(err)
})


const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize


db.users = require('./usersModel.js')(sequelize, DataTypes)
// db.unit = require('./unitModel.js')(sequelize, DataTypes)
// db.currency = require('./currencyModel.js')(sequelize, DataTypes)
db.brand = require('./brandModel.js')(sequelize, DataTypes)
db.category = require('./categoryModel.js')(sequelize, DataTypes)
db.subCategory = require('./subCategoryModel.js')(sequelize, DataTypes)
db.subSubCategory = require('./subSubCategoryModel.js')(sequelize, DataTypes)
db.customer = require('./customerModel.js')(sequelize, DataTypes)
db.product = require('./productModel.js')(sequelize, DataTypes)
// db.supplier = require('./supplierModel.js')(sequelize, DataTypes)
// db.manualDropShipping = require('./manualDropShippingModel.js')(sequelize, DataTypes)
// db.expenseCategory = require('./expenseCategoryModel.js')(sequelize, DataTypes)
// db.expense = require('./expenseModel.js')(sequelize, DataTypes)
db.staff = require('./staffModel.js')(sequelize, DataTypes)
// db.websiteSetting = require('./websiteSettingModel.js')(sequelize, DataTypes)
// db.warehouse = require('./warehouseModel.js')(sequelize, DataTypes)
// db.invoice = require('./invoiceModel.js')(sequelize, DataTypes)
db.saleProduct = require('./saleProductModel.js')(sequelize, DataTypes)
db.sale = require('./saleModel.js')(sequelize, DataTypes)
db.like = require('./likeModel.js')(sequelize, DataTypes)
db.profile = require('./profileModel.js')(sequelize, DataTypes)
// db.saleQuotation = require('./saleQuotationModel.js')(sequelize, DataTypes)
db.adminUsersChat = require('./adminUsersChatModel.js')(sequelize, DataTypes)
db.rating = require('./ratingModel.js')(sequelize, DataTypes)
db.banner = require('./bannerModel.js')(sequelize, DataTypes)
db.flashDeal = require('./flashDealModel.js')(sequelize, DataTypes)
db.dealDay = require('./dealDayModel.js')(sequelize, DataTypes)
db.withdraw = require('./withdrawModel.js')(sequelize, DataTypes)
db.featureDeal = require('./featureDealModel.js')(sequelize, DataTypes)
db.adminWallet = require('./adminWallet.js')(sequelize, DataTypes)
db.sellerWallet = require('./sellerWallet.js')(sequelize, DataTypes)
db.flashDealProduct = require('./flashDealProductModel.js')(sequelize, DataTypes)
db.featureDealProduct = require('./featureDealProductModel.js')(sequelize, DataTypes)
db.refundOrder = require('./refundOrderModel.js')(sequelize, DataTypes)
db.userWallet = require('./userWalletModel.js')(sequelize, DataTypes)
db.shipAddress = require('./shipAddressModel.js')(sequelize, DataTypes)


db.sequelize.sync({ force: false }).then(() => {
    console.log('Yes Re-Sync Complete')
})


// post to many relationship

db.profile.hasMany(db.saleProduct, {
    foreignKey: 'profileId',
    as: 'saleProduct',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.saleProduct.belongsTo(db.profile, {
    foreignKey: 'profileId',
    as: 'profile',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



db.shipAddress.hasMany(db.sale, {
    foreignKey: 'shipAddressId',
    as: 'sale',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.sale.belongsTo(db.shipAddress, {
    foreignKey: 'shipAddressId',
    as: 'shipAddress',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


db.users.hasMany(db.userWallet, {
    foreignKey: 'userId',
    as: 'userWallet',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.userWallet.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})




// post to many relationship

db.saleProduct.hasMany(db.refundOrder, {
    foreignKey: 'saleProductId',
    as: 'refundOrder',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.refundOrder.belongsTo(db.saleProduct, {
    foreignKey: 'saleProductId',
    as: 'saleProduct',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



// post to many relationship

db.product.hasMany(db.featureDealProduct, {
    foreignKey: 'productId',
    as: 'featureDealProduct',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.featureDealProduct.belongsTo(db.product, {
    foreignKey: 'productId',
    as: 'product',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


// post to many relationship

db.featureDeal.hasMany(db.featureDealProduct, {
    foreignKey: 'featureDealId',
    as: 'featureDealProduct',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.featureDealProduct.belongsTo(db.featureDeal, {
    foreignKey: 'featureDealId',
    as: 'featureDeal',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


// post to many relationship

db.product.hasMany(db.flashDealProduct, {
    foreignKey: 'productId',
    as: 'flashDealProduct',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.flashDealProduct.belongsTo(db.product, {
    foreignKey: 'productId',
    as: 'product',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


// post to many relationship

db.flashDeal.hasMany(db.flashDealProduct, {
    foreignKey: 'flashDealId',
    as: 'flashDealProduct',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.flashDealProduct.belongsTo(db.flashDeal, {
    foreignKey: 'flashDealId',
    as: 'flashDeal',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



// post to many relationship

db.profile.hasMany(db.sellerWallet, {
    foreignKey: 'profileId',
    as: 'sellerWallet',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.sellerWallet.belongsTo(db.profile, {
    foreignKey: 'profileId',
    as: 'profile',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



// post to many relationship

db.staff.hasMany(db.adminWallet, {
    foreignKey: 'staffId',
    as: 'adminWallet',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.adminWallet.belongsTo(db.staff, {
    foreignKey: 'staffId',
    as: 'staff',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



// post to many relationship

db.profile.hasMany(db.withdraw, {
    foreignKey: 'profileId',
    as: 'withdraw',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.withdraw.belongsTo(db.profile, {
    foreignKey: 'profileId',
    as: 'profile',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


// post to many relationship

db.users.hasMany(db.rating, {
    foreignKey: 'userId',
    as: 'ratingUs',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.rating.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'usersR',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



// post to many relationship

db.product.hasMany(db.rating, {
    foreignKey: 'productId',
    as: 'ratingP',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.rating.belongsTo(db.product, {
    foreignKey: 'productId',
    as: 'productR',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


// post to many relationship

db.users.hasMany(db.like, {
    foreignKey: 'userId',
    as: 'likeU',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.like.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'userLike',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



// post to many relationship

db.product.hasMany(db.like, {
    foreignKey: 'productId',
    as: 'likeP',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.like.belongsTo(db.product, {
    foreignKey: 'productId',
    as: 'userProduct',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})




// post to many relationship

db.category.hasMany(db.subCategory, {
    foreignKey: 'categoryId',
    as: 'subCategory',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.subCategory.belongsTo(db.category, {
    foreignKey: 'categoryId',
    as: 'category',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})




db.subCategory.hasMany(db.subSubCategory, {
    foreignKey: 'subCategoryId',
    as: 'subSubCategory',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.subSubCategory.belongsTo(db.subCategory, {
    foreignKey: 'subCategoryId',
    as: 'subCategory',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})





db.product.hasMany(db.dealDay, {
    foreignKey: 'productId',
    as: 'dealDay',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.dealDay.belongsTo(db.product, {
    foreignKey: 'productId',
    as: 'product',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})






db.category.hasMany(db.product, {
    foreignKey: 'categoryId',
    as: 'product',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.product.belongsTo(db.category, {
    foreignKey: 'categoryId',
    as: 'category',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})




db.subCategory.hasMany(db.product, {
    foreignKey: 'subCategoryId',
    as: 'product',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.product.belongsTo(db.subCategory, {
    foreignKey: 'subCategoryId',
    as: 'subCategory',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})





db.subSubCategory.hasMany(db.product, {
    foreignKey: 'subSubCategoryId',
    as: 'product',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.product.belongsTo(db.subSubCategory, {
    foreignKey: 'subSubCategoryId',
    as: 'subSubCategory',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})




db.brand.hasMany(db.product, {
    foreignKey: 'brandId',
    as: 'product',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.product.belongsTo(db.brand, {
    foreignKey: 'brandId',
    as: 'brand',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



db.staff.hasMany(db.product, {
    foreignKey: 'staffId',
    as: 'product',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.product.belongsTo(db.staff, {
    foreignKey: 'staffId',
    as: 'staff',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})




db.profile.hasMany(db.product, {
    foreignKey: 'profileId',
    as: 'product',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.product.belongsTo(db.profile, {
    foreignKey: 'profileId',
    as: 'profile',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})





db.users.hasMany(db.sale, {
    foreignKey: 'userId',
    as: 'sale',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.sale.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'users',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})




db.users.hasMany(db.saleProduct, {
    foreignKey: 'userId',
    as: 'saleProduct',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.saleProduct.belongsTo(db.users, {
    foreignKey: 'userId',
    as: 'usersSP',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



db.product.hasMany(db.saleProduct, {
    foreignKey: 'productId',
    as: 'saleProduct',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.saleProduct.belongsTo(db.product, {
    foreignKey: 'productId',
    as: 'product',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})



db.sale.hasMany(db.saleProduct, {
    foreignKey: 'saleId',
    as: 'saleProduct',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

db.saleProduct.belongsTo(db.sale, {
    foreignKey: 'saleId',
    as: 'sale',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})




module.exports = db