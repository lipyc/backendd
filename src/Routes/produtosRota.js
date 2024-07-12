
const express = require('express');
const router = express.Router();
const produto = require('../Controllers/produtosControlador');

router.post('/create', produto.create); //rota criaçao de produto

router.get('/list', produto.findAll);

router.get('/get/:id', produto.get);

router.post('/update/:id', produto.update);

router.delete('/delete', produto.delete);



module.exports = router;
