import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import CardSet from './cardset';

const Flashcard = sequelize.define('Flashcard', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isFavorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  cardSetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CardSet,
      key: 'id',
    }
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'flashcards',
});

CardSet.hasMany(Flashcard, { foreignKey: 'cardSetId' });
Flashcard.belongsTo(CardSet, { foreignKey: 'cardSetId' });

export default Flashcard;
