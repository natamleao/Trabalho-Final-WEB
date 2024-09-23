const { Pool } = require('pg'); // Importa a classe Pool do módulo 'pg' para gerenciar conexões com o banco de dados PostgreSQL
require('dotenv').config(); // Carrega as variáveis de ambiente definidas no arquivo .env

// Cria um pool de conexões com o banco de dados PostgreSQL usando as configurações obtidas das variáveis de ambiente
const pool = new Pool({
    user: process.env.DATABASE_USER,   // Usuário do banco de dados (definido na variável de ambiente DATABASE_USER)
    host: process.env.DATABASE_HOST,   // Host do banco de dados (definido na variável de ambiente DATABASE_HOST)
    database: process.env.DATABASE_NAME, // Nome do banco de dados (definido na variável de ambiente DATABASE_NAME)
    password: process.env.DATABASE_PASSWORD, // Senha do usuário do banco de dados (definido na variável de ambiente DATABASE_PASSWORD)
    port: process.env.DATABASE_PORT,   // Porta para conexão com o banco de dados (definido na variável de ambiente DATABASE_PORT)
});

// Exporta o pool de conexões para que possa ser utilizado em outros arquivos do projeto
module.exports = pool;