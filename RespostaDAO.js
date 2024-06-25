const Resposta = require('../Resposta'); // Importe o modelo da resposta

class RespostaDAO {
  // Cria e persiste uma resposta
  async create({ idUsuario, idPostagem, conteudo, dataHora }) {
    try {
      const newResposta = await Resposta.create({ idUsuario, idPostagem, conteudo, dataHora });
      return newResposta; // Retorne a resposta criada se a criação for bem-sucedida
    } catch (error) {
      console.error('Erro ao criar resposta:', error);
      throw error; // Relance o erro para que o chamador possa lidar com ele
    }
  }
}

module.exports = new RespostaDAO();