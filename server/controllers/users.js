import bcrypt from 'bcrypt'; // is used to hash the password so if it is hacked no one can know it as it wont be stored as a plain text
import jwt from 'jsonwebtoken'; // store the user in browser for some period of time
import userModel from '../model/userModel.js';
import dotenv from 'dotenv';
dotenv.config();
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: 'User is not found' });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(404).json({ message: 'Invalid credential' });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
export const signup = async (req, res) => {
  const { firstname, lastname, email, password, confirmpassword } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User is not found' });

    if (password !== confirmpassword)
      return res.status(400).json({ message: 'Passwords are not matched' });

    const hashPassword = await bcrypt.hash(password, 12);
    const result = await userModel.create({
      email,
      password: hashPassword,
      name: `${firstname} ${lastname}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      { expiresIn: '1h' }
    );
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
