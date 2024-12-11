import conn from "../config/dbconfig.js";
import { v4 as uuidv4 } from "uuid";



// pegar todos os produtos
export const pegarProduto = (req, res) => {
    const selectSQL = /*sql*/`SELECT * FROM produtos`
    conn.query(selectSQL, (err, data) => {
        if(err){
            return res.status(500).json({message: "erro ao buscar produtos"});
        }

        const produtos = data;
        res.status(200).json(produtos);
    })
};


// adicionar o produto
export const criarProduto = (req, res) => {
    const {nome, descricao, estoque, preco} = req.body;

    if(!nome){
        return res.status(400).json({message: "O nome não pode ser vazio"});
    }
    if(!descricao){
        return res.status(400).json({message: "O descricao não pode ser vazio"});
    }
    if(!estoque){
        return res.status(400).json({message: "O estoque não pode ser vazio"});
    }
    if(!preco){
        return res.status(400).json({message: "O preco não pode ser vazio"});
    }
    
    const checkSql = /*sql*/ `
    SELECT * FROM produtos
    WHERE ?? = ?
    AND ?? = ?
    AND ?? = ?`;
    
    const sqlDataValidate = ["nome", nome, "descricao", descricao, "preco", preco]
    
    conn.query(checkSql, sqlDataValidate, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os produtos"})
            return console.error(err);
        }
        if(data.length > 0){
            res.status(409).json({message: "produto já existe na base de dados"});
            return;
        }

        const id = uuidv4();
        const insertSQL = /*sql*/ `
        INSERT INTO produtos (??, ??, ??, ??, ??)
        VALUES(?, ?, ?, ?, ?)`;

        const dataInsert = ["produto_id", "nome", "descricao", "estoque", "preco", id, nome, descricao, estoque, preco];

        conn.query(insertSQL, dataInsert, (err) => {
            if(err){
                res.status(500).json({message: "erro ao cadastrar o produto"})
                return console.error(err);
            }
            res.status(201).json({message: `O produto ${nome} foi cadastrado!`});
        });
    })
}




//atualizar o produto
export const editarProduto = (req, res) => {
    const {id} = req.params;
    const {nome, descricao, estoque, preco } = req.body;

    if(!nome){
        return res.status(400).json({message: "O nome não pode ser vazio"});
    }
    if(!descricao){
        return res.status(400).json({message: "O descricao não pode ser vazio"});
    }
    if(!estoque){
        return res.status(400).json({message: "O estoque não pode ser vazio"});
    }
    if(!preco){
        return res.status(400).json({message: "O preco não pode ser vazio"});
    }

    const checkSql = /*sql*/ `
    SELECT * FROM produtos
    WHERE ?? = ?`;

    const checkId = ["produto_id", id];

    conn.query(checkSql, checkId, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os produtos"})
            return console.error(err);
        }
        if(data.length == 0){
            res.status(409).json({message: "Este produto não foi encontrado na base de dados!"});
            return;
        }
        const updateSQL = /*sql*/ `
        UPDATE produtos
        SET ?? = ?, ?? = ?, ?? = ?, ?? = ?
        WHERE ?? = ?
        `
        const editSqlVali = ["nome", nome, "descricao", descricao, "estoque", estoque, "preco", preco, "produto_id", id];

        conn.query(updateSQL, editSqlVali, (err) => {
            if(err){
                res.status(500).json({message: "erro ao editar o produto"})
                return console.error(err);
            }
            res.status(200).json({message: `produto ${nome} atualizado com sucesso!`});
            res.end()
        })
    });
}





///deletar produto
export const deletarProduto = (req, res) => {
    const {id} = req.params;
    
    const deleteSQL = /*sql*/ `
    DELETE FROM produtos
    WHERE ?? = ?
    `

    const checkId = ["produto_id", id]
    conn.query(deleteSQL, checkId, (err, info) => {
        if(err){
            res.status(500).json({message: "erro ao deletetar o produto"})
            return console.error(err);
        }
        if(info.affectedRows == 0){
            res.status(404).json({message: "produto não encontrado na base de dados"})
            return;
        }
        res.status(204);
        res.end()
    })
}




//pegar produto atravez do id
export const pegarProdutoId = (req, res) => {
    const {id} = req.params;
    
    const checkSql = /*sql*/ `
    SELECT * FROM produtos
    WHERE ?? = ?`;
    const checkId = ["produto_id", id]
    conn.query(checkSql, checkId, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os produtos"})
            return console.error(err);
        }
        const buscaProduto = data.some(produto => produto.produto_id == id);
        if(buscaProduto == false){
            res.status(409).json({message: "Este produto não foi encontrado na base de dados!"});
            return;
        }
        const produto = data;
        res.status(200).json(produto);
    });
}