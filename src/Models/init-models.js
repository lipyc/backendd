var DataTypes = require("sequelize").DataTypes;
var _addons = require("./addons");
var _pacotes = require("./pacotes");
var _produtos = require("./produtos");
var _propostas = require("./propostas");
var _suportes = require("./suportes");
var _tipos_prod = require("./tipos_prod");
var _tipos_sup = require("./tipos_sup");
var _tipos_user = require("./tipos_user");
var _users = require("./users");
var _vendas = require("./vendas");

function initModels(sequelize) {
  var addons = _addons(sequelize, DataTypes);
  var pacotes = _pacotes(sequelize, DataTypes);
  var produtos = _produtos(sequelize, DataTypes);
  var propostas = _propostas(sequelize, DataTypes);
  var suportes = _suportes(sequelize, DataTypes);
  var tipos_prod = _tipos_prod(sequelize, DataTypes);
  var tipos_sup = _tipos_sup(sequelize, DataTypes);
  var tipos_user = _tipos_user(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var vendas = _vendas(sequelize, DataTypes);

  produtos.belongsToMany(users, { as: 'id_user_users', through: vendas, foreignKey: "id_prod", otherKey: "id_user" });
  users.belongsToMany(produtos, { as: 'id_prod_produtos', through: vendas, foreignKey: "id_user", otherKey: "id_prod" });
  produtos.belongsTo(pacotes, { as: "id_pacotes_pacote", foreignKey: "id_pacotes"});
  pacotes.hasMany(produtos, { as: "produtos", foreignKey: "id_pacotes"});
  addons.belongsTo(produtos, { as: "id_prod_produto", foreignKey: "id_prod"});
  produtos.hasMany(addons, { as: "addons", foreignKey: "id_prod"});
  vendas.belongsTo(produtos, { as: "id_prod_produto", foreignKey: "id_prod"});
  produtos.hasMany(vendas, { as: "vendas", foreignKey: "id_prod"});
  produtos.belongsTo(tipos_prod, { as: "id_tipo5_tipos_prod", foreignKey: "id_tipo5"});
  tipos_prod.hasMany(produtos, { as: "produtos", foreignKey: "id_tipo5"});
  suportes.belongsTo(tipos_sup, { as: "id_tipo4_tipos_sup", foreignKey: "id_tipo4"});
  tipos_sup.hasMany(suportes, { as: "suportes", foreignKey: "id_tipo4"});
  users.belongsTo(tipos_user, { as: "id_tipo_tipos_user", foreignKey: "id_tipo"});
  tipos_user.hasMany(users, { as: "users", foreignKey: "id_tipo"});
  propostas.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(propostas, { as: "proposta", foreignKey: "id_user"});
  suportes.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(suportes, { as: "suportes", foreignKey: "id_user"});
  suportes.belongsTo(users, { as: "use_id_user_user", foreignKey: "use_id_user"});
  users.hasMany(suportes, { as: "use_id_user_suportes", foreignKey: "use_id_user"});
  vendas.belongsTo(users, { as: "id_user_user", foreignKey: "id_user"});
  users.hasMany(vendas, { as: "vendas", foreignKey: "id_user"});

  return {
    addons,
    pacotes,
    produtos,
    propostas,
    suportes,
    tipos_prod,
    tipos_sup,
    tipos_user,
    users,
    vendas,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
