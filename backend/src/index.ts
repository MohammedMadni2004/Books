import express from 'express';
import userRouter from './routes/userRoute.js';
import bodyParser from 'body-parser';
import reviewRouter from './routes/reviewRoutes.js';
import booksRouter from './routes/booksRoutes.js';

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: "35mb" }));
app.use('/api', userRouter);
app.use('/api',reviewRouter);
app.use('/api',booksRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  
});