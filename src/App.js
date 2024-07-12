const express = require('express');
const app = express();
const db = require("./Models");
const cors = require('cors');

// Importar rotas
const usersRota = require('./Routes/usersRota');
const produtosRota = require('./Routes/produtosRota');
const addonsRota = require('./Routes/addonsRota');
const authRota = require('./Routes/authRota');
const pacotesRota = require('./Routes/pacotesRota');
const vendasRota = require('./Routes/vendasRota');
const propostasRota = require('./Routes/propostasRota');
const suportesRotas = require('./Routes/suportesRota');


// Configurações
app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(express.json());

// Configurar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Verificar conexão à base de dados
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Usar rotas
app.use('/api/user', usersRota);
app.use('/api/produto', produtosRota);
app.use('/api/addon', addonsRota);
app.use('/api/auth', authRota); 
app.use('/api/pacote', pacotesRota);
app.use('/api/venda', vendasRota);
app.use('/api/proposta', propostasRota);
app.use('/api/suporte', suportesRotas);


app.listen(app.get('port'), () => {
  console.log("Start server on port " + app.get('port'));
});