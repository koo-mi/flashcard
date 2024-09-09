import express from 'express';
import {json, urlencoded} from 'body-parser';
import routes from './routes';
import dotenv from 'dotenv';
import cors from 'cors';

// Import Auth related
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/auth'; 

// Import Sequelize and models
import sequelize from './config/database';
import './models/user';
import './models/cardset';
import './models/flashcard';
import './models/cardSetAccessHistory';

dotenv.config(); // Loading ENV

const app = express();
const PORT = process.env.PORT || 3000;

// CORS setup
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Middleware for parsing JSON and URL-encoded data
app.use(json());
app.use(urlencoded({extended: true}));

// Middleware for session/passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Secure for production only
    maxAge: 1000 * 60 * 60 * 24,  // Expires in 1 day
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);

// Routes
app.use(authRoutes);        // Route for AUTH
app.use('/api', routes);    // Route for API

// Sync models and start the server
sequelize.sync({ alter: true }).then(() => {
  console.log('DB is ready to go!');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('DB connection error:', err);
});

