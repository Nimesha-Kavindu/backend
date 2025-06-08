import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://Nimesha:nimesha@cluster0.mshl9m6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    () => {
        console.log('Connected to MongoDB');
    }
).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


app.get('/', (req, res) => {
    res.json({
        message: 'hi, this is a simple express server',
    });

    console.log(req.body.name);
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

//mongodb+srv://Nimesha:nimesha@cluster0.mshl9m6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0