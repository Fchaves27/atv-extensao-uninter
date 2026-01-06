const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const db = require('./database/db');
const Produto = require('./models/Produto');

const app = express();
const PORT = 3000;

// Configurações
app.use(cors()); // Permite acesso do Front-end
app.use(express.json()); // Permite ler JSON no corpo da requisição
app.use(routes);

// Sincroniza o Banco de Dados e inicia o servidor
// (force: false garante que ele não apague os dados ao reiniciar)
db.sync({ force: false }).then(() => {
    console.log('📦 Banco de dados conectado e sincronizado.');
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Erro ao conectar no banco:', err);
});