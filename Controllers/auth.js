const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new Error("validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  try {
    const hashedPass = await bcrypt.hash(password, 12)
    
    const user = new User({
      email: email,
      name: name,
      password: hashedPass,
    });
    const result = await user.save();
    
   
    res.status(201).json({ message: "user created", userId: result._id });
  }
    catch(err)  {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await User.findOne({ email: email })
   
    if (!user) {
      const error = new Error("user is not registered");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    
    
    if (!isEqual) {
      const error = new Error("wrong password");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      "secret",
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: token, userId: loadedUser._id.toString() });
  }
    catch(err)  {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};
exports.getStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    
    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ status: user.status });
  }
    catch(err)  {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};

exports.updateUserStatus = async (req, res, next) => {
  const newStatus = req.body.status;
  try {
    const user = await User.findById(req.userId)
    
    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 404;
      throw error;
    }
    user.status = newStatus;
    await user.save();
    
    
    res.status(200).json({ message: "user updated" });
  }
    catch(err)  {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
};
