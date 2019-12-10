const jwt = require('jsonwebtoken');


verificaToken = (req, res, next) => {

    let token = req.headers['access-token'];

    if(!token){
        return res.status(403).send({
            auth: false, mensagem: 'Sem token fornecido'
        });
    }

    jwt.verify(token, 'eu-inventei-isso', (err, decoded)=>{

        if(err){
            return res.status(403).send({
                auth: false,
                mensagem: `Autenticação com erro. Erro --> ${err}`
            })
        }

        req.usuario = decoded.user;
        next();


    });
}

const authJwt = {}
authJwt.verificaToken = verificaToken;

module.exports = authJwt;