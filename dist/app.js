"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const GlobalErrorHandlers_1 = __importDefault(require("./app/middleWares/GlobalErrorHandlers"));
const index_1 = __importDefault(require("./app/routes/index"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.get('/', (req, res) => {
    res.json({ message: 'everything working fine' });
});
app.use('/api/v1', index_1.default);
app.use(GlobalErrorHandlers_1.default);
//handle not found / unknow route
app.use((req, res) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'Api Not Found',
            },
        ],
    });
});
exports.default = app;
