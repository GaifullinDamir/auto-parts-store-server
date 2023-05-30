import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/user.js';

dotenv.config();

const _SECRET_KEY = process.env.SECRET_KEY;

export const register = async (req, res) => {
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
};

export const login = async(req, res) => {
    try {
        const user = await UserModel.findOne( {email: req.body.email});

        if (!user) {
            return res.status(404).json({
                message: 'Authorization failed.',
            });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isValidPassword) {
            return res.status(400).json({
                message: 'Authorization failed.',
            });
        }

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
        console.log('Authorization failed:', error);
        res.status(500).json({
            message: 'Authorization failed.',
        });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if(!user) {
            res.status(404).json({
                message:'User is not found.'
            });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (error) {
        console.log('No access.:', error);
        res.status(500).json({
            message: 'No access.',
        });
    }
};