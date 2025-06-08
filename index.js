import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'hi, this is a simple express server',
    });
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});