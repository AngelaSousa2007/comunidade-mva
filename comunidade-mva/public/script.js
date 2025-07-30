// Seleciona os elementos HTML com os quais vamos interagir
const postForm = document.getElementById('postForm');
const postContent = document.getElementById('postContent');
const postsContainer = document.getElementById('postsContainer');

// URL do nosso servidor Back-end
const API_URL = 'http://localhost:3000/posts';

// Função para carregar e exibir as postagens
async function fetchPosts() {
    try {
        // Faz uma requisição GET para o nosso servidor
        const response = await fetch(API_URL);
        // Converte a resposta para JSON
        const posts = await response.json();

        // Limpa o container de postagens antes de adicionar as novas
        postsContainer.innerHTML = '';

        // Se não houver postagens, exibe uma mensagem
        if (posts.length === 0) {
            postsContainer.innerHTML = '<p>Nenhuma postagem ainda. Seja o primeiro a publicar!</p>';
            return;
        }

        // Para cada postagem recebida, cria um elemento HTML e adiciona ao container
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('post-item'); // Adiciona a classe CSS

            // Conteúdo da postagem (por enquanto, apenas o texto)
            const postParagraph = document.createElement('p');
            postParagraph.textContent = post.content;

            // Data e hora da postagem (vamos adicionar isso no Back-end depois)
            // Por agora, vamos usar uma data fictícia ou a data atual se for uma postagem nova
            const timestampDiv = document.createElement('div');
            timestampDiv.classList.add('timestamp');
            timestampDiv.textContent = post.timestamp ? new Date(post.timestamp).toLocaleString() : 'Recém-publicado';

            postDiv.appendChild(postParagraph);
            postDiv.appendChild(timestampDiv);
            postsContainer.prepend(postDiv); // Adiciona a postagem no início (mais recente primeiro)
        });

    } catch (error) {
        console.error('Erro ao buscar postagens:', error);
        postsContainer.innerHTML = '<p>Ocorreu um erro ao carregar as postagens.</p>';
    }
}

// Função para lidar com o envio de novas postagens
postForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página

    const content = postContent.value.trim(); // Pega o texto da área de texto e remove espaços extras

    if (!content) {
        alert('Por favor, escreva algo antes de publicar!');
        return;
    }

    try {
        // Faz uma requisição POST para o nosso servidor
        const response = await fetch(API_URL, {
            method: 'POST', // Define o método como POST
            headers: {
                'Content-Type': 'application/json' // Informa que estamos enviando JSON
            },
            body: JSON.stringify({ content: content }) // Converte o objeto para string JSON
        });

        // Converte a resposta para JSON
        const result = await response.json();

        if (response.ok) { // Verifica se a requisição foi bem-sucedida (status 2xx)
            console.log('Postagem enviada com sucesso:', result);
            postContent.value = ''; // Limpa a área de texto
            fetchPosts(); // Recarrega as postagens para mostrar a nova
        } else {
            // Se o servidor retornar um erro, mostra a mensagem de erro
            console.error('Erro ao enviar postagem:', result.message);
            alert(`Erro ao publicar: ${result.message || 'Erro desconhecido.'}`);
        }

    } catch (error) {
        console.error('Erro de rede ao enviar postagem:', error);
        alert('Não foi possível conectar ao servidor. Verifique se o servidor está rodando.');
    }
});

// Carrega as postagens assim que a página é carregada
document.addEventListener('DOMContentLoaded', fetchPosts);