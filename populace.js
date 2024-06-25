const db = require('./config/database');
const UsuarioDAO = require('./models/dao/UsuarioDAO');
const PostagemDAO = require('./models/dao/PostagemDAO');
const CurtidasDAO = require('./models/dao/CurtidasDAO');
const RespostaDAO = require('./models/dao/RespostaDAO');

// Sincronize os modelos com o banco de dados
db.sequelize.sync({ force: true }).then(async () => {
  console.log('Inserindo dados de exemplo.');

  // Adicionando os usuários
  const usuarios = [
    { nome: 'Matthew Hettinger', email: 'matthewh@example.com', senha: 'senha123' },
    { nome: 'Kristin Sykes', email: 'kristins@example.com', senha: 'senha123' },
    { nome: 'Clement Merrifield', email: 'clementm@example.com', senha: 'senha123' },
    { nome: 'Tommy Blackburn', email: 'tommyb@example.com', senha: 'senha123' },
    { nome: 'Agnes Walker', email: 'agnesw@example.com', senha: 'senha123' },
    { nome: 'James Smith', email: 'jamess@example.com', senha: 'senha123' },
    { nome: 'Patricia Johnson', email: 'patriciaj@example.com', senha: 'senha123' },
    { nome: 'Robert Brown', email: 'robertb@example.com', senha: 'senha123' },
    { nome: 'Linda Davis', email: 'lindad@example.com', senha: 'senha123' },
    { nome: 'Michael Miller', email: 'michaelm@example.com', senha: 'senha123' }
  ];

  for (const usuario of usuarios) {
    await UsuarioDAO.create(usuario);
  }

  // Adicionando as postagens
  const postagens = [
    { idUsuario: 1, titulo: 'Um post', conteudo: 'Conteúdo de um post', dataHora: new Date('2020-11-11T03:24:00') },
    { idUsuario: 2, titulo: 'Outro post', conteudo: 'Conteúdo de outro post', dataHora: new Date('2021-02-21T13:45:00') },
    { idUsuario: 3, titulo: 'Mais um post', conteudo: 'Conteúdo de mais um post', dataHora: new Date('2021-03-11T10:10:00') },
    { idUsuario: 4, titulo: 'Post diferente', conteudo: 'Conteúdo de um post diferente', dataHora: new Date('2021-04-15T15:20:00') },
    { idUsuario: 5, titulo: 'Post interessante', conteudo: 'Conteúdo interessante', dataHora: new Date('2021-05-20T08:30:00') },
    { idUsuario: 6, titulo: 'Post engraçado', conteudo: 'Conteúdo engraçado', dataHora: new Date('2021-06-25T12:40:00') },
    { idUsuario: 7, titulo: 'Post sério', conteudo: 'Conteúdo sério', dataHora: new Date('2021-07-30T14:50:00') },
    { idUsuario: 8, titulo: 'Post informativo', conteudo: 'Conteúdo informativo', dataHora: new Date('2021-08-10T16:00:00') },
    { idUsuario: 9, titulo: 'Post educativo', conteudo: 'Conteúdo educativo', dataHora: new Date('2021-09-05T17:10:00') },
    { idUsuario: 10, titulo: 'Post de notícias', conteudo: 'Conteúdo de notícias', dataHora: new Date('2021-10-15T18:20:00') }
  ];

  for (const postagem of postagens) {
    await PostagemDAO.create(postagem);
  }

  // Adicionando as curtidas
  const curtidas = [
    { idUsuario: 1, idPostagem: 2 },
    { idUsuario: 2, idPostagem: 3 },
    { idUsuario: 3, idPostagem: 4 },
    { idUsuario: 4, idPostagem: 5 },
    { idUsuario: 5, idPostagem: 6 },
    { idUsuario: 6, idPostagem: 7 },
    { idUsuario: 7, idPostagem: 8 },
    { idUsuario: 8, idPostagem: 9 },
    { idUsuario: 9, idPostagem: 10 },
    { idUsuario: 10, idPostagem: 1 }
  ];

  for (const curtida of curtidas) {
    await CurtidasDAO.create(curtida);
  }

  // Adicionando as respostas
  const respostas = [
    { idUsuario: 1, idPostagem: 2, conteudo: 'Esta é uma resposta ao segundo post.', dataHora: new Date('2020-11-12T04:24:00') },
    { idUsuario: 2, idPostagem: 3, conteudo: 'Esta é uma resposta ao terceiro post.', dataHora: new Date('2021-02-22T14:45:00') },
    { idUsuario: 3, idPostagem: 4, conteudo: 'Esta é uma resposta ao quarto post.', dataHora: new Date('2021-03-12T11:10:00') },
    { idUsuario: 4, idPostagem: 5, conteudo: 'Esta é uma resposta ao quinto post.', dataHora: new Date('2021-04-16T16:20:00') },
    { idUsuario: 5, idPostagem: 6, conteudo: 'Esta é uma resposta ao sexto post.', dataHora: new Date('2021-05-21T09:30:00') },
    { idUsuario: 6, idPostagem: 7, conteudo: 'Esta é uma resposta ao sétimo post.', dataHora: new Date('2021-06-26T13:40:00') },
    { idUsuario: 7, idPostagem: 8, conteudo: 'Esta é uma resposta ao oitavo post.', dataHora: new Date('2021-07-31T15:50:00') },
    { idUsuario: 8, idPostagem: 9, conteudo: 'Esta é uma resposta ao nono post.', dataHora: new Date('2021-08-11T17:00:00') },
    { idUsuario: 9, idPostagem: 10, conteudo: 'Esta é uma resposta ao décimo post.', dataHora: new Date('2021-09-06T18:10:00') },
    { idUsuario: 10, idPostagem: 1, conteudo: 'Esta é uma resposta ao primeiro post.', dataHora: new Date('2021-10-16T19:20:00') }
  ];

  for (const resposta of respostas) {
    await RespostaDAO.create(resposta);
  }

  console.log('Dados de exemplo criados com sucesso.');
  process.exit(0);
});
