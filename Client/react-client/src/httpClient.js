"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClient = void 0;
var axios_1 = __importDefault(require("axios"));
exports.httpClient = axios_1.default.create({
    baseURL: process.env.SERVER_BASE_URL || "http://localhost:8080"
});
exports.httpClient.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    console.error(error.response);
    return Promise.reject(error);
});
