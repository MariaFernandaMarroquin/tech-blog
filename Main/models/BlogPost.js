const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class BlogPost extends Model {}

BlogPost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
            references: {
                model: "user",
                key: "name" 
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "blogpost",
      }
);

module.exports = BlogPost;