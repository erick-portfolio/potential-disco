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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Websites = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var RSS_1 = __importDefault(require("./RSS"));
function Websites() {
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "album py-5" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "row" }, { children: [(0, jsx_runtime_1.jsx)("div", __assign({ className: "col-md-4" }, { children: (0, jsx_runtime_1.jsx)(RSS_1.default, { url: "https://rss.app/feeds/SKuOSGkvoiukNpK5.xml", title: 'The Wolfpacker Home' }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("div", __assign({ className: "col-md-4" }, { children: (0, jsx_runtime_1.jsx)(RSS_1.default, { url: "https://rss.app/feeds/MsjlAfcmoci3EEJB.xml", title: 'Busting Brackets' }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("div", __assign({ className: "col-md-4" }, { children: (0, jsx_runtime_1.jsx)(RSS_1.default, { url: "https://rss.app/feeds/YPScssqlk0pBw7pj.xml", title: 'Pack Insider' }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("div", __assign({ className: "col-md-4" }, { children: (0, jsx_runtime_1.jsx)(RSS_1.default, { url: "https://rss.app/feeds/iQCeBDPOUO0YMw8W.xml", title: 'Pack Pride' }, void 0) }), void 0), (0, jsx_runtime_1.jsx)("div", __assign({ className: "col-md-4" }, { children: (0, jsx_runtime_1.jsx)(RSS_1.default, { url: "https://rss.app/feeds/Av0Lou3zEW0ndNyZ.xml", title: 'Backing The Pack' }, void 0) }), void 0)] }), void 0) }), void 0));
}
exports.Websites = Websites;
exports.default = Websites;
