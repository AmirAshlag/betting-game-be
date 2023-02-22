const jwt = require('jsonwebtoken');
const userDal = require('../dal/user-dal');
// const fs = require('fs');
// const path = require('path');
const bcrypt = require('bcrypt');

/**
 * @returns an error message if the user data is invalid
 */

async function signup(req, res) {
  try {
    const user = req.body;
    const isUserExist = await userDal.getUserByEmail(user.email);
    console.log(isUserExist.length)
    if (isUserExist.length !== 0) {
      return res.status(400).send({ message: 'Email already exist' });
    }

    console.log(req.body.password);
    const hashedPassword = await bcrypt.hash(`${req.body.password}`, 8);
    const newUser = await userDal.createUser({
      email: user.email,
      password: hashedPassword,
      userName: user.userName,
    });
    res.send(newUser);
    console.log(newUser)
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
}

const invalidMessage = 'Invalid Email or Password';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDal.getUserByEmail(email);

    if (!user) {
      return res.status(400).send({ message: invalidMessage });
    }

    const passwordIsValid = await bcrypt.compare(`${password}`, user[0].password);

    if (!passwordIsValid) {
      return res.status(400).send({ message: invalidMessage });
    }

    const twoDays = 2 * 24 * 60 * 60;
    // console.log(user[0].toJSON());
    const token = jwt.sign(user[0].toJSON(), process.env.JWT, { expiresIn: twoDays });
    const decoded = jwt.decode(token)
    console.log(decoded)
    res.cookie('jwt',decoded, { maxAge: twoDays * 1000 });
    res.send(user[0]);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

async function getAllUsers(req, res) {
  try {
    const users = await userDal.getUsers();
    res.json({ users });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function getUserByCoins(req, res) {
  try {
    const id = req.params.coinsId;
    const user = await userDal.getUserById(id);
    res.send(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

function Logout(req, res) {
  res.cookie('jwt', {}, { expires: new Date(Date.now() + 1), httpOnly: true });
  res.send({ approved: 'loggedOut' });
  console.log('cookie deleted');
}

const userController = {
  signup,
  login,
  getAllUsers,
  getUserByCoins,
  Logout,
};

module.exports = userController;
