<div align="justify">

# Trabalho final de Desenvolvimento de Software para Web: site informativo sobre a dengue

</div>

![Página inicial do site](https://i.imgur.com/5mkssQA.png)

> [!NOTE]
> Este projeto é um exemplo de um site informativo sobre a dengue, nele o usuário poderá se cadastrar, ver informações sobre a dengue, incluindo formas de prevenção e cuidados, também poderá ver um mapa de focos do mosquito.

<div align="justify">

## Funcionalidades Principais

### 1. Cadastro
Esta funcionalidade permite ao usuário se cadastrar no site.

### 2. Login
Esta funcionalidade permite ao usuário entrar no site.

![Página de login/cadastro do site](https://i.imgur.com/VknsFcO.png)

### 3. Informações gerais
Clicando aqui o usuário poderá ver várias informações sobre a dengue.

<<<<<<< HEAD
![Página de informações gerais](https://i.imgur.com/QfAm05b.png)
=======
![Página de informações gerais](https://i.imgur.com/TtNME0P.png)
>>>>>>> version_0.1

### 4. Áreas de risco
Clicando aqui o usuário poderá ver o mapa de focos.

![Página de áreas de risco](https://i.imgur.com/QjL7fhd.png)

### 5. Redefinir senha
Nesta funcionalidade o usuário poderá redefinir sua senha de usuário.

![Página de redefinição de senha](https://i.imgur.com/C4GNMBF.png)

### 6. Alterar foto de perfil
Ao passar o cursor sobre a foto de perfil aparcerá um botão de edição, clicando nele o usuário poderá alterar sua foto de perfil.

</div>

> [!WARNING]
> Este projeto é apenas uma demonstração acadêmica e não deve ser utilizado para fins comerciais. As telas e funcionalidades são simplificadas, assim como o banco de dados e o servidor, portanto, não representam um produto final.

> [!IMPORTANT]
> ## Como Utilizar o Site
> 1. Clone este repositório em sua máquina local.
> 2. Certifique-se de ter o PostgreSQL instalado em sua máquina.
> 3. Abra um terminal e navegue até o diretório do projeto.
> 4. Restaure o banco de dados (instruções abaixo).
> 5. Inicie o servidor (instruções abaixo) e acesse a aplicação web.
>
> ## Como Restaurar o Banco de Dados
> ### No Windows:
> 1. Abra o Prompt de Comando e navegue até o diretório `bin` do PostgreSQL, geralmente em `"C:\Program Files\PostgreSQL\<versão>\bin"`.
> 2. Crie um banco de dados vazio com o comando:
>    ```cmd
>    createdb -U <username> system_users
>    ```
> 3. Restaure o banco de dados com o comando:
>    ```cmd
>    psql -U <username> -d system_users -f "C:\path\to\backup\system_users.sql"
>    ```
> 
> ### No Linux:
> 1. Abra um terminal.
> 2. Crie um banco de dados vazio com o comando:
>    ```bash
>    createdb -U <username> system_users
>    ```
> 3. Restaure o banco de dados com o comando:
>    ```bash
>    psql -U <username> -d system_users -f /caminho/para/system_users.sql
>    ```

> [!WARNING]
> O `username` deve ser o seu nome de usuário do PostgreSQL, certifique-se de que ele tenha todas as permissões necessárias.

> [!IMPORTANT]
> ## Como Ligar o Servidor e Acessar a Página Inicial
> ### No Windows:
> 1. No Prompt de Comando, navegue até o diretório do projeto, em seguida vá para o diretório `./json`.
> 2. Execute o servidor com o comando:
>    ```cmd
>    npm start
>    ```
> 3. Abra o navegador e acesse o arquivo `index.html` no diretório do projeto. Você pode fazer isso arrastando e soltando o arquivo `index.html` na janela do navegador ou, no diretório `./html`, usando o comando:
>    ```cmd
>    start index.html
>    ```
> 
> ### No Linux:
> 1. Abra um terminal e navegue até o diretório do projeto, em seguida vá para o diretório `./json`.
> 2. Execute o servidor com o comando:
>    ```bash
>    npm start
>    ```
> 3. Abra o navegador e acesse o arquivo `index.html` no diretório do projeto. Você pode fazer isso arrastando e soltando o arquivo `index.html` na janela do navegador ou, no diretório `./html`, usando o comando:
>    ```bash
>    open index.html
>    ```

> [!NOTE]
> Este projeto é uma implementação simples de um site informativo sobre a dengue utilizando Node.js e PostgreSQL. Ele serve como uma oportunidade de aprendizado para entender os conceitos de desenvolvimento web com JavaScript.

* **Autores:** Antônio Arcênio Rabelo Neto, Francisco Wesley Guabiraba Ferreira, Natam Leão Ferreira
* **Instituição:** Universidade Federal do Ceará (UFC) - Campus Russas
* **Disciplina:** Desenvolvimento de Software para Web
* **Data de Conclusão:** 23/09/2024
