import TypeModel from '../models/type.js';

export const create = async (req, res) => {
    try {
        const {name} = req.body;
        const doc = new TypeModel({
            name
        });

        const type = await doc.save();

        res.json(type);
    } catch (error) {
        console.log('Type creation failed: ', error);
        res.status(500).json({
            message: 'Type creation failed.',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const types = await TypeModel.find();

        res.json(types);
    } catch (error) {
        console.log('Failed to get types information: ', error);
        res.status(500).json({
            message: 'Failed to get types information.',
        });
    }
};

export const getOne = async(req, res) => {
    try {
        const typeId = req.params.id;
        const type = await TypeModel.findOne({_id: typeId});

        res.json(type);
    } catch (error) {
        console.log('Failed to get type information: ', error);
        res.status(500).json({
            message: 'Failed to get type information.',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const typeId = req.params.id;

        TypeModel.findOneAndDelete({
                _id: typeId
            },
            (error, doc) => {
                if (error) {
                    console.log('Error when deleting a type: ', error);
                    return res.status(500).json({
                        message: 'Error when deleting a type.',
                    });
                }

                if (!doc) {
                    return res.status(404).json({
                        message: 'Type not found.',
                    })
                }

                res.json({
                    success: true
                });
            });
    } catch (error) {
        console.log('Error when deleting a type: ', error);
        return res.status(500).json({
            message: 'Error when deleting a type.',
        });
    }
};

export const update = async (req, res) => {
    try{
        const typeId = req.params.id;
        await TypeModel.updateOne({
            _id: typeId
        }, {
            name: req.body.name,
        })
        
        res.json({
            success: true,
        })
    } catch (error) {
        console.log('The type update failed.: ', error);
        res.status(500).json({
            message: 'The type update failed.',
        });
    }
}; 