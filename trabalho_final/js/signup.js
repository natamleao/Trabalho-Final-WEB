// Adiciona um ouvinte de evento que aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona o formulário de cadastro pelo ID 'signup-form'
    const form = document.querySelector('#signup-form'); // Corrigido para usar o ID

    // Adiciona um ouvinte para o evento de envio do formulário
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Captura os valores dos campos de email e senha
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;

        // Cria um objeto com os dados do usuário
        const taskData = {
            email: email,
            password: password
        };

        // Envia os dados para o servidor usando a API fetch
        fetch('http://localhost:3000/api/users/signup', {
            method: 'POST', // Método HTTP POST para envio de dados
            headers: {
                'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(taskData) // Converte o objeto taskData para uma string JSON
        })
        .then(response => response.json()) // Converte a resposta para JSON
        .then(data => {
            console.log('Registration successful:', data); // Exibe no console a resposta do servidor
            // Redireciona o usuário para a página de login após o sucesso
            window.location.href = 'login-register.html'; // Redirecionar para a página de visualização de tarefas após o sucesso
        })
        .catch((error) => {
            alert('O servidor não está respondendo!'); // Exibe um alerta se houver erro na requisição
            console.error('Error:', error); // Exibe o erro no console para depuração
        });
    });
});