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

    paginas = (req, res, next) => {

        var numPorPg = parseInt(req.query.numPorPg) || 10;
        var pagina = parseInt(req.query.pagina) || 1;

        new produtoDao(conexao)

        .pagi()
        .then(function(resultado) {
            // var limit = 10;
            var numRows = resultado[0].numRows;
            var numPgs = Math.ceil(numRows / numPorPg);
            var offset = numPorPg * (pagina -1);
            console.log('Quantidade de paginas: ', numPgs);

            new produtoDao(conexao)
            .todosPaginando(offset, numPorPg)
            .then( resultado => {

                var response = {
                    result: resultado
                };

                if (numPgs > 1) {
                    response.pagination = {
                        pagina: pagina,
                        limite: numPorPg,
                        total: numRows,
                        paginas: numPgs,
                        anterior: pagina > 1 ? pagina -1 : undefined,
                        proxima: pagina < numPgs ? pagina +1 : undefined
                    }
                }

                res.json(response);

            }).catch(next)

        }).catch(next)
        //     {
        //     var responsePayLoad = {
        //         resultado: resultado
        //     };
            
        //     else responsePayLoad.pagination = {
        //         err: 'Páginas consultadas ' + pagina + 'é >= que o máximo de páginas '+numPgs
        //     }
            
        // })
        // .catch(function(err) {
        //     console.error(err);
        //     res.json({ err: err });
        // });
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