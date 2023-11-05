const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const AdminWallet=sequelize.define('adminWallet',{
        amount:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        staffId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type:{
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

    return AdminWallet

}