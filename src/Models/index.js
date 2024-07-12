const dbConfig = require("../Config/db.config")
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.addons = require("./addons.js")(sequelize,Sequelize);
db.produtos = require("./produtos.js")(sequelize, Sequelize);
db.pacotes = require("./pacotes.js")(sequelize,Sequelize);
db.propostas = require("./propostas.js")(sequelize,Sequelize);
db.suportes = require("./suportes.js")(sequelize,Sequelize);
db.tipos_prod = require("./tipos_prod.js")(sequelize,Sequelize);
db.tipos_sup = require("./tipos_sup.js")(sequelize,Sequelize);
db.tipos_user = require("./tipos_user.js")(sequelize,Sequelize);
db.users = require("./users.js")(sequelize,Sequelize);
db.vendas = require("./vendas.js")(sequelize,Sequelize);


module.exports = db;