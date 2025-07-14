import bcrypt from "bcrypt";
import User from "../models/Users.js";
import generateToken from "../utilities/generateToken.js";

const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    // check if user already exists
    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    // save user do database
    const salt = await bcrypt.genSalt(10);
    const hashedPassowrd = await bcrypt.hash(password, salt);
    user = await User.create({
      username,
      email,
      password: hashedPassowrd,
      role,
    });
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User is registered", user: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });

    const token = generateToken(user);
    res.status(200).json({
      success: false,
      message: "User successfully logged in",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occured while logging user",
      error: error.message,
    });
  }
};

export { registerUser, loginUser };
