const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const Product=sequelize.define('product',{
        addedAs:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        profileId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        staffId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        myLike: {
            type: DataTypes.TEXT, // or DataTypes.STRING
            defaultValue: '[]',
            get() {
              const value = this.getDataValue('myLike');
              return value ? JSON.parse(value) : [];
            },
            set(value) {
              this.setDataValue('myLike', JSON.stringify(value));
            }
          },
        name:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        productType:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        tags:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        metaTitle:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        metaImage:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        metaDescription:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        youtubeLink:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        productImage:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        thumbnail:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        color:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        attributes:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        discount:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        discountType:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        productCode:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        purchasePrice:{
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        shippingCost:{
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        shippingCostMulti:{
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        tax:{
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        quantity:{
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        minimumOrderQuantity:{
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        unit:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        unitPrice:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        sellPrice:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        adminCommission:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        brandId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        categoryId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        subCategoryId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        subSubCategoryId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        
        status:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        state:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        featured:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD');
            }
        },
    },
    )

    return Product

}