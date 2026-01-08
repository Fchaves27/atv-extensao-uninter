const Usuario = require('../models/Usuario');

module.exports = {
    // 1. Rota de Login (Já existia)
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const usuario = await Usuario.findOne({ where: { email } });

            if (!usuario || usuario.senha !== senha) {
                return res.status(401).json({ error: 'Email ou senha incorretos' });
            }

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

    // 2. Criar Novo Usuário (NOVO)
    async criarUsuario(req, res) {
        try {
            const { nome, email, senha, cargo } = req.body;

            // Verifica se o email já existe
            const usuarioExiste = await Usuario.findOne({ where: { email } });
            if (usuarioExiste) {
                return res.status(400).json({ error: 'Este email já está cadastrado.' });
            }

            // Cria o usuário
            const novoUsuario = await Usuario.create({
                nome,
                email,
                senha,
                cargo // 'vendedor' ou 'gerente'
            });

            return res.json(novoUsuario);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao criar usuário.' });
        }
    },

    // 3. Criar Admin Padrão (Já existia)
    async seedAdmin() {
        const existe = await Usuario.findOne({ where: { email: 'admin@admin.com' } });
        if (!existe) {
            await Usuario.create({
                nome: 'Administrador Padrão',
                email: 'admin@admin.com',
                senha: '123',
                cargo: 'gerente'
            });
            console.log("🔒 Usuário admin@admin.com criado com sucesso!");
        }
    }
};