const express = require('express'); // Importa o framework Express para criar um servidor web
const bodyParser = require('body-parser'); // Importa o middleware body-parser para processar dados JSON e URL-encoded
const cors = require('cors'); // Importa o middleware CORS para permitir requisições de outras origens
const helmet = require('helmet'); // Importa o middleware Helmet para aumentar a segurança das requisições HTTP
const fs = require('fs'); // Importa o módulo fs para manipulação de arquivos e diretórios
const path = require('path'); // Importa o módulo path para trabalhar com caminhos de arquivos
const userRoutes = require('./routes/userRoutes'); // Importa as rotas definidas para os usuários (endpoints de usuários)
require('dotenv').config(); // Carrega variáveis de ambiente de um arquivo .env para a aplicação
const app = express(); // Cria uma instância da aplicação Express
const port = 3000; // Define a porta em que o servidor irá escutar
const uploadDir = path.join(__dirname, '../public/uploads'); // Define o caminho para o diretório onde os arquivos enviados serão armazenados

app.use(bodyParser.json()); // Middleware para processar o corpo das requisições no formato JSON
app.use(bodyParser.urlencoded({ extended: true })); // Middleware para processar o corpo das requisições com dados URL-encoded
app.use('/uploads', express.static(uploadDir)); // Middleware para servir arquivos estáticos a partir do diretório 'uploads'

// Middleware para habilitar CORS e permitir que o servidor aceite requisições de outras origens
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para adicionar headers de segurança às respostas HTTP
app.use(helmet({
    contentSecurityPolicy: true, // Habilita a política de segurança de conteúdo
    crossOriginEmbedderPolicy: true, // Habilita a política de embutimento de recursos cross-origin
    crossOriginOpenerPolicy: true, // Habilita a política de abertura cross-origin
    crossOriginResourcePolicy: false, // Desabilita a política de recursos cross-origin
}));

// Verifica se o diretório 'uploads' existe; se não, cria o diretório de forma recursiva
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Define as rotas para o endpoint '/api/users', utilizando as rotas importadas do arquivo userRoutes
app.use('/api/users', userRoutes);

// Define uma rota GET para a raiz do servidor que retorna uma mensagem simples
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

// Inicia o servidor e faz com que ele escute na porta definida (3000)
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});