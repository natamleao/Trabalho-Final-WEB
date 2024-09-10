const bcrypt = require('bcryptjs');   // Importa o bcrypt para hash de senhas
const jwt = require('jsonwebtoken');  // Importa o jwt para geração e verificação de tokens JWT
const pool = require('../config/db'); // Importa o pool de conexão com o banco de dados
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

// Função para cadastrar um novo usuário
const signup = async (req, res) => {
    // Obtém o email e senha do corpo da requisição
    const { email, password } = req.body;

    // Verifica se o email e a senha foram fornecidos
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        // Verifica se o usuário já existe no banco de dados
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        // Se o usuário já estiver cadastrado, responde com uma mensagem
        if (user) {
            return res.status(200).json('Usuário já cadastrado.');
        }

        // Hasheia a senha fornecida para armazenamento seguro
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insere o novo usuário no banco de dados e retorna os dados do novo usuário
        const newUser = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        );

        // Responde com o novo usuário criado
        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        // Em caso de erro, exibe a mensagem de erro e responde com status 500
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Função para login do usuário
const login = async (req, res) => {
    // Obtém o email, senha e opção de lembrar-me do corpo da requisição
    const { email, password, rememberMe } = req.body;

    // Verifica se o email e a senha foram fornecidos
    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
        // Busca o usuário no banco de dados com base no email fornecido
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        // Verifica se o usuário existe e se a senha fornecida corresponde à senha armazenada
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Email ou senha inválidos.' });
        }

        // Gera um token JWT com o ID do usuário, usando a chave secreta do arquivo .env
        // Define o tempo de expiração com base na opção 'rememberMe' (7 dias ou 1 hora)
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: rememberMe ? '7d' : '1h' });

        // Responde com o token JWT e a URL da imagem de perfil do usuário
        res.json({
            success: true,
            token,
            profileImageUrl: user.profile_image_url,
            message: 'Login realizado com sucesso!'
        });
    } catch (error) {
        // Em caso de erro, exibe a mensagem de erro e responde com status 500
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// Função para redefinir a senha do usuário
const resetPassword = async (req, res) => {
    // Obtém o email e a nova senha do corpo da requisição
    const { email, newPassword } = req.body;

    try {
        // Busca o usuário no banco de dados com base no email fornecido
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        // Se o usuário não for encontrado, responde com status 404
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Hasheia a nova senha antes de armazená-la
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Atualiza a senha no banco de dados
        await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);

        // Responde com sucesso se a senha for atualizada
        res.status(200).json({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
        // Em caso de erro, exibe a mensagem de erro e responde com status 500
        console.error('Erro ao redefinir a senha:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// Exporta os controladores (signup, login, resetPassword) para serem usados em outras partes do projeto
module.exports = {
    signup,
    login,
    resetPassword
};