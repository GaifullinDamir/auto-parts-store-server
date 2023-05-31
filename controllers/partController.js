import PartModel from '../models/part.js';
import PartInfoModel from '../models/partInfo.js';

export const create = async(req, res) => {
    try {
        let {name, price, brand, type, info} = req.body
        const doc = new PartModel({
            name,
            price,
            brand,
            type,
            img
        })

        const basket = await doc.save();

        res.json(basket);
    } catch (error) {
        console.log('Part creation failed: ', error);
        res.status(500).json({
            message: 'Part creation failed.',
        });
    }
};

export const update = async (req, res) => {
    try{
        const partId = req.params.id;
        await PartModel.updateOne({
            _id: partId
        }, {
            name: req.body.name,
            price: req.body.price,
            rating: req.body.rating,
            img: req.body.img,
            brand: req.body.brandId,
            type: req.body.typeId
        })

        await PartInfoModel.updateOne({
            part: partId
        }, {
            title: req.body.title,
            description: req.body.description,
        })
        
        res.json({
            success: true,
        })
    } catch (error) {
        console.log('The part update failed.: ', error);
        res.status(500).json({
            message: 'The part update failed..',
        });
    }
}; 