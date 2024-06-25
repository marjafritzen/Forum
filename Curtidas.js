// Importando as dependências necessárias
const db = require('../config/database');
const { Model, DataTypes } = require('sequelize');

// Definindo a classe Curtidas que estende Model do Sequelize
class Curtidas extends Model {
  // Associação com as classes Usuario e Postagem
  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'idUsuario', as: 'usuario' });
    this.belongsTo(models.Postagem, { foreignKey: 'idPostagem', as: 'postagem' });
  }
}

// Inicializando a classe Curtidas com o esquema do banco de dados
Curtidas.init({
  idUsuario: { type: DataTypes.INTEGER, allowNull: false },
  idPostagem: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize: db.sequelize,
  modelName: 'Curtidas',
  tableName: 'curtidas',
});

// Exportando a classe Curtidas
module.exports = Curtidas;