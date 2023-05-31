import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';

import { registerValidation, loginValidation } from './validation/validations.js';

import { handleValidationErrors, checkAuth } from './middleware/index.js';

import { UserController,
    BasketController, 
    BasketPartController, 
    PartController,
    PartInfoController, 
    TypeController,
    BrandController 
} from './controllers/index.js';

dotenv.config();

const _HOST = process.env.HOST;
const _PORT = process.env.PORT;
const _DB_HOST = process.env.DB_HOST;
const _DB_PORT = process.env.DB_PORT;
const _DB_NAME = process.env.DB_NAME;

mongoose.connect(`${_DB_HOST}${_DB_PORT}/${_DB_NAME}`).
    then(() => {
        console.log(`Connection with the database "${_DB_NAME}" is TRUE.`);
    }).
    catch((error) => console.log(`The following ERROR occurred while connecting to the "${_DB_NAME}" database: `, error));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());

app.use('/uploads/', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors,  UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/user', checkAuth, UserController.getUser);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/storage/${req.file.originalname}`,
    });
})

app.post('/basket', checkAuth, BasketController.create);
app.get('/basket', checkAuth, BasketController.getOne);

app.post('/basket-part',  checkAuth, BasketController.create);

app.post('/part', checkAuth, PartController.createPart);
app.get('/part', PartController.getAllParts);
app.get('/part/:id', PartController.getOnePart);
app.delete('/part/:id', checkAuth, PartController.removePart);
app.patch('/part/:id', checkAuth, PartController.updatePart);

app.get('/part-info/:partId', PartInfoController.getPartInfo);
app.patch('/part-info/:partId', checkAuth, PartInfoController.updatePartInfo);

app.post('/type', checkAuth, TypeController.create);
app.get('/type', TypeController.getAll);
app.get('/type/:id', TypeController.getOne);
app.delete('/type/:id', TypeController.remove);
app.patch('/type/:id', TypeController.update);

app.post('/brand', checkAuth, BrandController.create);
app.get('/brand', BrandController.getAll);
app.get('/brand/:id', BrandController.getOne);
app.delete('/brand/:id', BrandController.remove);
app.patch('/brand/:id', BrandController.update);

app.listen(_PORT, (error) => {
    if (error) {
        return console.log(`An ERROR occurred while connecting to the server using the URL: ${_HOST}${_PORT}: `, error);
    }
    console.log(`The server is running - TRUE. URL: ${_HOST}${_PORT}`);
});

