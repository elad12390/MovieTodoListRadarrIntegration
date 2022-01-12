"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useEffectExceptFirst = exports.useEffect = void 0;
var react_1 = require("react");
function useEffect(effect, deps) {
    react_1.useEffect(function () {
        effect();
    }, deps);
}
exports.useEffect = useEffect;
function useEffectExceptFirst(effect, deps) {
    var _a = react_1.useState(true), skip = _a[0], setSkip = _a[1];
    react_1.useEffect(function () {
        if (skip) {
            setSkip(false);
            return;
        }
        effect();
    }, deps);
}
exports.useEffectExceptFirst = useEffectExceptFirst;
