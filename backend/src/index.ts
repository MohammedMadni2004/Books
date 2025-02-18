import express from 'express';
import userRouter from './routes/userRoute';
import bodyParser from 'body-parser';
import cors from 'cors';
import reviewRouter from './routes/reviewRoutes';
import booksRouter from './routes/booksRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: "35mb" }));
app.use('/api', userRouter);
app.use('/api',reviewRouter);
app.use('/api',booksRouter);
app.use(cors({ credentials: true, origin: true }));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  
});