import BasketModel from '../models/basket.js';
import BasketPartModel from '../models/basketPart.js';

export const create = async (req, res) => {
    try {
        const doc = new BasketModel({
            user: req.userId,
        });

        const basket = await doc.save();

        res.json(basket);
    } catch (error) {
        console.log('Basket creation failed: ', error);
        res.status(500).json({
            message: 'Basket creation failed.',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const baskets = await BasketModel.find().populate('user').exec();

        res.json(baskets);
    } catch (error) {
        console.log('Failed to get baskets information: ', error);
        res.status(500).json({
            message: 'Failed to get baskets information.',
        });
    }
};

export const getOne = async(req, res) => {
    try {
        const userId = req.userId;
        const basket = await BasketModel.findOne({user: userId}).populate('user').exec();

        res.json(basket);
    } catch (error) {
        console.log('Failed to get basket information: ', error);
        res.status(500).json({
            message: 'Failed to get basket information.',
        });
    }
};
