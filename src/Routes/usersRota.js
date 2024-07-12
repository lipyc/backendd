const express = require('express');
const router = express.Router();
const user = require('../Controllers/usersControlador');
//const middleware = require('../Middleware/middleware');

router.get('/list', /*middleware.checkToken,*/ user.findAll); // Rota para ver listas de utilizadores
router.post('/create', user.create); // Rota para criar utilizadores
router.get('/get/:id', user.get);
router.post('/update/:id_user', user.update);
router.delete('/delete/:id_user', user.delete);

module.exports = router;