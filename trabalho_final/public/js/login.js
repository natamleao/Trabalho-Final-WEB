document.addEventListener('DOMContentLoaded', function () {
    // Executa o código quando o DOM da página for completamente carregado

    const form = document.querySelector('#access-form');
    // Seleciona o formulário de login pela ID 'access-form'

    // Verifica se há dados salvos no localStorage e preenche os campos
    const savedEmail = localStorage.getItem('savedEmail');
    // Captura o email salvo no localStorage, se existir
    const savedPassword = localStorage.getItem('savedPassword');
    // Captura a senha salva no localStorage, se existir
    const savedName = localStorage.getItem('savedName');
    // Captura o nome salvo no localStorage, se existir
    const savedProfileImageUrl = localStorage.getItem('savedProfileImageUrl'); 
    // Captura a URL da imagem salva no localStorage, se existir
    const rememberMeCheckbox = form.querySelector('#checkbox');
    // Seleciona o checkbox "Lembre de mim" no formulário

    if (savedEmail) {
        form.querySelector('#email').value = savedEmail;
        // Se um email estiver salvo, preenche o campo de email no formulário
        rememberMeCheckbox.checked = true;
        // Marca a caixa de seleção "Lembre de mim"
    }

    if (savedPassword && rememberMeCheckbox.checked) {
        form.querySelector('#password').value = savedPassword;
        // Se uma senha estiver salva e a caixa de seleção estiver marcada, preenche o campo de senha
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        // Previne o envio padrão do formulário para evitar o reload da página

        const email = form.querySelector('#email').value;
        // Captura o valor do campo de email
        const password = form.querySelector('#password').value;
        // Captura o valor do campo de senha
        const rememberMe = rememberMeCheckbox.checked;
        // Verifica se a opção "Lembre de mim" está marcada

        if (!email || !password) {
            console.error('Email e senha são obrigatórios.');
            // Se o email ou a senha não estiverem preenchidos, exibe uma mensagem de erro no console
            return;
            // Sai da função e não prossegue com a requisição
        }

        // Cria um objeto com os dados do usuário
        const taskData = {
            email: email,
            password: password,
            rememberMe: rememberMe
        };

        // Faz uma requisição para o servidor para autenticar o usuário
        fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            // Método POST para enviar os dados
            headers: {
                'Content-Type': 'application/json'
                // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(taskData)
            // Envia o corpo da requisição em formato JSON com o email, senha e a opção "Lembre de mim"
        })
        .then(response => response.json())
        // Transforma a resposta do servidor em JSON
        .then(data => {
            if (data.success) {
                const token = data.token; // Obtenha o token da resposta
                const userName = email.split('@')[0];
                // Extrai o nome de usuário do email (parte antes do '@')
                const profileImageUrl = data.profileImageUrl || '../img/default-image.webp';
                // Usa a imagem de perfil retornada ou uma imagem padrão
            
                if (rememberMe) {
                    localStorage.setItem('authToken', token); // Armazena o token no localStorage se "Lembre de mim" estiver marcado
                } else {
                    sessionStorage.setItem('authToken', token); // Armazena o token apenas na sessão se não estiver marcado
                }
            
                // Armazena o nome e a URL da imagem de perfil
                localStorage.setItem('savedName', userName);
                localStorage.setItem('savedProfileImageUrl', profileImageUrl);
            
                window.location.href = 'index.html';            
                // Redireciona o usuário para a página principal após o login
            } 
            else {
                alert(`${data.message}`);
                // Se a resposta indicar erro, exibe a mensagem de erro para o usuário
            }
        })
        .catch(error => {
            console.error('Erro na requisição de login:', error);
            // Exibe uma mensagem de erro no console se houver problemas na requisição
        });
    });
});