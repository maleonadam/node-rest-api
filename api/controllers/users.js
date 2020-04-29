const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// CREATE AN ACCOUNT
exports.usersSignUp = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          success: false,
          error: "Email already taken!",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (error, hash) => {
          if (error) {
            return res.status(500).json({ error: error });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });

            user
              .save()
              .then((result) => {
                return res.status(201).json({
                  success: true,
                  message: "Account created successfully...",
                });
              })
              .catch((error) => {
                return res.status(500).json({ success: false, error: error });
              });
          }
        });
      }
    });
};

// LOGIN USER
exports.usersSignIn = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });

    if (user.length < 1) {
      return res.status(401).json({
        success: false,
        error: "Auth failed!",
      });
    } else {
      bcrypt.compare(req.body.password, user[0].password, (error, result) => {
        if (error) {
          return res.status(401).json({
            success: false,
            error: "Auth failed!",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            success: true,
            message: "Auth successful...",
            token: token,
          });
        }
        res.status(401).json({
          success: false,
          error: "Auth failed!",
        });
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// DELETE AN ACCOUNT
exports.deleteAccount = async (req, res, next) => {
  try {
    const id = req.params.userId;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ success: false, error: "No record found!" });
    } else {
      await user.remove({ _id: id });

      return res.status(200).json({
        success: true,
        message: "Account deleted successfully...",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};
