import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productsRouter from './routes/productsRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import orderRouter from './routes/orderRout.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(
    (req, res, next) => {
        const tokenString = req.header("Authorization");
        if(tokenString != null) {
            const token = tokenString.replace("Bearer ", "");
            //console.log(token);

            jwt.verify(token, "mysecretkey", 
                (err, decoded) => {
                    if (decoded != null) {
                        req.user = decoded;
                        next();
                    }else{
                        console.log(err);
                        res.status(401).json({
                            message: 'Unauthorized'
                        });
                    }
                }
            )
        }else{
            next();
        }
        
    }
)

app.use('/api/products', productsRouter); 
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter)

mongoose.connect(process.env.MONGODB_URL).then(
    () => {
        console.log('Connected to MongoDB');
    }
).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});