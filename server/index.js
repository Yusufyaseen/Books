import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'; // so we can properly send a request
import mongoose from 'mongoose';
import userRouter from './Routes/users.js';
import postRouter from './Routes/posts.js';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(fileUpload());
app.use(express.static('files'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(
  cors({
    origin: '*',
  })
);
app.use(morgan('dev'));
console.log(__dirname);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.get('/', (req, res) => {
  res.send('Server Is Running');
});
app.get('/uploads/:file', (req, res) => {
  console.log('Hii');
  const { file } = req.params;
  res.sendFile(path.resolve(__dirname) + `/uploads/${file}`);
});
console.log('Begin');
const CONNECTION_URL =
  'mongodb+srv://memories:eng.youssef1@cluster0.lnvks.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;
console.log(new Date(Date.now()));
console.log(new Date());

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set("bufferCommands", false);
