const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const db = require('./database/db'); // <--- ESSA É A LINHA QUE ESTAVA FALTANDO
const AuthController = require('./controllers/AuthController'); // Importante para criar o admin

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(routes);

// Sincroniza o Banco de Dados
// O 'force: false' mantém os dados. Se quiser apagar tudo e recriar, mude para 'true' uma vez.
db.sync({ force: false }).then(async () => {
    console.log('📦 Banco de dados conectado.');

    // Cria o usuário admin padrão se não existir
    await AuthController.seedAdmin();

    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Erro ao conectar no banco:', err);
});