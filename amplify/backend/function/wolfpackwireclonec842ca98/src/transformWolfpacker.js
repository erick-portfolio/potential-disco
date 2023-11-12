const { parseDocument } = require('htmlparser2');
const cssSelect = require('css-select');

function transformWolfpackerData(html) {
    const document = parseDocument(html);
    const feedArray = [];

    cssSelect.selectAll('article', document).forEach(element => {
        feedArray.push({
            author: extractText(cssSelect.selectOne('.ArticleFeed_authorblock__eesEX, .ArticleCover_author__O0ZMp', element)),
            link: 'https://www.on3.com' + getHref(cssSelect.selectOne('a.MuiTypography-root, .ArticleCover_titlelink__TvbbB', element)),
            pubDate: extractText(cssSelect.selectOne('.ArticleFeed_date__rTL2d, .ArticleCover_time__vAnWk', element), true),
            title: extractText(cssSelect.selectOne('.ArticleFeed_title__ct_XL, .ArticleCover_title__7E2I0', element))
        });
    });

    return feedArray;
}

function extractText(element, removeChildren = false) {
    if (!element) return '';
    if (removeChildren) {
        element = {...element, children: []};
    }
    return element.children.map(child => child.type === 'text' ? child.data : '').join('').trim();
}

function getHref(element) {
    return element && element.attribs.href ? element.attribs.href.trim() : '';
}

module.exports = transformWolfpackerData;
