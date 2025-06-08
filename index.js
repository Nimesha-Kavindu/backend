import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';
import productsRouter from './routes/productsRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';


const app = express();
app.use(bodyParser.json());

app.use(
    (req, res, next) => {
        const tokenString = req.header("Authorization");
        if(tokenString != null) {
            const token = tokenString.replace("Bearer ", "");
            console.log(token);

            jwt.verify(token, "mysecretkey", 
                (err, decoded) => {
                    if (decoded != null) {
                        req.user = decoded;
                        next();
                    }else{
                        console.log(err);
                    }
                }
            )
        }
        
    }
)

app.use('/students', studentRouter);
app.use('/products', productsRouter); 
app.use('/users', userRouter);

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