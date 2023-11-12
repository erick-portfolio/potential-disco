const { parseDocument } = require('htmlparser2');
const cssSelect = require('css-select');

function transformInsidePackData(html) {
    const document = parseDocument(html);
    const feedArray = [];

    cssSelect.selectAll('.story.item', document).forEach(element => {
        const author = getText(cssSelect.selectOne('.author-link', element));
        const link = getHref(cssSelect.selectOne('a', element));
        const pubDate = getText(cssSelect.selectOne('.details', element), true);
        const title = getText(cssSelect.selectOne('.title', element));

        feedArray.push({ author, link, pubDate, title });
    });

    return feedArray;
}

function getText(element, removeChildren = false) {
    if (!element) return '';
    if (removeChildren) {
        element = {...element, children: []};
    }
    return element.children.map(child => child.type === 'text' ? child.data : '').join('').trim();
}

function getHref(element) {
    return element && element.attribs.href ? element.attribs.href : '';
}

module.exports = transformInsidePackData;
