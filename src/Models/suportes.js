const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('suportes', {
    id_sup: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id_user'
      }
    },
    id_tipo4: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipos_sup',
        key: 'id_tipo4'
      }
    },
    use_id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id_user'
      }
    },
    mensagem: {
      type: DataTypes.CHAR(256),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'suportes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "______fk",
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "____fk",
        fields: [
          { name: "id_tipo4" },
        ]
      },
      {
        name: "pk_suportes",
        unique: true,
        fields: [
          { name: "id_sup" },
        ]
      },
      {
        name: "respota_fk",
        fields: [
          { name: "use_id_user" },
        ]
      },
      {
        name: "suportes_pk",
        unique: true,
        fields: [
          { name: "id_sup" },
        ]
      },
    ]
  });
};
