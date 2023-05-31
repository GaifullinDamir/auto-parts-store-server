export default (req, res, next) => {

    if(req.role === 'admin')
    {
        next();
    } else {
        return res.status(403).json({
            message: 'Access denied.',
        });
    }

}