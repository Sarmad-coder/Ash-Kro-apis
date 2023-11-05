const moment = require("moment/moment");

module.exports = (sequelize, DataTypes) => {
    const FeatureDealProduct = sequelize.define('featureDealProduct', {
        featureDealId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        productId: {
            type: DataTypes.INTEGER, // or DataTypes.STRING
            defaultValue: true,
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

    return FeatureDealProduct

}