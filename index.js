import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/auth/login', (req, res) => {
    res.json({
        success: true,
    });
});

app.listen(8080, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server started on: http://localhost:8080');
});

