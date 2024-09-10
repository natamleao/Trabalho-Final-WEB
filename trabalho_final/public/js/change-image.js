document.addEventListener('DOMContentLoaded', function() {
    // Executa o código quando o DOM da página for completamente carregado

    const fileInput = document.getElementById('file-input');
    // Seleciona o input de arquivos pela ID 'file-input'
    const uploadButton = document.getElementById('upload-button');
    // Seleciona o botão de upload pela ID 'upload-button'
    const profileImage = document.getElementById('profile-image');
    // Seleciona a imagem do perfil pela ID 'profile-image'
    const editIcon = document.getElementById('edit-icon');
    // Seleciona o ícone de editar pela ID 'edit-icon'

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

            fetch('http://localhost:3000/api/users/upload-profile-image', {
                method: 'POST',
                // Método POST para enviar o arquivo
                body: formData
                // Corpo da requisição contendo o FormData com o arquivo
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