const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('propostas', {
    id_proposta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id_user'
      }
    },
    descricao: {
      type: DataTypes.CHAR(256),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'propostas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "parcerias_pk",
        unique: true,
        fields: [
          { name: "id_proposta" },
        ]
      },
      {
        name: "pk_propostas",
        unique: true,
        fields: [
          { name: "id_proposta" },
        ]
      },
      {
        name: "resposta_proposta_fk",
        fields: [
          { name: "id_user" },
        ]
      },
    ]
  });
};
