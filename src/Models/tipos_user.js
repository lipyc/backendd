const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipos_user', {
    id_tipo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.CHAR(256),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tipos_user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipos_user",
        unique: true,
        fields: [
          { name: "id_tipo" },
        ]
      },
      {
        name: "tipos_user_pk",
        unique: true,
        fields: [
          { name: "id_tipo" },
        ]
      },
    ]
  });
};
