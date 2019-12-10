const usuarioDao = require('../repositorio/usuario_dao');
const UsuarioService = require('../service/UsuarioService');
const conexao = require('../util/conexao');
const Usuario = require('../model/usuario')
const Autorizacao = require('../model/Autorizacao');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UsuarioController {

    login = async (req, res, next) => {
        
        const {usuario, senha} = req.body;

        const user = await new UsuarioService().logar(usuario, senha);

        try{

            if(user.length===0){
                return res.status(403).send({
                    auth: false, "access-token": null, reason: "Usuário não encontrado!!!"
                })
            }

            const token = jwt.sign({ user: user.usuario}, 'eu-inventei-isso', {
                expiresIn: 86400 //expira em 24 horas
            });

            res
                .status(200)
                .header({'access-token': token})
                .json({
                    autenticado: true,
                    'access-token': token
                });

        }catch(err){
            res.status(500).send(`Erro encontrado ===> ${err}`)
        }        
    }




    todos = (req, res, next) => {

        new usuarioDao(conexao)
        .todos()
        .then(
            function(result) {
                if(result.length === 0) 
                    res.json({ "mensagem": "Não existem usuário"});
                else
                    res.json(result);
            }
        ).catch(next);
    };

    cadastro = (req, res, next) => {

        const {usuario, senha, perfil } = req.body;

        const usr = new Usuario(usuario, bcrypt.hashSync(senha, 8));

        const autorizacao = new Autorizacao(usuario, perfil);

        //new usuarioDao(conexao)
        new UsuarioService()
        //.cadastrar(usr)
        .cadastrarUsuarioPerfil(usr, autorizacao)
        .then(
            resultado => {
                if(resultado.length === 0) 
                    return res.json({ "mensagem": "Usuário não cadastrado"});

                res.json(resultado)

            }
        )
        .catch(next)
    };

    update = (req, res, next) => {
        const usuario = req.params.usuario;
        console.log(usuario);
        const {senha} = req.body;
        const usr = new Usuario(usuario, bcrypt.hashSync(senha, 8));
        new usuarioDao(conexao)
        .update(usr)
        .then(
            resultado => {
                if(resultado.length === 0)
                    return res.json({"mensagem": "Usuário não encontrado"});

                res.json(resultado)
            }
        )
        .catch(next)
        console.log(usuario);
    }

    edit = (req, res, next) => {
        const usuario = req.params.usuario;
        const usr = {senha} = req.body;
        new usuarioDao(conexao)
        .edit(usuario)
        .then(
            resultado => {
                if(resultado.length === 0)
                    return res.json({"mensagem": "Usuário não encontrado"});

                res.json(resultado)
            }
        )
        .catch(next)
    }

    delete = (req, res, next) => {
        const usuario = req.params.usuario;
        new usuarioDao(conexao)
        .delete(usuario)
        .then(
            resultado => {
                if(resultado.length === 0)
                    return res.json({"mensagem": "Usuário não encontrado"});

                res.json(resultado)
            }
        )
        .catch(next)
    }
}

module.exports = UsuarioController;