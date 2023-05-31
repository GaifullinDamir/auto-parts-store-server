import PartModel from '../models/part.js';
import PartInfoModel from '../models/partInfo.js';

export const create = (req, res) => {
    try {
        let {name, price, brand, type, info} = req.body
        const doc = new PartModel({
            name,
            price,
            

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
let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)