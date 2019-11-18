const usuarioDao = require('../repositorio/usuario_dao');
const conexao = require('../util/conexao');
const Usuario = require('../model/usuario')
const bcrypt = require('bcryptjs');

class UsuarioController {

    login = (req, res, next) => {
        
        const {usuario, senha} = req.body;

        new usuarioDao(conexao)
        .getByUsuario(usuario)
        .then(
            usr => {

                if(usr.length===0){
                    return res.status(403).send({
                        auth: false, "acess-token": null, reason: "Usuário não encontrado!!!"
                    })
                }

                const passwordIsValid = bcrypt.compareSync(senha, usr[0].senha);

                if(!passwordIsValid){
                    return res.status(401).send({
                        auth: false, "acess-token": null, reason: "Senha inválida!!!"
                    })
                }else{

                    return res.status(200).send({
                        auth: true, "acess-token": null, reason: "Logado!!!"
                    })
                }
                
            }
        )
        .catch(next);

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

        const {usuario, senha} = req.body;

        const usr = new Usuario(usuario, bcrypt.hashSync(senha, 8));

        new usuarioDao(conexao)
        .cadastrar(usr)
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