const express = require('express'); // Importa o módulo express para gerenciar rotas
const { signup, login, resetPassword } = require('../controllers/userController'); // Importa os controladores para as funções de signup, login e reset de senha
const multer = require('multer'); // Importa o multer para lidar com uploads de arquivos
const path = require('path'); // Importa o módulo path para manipular caminhos de diretórios
const router = express.Router(); // Cria uma instância do roteador do express para definir rotas
const uploadDir = path.join(__dirname, '../../public/uploads'); // Define o caminho para o diretório onde os arquivos enviados serão armazenados
const pool = require('../config/db'); // Importa a configuração do banco de dados

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

const upload = multer({ storage: storage }); // Cria uma instância do multer com as configurações de armazenamento definidas

router.post('/signup', signup); // Define a rota POST para a criação de novos usuários (signup)
router.post('/login', login); // Define a rota POST para o login de usuários
router.post('/reset-password', resetPassword); // Define a rota POST para o reset de senha

// Define a rota POST para o upload de imagem de perfil, utilizando multer para o upload
router.post('/upload-profile-image', upload.single('profileImage'), async (req, res) => {
    // Verifica se o arquivo foi enviado
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Nenhum arquivo enviado.' });
    }

    // Gera a URL da imagem com base no nome do arquivo e no localhost
    const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
    // Obtém o email do corpo da requisição
    const email = req.body.email;

    try {
        // Atualiza a URL da imagem de perfil no banco de dados para o usuário correspondente ao email
        await pool.query('UPDATE users SET profile_image_url = $1 WHERE email = $2', [imageUrl, email]);

        // Responde com sucesso e envia a URL da imagem atualizada
        res.json({ success: true, imageUrl });
    } 
    catch (error) {
        // Em caso de erro, imprime o erro no console e responde com status 500
        console.error('Erro ao atualizar a imagem do perfil:', error);
        res.status(500).json({ success: false, message: 'Erro ao atualizar a imagem do perfil.' });
    }
});

// Exporta o roteador para ser utilizado em outros arquivos do projeto
module.exports = router;