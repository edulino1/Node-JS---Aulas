class AutorizacaoDao {

    constructor(conexao){
        this.conexao = conexao;
    }

    getByUsuario(usuario) {

        const p = new Promise( (resolve, reject) => {
            this.conexao.query(
                'SELECT * FROM usuarios WHERE usuario =?',
                usuario,
                    (err, p) => {
                        if(err) return reject(err);
                        
                        resolve(p);
                    }//end err,p
                )//end query
        
        }); //end Promise
        
        return p;
    }

    todos() {
        const p = new Promise( (resolve, reject) => {
            
            this.conexao.query('SELECT * FROM autorizacoes', (err, p) => {
                if(err) return reject(err);

                console.log(p);
                
                resolve(p);
            });
        });

        return p;
    }

    cadastrar(autorizacao) {

        const p = new Promise( (resolve, reject) => {
            this.conexao.query(
                'INSERT INTO autorizacoes (usuario, perfil) VALUE(?,?)',
                [autorizacao.usuario, autorizacao.senha],
                    (err, p) => {
                        if(err) return reject(err);
        
                        console.log(p);
                        
                        resolve(p);
                    }//end err,p
                )//end query
        
        }); //end Promise
        
        return p;

    }

    update(autorizacao) {
        const p = new Promise( (resolve, reject) => {
            this.conexao.query(
                'UPDATE autorizacoes SET senha=? WHERE usuario=?',
                [autorizacao.perfil, autorizacao.usuario],
                    (err, p) => {
                        if(err) return reject(err);
                        console.log(p);
                        resolve(p);
                    }
                )
        });

        return p;
    }

    edit(autorizacao) {
        const p = new Promise((resolve, reject) => {
            this.conexao.query(
                'SELECT * FROM autorizacoes where usuario=?',
                [autorizacao],
                (err, p) => {
                    if(err) return reject(err);
                    console.log(p);
                    resolve(p);
                }
            )
        });
        return p;
    }

    delete(autorizacao) {
        const p = new Promise ((resolve, reject) => {
            this.conexao.query(
                'DELETE FROM autorizacoes WHERE usuario=?',
                [autorizacao],
                    (err, p) => {
                        if(err) return reject(err);
                        console.log(p);
                        resolve(p);
                    }
            )
        });
        return p;
    }
}

module.exports = AutorizacaoDao;