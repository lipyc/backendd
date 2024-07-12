const { hash } = require('bcrypt');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
//const saltRounds = 10;

module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('users', {
    id_user: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_tipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tipos_user',
        key: 'id_tipo'
      }
    },
    nome: {
      type: DataTypes.CHAR(256),
      allowNull: true
    },
    email: {
      type: DataTypes.CHAR(256),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    id_superior: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "___fk",
        fields: [
          { name: "id_tipo" },
        ]
      },
      {
        name: "pk_users",
        unique: true,
        fields: [
          { name: "id_user" },
        ]
      },
      {
        name: "users_pk",
        unique: true,
        fields: [
          { name: "id_user" },
        ]
      },
    ],
    /*user.beforeCreate((user, options) =>{
      return bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
      })
      .catch((error) => {
        throw new error;
      })
    }),*/
    hooks: {
      beforeCreate: async (user, options) => {
        return bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
      })
      .catch((error) => {
        throw new error;
      })
      }
    }
  });
  return user;
};
