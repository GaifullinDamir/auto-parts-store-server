import BasketPartModel from '../models/basketPart.js';
import BasketModel from '../models/basket.js';
import PartModel from '../models/part.js'

export const create = async (req, res) => {
    try {
        const basket = await BasketModel.findOne({_id: '6478edc7ca9b158f3ac2ccb2'});
        const part = await PartModel.findOne({_id: req.body.partId});
        const doc = new BasketPartModel({
            fullname: req.body.fullname,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            orderIsPaid: req.body.orderIsPaid,
            basket: basket._id,
            part: part._id,
        })

        const basketPart = await doc.save();

        res.json(basketPart);
    } catch (error) {
        console.log('BasketPart creation failed: ', error);
        res.status(500).json({
            message: 'BasketPart creation failed.',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const basketId = req.params.basketId;
        const baskets = await BasketPartModel.find({basket: basketId}).populate('part').exec();
        res.json(baskets);
    } catch (error) {
        console.log('Failed to get basket parts information: ', error);
        res.status(500).json({
            message: 'Failed to get basket parts information.',
        });
    }
};

export const getOne = async(req, res) => {
    try {
        const basketPartId = req.params.basketPartId;
        const basketPart = await BasketPartModel.findOne({_id: basketPartId}).populate('part').exec();
        res.json(basketPart);
    } catch (error) {
        console.log('Failed to get basket information: ', error);
        res.status(500).json({
            message: 'Failed to get basket information.',
        });
    }
};

export const update = async (req, res) => {
    try{
        const basketPartId = req.params.id;
        await BasketPartModel.updateOne({
            _id: basketPartId
        }, {
            fullname: req.body.fullname,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            orderIsPaid: req.body.orderIsPaid,
        })
        
        res.json({
            success: true,
        })
    } catch (error) {
        console.log('The BasketPart update failed.: ', error);
        res.status(500).json({
            message: 'The BasketPart update failed.',
        });
    }
}; 

export const remove = async (req, res) => {
    try {
        const basketPartId = req.params.id;

        BasketPartModel.findOneAndDelete({
                _id: basketPartId
            },
            (error, doc) => {
                if (error) {
                    console.log('Error when deleting an item from the basket: ', error);
                    return res.status(500).json({
                        message: 'Error when deleting an item from the basket.',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Basket-part not found.',
                    })
                }

                res.json({
                    success: true
                });
            });
    } catch (error) {
        console.log('Error when deleting an item from the basket: ', error);
        return res.status(500).json({
            message: 'Error when deleting an item from the basket.',
        });
    }
}
