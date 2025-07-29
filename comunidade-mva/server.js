// Importa o módulo Express.js
const express = require('express');

// Cria uma instância do aplicativo Express
const app = express();

// Define a porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;

// Middleware para permitir o uso de JSON no corpo das requisições
// Isso é importante para receber dados do front-end
app.use(express.json());

// --- Rotas da API ---

// Rota inicial (Root Route)
// Quando alguém acessar a URL base do seu servidor (ex: http://localhost:3000)
app.get('/', (req, res) => {
  res.send('Bem-vindo à nossa Rede Social Simples!');
});

// Rota para obter postagens (ainda não implementado o BD)
// Esta rota será usada para buscar as postagens do banco de dados
app.get('/posts', (req, res) => {
  // Por enquanto, vamos retornar um array vazio
  // No futuro, aqui buscaremos as postagens do DB
  res.json([]);
});

// Rota para criar uma nova postagem (ainda não implementado o BD)
// Esta rota será usada para receber novas postagens do front-end
app.post('/posts', (req, res) => {
  const { content } = req.body; // Pega o conteúdo da postagem do corpo da requisição
  if (!content) {
    return res.status(400).json({ message: 'O conteúdo da postagem não pode ser vazio.' });
  }
  // Por enquanto, apenas enviamos uma resposta de sucesso
  // No futuro, aqui salvaremos a postagem no DB
  res.status(201).json({ message: 'Postagem recebida com sucesso!', post: { content } });
});

// --- Inicializa o servidor ---
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log('Pressione Ctrl+C para parar o servidor.');
});