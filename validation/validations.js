import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Email must be provided.').isEmail(),
    body('password', 'Password length must be at least 6 characters.').isLength({ min: 6 }),
    body('role', 'Role is buyer or manager.').matches('buyer' || 'manager'),
];

export const loginValidation = [
    body('email', 'Email must be provided.').isEmail(),
    body('password', 'Password length must be at least 6 characters.').isLength({ min: 6 }),
];

export const partCreateValidation = [
    body('price', 'Cost - integer.').isInt(),
    body('rating', 'Rating - integer.').isInt(),
    body('img', 'img - url.').isURL(),
];
