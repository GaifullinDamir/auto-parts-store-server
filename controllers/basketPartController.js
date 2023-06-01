import BasketPartModel from '../models/basketPart.js';
import BasketModel from '../models/basket.js';
import PartModel from '../models/part.js'

export const create = async (req, res) => {
    try {
        const basket = BasketModel.find({basket: req.body.basketId});
        const part = PartModel.find({part:req.body.partId});

        const doc = new BasketPartModel({
            fullname: req.body.fullname,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            orderIsPaid: req.body.orderIsPaid,
            basket,
            part,
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

export const update = async (req, res) => {
    try{
        const basketPartId = req.params.id;
        await BasketPartModel.updateOne({
            _id: basketPartId
        }, {
            ullname: req.body.fullname,
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
