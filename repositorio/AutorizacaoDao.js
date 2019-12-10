class AutorizacaoDao {

    connection = null;

    constructor(connection) {
  
        this.connection = connection;
    }

    getAll() {
        const r = new Promise( (resolve, reject) => {
            this.connection.query('SELECT * FROM autorizacoes', (err, r) => {
                if(err) return reject(err);
                resolve(r);
            })
  
          }
        );
  
        return r;

    }
  
    getByUsuario(usuario) {
  
        var r = new Promise( (resolve, reject) => {
            this.connection
                .query('SELECT * FROM autorizacoes WHERE usuario=?', usuario, 
                (err, res) => {
                    if(err) return reject(err);
                    console.log(res)
                    
                    resolve(res);
                })
  
          }
        );
  
        
        return r;
    }


    cadastrar(autorizacao){

        console.log(autorizacao)

        var u = new Promise( (resolve, reject) => {
            this.connection.query('INSERT INTO autorizacoes (usuario, perfil) VALUES(?,?)', 
                [autorizacao.usuario, autorizacao.perfil],
                (err, usr) => {
                if(err) return reject(err);
                resolve(usr);
            })
  
          }
        );

        return u;
    }


    atualizar(autorizacao){

        var u = new Promise( (resolve, reject) => {
            this.connection.query('UPDATE autorizacoes SET usuario=?, autorizacao=? WHERE usuario=?', 
                [autorizacao.usuario, autorizacao.perfil, autorizacao.usuario],
                (err, usr) => {
                if(err) return reject(err);
  
                resolve(usr);
            })
  
          }
        );

        return u;

    }

    delete(usuario) {
  
        var u = new Promise( (resolve, reject) => {
            this.connection.query('DELETE FROM autorizacoes WHERE usuario=?', usuario, (err, usr) => {
                if(err) return reject(err);
                resolve(usr);
            })
  
          }
        );
  
        return u;
    }

  }

  module.exports = AutorizacaoDao;