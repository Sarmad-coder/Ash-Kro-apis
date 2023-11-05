const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const userWallet=sequelize.define('userWallet',{
        image:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        amount:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        type:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        credit:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        debit:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        status:{
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

    return userWallet

}