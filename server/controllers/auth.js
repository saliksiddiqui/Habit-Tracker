import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_KEY, { expiresIn: "30d" });
};


// register
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "deatils not found" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)
    
    const user = await User.create({ username, email, password:hashPassword});
    const token = await generateToken(user._id);
    res.status(201).json({ user, message: "user created successfully", token});
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};


// login
export const userlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Details not found" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (!isPassCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successfully",
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


//fetchuser
export const fetchUser = async (req, res) =>{
  // const id = req.user._id;
  //  const habits = await Habit.find({id});
    res.status(200).json({message:"User Authorized", user:req.user})
}


