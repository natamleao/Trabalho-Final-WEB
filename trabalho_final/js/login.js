document.addEventListener('DOMContentLoaded', function () {
    // Executa o código quando o DOM da página for completamente carregado

    const form = document.querySelector('#access-form');
    // Seleciona o formulário de login pela ID 'access-form'

    // Verifica se há dados salvos no localStorage e preenche os campos
    const savedEmail = localStorage.getItem('savedEmail');
    // Captura o email salvo no localStorage, se existir
    const savedPassword = localStorage.getItem('savedPassword');
    // Captura a senha salva no localStorage, se existir
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
                // Se a resposta do servidor indicar sucesso
                if (rememberMe) {
                    // Se a opção "Lembre de mim" estiver marcada
                    localStorage.setItem('savedEmail', email);
                    // Salva o email no localStorage
                    localStorage.setItem('savedPassword', password);
                    // Salva a senha no localStorage (não recomendado por questões de segurança)
                } 
                else {
                    // Se "Lembre de mim" não estiver marcado
                    localStorage.removeItem('savedEmail');
                    // Remove o email do localStorage
                    localStorage.removeItem('savedPassword');
                    // Remove a senha do localStorage
                }
                console.log('Login bem-sucedido:', data);
                // Exibe uma mensagem de sucesso no console
                window.location.href = 'reset-password.html';
                // Redireciona o usuário para a página de redefinição de senha
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