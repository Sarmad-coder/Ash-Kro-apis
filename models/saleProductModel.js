const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const SaleProduct=sequelize.define('saleProduct',{
        userId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        productId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        saleId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        profileId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        quantity:{
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        bill:{
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        profit:{
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        purchase:{
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        state:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        color:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        size:{
            type: DataTypes.STRING,
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
    })

    return SaleProduct

}


