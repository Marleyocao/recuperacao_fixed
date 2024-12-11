import 'dotenv/config';
import './config/dbconfig.js';
import express, { json } from 'express';

const PORT = process.env.PORT;

import "./models/produtosModel.js";
import './models/clientesModel.js'

import produtosRoutes from './routes/produtosRoutes.js';
import clientesRoutes from './routes/clientesRoutes.js'

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use("/produtos", produtosRoutes);
app.use("/clientes", clientesRoutes);

// app.use((request, response) => {
//     response.status(404).json({
//         message: "Rota não encontrada."
//     });
// })

app.listen(PORT, () => {
    console.log(`Server on port: ${PORT}`)
})