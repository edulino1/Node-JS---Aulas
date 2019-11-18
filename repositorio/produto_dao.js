class ProdutoDao {

    constructor(conexao){
        this.conexao = conexao;
    }

    todos() {
        const p = new Promise( (resolve, reject) => {
            
            this.conexao.query('SELECT * FROM produtos', (err, p) => {
                if(err) return reject(err);

                console.log(p);
                
                resolve(p);
            });
        });

        return p;
    }
    
    pagi() {
        const p = new Promise( (resolve, reject) => {

            this.conexao.query('SELECT count(*) as numRows from produtos', (err, p) => {
                if(err) return reject(err);

                console.log(p);

                resolve(p);
            });
        });
        return p;
    }
    
    pagin(){
        const p1 = new Promise( (resolve, reject) => {
            var limit = 10;

            this.conexao.query('SELECT * FROM produtos ORDER BY ID ASC LIMIT ' + limit, (err, p1) => {
                if(err) return reject(err);

                console.log(p1);

                resolve(p1);

            });
        });
        
        return p1;

    }

    cadastrar(produto) {

        const p = new Promise( (resolve, reject) => {
            this.conexao.query(
                'INSERT INTO produtos (produto, descricao, preco, data_cadastro) VALUE(?,?,?,?)',
                [produto.produto, produto.descricao, produto.preco, produto.data_cadastro],
                    (err, p) => {
                        if(err) return reject(err);
        
                        console.log(p);
                        
                        resolve(p);
                    }//end err,p
                )//end query
        
        }); //end Promise
        
        return p;

    }

    update(produto) {
        const p = new Promise( (resolve, reject) => {
            this.conexao.query(
                'UPDATE produtos SET produto=?, descricao=?, preco=? WHERE id=?',
                [produto.produto, produto.descricao, produto.preco, produto.id],
                    (err, p) => {
                        if(err) return reject(err);
                        console.log(p);
                        resolve(p);
                    }
                )
        });
        return p;
    }

    edit(id) {
        const p = new Promise((resolve, reject) => {
            this.conexao.query(
                'SELECT * FROM produtos where id=?',
                [id],
                (err, p) => {
                    if(err) return reject(err);
                    console.log(p);
                    resolve(p);
                }
            )
        });
        return p;
    }

    delete(id) {
        const p = new Promise ((resolve, reject) => {
            this.conexao.query(
                'DELETE FROM produtos WHERE id=?',
                [id],
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

module.exports = ProdutoDao;