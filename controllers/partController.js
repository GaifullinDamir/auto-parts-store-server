import PartModel from '../models/part.js';
import PartInfoModel from '../models/partInfo.js';

export const createPart = async(req, res) => {
    try {
        let {name, price, imgUrl, brandId, typeId, info} = req.body;

        const doc = new PartModel({
            name,
            price,
            imgUrl,
            brandId,
            typeId
        });

        const part = await doc.save();

        if (info) {
            info = JSON.parse(info)
            info.forEach(info =>
                PartInfo.create({
                    title: info.title,
                    description: info.description,
                    partId: part._id
                })
            );
        };

        res.json(part);
    } catch (error) {
        console.log('Part creation failed: ', error);
        res.status(500).json({
            message: 'Part creation failed.',
        });
    }
};

export const getAllParts = async(req, res) => {
    try {
        const parts = await PartModel.find();

        res.json(parts);
    } catch (error) {
        console.log('Failed to get parts: ', error);
        res.status(500).json({
            message: 'Failed to get parts.',
        });
    }
}

export const getOnePart = async(req, res) => {
    try {
        const partId = req.params.id;
        const part = await BasketModel.findOne({_id: partId});

        res.json(part);
    } catch (error) {
        console.log('Failed to get part: ', error);
        res.status(500).json({
            message: 'Failed to get part.',
        });
    }
};

export const updatePart = async (req, res) => {
    try{
        const partId = req.params.id;
        await PartModel.updateOne({
            _id: partId
        }, {
            name: req.body.name,
            price: req.body.price,
            rating: req.body.rating,
            imgUrl: req.body.imgUrl,
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
            message: 'The part update failed.',
        });
    }
}; 

export const removePart = (req, res) => {
    try {
        const partId = req.params.id;

        PartModel.findOneAndDelete({
                _id: partId
            },
            (error, doc) => {
                if (error) {
                    console.log('Error when deleting a part: ', error);
                    return res.status(500).json({
                        message: 'Error when deleting a part.',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Part not found.',
                    })
                }

                res.json({
                    success: true
                });
            });
    } catch (error) {
        console.log('Error when deleting a part: ', error);
        return res.status(500).json({
            message: 'Error when deleting a part.',
        });
    }
}