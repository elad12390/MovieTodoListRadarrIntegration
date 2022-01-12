"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.SharedContext = void 0;
var react_1 = __importStar(require("react"));
var Header_1 = require("../Header/Header");
var Main_1 = require("../Main/Main");
var httpClient_1 = require("../../../httpClient");
var useEffectAsync_1 = require("../../../utils/hooks/useEffectAsync");
exports.SharedContext = react_1.default.createContext({});
var App = function () {
    var todosUseState = react_1.useState([]);
    var radarrMoviesUseState = react_1.useState([]);
    var todos = todosUseState[0], setTodos = todosUseState[1];
    var radarrMovies = radarrMoviesUseState[0], setRadarrMovies = radarrMoviesUseState[1];
    useEffectAsync_1.useEffect(function () { return __awaiter(void 0, void 0, void 0, function () {
        var todos, radarrMovies, _loop_1, _i, todos_1, todo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, httpClient_1.httpClient.get("MovieTodo")];
                case 1:
                    todos = (_a.sent()).data;
                    setTodos(todos);
                    return [4 /*yield*/, httpClient_1.httpClient.get("radarr/movie")];
                case 2:
                    radarrMovies = (_a.sent()).data;
                    _loop_1 = function (todo) {
                        var movie = radarrMovies.find(function (m) { return m.id == todo.radarrId; });
                        if (movie) {
                            movie.todoCreated = true;
                        }
                    };
                    for (_i = 0, todos_1 = todos; _i < todos_1.length; _i++) {
                        todo = todos_1[_i];
                        _loop_1(todo);
                    }
                    setRadarrMovies(radarrMovies);
                    return [2 /*return*/];
            }
        });
    }); }, []);
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(exports.SharedContext.Provider, { value: { todos: todosUseState, radarrMovies: radarrMoviesUseState } },
            react_1.default.createElement("header", null,
                react_1.default.createElement(Header_1.Header, null)),
            react_1.default.createElement(Main_1.Main, null)));
};
exports.App = App;
