const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const SubCategory=sequelize.define('subCategory',{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        priority:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId:{
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

    return SubCategory

}