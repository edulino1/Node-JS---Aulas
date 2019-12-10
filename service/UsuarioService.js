const UsuarioDao = require("../repositorio/usuario_dao");
const AutorizacaoDao = require("../repositorio/AutorizacaoDao");
const conexao = require("../util/conexao");
const bcrypt = require("bcryptjs");


class UsuarioService {

    cadastrarUsuarioPerfil = async (usuario, autorizacao) => {

        const usuarioCadastrado = await new UsuarioDao(conexao).cadastrar(usuario);

        if(usuarioCadastrado.affectedRows > 0){
            const autorizacaoCriada = await new AutorizacaoDao(conexao).cadastrar(autorizacao);
            if(autorizacaoCriada.affectedRows>0)
                return true;
        }

        return false;

    }

    logar = async (usuario, senha) => {
        const usr = await new UsuarioDao(conexao).getByUsuario(usuario);

        let passwordIsValid = false;

        if(usr.length > 0){
            passwordIsValid = bcrypt.compareSync(senha, usr[0].senha);
        }

        if(passwordIsValid)
            return usr;

        return new Array();
    }

}

module.exports = UsuarioService