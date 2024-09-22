const express = require('express'); // Importa o módulo express para gerenciar rotas
const { signup, login, resetPassword, uploadProfileImage } = require('../controllers/userController'); // Importa os controladores para as funções de signup, login e reset de senha
const multer = require('multer'); // Importa o multer para lidar com uploads de arquivos
const path = require('path'); // Importa o módulo path para manipular caminhos de diretórios
const router = express.Router(); // Cria uma instância do roteador do express para definir rotas
const uploadDir = path.join(__dirname, '../../public/uploads'); // Define o caminho para o diretório onde os arquivos enviados serão armazenados
const pool = require('../config/db'); // Importa a configuração do banco de dados
const jwt = require('jsonwebtoken'); // Importa o jwt para geração e verificação de tokens JWT

// Configuração do multer para armazenar arquivos no diretório de uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define o diretório de destino dos arquivos enviados
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Define o nome do arquivo, usando um timestamp e preservando a extensão original
        const ext = path.extname(file.originalname);
        cb(null, `profile-image-${Date.now()}${ext}`);
    }
});

// Cria uma instância do multer com as configurações de armazenamento definidas
const upload = multer({ storage: storage }); 

// Define a rota POST para a criação de novos usuários (signup)
router.post('/signup', signup); 
// Define a rota POST para o login de usuários
router.post('/login', login); 
// Define a rota POST para o reset de senha
router.post('/reset-password', resetPassword); 
// Define a rota POST para upload de imagem de perfil com autenticação
router.post('/upload-profile-image', authenticateToken, upload.single('profileImage'), uploadProfileImage);

// Middleware para autenticação de token
function authenticateToken(req, res, next) {
    // Obtém o token do cabeçalho da requisição
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    // Se não houver token, retorna status 403 (proibido)
    if (!token) return res.sendStatus(403); 

    // Verifica o token com a chave secreta
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // Se o token não for válido, retorna status 403
        if (err) return res.sendStatus(403);
        req.user = user; // Armazena as informações do usuário na requisição
        next(); // Chama o próximo middleware
    });    
}

// Exporta o roteador para ser utilizado em outros arquivos do projeto
module.exports = router;