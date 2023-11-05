const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const Sale=sequelize.define('sale',{
        userId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        saleDate:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.getDataValue('saleDate')).format('DD-MM-YYYY');
            }
        },
        totalBill:{
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        profit:{
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        purchaseBill:{
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        state:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        note:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        method:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        shipAddressId:{
            type: DataTypes.INTEGER,
            allowNull: false,
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

    return Sale

}