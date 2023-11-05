const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const Unit=sequelize.define('unit',{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        symbol:{
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

    return Unit

}