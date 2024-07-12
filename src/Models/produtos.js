const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Produto = sequelize.define('produtos', {
    id_prod: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_tipo5: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipos_prod',
        key: 'id_tipo5'
      }
    },
    id_pacotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pacotes',
        key: 'id_pacotes'
      }
    },
    nome: {
      type: DataTypes.CHAR(256),
      allowNull: true
    },
    descricao: {
      type: DataTypes.CHAR(256),
      allowNull: true
    },
    imagem: {
      type: DataTypes.CHAR(256),
      allowNull: true
    },
    valorbase: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    versao: {
      type: DataTypes.CHAR(256),
      allowNull: true
    },
    tempo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    desconto: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'produtos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "_____fk",
        fields: [
          { name: "id_tipo5" },
        ]
      },
      {
        name: "pk_produtos",
        unique: true,
        fields: [
          { name: "id_prod" },
        ]
      },
      {
        name: "prod_pacote_fk",
        fields: [
          { name: "id_pacotes" },
        ]
      },
      {
        name: "produtos_pk",
        unique: true,
        fields: [
          { name: "id_prod" },
        ]
      },
    ]
  });
  Produto.associate = function(models) {
    Produto.belongsTo(models.tipos_prod, {
      foreignKey: 'id_tipo5',
      as: 'tipos_prod' // alias para a associação
    });
  };

  return Produto;
};
