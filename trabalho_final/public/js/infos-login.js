document.addEventListener('DOMContentLoaded', function () {
    // Executa o código quando o DOM da página for completamente carregado

    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    // Obtém o token de autenticação do localStorage ou sessionStorage, se existir
    const savedName = localStorage.getItem('savedName');
    // Captura o nome salvo no localStorage, se existir
    const savedProfileImageUrl = localStorage.getItem('savedProfileImageUrl');
    // Captura a URL da imagem de perfil salva no localStorage, se existir

    // Exibe o logout se o usuário estiver logado
    if (token) {
        document.getElementById('logout').style.display = 'block';
        // Mostra o botão de logout
    }

    // Atualiza o nome e a imagem de perfil se existirem
    if (savedName) {
        document.querySelector('.profile-name h2 a').textContent = savedName;
        // Define o nome do usuário no elemento correspondente
    }

    if (savedProfileImageUrl) {
        document.querySelector('#profile-image').src = savedProfileImageUrl;
        // Define a imagem de perfil no elemento correspondente
    }

    // Evento de clique para sair
    const logoutLink = document.getElementById('logout-link');
    // Seleciona o link de logout

    if (logoutLink) {
        logoutLink.addEventListener('click', function (event) {
            event.preventDefault();
            // Previne o comportamento padrão do link

            // Remove o token do localStorage e sessionStorage
            localStorage.removeItem('authToken');
            sessionStorage.removeItem('authToken');

            // Remove o nome e a URL da imagem de perfil do localStorage
            localStorage.removeItem('savedName');
            localStorage.removeItem('savedProfileImageUrl');

            // Redefine o nome e a imagem de perfil para valores padrão
            document.querySelector('.profile-name h2 a').textContent = 'Nome'; 
            // Define o nome como "Nome" (ou outro valor padrão)
            document.querySelector('#profile-image').src = '../img/default-image.webp'; 
            // Define a imagem como uma imagem padrão

            document.getElementById('logout').style.display = 'none';
            // Esconde o botão de logout

            // Redireciona para a página de login ou outra página desejada
            window.location.href = 'index.html';
        });
    }
});