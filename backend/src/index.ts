import express from 'express';
import userRouter from './routes/userRoute';
import bodyParser from 'body-parser';
import cors from 'cors';
import reviewRouter from './routes/reviewRoutes';
import booksRouter from './routes/booksRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: "35mb" }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/api', userRouter);
app.use('/api',reviewRouter);
app.use('/api',booksRouter);


app.options('*', cors());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  
});