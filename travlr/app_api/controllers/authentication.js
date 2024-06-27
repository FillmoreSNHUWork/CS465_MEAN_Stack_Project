const passport = require('passport');
const mongoose = require('mongoose');
require('../models/user');
const User = mongoose.model('User');

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ "message": "All fields required" });
  }

  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  try {
    await user.save();
    const token = user.generateJwt();
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ "message": "All fields required" });
  }

  try {
    console.log('IN LOGIN METHOD CHECKING PROMISE');
    const { user, info } = await new Promise((resolve, reject) => {
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          console.log('IN IF ERR loop:', err);
          return reject(err);
        }
        if (!user) {
          console.log('IN IF !USER loop:', info);
          return resolve({ user: null, info });
        }
        console.log('USER AUTHENTICATED SUCCESSFULLY:', user);
        return resolve({ user, info });
      })(req, res);
    });

    if (user) {
      const token = user.generateJwt();
      console.log('TOKEN GENERATED:', token);
      res.status(200).json({ token });
    } else {
      console.log('USER NOT AUTHENTICATED:', info);
      res.status(401).json(info);
    }
  } catch (err) {
    console.log('LOGIN METHOD CATCH ERROR:', err);
    res.status(404).json(err);
  }
};

module.exports = {
  register,
  login
};
