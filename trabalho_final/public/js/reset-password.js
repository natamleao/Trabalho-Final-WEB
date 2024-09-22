// Adiciona um listener que executa o código quando o DOM da página for completamente carregado
document.addEventListener('DOMContentLoaded', function () {
    
    const form = document.querySelector('#reset-password');
    // Seleciona o formulário de redefinição de senha pelo ID 'reset-password'

    form.addEventListener('submit', async function (event) {
        // Adiciona um listener para o evento de envio do formulário
        event.preventDefault();
        // Evita que o formulário seja enviado de forma padrão (não recarrega a página)

        const email = document.querySelector('#email').value;
        // Captura o valor do campo de email
        const newPassword = document.querySelector('#new-password').value;
        // Captura o valor do campo de nova senha
        const repeatPassword = document.querySelector('#repeat-password').value;
        // Captura o valor do campo de repetição de senha

        if (newPassword !== repeatPassword) {
            // Verifica se as senhas digitadas são diferentes
            alert('As senhas não coincidem!');
            // Mostra um alerta caso as senhas não coincidam
            return;
            // Interrompe a execução se as senhas não forem iguais
        }

        // Cria um objeto com os dados do usuário
        const taskData = {
            email: email,
            newPassword: newPassword
        };

        try {
            // Tenta realizar a requisição assíncrona
            const response = await fetch('http://localhost:3000/api/users/reset-password', {
                method: 'POST',
                // Método POST para enviar os dados ao servidor
                headers: {
                    'Content-Type': 'application/json'
                    // Define o tipo de conteúdo como JSON
                },
                body: JSON.stringify(taskData)
                // Envia o corpo da requisição com o email e a nova senha em formato JSON
            });

            const data = await response.json();
            // Aguarda a resposta do servidor e converte para JSON
            if (response.ok) {
                // Verifica se a resposta foi bem-sucedida (status 200-299)
                alert('Senha redefinida com sucesso!');
                // Mostra uma mensagem de sucesso ao usuário
                window.location.href = 'login-register.html';
                // Redireciona o usuário para a página inicial após o sucesso
            } 
            else {
                // Se a resposta não for OK, mostra a mensagem de erro
                alert(data.message || 'Erro ao redefinir a senha.');
                // Exibe a mensagem de erro vinda do servidor ou uma genérica
            }
        } 
        catch (error) {
            // Captura qualquer erro que ocorra durante a execução do try
            console.error('Erro ao redefinir a senha:', error);
            // Mostra o erro no console para fins de depuração
            alert('Erro no servidor. Tente novamente mais tarde.');
            // Exibe um alerta informando que ocorreu um erro no servidor
        }
    });
});