import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import CardSet from './cardset';

const Quiz = sequelize.define('Quiz', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  cardSetId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: CardSet,
      key: 'id',
    },
  },
}, {
  tableName: 'quizzes',
});

User.hasMany(Quiz, { foreignKey: 'userId' });
Quiz.belongsTo(User, { foreignKey: 'userId' });

CardSet.hasMany(Quiz, { foreignKey: 'cardSetId' });
Quiz.belongsTo(CardSet, { foreignKey: 'cardSetId' });

export default Quiz;