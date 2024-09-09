import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import { Strategy as GoogleStrategy, Profile as GoogleProfile, VerifyCallback as GoogleVerifyCallback } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy, Profile as GitHubProfile } from 'passport-github2';
import { VerifyCallback } from 'passport-oauth2';

import User, {UserAttributes} from '../models/user';

// Initialize router
const router = Router();

// Configure Google OAuth2 strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: '/auth/google/callback',
}, async (accessToken: string, refreshToken: string, profile: GoogleProfile, done: GoogleVerifyCallback) => {
  try {
    let user = await User.findOne({where: {googleId: profile.id}})

    if (!user) {
      user = await User.create({
        googleId: profile.id,
        username: profile.displayName, 
        email: profile.emails?.[0].value || ""
      })
    }
    return done(null, user.toJSON() as UserAttributes);
  } catch (err) {
    return done(err, false);
  }
}));

// Configure GitHub OAuth2 strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID!,
  clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  callbackURL: '/auth/github/callback',
}, async (accessToken: string, refreshToken: string, profile: GitHubProfile, done: VerifyCallback) => {
  try {

    console.log(profile);
    let user = await User.findOne({where: {githubId: profile.id}})

    if (!user) {
      user = await User.create({
        githubId: profile.id,
        username: profile.displayName, 
        email: profile.emails?.[0].value
      })
    }
    return done(null, user.toJSON() as UserAttributes);
  } catch (err) {
    return done(err, false);
  }
}));

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, (user as UserAttributes).id);
});

// Deserialize user from the session
passport.deserializeUser(async (id: number, done) => {  // Deserialize by fetching user from DB
  try {
    const user = await User.findByPk(id);
    if (user) {
      done(null, user.toJSON() as UserAttributes);  // Return the object
    } else {
      done(null, null);  // No user found
    }
  } catch (error) {
    done(error, null);  // Handle error
  }
});

// Google OAuth route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.status(200).json({
    message: 'Login Successful!',
    user: req.user
  })
});

// GitHub OAuth route
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  res.status(200).json({
    message: 'Login Successful!',
    user: req.user
  })
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out'});
    }
    res.status(200).json({message: 'Logout successful!'})
  });
});

export default router;
