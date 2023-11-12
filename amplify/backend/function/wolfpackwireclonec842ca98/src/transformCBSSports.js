const { parseDocument } = require('htmlparser2');
const cssSelect = require('css-select');

function transformCBSData(html) {
    const document = parseDocument(html);
    const itemElements = cssSelect.selectAll('.NewsFeed-container', document);

    return itemElements.map(element => {
        // Select and extract title
        const titleEl = cssSelect.selectOne('.NewsFeed-title a', element);
        const title = titleEl ? titleEl.firstChild.data.trim() : '';

        // Select and extract link
        const link = titleEl && titleEl.attribs.href ? titleEl.attribs.href.trim() : '';

        // Select and extract author
        const authorEl = cssSelect.selectOne('.NewsFeed-author', element);
        const author = authorEl ? authorEl.firstChild.data.trim() : '';

        // Select and extract publication date
        const pubDateEl = cssSelect.selectOne('.NewsFeed-date time', element);
        const pubDate = pubDateEl ? pubDateEl.firstChild.data.trim() : '';

        return { title, link, pubDate, author };
    });
}

module.exports = transformCBSData;
