import express from 'express';
import morgan from 'morgan'
import dotenv from 'dotenv';
dotenv.config()
import 'express-async-errors' // this will pass on errors to our error handler middleware
// db and authenticate user
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js'
import jobsRouter from './routes/jobsRoutes.js'
const app = express();
// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js'

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json()) // this json data available to use to use in the controllers

app.get('/', (req, res) => {
  res.json({msg:'Welcome!'});
});
app.get('/api/v1', (req, res) => {
  res.json({msg:'API!'});
});
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 8000;

const start = async ()=>{
  try{
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  }catch(error){
    console.log(error)
  }
}

start()