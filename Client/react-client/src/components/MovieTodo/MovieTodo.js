"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieTodo = void 0;
var models_1 = require("../../models");
var material_1 = require("@mui/material");
var react_1 = __importStar(require("react"));
var TvOutlined_1 = __importDefault(require("@mui/icons-material/TvOutlined"));
var AssignmentTurnedIn_1 = __importDefault(require("@mui/icons-material/AssignmentTurnedIn"));
var use_color_thief_1 = __importStar(require("use-color-thief"));
var colors_1 = require("@mui/material/colors");
var Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
var useEffectAsync_1 = require("../../utils/hooks/useEffectAsync");
var httpClient_1 = require("../../httpClient");
var useContext_1 = require("../../utils/hooks/useContext");
var App_1 = require("../Layout/App/App");
var MovieTodoAvatar = function (_a) {
    var title = _a.title, color = _a.color;
    return react_1.default.createElement(material_1.Avatar, { sx: { bgcolor: color }, "aria-label": "movie-title" }, title.split(' ').map(function (a) { return a[0]; }).filter(function (a) { return a == a.toUpperCase(); }).join(''));
};
var MovieTodo = function (movieTodoParams) {
    var id = movieTodoParams.id, radarrId = movieTodoParams.radarrId, title = movieTodoParams.title, movieSpan = movieTodoParams.movieSpan, imageSrc = movieTodoParams.imageSrc, overView = movieTodoParams.overView, isWatched = movieTodoParams.isWatched, onChange = movieTodoParams.onChange;
    var _a = react_1.useState(isWatched), watched = _a[0], setWatched = _a[1];
    var _b = react_1.useState('http://' + imageSrc), imageUrl = _b[0], _ = _b[1];
    var moviesStateFnResult = useContext_1.useContext(App_1.SharedContext, 'radarrMovies');
    var onWatchedClick = function () {
        setWatched(!watched);
    };
    var onDeleteClick = function (ev) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, httpClient_1.httpClient.delete("MovieTodo/" + id)];
                case 1:
                    _a.sent();
                    models_1.setTodoCreated(moviesStateFnResult, radarrId, false);
                    onChange === null || onChange === void 0 ? void 0 : onChange(__assign({}, movieTodoParams));
                    return [2 /*return*/];
            }
        });
    }); };
    useEffectAsync_1.useEffectExceptFirst(function () { return __awaiter(void 0, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = watched ? 'Watched' : 'NotWatched';
                    return [4 /*yield*/, httpClient_1.httpClient.put("MovieTodo/" + url + "/" + id)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [watched]);
    var color = use_color_thief_1.default(imageUrl, {
        format: use_color_thief_1.FormatString.hex,
        colorCount: 10,
        quality: 10,
    }).color;
    return (react_1.default.createElement(react_1.default.Fragment, null, react_1.default.createElement(material_1.Card, { style: { backgroundColor: watched ? colors_1.green[200] : colors_1.yellow[50] } },
        react_1.default.createElement(material_1.Grid, { container: true, spacing: 0 },
            react_1.default.createElement(material_1.Grid, { item: true, sx: { width: 114 } },
                react_1.default.createElement(material_1.CardMedia, { component: "img", sx: { height: 168, width: 114 }, image: imageUrl, alt: title })),
            react_1.default.createElement(material_1.Grid, { item: true, xs: true },
                react_1.default.createElement(material_1.CardHeader, { avatar: react_1.default.createElement(MovieTodoAvatar, { title: title, color: color }), title: title, subheader: movieSpan, sx: { padding: '.5rem' } }),
                react_1.default.createElement(material_1.CardContent, { sx: { maxHeight: '5.5rem', paddingTop: '5px' } },
                    react_1.default.createElement(material_1.FormGroup, null,
                        react_1.default.createElement(material_1.FormControlLabel, { control: react_1.default.createElement(material_1.Checkbox, { checked: watched, onClick: onWatchedClick, icon: react_1.default.createElement(TvOutlined_1.default, null), checkedIcon: react_1.default.createElement(AssignmentTurnedIn_1.default, null) }), label: watched ? "Watched" : "Need to Watch" })),
                    react_1.default.createElement(material_1.Typography, { sx: {
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                        }, variant: "body2", color: "text.secondary" }, overView))),
            react_1.default.createElement(material_1.Grid, { item: true, xs: 1 },
                react_1.default.createElement(material_1.Box, { sx: {
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    } },
                    react_1.default.createElement(material_1.IconButton, { onClick: onDeleteClick, "aria-label": "Delete", sx: { transform: 'scale(1.5)' } },
                        react_1.default.createElement(Delete_1.default, null))))))));
};
exports.MovieTodo = MovieTodo;
