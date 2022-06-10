import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const isCustomAuth = token.length < 500;
    if (token && isCustomAuth) {
      const decodedData = jwt.verify(token, process.env.SECRET);
      req.userId = decodedData?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
