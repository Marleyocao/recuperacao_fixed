import conn from "../config/dbconfig.js";
import { v4 as uuidv4 } from "uuid";

//PEGAR CLIENTES
export const pegarClientes = (req, res) => {
    const checkSql = /*sql*/ `
    SELECT * FROM clientes
    `;

    conn.query(checkSql, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao buscar os dados!"});
            return console.error(err);
        }

        const clientes = data;
        res.status(200).json(clientes);
        res.end();
    })
};

//CRIAR CLIENTES 
export const criarCliente = (req, res) => {
    const {nome, telefone, endereco, email} = req.body;
    if(!nome){
        return res.status(400).json({message: "O nome não pode ser vazio"});
    }
    if(!telefone){
        return res.status(400).json({message: "O telefone não pode ser vazio"});
    }
    if(!endereco){
        return res.status(400).json({message: "A endereco não pode ser vazio"});
    }
    if(!email){
        return res.status(400).json({message: "O email não pode ser vazio"});
    }
    
    const checkSql = /*sql*/ `
    SELECT * FROM clientes
    WHERE ?? = ?
    `;
    const validateEmail = ["email", email]

    conn.query(checkSql, validateEmail, (err, data) => {
        if(err){
            res.status(500).json({message: "Erro ao cadastrar o funcionario!"});
            return console.error(err);
        }

        if(data.length > 0){
            return res.status(404).json({message: "2 clientes não podem ter o mesmo email!"});
        }
        const id = uuidv4();
        const addCliente = /*sql*/ `
        INSERT INTO clientes(??, ??, ??, ??, ??)
        VALUES(?, ?, ?, ?, ?)
        `;
        const insertClient = ["cliente_id", "nome", "telefone", "endereco", "email", id, nome,telefone, endereco, email];

        conn.query(addCliente, insertClient, (err) => {
            if(err){
                res.status(500).json({message: "Erro ao cadastrar o cliente!"});
                return console.error(err);
            }
            res.status(201).json({message:`Cliente ${nome} foi cadastrado com sucesso!`});
        })
    });
}
