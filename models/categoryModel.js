const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const Category=sequelize.define('category',{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        priority:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        adminComission:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        image:{
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

    return Category

}