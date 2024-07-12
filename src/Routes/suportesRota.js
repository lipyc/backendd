const express = require('express');
const router = express.Router();
const Suportes = require('../Controllers/suportesControlador');


router.post('/create', Suportes.create);
router.get('/list', Suportes.findAll);
router.get('/get/:id', Suportes.get);
router.put('/update/:id', Suportes.update);
router.delete('/delete', Suportes.delete);

module.exports = router;