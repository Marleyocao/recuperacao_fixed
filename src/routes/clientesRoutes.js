import { Router } from "express";
import { pegarClientes, criarCliente } from "../controllers/clientesController.js";

const router = Router();

router.get('/', pegarClientes);
router.post('/', criarCliente);

export default router;