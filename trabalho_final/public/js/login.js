// Adiciona um listener que executa o código quando o DOM da página for completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o formulário de login pela ID 'access-form'
    const form = document.querySelector('#access-form');

    // Verifica se há dados salvos no localStorage e preenche os campos
    const savedEmail = localStorage.getItem('savedEmail'); 
    // Captura o email salvo
    const savedPassword = localStorage.getItem('savedPassword'); 
    // Captura a senha salva
    const savedName = localStorage.getItem('savedName'); 
    // Captura o nome salvo
    const savedProfileImageUrl = localStorage.getItem('savedProfileImageUrl'); 
    // Captura a URL da imagem salva
    const rememberMeCheckbox = form.querySelector('#checkbox'); 
    // Seleciona o checkbox "Lembre de mim"

    // Se um email estiver salvo, preenche o campo de email e marca o checkbox
    if (savedEmail) {
        form.querySelector('#email').value = savedEmail; // Preenche o campo de email
        rememberMeCheckbox.checked = true; // Marca a caixa de seleção "Lembre de mim"
    }

    // Se uma senha estiver salva e o checkbox estiver marcado, preenche o campo de senha
    if (savedPassword && rememberMeCheckbox.checked) {
        form.querySelector('#password').value = savedPassword; // Preenche o campo de senha
    }

    // Adiciona um listener para o evento de envio do formulário
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Previne o envio padrão do formulário

        // Captura os valores dos campos de email e senha
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;
        const rememberMe = rememberMeCheckbox.checked; // Verifica se a opção "Lembre de mim" está marcada

        // Verifica se os campos de email e senha estão preenchidos
        if (!email || !password) {
            console.error('Email e senha são obrigatórios.'); // Exibe mensagem de erro no console
            return; // Sai da função se os campos não estiverem preenchidos
        }

        // Cria um objeto com os dados do usuário
        const taskData = { email, password, rememberMe };

        // Faz uma requisição para o servidor para autenticar o usuário
        fetch('http://localhost:3000/api/users/login', {
            method: 'POST', // Método POST para enviar os dados
            headers: { 'Content-Type': 'application/json' }, // Define o tipo de conteúdo como JSON
            body: JSON.stringify(taskData) // Envia os dados do usuário em formato JSON
        })
        // Converte a resposta do servidor em JSON
        .then(response => response.json())
        // Trata a resposta do servidor
        .then(data => {
            // Verifica se a autenticação foi bem-sucedida
            if (data.success) {
                const token = data.token; // Obtém o token da resposta
                const userName = email.split('@')[0]; // Extrai o nome de usuário (parte antes do '@')
                const profileImageUrl = data.profileImageUrl || '../img/default-image.webp'; // URL da imagem de perfil

                // Armazena o token e informações no localStorage ou sessionStorage
                if (rememberMe) {
                    localStorage.setItem('authToken', token); // Salva o token no localStorage
                    localStorage.setItem('savedEmail', email); // Salva o email no localStorage
                    localStorage.setItem('savedPassword', password); // Salva a senha no localStorage
                } else {
                    sessionStorage.setItem('authToken', token); // Salva o token na sessionStorage
                }

                // Armazena o nome e a URL da imagem de perfil no localStorage
                localStorage.setItem('savedName', userName);
                localStorage.setItem('savedProfileImageUrl', profileImageUrl);

                // Redireciona o usuário para a página principal após o login
                window.location.href = 'index.html'; 
            } else {
                // Se a autenticação falhar, exibe a mensagem de erro
                alert(data.message); 
            }
        })
        // Trata erros na requisição
        .catch(error => {
            console.error('Erro na requisição de login:', error); // Exibe erro no console
        });
    });
});