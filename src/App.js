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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
require("./App.css");
var react_1 = require("react");
var components_1 = require("./components");
function App() {
    var _a = (0, react_1.useState)(localStorage.getItem("isDarkMode") === "true"), isDarkMode = _a[0], setIsDarkMode = _a[1];
    var toggleDarkMode = function () {
        setIsDarkMode(!isDarkMode);
    };
    (0, react_1.useEffect)(function () {
        localStorage.setItem("isDarkMode", isDarkMode.toString());
    }, [isDarkMode]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "App".concat(isDarkMode ? " dark-mode" : "") }, { children: [(0, jsx_runtime_1.jsx)(components_1.NavBar, { isDarkMode: isDarkMode, toggleDarkMode: toggleDarkMode }, void 0), (0, jsx_runtime_1.jsx)(components_1.Content, { isDarkMode: isDarkMode }, void 0), (0, jsx_runtime_1.jsx)(components_1.Footer, { isDarkMode: isDarkMode }, void 0)] }), void 0));
}
exports.default = App;
