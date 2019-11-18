const produtoDao = require('../repositorio/produto_dao');
const conexao = require('../util/conexao');
const Produto = require('../model/produto')

class ProdutoController {

    todos = (req, res, next) => {

        new produtoDao(conexao)
        .todos()
        .then(
            function(result) {
                if(result.length === 0) 
                    res.json({ "mensagem": "Não existem produtos"});
                else
                    res.json(result);
            }
        ).catch(next);
    }

    paginas = (req, res) => {

        new produtoDao(conexao)

        .pagi()
        .then(function(resultado) {
            var numRows;
            var numPorPg = parseInt(req.query.npp, 10) || 1;
            var pagina = parseInt(req.query.page, 10) || 0;
            var numPgs;
            var limit = 10;
            numRows = resultado[0].numRows;
            numPgs = Math.ceil(numRows / numPorPg);
            console.log('Quantidade de itens: ', numPgs);
        })
        .then(() => pagin())
        .then(function(resultado) {
            var responsePayLoad = {
                resultado: resultado
            };
            if (pagina < numPgs) {
                responsePayLoad.pagination = {
                    atual: pagina,
                    porPagina: numPorPg,
                    anterior: pagina > 0 ? pagina - 1 : undefined,
                    proxima: pagina < numPgs - 1 ? pagina + 1 : undefined
                }
            }
            else responsePayLoad.pagination = {
                err: 'Páginas consultadas ' + pagina + 'é >= que o máximo de páginas '+numPgs
            }
            res.json(responsePayLoad);
        })
        .catch(function(err) {
            console.error(err);
            res.json({ err: err });
        });
    }

    cadastro = (req, res, next) => {

        const {produto, descricao, preco} = req.body;

        const prod = new Produto(null, produto,descricao,preco, new Date());

        new produtoDao(conexao)
        .cadastrar(prod)
        .then(
            resultado => {
                if(resultado.length === 0) 
                    return res.json({ "mensagem": "Produto não cadastrado"});

                res.json(resultado)

            }
        )
        .catch(next)
    }

    update = (req, res, next) => {
        const id = req.params.id;
        const {produto, descricao, preco} = req.body;
        const prod = new Produto(id, produto, descricao, preco);
        new produtoDao(conexao)
        .update(prod)
        .then(
            resultado => {
                if(resultado.length === 0)
                    return res.json({"mensagem": "Produto não encontrado"});

                res.json(resultado)
            }
        )
        .catch(next)
    }

    edit = (req, res, next) => {
        const id = req.params.id;
        const {produto, descricao, preco} = req.body;
        const prod = new Produto(id, produto, descricao, preco);
        new produtoDao(conexao)
        .edit(id)
        .then(
            resultado => {
                if(resultado.length === 0)
                    return res.json({"mensagem": "Produto não encontrado"});

                res.json(resultado)
            }
        )
        .catch(next)
    }

    delete = (req, res, next) => {
        const id = req.params.id;
        // const prod = new Produto(id, produto, descricao, preco);
        new produtoDao(conexao)
        .delete(id)
        .then(
            resultado => {
                if(resultado.length === 0)
                    return res.json({"mensagem": "Produto não encontrado"});

                res.json(resultado)
            }
        )
        .catch(next)
    }
}

module.exports = ProdutoController;