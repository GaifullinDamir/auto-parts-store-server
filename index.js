import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const _HOST = 'http://localhost:';
const _PORT = 8080;
const _dbName = 'auto-parts-store-db';

mongoose.connect(`mongodb://127.0.0.1:27017/${_dbName}`).
    then(() => {
        console.log(`Connection with the database "${_dbName}" is established.`);
    }).
    catch((error) => console.log(`The following error occurred while connecting to the "${_dbName}" database:`, error));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/auth/login', (req, res) => {

    const token = jwt.sign(
    {
        email: req.body.email,
        fullName: 'Вася Пупкин',
    }, 
    'secretkey',
    );

    res.json({
        success: true,
        token,
    });
});

app.listen(_PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`The server is running. URL: ${_HOST}${_PORT}`);
});

