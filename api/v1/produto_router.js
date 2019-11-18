const express = require('express');
const router = express.Router();
const ProdutoController = require('./../../controller/produto_controller');
const conexao = require('../../util/conexao');
var Promise = require('bluebird');

var connection = conexao;
var queryAsync = Promise.promisify(connection.query.bind(connection));
connection.connect();

const produtoController = new ProdutoController;

router.get('/todos', produtoController.todos);
router.post('/cadastro', produtoController.cadastro);
router.put('/alterar/:id', produtoController.update);
router.delete('/apagar/:id', produtoController.delete);
router.get('/edit/:id', produtoController.edit);
router.get('/paginas', produtoController.paginas);

module.exports = router;