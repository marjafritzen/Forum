const { Router } = require("express");
const jwt = require('jsonwebtoken');
const router = new Router();
const PostagemDAO = require('../models/dao/PostagemDAO');
const UsuarioDAO = require("../models/dao/UsuarioDAO");
const Usuario = require("../models/Usuario"); 

async function getUsuarioLogado(req) {
  let usuarioLogado = null;
  if (req.cookies.tokenJWT) {
    try {
      const decoded = jwt.verify(req.cookies.tokenJWT, 'chave_secreta');
      usuarioLogado = await UsuarioDAO.getById(decoded.id);
    } catch (error) {
      console.error('Erro ao verificar token JWT:', error);
      usuarioLogado = null;
    }
  }
  return usuarioLogado;
}

router.get('/deslogar', (req, res) => {
  res.clearCookie('tokenJWT');
  return res.redirect(301, '/');
});

router.post('/posts', async (req, res) => {
  const usuarioLogado = await getUsuarioLogado(req);
  if (!usuarioLogado) {
    return res.status(401).json({ error: 'Usuário não autenticado' });
  }

  const { title, content } = req.body;
  try {
    const newPostagem = await PostagemDAO.create({ idUsuario: usuarioLogado.id, titulo: title, conteudo: content, dataHora: new Date() });
    res.status(201).json(newPostagem);
  } catch (error) {
    console.error('Erro ao criar postagem:', error);
    res.status(500).json({ error: 'Erro ao criar postagem' });
  }
});

router.get('/posts', async (req, res) => {
  try {
    const postagens = await PostagemDAO.getAll();
    res.status(200).json(postagens); 
  } catch (error) {
    console.error('Erro ao obter postagens:', error);
    res.status(500).json({ error: 'Erro ao obter postagens' });
  }
});

router.get('/', async (req, res) => {
  const usuarioLogado = await getUsuarioLogado(req);
  res.status(200).render("index", { usuarioLogado: usuarioLogado ? usuarioLogado.get() : null });
});

router.get('/login', async (req, res) => {
  const usuarioLogado = await getUsuarioLogado(req);
  if (usuarioLogado) {
    res.status(200).send("Usuário já está logado");
  } else {
    res.status(200).render('login', { layout: 'login.handlebars', usuarioLogado: null });
  }
});

router.get('/protected', async (req, res) => {
  const usuarioLogado = await getUsuarioLogado(req);
  if (usuarioLogado) {
    res.render('protected', { usuarioLogado: usuarioLogado.get() });
  } else {
    res.status(403).send("Acesso negado!");
  }
});

router.get('/cadastro', (req, res) => {
  res.status(200).render('cadastro', { layout: 'cadastro.handlebars' });
});

router.post('/logar', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario || senha !== usuario.senha) {
    return res.status(200).render('login', { message: 'Usuário ou senha inválidos' });
  }

  const token = jwt.sign({ id: usuario.id }, 'chave_secreta', { expiresIn: '1H' });
  res.cookie("tokenJWT", token);
  return res.redirect(301, '/');
});

module.exports = router;
