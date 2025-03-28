import express, { NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express();

const devLogin = 'admin';

const devVisiblePassword = '$2b$10$K8kZcqlNj.6u1ZQ1RH4PDu5PwWtQDgGp5RLBvgNKLAc3Q3OZ6BIFy';

const sign = (object : Object) => {
    return jwt.sign({
        data: object
    }, 'my-secret-manager', {expiresIn: '1h'});
}

router.post('/connect', (req : Request, res : Response, next : NextFunction) => {
    const {login, visiblePassword} = req.body;
    try{
        if(login === devLogin){
            console.log('tr');
            bcrypt.compare(visiblePassword, devVisiblePassword, (err, match) => {
                if(err) next(err);
                if(match){
                    const token = sign({isConnected: true});
                    res.cookie('authToken', token, {maxAge: 3600, httpOnly: true});
                    res.status(200).json({message: 'successfully connected'})
                }
            });
        }else{
            res.status(403).json({messsage: 'Password or Login incorrect'});
        }
    }catch(err){
        res.status(500).json({message: 'server error'});
    }
});

export default router;