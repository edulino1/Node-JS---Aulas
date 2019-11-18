const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'aulanode'

});

conexao.connect(error => {
    if(error){
        return console.log(error);
    }
    console.log('Conectado ao banco de dados');
});

module.exports = conexao;