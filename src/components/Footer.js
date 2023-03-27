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
exports.Footer = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
function Footer(_a) {
    var isDarkMode = _a.isDarkMode;
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "container".concat(isDarkMode ? " dark-mode" : "") }, { children: (0, jsx_runtime_1.jsxs)("footer", __assign({ className: "py-3 my-4" }, { children: [(0, jsx_runtime_1.jsx)("ul", __assign({ className: "nav justify-content-center border-bottom pb-3 mb-3" }, { children: (0, jsx_runtime_1.jsx)("li", __assign({ className: "nav-item" }, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: "/", className: "nav-link px-2 text-muted" }, { children: "WolfpackWireClone" }), void 0) }), void 0) }), void 0), (0, jsx_runtime_1.jsx)("p", __assign({ className: "text-center text-muted" }, { children: "WolfpackWireClone - A website that aggregates all NC state Athletic news." }), void 0)] }), void 0) }), void 0));
}
exports.Footer = Footer;
exports.default = Footer;
