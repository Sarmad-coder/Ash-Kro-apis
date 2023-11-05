const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const Invoice=sequelize.define('invoice',{
        image:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        companyName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        companyAddress:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        companyEmail:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        companyContact:{
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
    })

    return Invoice

}