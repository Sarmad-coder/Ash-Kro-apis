const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const FeatureDeal=sequelize.define('featureDeal',{
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        status:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        publish:{
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

    return FeatureDeal

}