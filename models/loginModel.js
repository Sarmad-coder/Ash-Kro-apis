module.exports=(sequelize,DataTypes)=>{
    const Login=sequelize.define('login',{
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    },
    // {
    //     timestamps:false
    // }
    )

    return Login

}