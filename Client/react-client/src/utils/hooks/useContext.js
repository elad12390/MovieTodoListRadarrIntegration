"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContext = void 0;
var react_1 = require("react");
function useContext(context, key) {
    if (key === void 0) { key = null; }
    if (key !== null) {
        var ctx = react_1.useContext(context);
        if ((ctx === null || ctx === void 0 ? void 0 : ctx[key]) !== null) {
            return ctx[key];
        }
    }
    return react_1.useContext(context);
}
exports.useContext = useContext;
