// Adiciona um listener que executa o código quando o DOM da página for completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    // Obtém o token de autenticação do localStorage ou sessionStorage, se existir
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    // Seleciona o input de arquivo pela ID 'file-input'
    const fileInput = document.getElementById('file-input');
    // Seleciona o elemento da imagem de perfil pela ID 'profile-image'
    const profileImage = document.getElementById('profile-image');
    // Seleciona o ícone de editar pela ID 'edit-icon'
    const editIcon = document.getElementById('edit-icon');

    // Verifica se o token não existe
    if (!token) {
        // Se o token não existir, oculta o ícone de editar
        editIcon.style.display = 'none';
        // Também oculta o input de arquivo
        fileInput.style.display = 'none';
        // Sai da função, não permitindo que o usuário faça upload
        return;
    }

    // Adiciona um listener para o clique no ícone de editar
    editIcon.addEventListener('click', function() {
        // Simula o clique no input de arquivos ao clicar no ícone de editar
        fileInput.click();
    });

    // Adiciona um listener para mudanças no input de arquivo
    fileInput.addEventListener('change', function() {
        // Captura o primeiro arquivo selecionado no input
        const file = fileInput.files[0];

        // Verifica se um arquivo foi selecionado
        if (file) {
            // Cria um objeto FormData para enviar o arquivo
            const formData = new FormData();
            // Adiciona o arquivo ao FormData com a chave 'profileImage'
            formData.append('profileImage', file);

            // Faz uma requisição para o servidor para atualizar a imagem de perfil
            fetch('http://localhost:3000/api/users/upload-profile-image', {
                method: 'POST', // Método POST para enviar o arquivo
                headers: {
                    // Adiciona o token de autenticação ao cabeçalho da requisição
                    'Authorization': `Bearer ${token}`,
                    // Define o tipo de resposta esperado
                    'Accept': 'application/json',
                },
                // Corpo da requisição contendo o FormData com o arquivo
                body: formData
            })
            // Converte a resposta do servidor em JSON
            .then(response => response.json())
            // Trata a resposta do servidor
            .then(data => {
                // Verifica se a atualização foi bem-sucedida
                if (data.success) {
                    // Atualiza o src da imagem do perfil com o URL retornado pelo servidor
                    profileImage.src = data.imageUrl;
                    // Exibe uma mensagem de sucesso
                    alert('Imagem do perfil atualizada com sucesso!');
                } else {
                    // Exibe uma mensagem de erro se a resposta do servidor indicar falha
                    alert('Erro ao atualizar a imagem do perfil.');
                }
            })
            // Trata erros na requisição
            .catch(error => {
                console.error('Erro:', error); // Exibe um erro no console
                // Exibe uma mensagem de erro ao enviar a imagem
                alert('Erro ao enviar a imagem.');
            });
        }
    });
});