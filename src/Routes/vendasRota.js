const express = require('express');
const router = express.Router();
const vendas= require('../Controllers/vendasControlador');


router.get('/list', vendas.findAll); // Rota para ver listas de usuários
router.post('/create', vendas.create); // Rota para criar usuários
router.get('/get/:id', vendas.get);
router.post('/update/:id', vendas.update);
router.post('/delete', vendas.delete);

module.exports = router;