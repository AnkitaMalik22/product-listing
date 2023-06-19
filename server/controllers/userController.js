const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/errorHandler");
const { isAuthenticated } = require("../middleware/auth");

const register = async (req, res, next) => {
  const { name, email, mobile, password } = req.body;

  if (!email || !password || !name || !mobile) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (await User.findOne({ email })) {
    return res.status(400).json({ message: "User already exists" });
  }
  try {
    const user = await User.findOne({ email });
    if (user) {
      next(new Error("User Already Exists"));
    }
    const passwordHashed = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      name,
      email,
      mobile,
      password: passwordHashed,
    });
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.send({
      status: "SUCCESS",
      message: "User registerd successfully",
      token,
    });
  } catch (err) {
    next(new Error("Something went wrong! Please try after some time."));
  }
};

// LOGIN

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      } else {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "10d",
        });
        res.json({
          status: "SUCCESS",
          message: "User logged in successfully",
          token,
        });
      }
    } else {
      next(new Error("User not found"));
    }
  } catch (error) {
    
    next(new Error("Something went wrong! Please try after some time."));
  }
};

module.exports = { register, login };
