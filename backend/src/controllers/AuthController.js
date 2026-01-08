const Usuario = require('../models/Usuario');

module.exports = {
    // Rota de Login
    async login(req, res) {
        try {
            const { email, senha } = req.body;

            // Busca usuário pelo email
            const usuario = await Usuario.findOne({ where: { email } });

            // Se não achar ou a senha estiver errada
            if (!usuario || usuario.senha !== senha) {
                return res.status(401).json({ error: 'Email ou senha incorretos' });
            }

            // Retorna os dados do usuário (menos a senha)
            return res.json({
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                cargo: usuario.cargo
            });

        } catch (error) {
            return res.status(500).json({ error: 'Erro no servidor' });
        }
    },

    // Função auxiliar para criar o primeiro usuário (Admin)
    async seedAdmin() {
        const existe = await Usuario.findOne({ where: { email: 'admin@admin.com' } });
        if (!existe) {
            await Usuario.create({
                nome: 'Administrador Padrão',
                email: 'admin@admin.com',
                senha: '123', // Em produção, usaríamos hash (bcrypt)
                cargo: 'gerente'
            });
            console.log("🔒 Usuário admin@admin.com criado com sucesso!");
        }
    }
};