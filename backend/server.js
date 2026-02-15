import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
// import routes
import authRouter from './routes/Auth.js'
import projectRouter from './routes/Projects.js'
import timelineRouter from './routes/Timeline.js'
import tasksRouter from './routes/Tasks.js'

import corsOptions from './middlewares/corsOption.js';
import cookieParser from 'cookie-parser';



const app = express()
dotenv.config();
const PORT = process.env.PORT || 5000;


// Connect to Database
connectDB();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser())


// define routes 
app.use('/api/auth' , authRouter)
app.use('/api/projects' , projectRouter)
app.use('/api/timeline' , timelineRouter)
app.use('/api/tasks' , tasksRouter)


app.get('/', (req, res) => {
    res.json({})
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});