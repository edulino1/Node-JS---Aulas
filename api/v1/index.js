const express = require('express');
const router = express.Router();

const produto = require('./produto_router');
router.use('/produto', produto);

const usuario = require('./usuario_router');
router.use('/usuario', usuario);

module.exports = router;