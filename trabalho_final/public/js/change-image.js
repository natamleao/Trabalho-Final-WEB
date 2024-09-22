document.addEventListener('DOMContentLoaded', function() {
    // Executa o código quando o DOM da página for completamente carregado

    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    // Obtém o token de autenticação do localStorage ou sessionStorage, se existir

    const email = localStorage.getItem('savedEmail'); // Obtém o email salvo
    // Seleciona o input de arquivos pela ID 'file-input'
    const fileInput = document.getElementById('file-input');
    const uploadButton = document.getElementById('upload-button');
    const profileImage = document.getElementById('profile-image');
    const editIcon = document.getElementById('edit-icon');

    if (!token) {
        // Se o token não existir, oculta o ícone de editar e o input de arquivo
        editIcon.style.display = 'none';
        fileInput.style.display = 'none';
        return; // Sai da função, não permitindo que o usuário faça upload
    }

    editIcon.addEventListener('click', function() {
        fileInput.click(); // Simula o clique no input de arquivos ao clicar no ícone de editar
    });

    fileInput.addEventListener('change', function() {
        const file = fileInput.files[0];
        // Captura o primeiro arquivo selecionado no input

        if (file) {
            const formData = new FormData();
            // Cria um objeto FormData para enviar o arquivo
            formData.append('profileImage', file);
            // Adiciona o arquivo ao FormData com a chave 'profileImage'
            formData.append('email', email); // Adiciona o email ao FormData

            fetch('http://localhost:3000/api/users/upload-profile-image', {
                method: 'POST',
                // Método POST para enviar o arquivo
                body: formData
                // Corpo da requisição contendo o FormData com o arquivo e o email
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    profileImage.src = data.imageUrl;
                    // Atualiza o src da imagem do perfil com o URL retornado pelo servidor
                    alert('Imagem do perfil atualizada com sucesso!');
                } else {
                    alert('Erro ao atualizar a imagem do perfil.');
                    // Exibe uma mensagem de erro se a resposta do servidor indicar falha
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                // Exibe um erro no console se houver problemas na requisição
                alert('Erro ao enviar a imagem.');
            });
        }
    });
});