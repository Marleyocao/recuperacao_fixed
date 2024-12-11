import conn from "../config/dbconfig.js";

const produtoTable = /*sql*/ `
    CREATE TABLE IF NOT EXISTS produtos (
	produto_id VARCHAR(60) PRIMARY KEY NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR (255) NOT NULL,
    preco VARCHAR(255) NOT NULL,
    estoque INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`;

conn.query(produtoTable, (err, result, field) => {
    if(err){
        return console.error(err.stack);
    }
    console.log("Tabela produtos criada com sucesso");
});