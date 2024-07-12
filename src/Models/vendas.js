const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vendas', {
    id_prod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'produtos',
        key: 'id_prod'
      }
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id_user'
      }
    },
    valorfinal: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    quantidadepc: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vendas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_2_fk",
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "__fk",
        fields: [
          { name: "id_prod" },
        ]
      },
      {
        name: "pk_vendas",
        unique: true,
        fields: [
          { name: "id_prod" },
          { name: "id_user" },
        ]
      },
      {
        name: "vendas_pk",
        unique: true,
        fields: [
          { name: "id_prod" },
          { name: "id_user" },
        ]
      },
    ]
  });
};
