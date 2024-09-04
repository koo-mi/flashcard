import { DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import CardSet from './cardset';

const CardSetAccessHistory = sequelize.define('CardSetAccessHistory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  cardSetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CardSet,
      key: 'id',
    },
  },
  accessedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'card_set_access_histories',
});

User.hasMany(CardSetAccessHistory, { foreignKey: 'userId' });
CardSetAccessHistory.belongsTo(User, { foreignKey: 'userId' });

CardSet.hasMany(CardSetAccessHistory, { foreignKey: 'cardSetId' });
CardSetAccessHistory.belongsTo(CardSet, { foreignKey: 'cardSetId' });

export default CardSetAccessHistory;
