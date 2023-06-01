import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


import { registerValidation, loginValidation } from './validation/validations.js';

import { handleValidationErrors, checkIsAdmin, checkAuth } from './middleware/index.js';

import { UserController,
    BasketController, 
    BasketPartController, 
    PartController,
    TypeController,
    BrandController 
} from './controllers/index.js';

const result = dotenv.config();

const _HOST = process.env.HOST;
const _PORT = result.parsed.PORT;
const _DB_HOST = process.env.DB_HOST;
const _DB_PORT = process.env.DB_PORT;
const _DB_NAME = process.env.DB_NAME;
 
mongoose.connect(`${_DB_HOST}${_DB_PORT}/${_DB_NAME}`).
    then(() => {
        console.log(`Connection with the database "${_DB_NAME}" is TRUE.`);
    }).
    catch((error) => console.log(`The following ERROR occurred while connecting to the "${_DB_NAME}" database: `, error));

const app = express();

app.use(cors({
    origin: '*'
}));


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

app.post('/api/auth/login', loginValidation, handleValidationErrors,  UserController.login);
app.post('/api/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/api/auth/user', checkAuth, UserController.getUser);

app.post('/api/upload', checkAuth, checkIsAdmin, upload.single('image'), (req, res) => {
    res.json({
        url: `uploads/${req.file.originalname}`,
    });
})

app.post('/api/basket', checkAuth, BasketController.create);
app.get('/api/basket', checkAuth, BasketController.getOne);

app.post('/api/basket-part', checkAuth, BasketController.create);

app.post('/api/part', checkAuth, checkIsAdmin, PartController.createPart);
app.get('/api/part', PartController.getAllParts);
app.get('/api/part/:id', PartController.getOnePart);
app.delete('/api/part/:id', checkAuth, PartController.removePart);
app.patch('/api/part/:id', checkAuth, checkIsAdmin, PartController.updatePart);

app.get('/api/part-info/:partId', PartController.getPartInfo);
app.patch('/api/part-info/:partId', checkAuth, checkIsAdmin, PartController.updatePartInfo);

app.post('/api/type', checkAuth, checkIsAdmin, TypeController.create);
app.get('/api/type', TypeController.getAll);
app.get('/api/type/:id', TypeController.getOne);
app.delete('/api/type/:id', checkAuth, checkIsAdmin, TypeController.remove);
app.patch('/api/type/:id', checkAuth, checkIsAdmin, TypeController.update);

app.post('/api/brand', checkAuth, checkIsAdmin, BrandController.create);
app.get('/api/brand', BrandController.getAll);
app.get('/api/brand/:id', BrandController.getOne);
app.delete('/api/brand/:id',checkAuth, checkIsAdmin, BrandController.remove);
app.patch('/api/brand/:id', checkAuth, checkIsAdmin, BrandController.update);

app.listen(_PORT, (error) => {
    
    if (error) {
        return console.log(`An ERROR occurred while connecting to the server using the URL: ${_HOST}${_PORT}: `, error);
    }
    console.log(`The server is running - TRUE. URL: ${_HOST}${_PORT}`);
   
});

