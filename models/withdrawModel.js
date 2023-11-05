const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const Withdraw=sequelize.define('withdraw',{
        profileId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bankName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        accountNumber:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount:{
            type: DataTypes.STRING,
            allowNull: false,
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

    return Withdraw

}