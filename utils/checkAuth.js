import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const _SECRET_KEY = process.env.SECRET_KEY;

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, _SECRET_KEY);

            req.userId = decoded._id;
            next();
        } catch (error) {
            return res.status(403).json({
                message: 'No access.',
            });
        }
    } else {
        return res.status(403).json({
            message: 'No access.',
        });
    }
};