const express = require('express');
const router = express.Router();
const UsuarioController = require('./../../controller/usuario_controller');
const verificaJwt = require('../../middlewares/verificaJw')

const usuarioController = new UsuarioController;

router.get('/todos', verificaJwt.verificaToken, usuarioController.todos);
router.post('/cadastro', usuarioController.cadastro);
router.post('/login', usuarioController.login);
router.put('/alterar/:usuario', usuarioController.update)
router.delete('/apagar/:usuario', usuarioController.delete);

module.exports = router;