"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    res.status(data.statusCode).json({
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        data: data.data || null,
        meta: data.meta || null || undefined,
    });
};
exports.default = sendResponse;
