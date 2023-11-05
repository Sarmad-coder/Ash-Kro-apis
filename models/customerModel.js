const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const Customer=sequelize.define('customer',{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        city:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        address:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        cost:{
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        trackingNumber:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        orderId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        state:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        storeOrderNumber:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        reference:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        note:{
            type: DataTypes.STRING,
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

    return Customer

}