module.exports=(sequelize,DataTypes)=>{
    const OTP=sequelize.define('otpVerify',{
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        otp:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // expiredAt:{
        //     type: DataTypes.DATE,
        //     allowNull: true,
        // },
        
    },
    // {
    //     timestamps:false
    // }
    )

    return OTP

}