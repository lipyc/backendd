const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const TipoProduto = sequelize.define('tipos_prod', {
    id_tipo5: {
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
    tableName: 'tipos_prod',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipos_prod",
        unique: true,
        fields: [
          { name: "id_tipo5" },
        ]
      },
      {
        name: "tipos_prod_pk",
        unique: true,
        fields: [
          { name: "id_tipo5" },
        ]
      },
    ]
  });
  return TipoProduto;
};