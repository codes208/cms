const sequelize = require('../db');
const { DataTypes, Model } = require('sequelize');

class User extends Model {
    static async findUser(userName, password){
        try{
            const user = await User.findByPk(userName);
            if(user && user.password === password)
            {
                return user;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

User.init({
    userName: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  },
);

module.exports = User;
