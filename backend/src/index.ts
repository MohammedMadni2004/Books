import express from 'express';
import userRouter from './routes/userRoute.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json({ limit: "35mb" }));
app.use('/api', userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});