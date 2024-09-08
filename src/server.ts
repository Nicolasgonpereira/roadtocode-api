
import express, { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import { router } from "./routes";

const port = 3000;
const server = express();

const limiter = rateLimit({
    windowMs: 10*60*1000,
    max: 10,
    message: "Muitas requisições vindas deste IP, tente novamente mais tarde.",
    statusCode: 429,
    skipSuccessfulRequests: true,
    headers: true,
    handler: (request: Request, response: Response) => {
        response.status(429).json({
            message: 'Muitas requisições. Tente novamente mais tarde'
        });
    },
});

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', `${process.env.CORSOrigin}`);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

server.use(limiter);

server.use(express.json());

server.use(router);

server.listen(port);