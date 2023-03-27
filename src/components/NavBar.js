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
exports.NavBar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
function NavBar(_a) {
    var isDarkMode = _a.isDarkMode, toggleDarkMode = _a.toggleDarkMode;
    return ((0, jsx_runtime_1.jsxs)("nav", __assign({ className: "navbar navbar-expand-lg ".concat(isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light") }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ style: { paddingLeft: "20px", paddingRight: "20px" } }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ className: "navbar-brand", href: "/" }, { children: "WolfpackWireClone" }), void 0) }), void 0), (0, jsx_runtime_1.jsx)("div", __assign({ className: "ml-auto" }, { children: (0, jsx_runtime_1.jsx)("button", __assign({ className: "btn btn-outline-".concat(isDarkMode ? "light" : "dark"), onClick: toggleDarkMode }, { children: isDarkMode ? "Light Mode" : "Dark Mode" }), void 0) }), void 0)] }), void 0));
}
exports.NavBar = NavBar;
exports.default = NavBar;
