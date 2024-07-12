const express = require('express');
const router = express.Router();
const Proposta = require('../Controllers/propostasControlador');


router.post('/create', Proposta.create);
router.get('/list', Proposta.findAll);
router.get('/get/:id', Proposta.get);
router.put('/update/:id', Proposta.update);
router.delete('/delete', Proposta.delete);

module.exports = router;