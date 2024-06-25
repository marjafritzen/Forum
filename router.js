const { Router } = require("express");
const router = new Router();
const PostagemDAO = require('../models/dao/PostagemDAO');

router.post('/posts', async (req, res) => {
  const { idUsuario, titulo, conteudo, dataHora } = req.body;
  try {
      const newPostagem = await PostagemDAO.create({ idUsuario, titulo, conteudo, dataHora });
      res.status(201).json(newPostagem);
  } catch (error) {
      res.status(500).json({ error: 'Erro ao criar postagem' });
  }
});

// Rota para obter todas as postagens
router.get('/posts', async (req, res) => {
  try {
      const postagens = await PostagemDAO.getAll();
      res.status(200).json(postagens);
  } catch (error) {
      res.status(500).json({ error: 'Erro ao obter postagens' });
  }
});

router.get('/', (req, res) => {
  res.status(200).render("index")
})

router.get('/login', (req, res) => {
  res.status(200).render('login', {layout: 'login.handlebars'})
});

router.get('/cadastro', (req, res) => {
  res.status(200).render('cadastro', {layout: 'cadastro.handlebars'})
});

module.exports = router;
