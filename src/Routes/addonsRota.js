const express = require('express');
const router = express.Router();
const addon = require('../Controllers/addonsControlador');

router.post('/create', addon.create); // Rota para criar addon

router.get('/list', addon.findAll); // Rota para listar addons

router.get('/get/:id', addon.get); // Rota para obter um addon específico

router.put('/update/:id', addon.update); // Rota para atualizar addon

router.delete('/delete', addon.delete); // Rota para deletar addon



module.exports = router;