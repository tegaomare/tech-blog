const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");
class Comment extends Model {
  /* checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }*/
}
Comment.init(
  {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Comment",
  }
);
module.exports = Comment;
