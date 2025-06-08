import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'hi, this is a simple express server',
    });

    console.log(req.body.name);
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});