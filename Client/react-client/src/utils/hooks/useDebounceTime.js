"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebounceTime = void 0;
var react_1 = require("react");
function useDebounceTime(timeInMS, initialVal) {
    if (initialVal === void 0) { initialVal = undefined; }
    var _a = react_1.useState(initialVal), val = _a[0], setVal = _a[1];
    var timeout;
    var setDebounced = function (val) {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () {
            setVal(val);
        }, timeInMS);
    };
    return [val, setDebounced];
}
exports.useDebounceTime = useDebounceTime;
