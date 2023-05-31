import BrandModel from '../models/brand.js';

export const create = async (req, res) => {
    try {
        const {name} = req.body;
        const doc = new BrandModel({
            name
        });

        const brand = await doc.save();

        res.json(brand);
    } catch (error) {
        console.log('Brand creation failed: ', error);
        res.status(500).json({
            message: 'Brand creation failed.',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const brands = await BrandModel.find();

        res.json(brands);
    } catch (error) {
        console.log('Failed to get brands information: ', error);
        res.status(500).json({
            message: 'Failed to get brands information.',
        });
    }
};

export const getOne = async(req, res) => {
    try {
        const brandId = req.params.id;
        const brand = await BasketModel.findOne({_id: brandId});

        res.json(brand);
    } catch (error) {
        console.log('Failed to get brand information: ', error);
        res.status(500).json({
            message: 'Failed to get brand information.',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const brandId = req.params.id;

        BrandModel.findOneAndDelete({
                _id: brandId
            },
            (error, doc) => {
                if (error) {
                    console.log('Error when deleting a brand: ', error);
                    return res.status(500).json({
                        message: 'Error when deleting a brand.',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Brand not found.',
                    })
                }

                res.json({
                    success: true
                });
            });
    } catch (error) {
        console.log('Error when deleting a brand: ', error);
        return res.status(500).json({
            message: 'Error when deleting a brand.',
        });
    }
};

export const update = async (req, res) => {
    try{
        const brandId = req.params.id;
        await BrandModel.updateOne({
            _id: brandId
        }, {
            name: req.body.name,
        })
        
        res.json({
            success: true,
        })
    } catch (error) {
        console.log('The brand update failed.: ', error);
        res.status(500).json({
            message: 'The brand update failed.',
        });
    }
}; 