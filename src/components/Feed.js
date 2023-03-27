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
exports.Feed = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_twitter_widgets_1 = require("react-twitter-widgets");
function Feed(_a) {
    var isDarkMode = _a.isDarkMode;
    var options = {
        height: "1600",
        theme: isDarkMode ? "dark" : "light",
    };
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "mt-5" }, { children: (0, jsx_runtime_1.jsx)(react_twitter_widgets_1.Timeline, { dataSource: {
                sourceType: "list",
                ownerScreenName: "ErickGa03448617",
                slug: "1639559616253100032",
            }, options: options }, void 0) }), void 0));
}
exports.Feed = Feed;
exports.default = Feed;
