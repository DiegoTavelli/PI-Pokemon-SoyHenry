const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  return sequelize.define('type', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
  }, {
    timestamps: false,
  })
}