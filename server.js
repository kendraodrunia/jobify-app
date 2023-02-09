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
const app = express(); // app is equal to http.createServer
//createServer takes in a request listener (which is a function that takes in a request (the api string) and response (body))
/**
 * 
 const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
})
 */
// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js';

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
app.use('/api/v1/jobs', authenticateUser, jobsRouter);


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 8000;

const start = async ()=>{
  try{
    await connectDB(process.env.MONGO_URL) // this how we connect to our mongoDB

    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    // you're streaming data, leaving a connection open, and any request from the client is listen
    // takes in a port to listen to
    // opens up on that specific port. then when clients on the frontend makes a request to that port, and since the app is lien to on that port, the request will be made
  }catch(error){
    console.log(error)
  }
}

start()