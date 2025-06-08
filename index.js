import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';


const app = express();
app.use(bodyParser.json());
app.use('/students', studentRouter);

mongoose.connect("mongodb+srv://Nimesha:nimesha@cluster0.mshl9m6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    () => {
        console.log('Connected to MongoDB');
    }
).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});