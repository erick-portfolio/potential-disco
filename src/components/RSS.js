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
var react_1 = require("react");
var react_bootstrap_1 = require("react-bootstrap");
function RSS(_a) {
    var url = _a.url, title = _a.title, isDarkMode = _a.isDarkMode;
    var _b = (0, react_1.useState)([]), items = _b[0], setItems = _b[1];
    (0, react_1.useEffect)(function () {
        console.log("Fetching RSS feed from", url);
        fetch(url)
            .then(function (response) {
            console.log("Received response", response);
            return response.text();
        })
            .then(function (str) {
            console.log("Parsing XML", str);
            return new window.DOMParser().parseFromString(str, "text/xml");
        })
            .then(function (data) {
            console.log("Parsing RSS feed", data);
            var items = data.querySelectorAll("item");
            var rssItems = [];
            items.forEach(function (item) {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                rssItems.push({
                    title: (_b = (_a = item.querySelector("title")) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : "",
                    link: (_d = (_c = item.querySelector("link")) === null || _c === void 0 ? void 0 : _c.textContent) !== null && _d !== void 0 ? _d : "",
                    pubDate: (_f = (_e = item.querySelector("pubDate")) === null || _e === void 0 ? void 0 : _e.textContent) !== null && _f !== void 0 ? _f : "",
                    content: (_h = (_g = item.querySelector("content")) === null || _g === void 0 ? void 0 : _g.textContent) !== null && _h !== void 0 ? _h : "",
                });
            });
            console.log("Parsed items", rssItems);
            setItems(rssItems.slice(0, 6));
        })
            .catch(function (error) {
            console.error("Error fetching RSS feed", error);
        });
    }, [url]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "RSS ".concat(isDarkMode ? 'bg-dark text-white' : '') }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: title }, void 0), items.map(function (item, index) { return ((0, jsx_runtime_1.jsx)(react_bootstrap_1.Card, __assign({ className: "mb-3" }, { children: (0, jsx_runtime_1.jsxs)(react_bootstrap_1.Card.Body, { children: [(0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Title, { children: (0, jsx_runtime_1.jsx)("a", __assign({ href: item.link }, { children: item.title }), void 0) }, void 0), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Subtitle, __assign({ className: "mb-2 text-muted" }, { children: new Date(item.pubDate).toLocaleString() }), void 0), item.content && ((0, jsx_runtime_1.jsx)(react_bootstrap_1.Card.Text, { dangerouslySetInnerHTML: { __html: sanitizeHtml(item.content) } }, void 0))] }, void 0) }), index)); })] }), void 0));
}
function sanitizeHtml(html) {
    var doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent || "";
}
exports.default = RSS;
