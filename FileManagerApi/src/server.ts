import express, { Request, Response, NextFunction } from 'express';
import RouterLogin from './router/LoginRouter';
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.use((req: Request, res: Response, next : NextFunction) => {
    console.log(req.body);
    next();
});

app.use('/api/login', RouterLogin);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur interne s\'est produite', error: err.message });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});