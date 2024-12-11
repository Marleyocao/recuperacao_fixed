import { Router } from "express";
import { pegarProduto, criarProduto, editarProduto, deletarProduto, pegarProdutoId, } from "../controllers/produtosController.js";

const router = Router();

router.get('/', pegarProduto);
router.post('/', criarProduto);
router.put('/:id', editarProduto);
router.delete('/:id', deletarProduto);
router.get('/:id', pegarProdutoId);

export default router;