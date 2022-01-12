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
exports.Header = void 0;
var material_1 = require("@mui/material");
var react_1 = __importDefault(require("react"));
var Search_1 = __importDefault(require("@mui/icons-material/Search"));
var useDebounceTime_1 = require("../../../utils/hooks/useDebounceTime");
var App_1 = require("../App/App");
var models_1 = require("../../../models");
var useEffectAsync_1 = require("../../../utils/hooks/useEffectAsync");
var httpClient_1 = require("../../../httpClient");
var useContext_1 = require("../../../utils/hooks/useContext");
var Search = material_1.styled('div')(function (_a) {
    var _b;
    var theme = _a.theme;
    return (_b = {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: material_1.alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: material_1.alpha(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%'
        },
        _b[theme.breakpoints.up('sm')] = {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        _b);
});
var SearchIconWrapper = material_1.styled('div')(function (_a) {
    var theme = _a.theme;
    return ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    });
});
(material_1.styled(material_1.InputBase)(function (_a) {
    var theme = _a.theme;
    return ({});
}));
var Header = function () {
    var _a = useContext_1.useContext(App_1.SharedContext, 'radarrMovies'), movies = _a[0], setMovies = _a[1];
    var _b = useContext_1.useContext(App_1.SharedContext, 'todos'), todos = _b[0], setTodos = _b[1];
    var searchInputOnChange = function (event, value) {
        event.preventDefault();
        event.stopPropagation();
        setSelectedRadarrMovie(value);
    };
    var _c = useDebounceTime_1.useDebounceTime(200), selectedRadarrMovie = _c[0], setSelectedRadarrMovie = _c[1];
    useEffectAsync_1.useEffect(function () { return __awaiter(void 0, void 0, void 0, function () {
        var newMovieTodos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!selectedRadarrMovie)
                        return [2 /*return*/];
                    setSelectedRadarrMovie(null);
                    return [4 /*yield*/, httpClient_1.httpClient.post("MovieTodo/" + selectedRadarrMovie.id)];
                case 1:
                    _a.sent();
                    models_1.setTodoCreated([movies, setMovies], selectedRadarrMovie.id, true);
                    return [4 /*yield*/, httpClient_1.httpClient.get('MovieTodo')];
                case 2:
                    newMovieTodos = (_a.sent()).data;
                    setTodos(newMovieTodos);
                    return [2 /*return*/];
            }
        });
    }); }, [selectedRadarrMovie]);
    return (react_1.default.createElement(material_1.Box, { sx: { flexGrow: 1 } },
        react_1.default.createElement(material_1.AppBar, { position: "static" },
            react_1.default.createElement(material_1.Toolbar, null,
                react_1.default.createElement(material_1.Typography, { variant: "h6", noWrap: true, component: "div", sx: { flexGrow: 1, display: { xs: 'none', sm: 'block' } } }, "Movie Todo List"),
                react_1.default.createElement(Search, { style: { display: 'flex' } },
                    react_1.default.createElement(SearchIconWrapper, null,
                        react_1.default.createElement(Search_1.default, null)),
                    react_1.default.createElement(material_1.Autocomplete, { disablePortal: true, sx: {
                            color: 'white',
                            width: 300,
                            '& .MuiOutlinedInput-input': {
                                paddingLeft: '2.3rem !important',
                                color: 'white',
                            },
                            '& .MuiInputLabel-root': {
                                paddingLeft: '2rem',
                                color: 'white',
                            }
                        }, groupBy: function (option) { return option.todoCreated == true ? 'Created' : option.title[0].toUpperCase(); }, getOptionDisabled: function (option) { return option.todoCreated === true; }, onChange: function (event, values) { return searchInputOnChange(event, values); }, options: movies && movies.sort(function (m1, m2) {
                            if (m1.todoCreated === m2.todoCreated && m1.todoCreated === true) {
                                return 0;
                            }
                            else if (m1.todoCreated !== m2.todoCreated) {
                                return m1.todoCreated === true ? -1 : 1;
                            }
                            else {
                                return m1.title.localeCompare(m2.title);
                            }
                        }), autoSelect: false, isOptionEqualToValue: function (option, value) { return option.todoCreated === value.todoCreated && option.id === value.id; }, getOptionLabel: function (option) { return option.title; }, renderOption: function (props, option) { return react_1.default.createElement("li", __assign({}, props, { key: option.tmdbId }), option.title); }, renderInput: function (params) { return react_1.default.createElement(material_1.TextField, __assign({}, params)); } }))))));
};
exports.Header = Header;
