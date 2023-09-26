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
    return res
      .status(400)
      .send({ status: "FAIL", message: "User already exists" });
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
      userName: newUser.name,
      userId: newUser._id,
    });
  } catch (err) {
    next(new Error("Something went wrong! Please try after some time."));
  }
};

// LOGIN

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "FAIL",
        message: "Missing required fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.status(200).json({
      status: "SUCCESS",
      message: "User logged in successfully",
      token,
      userName: user.name,
      userId: user._id,
    });
  } catch (error) {
    console.error(error.message);

    if (error.message === "User not found") {
      res.status(404).json({
        status: "FAIL",
        message: "User not found",
      });
    } else if (error.message === "Invalid credentials") {
      res.status(401).json({
        status: "FAIL",
        message: "Invalid credentials",
      });
    } else {
      res.status(500).json({
        status: "ERROR",
        message: "Something went wrong! Please try again later.",
      });
    }
  }
};

module.exports = { register, login };
