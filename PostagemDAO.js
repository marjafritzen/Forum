const Postagem = require('../Postagem'); // Importe o modelo da postagem

class PostagemDAO {
  // Cria e persiste uma postagem
  async create({ idUsuario, titulo, conteudo, dataHora }) {
    try {
      const newPostagem = await Postagem.create({ idUsuario, titulo, conteudo, dataHora });
      return newPostagem; // Retorne a postagem criada se a criação for bem-sucedida
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
      throw error; // Relance o erro para que o chamador possa lidar com ele
    }
  }

  // Obtém todas as postagens
  async getAll() {
    try {
      const postagens = await Postagem.findAll();
      return postagens; // Retorna todas as postagens encontradas
    } catch (error) {
      console.error('Erro ao buscar todas as postagens:', error);
      throw error; // Relance o erro para que o chamador possa lidar com ele
    }
  }
}

module.exports = new PostagemDAO();
