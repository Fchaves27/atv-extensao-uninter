// ... importações
const AuthController = require('./controllers/AuthController'); // Importe o controller

// ... código do app ...

db.sync({ force: false }).then(async () => { // Adicione async aqui
    console.log('📦 Banco de dados conectado.');
    
    // Cria o usuário padrão se não existir
    await AuthController.seedAdmin();

    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Erro ao conectar no banco:', err);
});