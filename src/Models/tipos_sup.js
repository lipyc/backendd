const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tipos_sup', {
    id_tipo4: {
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
    tableName: 'tipos_sup',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pk_tipos_sup",
        unique: true,
        fields: [
          { name: "id_tipo4" },
        ]
      },
      {
        name: "tipos_sup_pk",
        unique: true,
        fields: [
          { name: "id_tipo4" },
        ]
      },
    ]
  });
};
