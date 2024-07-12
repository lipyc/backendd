const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pacotes', {
    id_pacotes: {
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
    tableName: 'pacotes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pacotes_pk",
        unique: true,
        fields: [
          { name: "id_pacotes" },
        ]
      },
      {
        name: "pk_pacotes",
        unique: true,
        fields: [
          { name: "id_pacotes" },
        ]
      },
    ]
  });
};
