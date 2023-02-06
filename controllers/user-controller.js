// const jwt = require('jsonwebtoken');
const userDal = require('../dal/user-dal');
// const fs = require('fs');
// const path = require('path');
const bcrypt = require('bcrypt');
const { User } = require('../models/user-model');
var jwt = require('jsonwebtoken');

async function hashPassword(plainPassword) {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    console.log('hash', hashedPassword);
    return hashedPassword;
  } catch (err) {
    // res.status(500).send(err);
    console.log(err);
  }
}

// function validateUserData(user) {
//   try {
//     if (!user.password || !user.email || !user.userName) {
//       return 'Some fields are missing';
//     }

//     if (user.password !== user.passwordRepeat) {
//       return 'Passwords do not match';
//     }
//     if (user.password.length < 6) {
//       return 'Passwords too short, minimum 6 chars';
//     }
//   } catch (err) {
//     // res.status(500).send(err);
//     console.log(err);
//   }
// }

async function updateUser(req, res) {
  try {
    const updatedUserData = req.body;
    const userId = req.params.userId;

    // const validationErrorMessage = validateUserData(updatedUserData);
    // if (validationErrorMessage) {
    //   return res.status(400).send({ message: validationErrorMessage });
    // }

    if (updatedUserData.email !== req.user.email) {
      const emailAlreadyExist = userDal.getUserByEmail(updatedUserData.email);
      if (emailAlreadyExist) {
        return res.status(400).send({ message: 'New email address already used' });
      }
    }

    const hashedPassword = await hashPassword(updatedUserData.password);
    const updatedUser = await userDal.updateUser(userId, {
      ...updatedUserData,
      password: hashedPassword,
      isAdmin: req.user.isAdmin,
    });
    res.json(updatedUser);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
}

async function signup(req, res) {
  try {
    const user = req.body;
    const hashedPassword = await bcrypt.hash(`${req.body.password}`, 8);
    // const validationErrorMessage = validateUserData(user);
    // if (validationErrorMessage) {
    //   return res.status(400).send({ message: validationErrorMessage });
    // }
    const isUserExist = await userDal.getUserByEmail(user.email);
    if (isUserExist) {
      return res.status(400).send({ message: 'Email already exist' });
    }
    const newUser = await userDal.createUser({
      email: user.email,
      password: hashedPassword,
      userName: user.userName,
      coins: user.coins,
    });
    res.send(newUser);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(400).send({ message: 'Some fields are missing' });
    }

    const user = await User.find({ email: req.body.email });
    console.log(user);

    if (user.length == 0) {
      return res.status(400).send({ message: 'Invalid Email or Password' });
    }

    const passwordIsValid = await bcrypt.compare(`${password}`, `${user[0].password}`);

    if (!passwordIsValid) {
      return res.status(400).send({ message: 'Invalid Email or Password' });
    }
    const userData = {
      _id: user[0]._id,
      email: user[0].email,
      userName: user[0].userName,
    };

    const token = jwt.sign(userData, 'amir2580', { expiresIn: '2 days' });
    const week = 7 * 24 * 60 * 60 * 1000;
    res.cookie('jwt', token, { secure: true, maxAge: week });

    res.send(userData);
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

// async function addPlayer(req, res) {
//   try {
//     const email = req.params.email;
//     const playerTwo = req.player2._id;
//     await gridDal.addPlayer(email, playerTwo);
//     res.json({ message: 'Player 2 added successfully' });
//   } catch (err) {
//     console.log(err);
//     return res.status(400).send({ message: err.message });
//   }
// }

const userController = {
  signup,
  login,
  getAllUsers,
  updateUser,
  // addPlayer,
};

module.exports = userController;
