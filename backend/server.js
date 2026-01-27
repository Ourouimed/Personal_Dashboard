import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';


const app = express()
dotenv.config();
const PORT = process.env.PORT || 5000;


// Connect to Database
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    createUser()
    res.json({})
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});