import BasketPartModel from '../models/basketPart.js';

export const create = async (req, res) => {
    try {
        const doc = new BasketPartModel({
            basket: req.body.basketId,
            part: req.body.partId,
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
