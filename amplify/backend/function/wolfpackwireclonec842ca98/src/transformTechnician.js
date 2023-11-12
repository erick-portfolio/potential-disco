const { parseDocument } = require('htmlparser2');
const cssSelect = require('css-select');

function transformTechnicianData(html) {
    const document = parseDocument(html);
    const feedArray = [];

    // Process '.tnt-headline.headline' elements
    cssSelect.selectAll('.tnt-headline.headline', document).forEach(element => {
        const linkElement = cssSelect.selectOne('a', element);
        const title = extractText(element).trim();
        const link = linkElement ? linkElement.attribs.href : '';

        if (title && link) {
            feedArray.push({
                author: '',
                link: link,
                pubDate: 'Latest',
                title: title
            });
        }
    });

    // Process 'article' elements
    cssSelect.selectAll('article', document).forEach(element => {
        const titleElement = cssSelect.selectOne('.tnt-asset-link', element);
        const linkElement = cssSelect.selectOne('a', element);
        const authorElement = cssSelect.selectOne("[id^='author']", element);
        const dateElement = cssSelect.selectOne('.asset-date', element);

        const title = titleElement ? titleElement.attribs['aria-label'] : 'Title Error';
        const link = linkElement ? linkElement.attribs.href : '';
        const author = authorElement ? extractText(authorElement).trim() : '';
        const pubDate = dateElement ? extractText(dateElement).trim() : 'Latest';

        if (title !== 'Title Error' && link) {
            feedArray.push({
                author: author,
                link: link,
                pubDate: pubDate,
                title: title
            });
        }
    });

    return feedArray;
}

function extractText(element) {
    return element ? element.children.map(child => child.type === 'text' ? child.data : '').join('') : '';
}

module.exports = transformTechnicianData;
