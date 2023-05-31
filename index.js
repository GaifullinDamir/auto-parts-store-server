import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';

import { registerValidation, loginValidation } from './validation/validations.js';
import { checkAuth } from './utils/checkAuth.js';

import * as UserController from './controllers/userController.js';
import * as BasketController from './controllers/basketController.js';
import * as BasketPartController from './controllers/basketPartController.js';
import * as PartController from './controllers/partController.js';

dotenv.config();

const _HOST = process.env.HOST;
const _PORT = process.env.PORT;
const _DB_HOST = process.env.DB_HOST;
const _DB_PORT = process.env.DB_PORT;
const _DB_NAME = process.env.DB_NAME;

mongoose.connect(`${_DB_HOST}${_DB_PORT}/${_DB_NAME}`).
    then(() => {
        console.log(`Connection with the database "${_DB_NAME}" is TRUE.`);
    }).
    catch((error) => console.log(`The following ERROR occurred while connecting to the "${_DB_NAME}" database: `, error));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());

app.use('/uploads/', express.static('uploads'));

app.post('/auth/login', loginValidation, UserController.login);
app.post('/auth/register', registerValidation, UserController.register);
app.get('/auth/user', checkAuth, UserController.getUser);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
})

app.post('/basket', checkAuth, BasketController.create);
app.get('/basket', checkAuth, BasketController.getOne);
// app.delete('/basket', BasketController.remove);
// app.patch('/basket', BasketController.update); 

app.post('/basket-part',  checkAuth, BasketController.create);
// app.delete('/basket-part/:id', checkAuth, BasketController.remove);

app.patch('/part/:id', checkAuth, PartController.update);

app.listen(_PORT, (error) => {
    if (error) {
        return console.log(`An ERROR occurred while connecting to the server using the URL: ${_HOST}${_PORT}: `, error);
    }
    console.log(`The server is running - TRUE. URL: ${_HOST}${_PORT}`);
});

