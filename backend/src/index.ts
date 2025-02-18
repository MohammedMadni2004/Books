import express from 'express';
import userRouter from './routes/userRoute';
import bodyParser from 'body-parser';
import cors from 'cors';
import reviewRouter from './routes/reviewRoutes';
import booksRouter from './routes/booksRoutes';

const app = express();
const port = 8000; 

app.use(bodyParser.json({ limit: "35mb" }));
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.use('/api', userRouter);
app.use('/api', reviewRouter);
app.use('/api', booksRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});