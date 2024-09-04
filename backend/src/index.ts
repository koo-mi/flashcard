import express from 'express';
import {json, urlencoded} from 'body-parser';
import routes from './routes';
import dotenv from 'dotenv';
import cors from 'cors';

// Import Sequelize and models
import sequelize from './config/database';
import './models/user';
import './models/cardset';
import './models/flashcard';
import './models/cardSetAccessHistory';

dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(json());
app.use(urlencoded({extended: true}));

// Routes
app.use('/api', routes);

// Sync models and start the server
sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created/updated!');

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});