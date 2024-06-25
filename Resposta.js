// Importando as dependências necessárias
const db = require('../config/database');
const { Model, DataTypes } = require('sequelize');
const UsuarioDAO = require('./dao/UsuarioDAO');
const PostagemDAO = require('./dao/PostagemDAO');

// Definindo a classe Resposta que estende Model do Sequelize
class Resposta extends Model {
  // Métodos da classe Resposta
  getAutor() {
    let autor = UsuarioDAO.getById(this.idUsuario);
    return autor;
  }

  getPostagem() {
    let postagem = PostagemDAO.getById(this.idPostagem);
    return postagem;
  }

  // Associação com as classes Usuario e Postagem
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'idUsuario', as: 'autor' });
    this.belongsTo(models.Postagem, { foreignKey: 'idPostagem', as: 'postagem' });
  }
}

// Inicializando a classe Resposta com o esquema do banco de dados
Resposta.init({
  idUsuario: { type: DataTypes.INTEGER, allowNull: false },
  idPostagem: { type: DataTypes.INTEGER, allowNull: false },
  conteudo: { type: DataTypes.TEXT, allowNull: false },
  dataHora: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  sequelize: db.sequelize,
  modelName: 'Resposta',
  tableName: 'respostas',
});

// Exportando a classe Resposta
module.exports = Resposta;