const jwt = require('jsonwebtoken');
const userDal = require('../dal/user-dal');
// const fs = require('fs');
// const path = require('path');
const bcrypt = require('bcrypt');

/**
 * @returns an error message if the user data is invalid
 */
function validateUserData(user) {
  try {
    if (!user.password || !user.email || !user.userName) {
      return 'Some fields are missing';
    }

    if (typeof user.password !== 'string') {
      return 'Password must be a string';
    }

    if (user.password !== user.passwordRepeat) {
      return 'Passwords do not match';
    }
    if (user.password.length < 6) {
      return 'Passwords too short, minimum 6 chars';
    }
  } catch (err) {
    return err.message;
  }
}

async function signup(req, res) {
  try {
    const user = req.body;
    const isUserExist = await userDal.getUserByEmail(user.email);
    if (isUserExist) {
      return res.status(400).send({ message: 'Email already exist' });
    }

    console.log(req.body.password);
    const hashedPassword = await bcrypt.hash(`${req.body.password}`, 8);
    const newUser = await userDal.createUser({
      email: user.email,
      password: hashedPassword,
      userName: user.userName,
    });
    res.json(newUser);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
}

const invalidMessage = 'Invalid Email or Password';
const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userDal.getUserByEmail(email);
    console.log(user);

    if (!user) {
      return res.status(400).send({ message: invalidMessage });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(400).send({ message: invalidMessage });
    }
    const userData = {
      _id: user._id,
      email: user.email,
      userName: user.userName,
    };

    const twoDays = 2 * 24 * 60 * 60;
    const token = jwt.sign(userData, process.env.JWT, { expiresIn: twoDays });
    res.cookie('jwt', token, { secure: true, maxAge: twoDays * 1000 });

    res.json(userData);
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

const userController = {
  signup,
  login,
  getAllUsers,
};

module.exports = userController;
