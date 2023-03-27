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
exports.Content = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var _1 = require(".");
function Content() {
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "Content", style: { paddingLeft: "20px" } }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: "" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "row" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "col-md-10" }, { children: (0, jsx_runtime_1.jsx)(_1.Websites, {}, void 0) }), void 0), (0, jsx_runtime_1.jsx)("div", __assign({ className: "col-md-2" }, { children: (0, jsx_runtime_1.jsx)(_1.Feed, {}, void 0) }), void 0)] }), void 0) }), void 0) }), void 0));
}
exports.Content = Content;
exports.default = Content;
