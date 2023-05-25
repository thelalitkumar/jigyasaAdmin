import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../schema/user.js";


const generateToken = (userId) => {
  // Generate a JWT token based on the user ID
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Set the token expiration time as needed
  });
};

export const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    // Generate a JWT token
    const token = generateToken(newUser._id);

    res.json({  token });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = generateToken(user._id);

    res.json({ username:user.username, token });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

