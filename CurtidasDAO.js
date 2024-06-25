const Curtidas = require('../Curtidas'); // Importe o modelo das curtidas

class CurtidasDAO {
  // Cria e persiste uma curtida
  async create({ idUsuario, idPostagem }) {
    try {
      const newCurtida = await Curtidas.create({ idUsuario, idPostagem });
      return newCurtida; // Retorne a curtida criada se a criação for bem-sucedida
    } catch (error) {
      console.error('Erro ao criar curtida:', error);
      throw error; // Relance o erro para que o chamador possa lidar com ele
    }
  }
}

module.exports = new CurtidasDAO();