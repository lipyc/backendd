const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('addons', {
    id_addon: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_prod: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'produtos',
        key: 'id_prod'
      }
    },
    nome: {
      type: DataTypes.CHAR(256),
      allowNull: true
    },
    descricao: {
      type: DataTypes.CHAR(256),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'addons',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "addons_pk",
        unique: true,
        fields: [
          { name: "id_addon" },
        ]
      },
      {
        name: "pk_addons",
        unique: true,
        fields: [
          { name: "id_addon" },
        ]
      },
      {
        name: "prod_addon_fk",
        fields: [
          { name: "id_prod" },
        ]
      },
    ]
  });
};
