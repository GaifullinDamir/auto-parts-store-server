import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';

import { registerValidation } from './validation/validation.js';

import UserModel from './models/user.js';

dotenv.config();

const _HOST = process.env.HOST;
const _PORT = process.env.PORT;
const _DB_HOST = process.env.DB_HOST;
const _DB_PORT = process.env.DB_PORT;
const _DB_NAME = process.env.DB_NAME;
const _SECRET_KEY = process.env.SECRET_KEY;

mongoose.connect(`${_DB_HOST}${_DB_PORT}/${_DB_NAME}`).
    then(() => {
        console.log(`Connection with the database "${_DB_NAME}" is TRUE.`);
    }).
    catch((error) => console.log(`The following ERROR occurred while connecting to the "${_DB_NAME}" database: `, error));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            passwordHash: hash,
            role: req.body.role,
        })

        const user = await doc.save();

        const token = jwt.sign({
                _id: user._id,
            }, 
            _SECRET_KEY,
            {
                expiresIn: '30d',
            },
        );
        
        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        });
    } catch(error) {
        console.log('Registration failed:', error);
        res.status(500).json({
            message: 'Registration failed.',
        });
    }
});

app.listen(_PORT, (error) => {
    if (error) {
        return console.log(`An ERROR occurred while connecting to the server using the URL: ${_HOST}${_PORT}: `, error);
    }
    console.log(`The server is running - TRUE. URL: ${_HOST}${_PORT}`);
});

