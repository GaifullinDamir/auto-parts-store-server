import PartModel from '../models/part.js';
import PartInfoModel from '../models/partInfo.js';
import BrandModel from '../models/brand.js';
import TypeModel from '../models/type.js';

export const createPart = async (req, res) => {
    try {
        // console.log(req.body);
        const {name, price, imgUrl, brandId, typeId, info} = req.body;

        const brand = await BrandModel.findOne({_id: brandId});
        const type = await TypeModel.findOne({_id: typeId});

        const doc = new PartModel({
            name,
            price,
            imgUrl,
            brand,
            type,
        });

        const part = await doc.save();

        if (info) {
            let info_temp = JSON.parse(info);
            info_temp.forEach(info =>
                PartInfoModel.create({
                    title: info.title,
                    description: info.description,
                    part: part._id
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

export const getAllParts = async (req, res) => {
    try { 
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let parts;

        const brand = await BrandModel.findOne({_id: brandId});
        const type = await TypeModel.findOne({_id: typeId});

        let count;

        if (!brandId && !typeId) {
            parts = await PartModel.find().skip(offset).limit(limit);
            count = await PartModel.count().exec();
        }
        if (brandId && !typeId) {
            parts = await PartModel.find({brand}).skip(offset).limit(limit);
            count = await PartModel.count({brand}).exec();
        }
        if (!brandId && typeId) {
            parts = await PartModel.find({type}).skip(offset).limit(limit);
            count = await PartModel.count({type}).exec();
        }
        if (brandId && typeId) {
            parts = await PartModel.find({brand, type}).skip(offset).limit(limit);
            count = await PartModel.count({brand, type}).exec();
        }
        return res.json({parts, count});
    } catch (error) {
        console.log('Failed to get parts: ', error);
        res.status(500).json({
            message: 'Failed to get parts.',
        });
    }

}

export const getOnePart = async (req, res) => {
    try {
        const partId = req.params.id;
        const part = await PartModel.findOne({_id: partId});

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

export const removePart = async (req, res) => {
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
};

export const getPartInfo = async (req, res) => {
    try {
        const partId = req.params.partId;
        // const part = await PartModel.findOne({_id: partId});
        // console.log(part);
        const partInfo = await PartInfoModel.find({part: partId});

        res.json(partInfo);
    } catch (error) {
        console.log('Failed to get part info', error);
        res.status(500).json({
            message: 'Failed to get part info.',
        });
    }
};

export const updatePartInfo = async(req, res) => {
    try{
        const partId = req.params.id;
        await PartInfoModel.updateOne({
            part: partId
        }, {
            title: req.body.title,
            descritpion: req.body.descripton,
        });
        
        res.json({
            success: true,
        })
    } catch (error) {
        console.log('The part info update failed.: ', error);
        res.status(500).json({
            message: 'The part info update failed.',
        });
    }
}