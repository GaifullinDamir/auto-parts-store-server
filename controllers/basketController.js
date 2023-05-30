import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import BasketModel from '../models/basket.js';

export const create = async (req, res) => {
    try {
        const doc = new BasketModel({
            user: req.userId,
        })

        const basket = await doc.save();

        res.json(basket);
    } catch (error) {
        console.log('Basket creation failed: ', error);
        res.status(500).json({
            message: 'Basket creation failed.',
        });
    }
};