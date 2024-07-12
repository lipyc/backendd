const express = require('express');
const router = express.Router();
const Pacotes= require('../Controllers/pacotesContralador');

router.post('/create', Pacotes.create);
router.get('/list', Pacotes.findAll);
router.get('/get/:id', Pacotes.get);
router.put('/update/:id', Pacotes.update);
router.delete('/delete', Pacotes.delete);

module.exports = router;