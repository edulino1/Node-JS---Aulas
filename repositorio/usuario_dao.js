class UsuarioDao {

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
            
            this.conexao.query('SELECT * FROM usuarios', (err, p) => {
                if(err) return reject(err);

                console.log(p);
                
                resolve(p);
            });
        });

        return p;
    }

    cadastrar(usuario) {

        const p = new Promise( (resolve, reject) => {
            this.conexao.query(
                'INSERT INTO usuarios (usuario, senha) VALUE(?,?)',
                [usuario.usuario, usuario.senha],
                    (err, p) => {
                        if(err) return reject(err);
        
                        console.log(p);
                        
                        resolve(p);
                    }//end err,p
                )//end query
        
        }); //end Promise
        
        return p;

    }

    update(usuario) {
        const p = new Promise( (resolve, reject) => {
            this.conexao.query(
                'UPDATE usuarios SET senha=? WHERE usuario=?',
                [usuario.senha, usuario.usuario],
                    (err, p) => {
                        if(err) return reject(err);
                        console.log(p);
                        resolve(p);
                    }
                )
        });

        return p;
    }

    edit(usuario) {
        const p = new Promise((resolve, reject) => {
            this.conexao.query(
                'SELECT * FROM usuarios where usuario=?',
                [usuario],
                (err, p) => {
                    if(err) return reject(err);
                    console.log(p);
                    resolve(p);
                }
            )
        });
        return p;
    }

    delete(usuario) {
        const p = new Promise ((resolve, reject) => {
            this.conexao.query(
                'DELETE FROM usuarios WHERE usuario=?',
                [usuario],
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

module.exports = UsuarioDao;