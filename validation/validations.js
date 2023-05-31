import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Email must be provided.').isEmail(),
    body('password', 'Password length must be at least 6 characters.').isLength({ min: 6 }),
    body('role', 'Role is buyer or admin.').matches('buyer' || 'admin'),
];

export const loginValidation = [
    body('email', 'Email must be provided.').isEmail(),
    body('password', 'Password length must be at least 6 characters.').isLength({ min: 6 }),
];


export const partCreateValidation = [
    body('price', 'Cost - integer.').isInt(),
    body('rating', 'Rating - integer.').isInt(),
    body('imgUrl', 'img - url.').isURL(),
];


export const brandCreateValidation = [
    body('name', 'Name is not an empty string.').isLength({ min: 1 }),
];