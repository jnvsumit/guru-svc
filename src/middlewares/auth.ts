import {Request, Response, NextFunction} from 'express';

const Authentication = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers["x-token"] && req.headers["x-token"] === "fc8c0beb-ddbe-474a-8638-096321be89cd") {
        next();
    } else {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
}

export default Authentication;
