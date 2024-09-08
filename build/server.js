"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const routes_1 = require("./routes");
const port = 3000;
const server = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000,
    max: 10,
    message: "Muitas requisições vindas deste IP, tente novamente mais tarde.",
    statusCode: 429,
    skipSuccessfulRequests: true,
    headers: true,
    handler: (request, response) => {
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
});
server.use(limiter);
server.use(express_1.default.json());
server.use(routes_1.router);
server.listen(port);
