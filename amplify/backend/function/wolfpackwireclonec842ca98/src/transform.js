const { parseDocument } = require('htmlparser2');
const cssSelect = require('css-select');
const xml2js = require('xml2js');
const utils = require('./utils'); // Import the utility functions


async function transform(data, source) {
    if (source.customTransform) {
        // Use custom transformation function if provided
        return source.customTransform(data);
    }

    // Standard transformation logic
    switch (source.itemType) {
        case 'html':
            return await transformHTML(data, source.parseRules);
        case 'json':
            return await transformJSON(data, source.parseRules);
        case 'rss':
            return await transformRSS(data);
        case 'rss-atom':
            return await transformRSSAtom(data);
        default:
            throw new Error('Unsupported item type');
    }
}

function transformHTML(html, rules) {
    const document = parseDocument(html);
    return cssSelect.selectAll(rules.itemSelector, document).map(element => {
        return {
            title: utils.extractText(cssSelect.selectOne(rules.titleSelector, element)),
            link: utils.extractHref(cssSelect.selectOne(rules.linkSelector, element), rules.linkPrefix),
            author: utils.extractText(cssSelect.selectOne(rules.authorSelector, element)),
            pubDate: utils.extractText(cssSelect.selectOne(rules.pubDateSelector, element))
        };
    });
}

function transformJSON(jsonData, rules) {
    return jsonData.map(item => {
        return {
            title: item[rules.titleField],
            link: rules.linkPrefix ? rules.linkPrefix + item[rules.linkField] : item[rules.linkField],
            author: item[rules.authorField],
            pubDate: item[rules.pubDateField]
        };
    });
}

async function transformRSS(xml) {
    const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
    const result = await parser.parseStringPromise(xml);
    const items = result.rss.channel.item;

    return items.map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        author: item.author || item.creator
    }));
} 

async function transformRSSAtom(xml) {
    const parser = new xml2js.Parser({ explicitArray: false, mergeAttrs: true });
    let transformedItems = [];

    try {
        // console.log(`Transforming data for BackingThePack, received XML: ${xml.substring(0, 200)}...`); // Log first 200 characters of XML for debugging

        const result = await parser.parseStringPromise(xml);

        if (result.feed && result.feed.entry) {
            const entries = Array.isArray(result.feed.entry) ? result.feed.entry : [result.feed.entry]; // Ensure entries is an array

            transformedItems = entries.map(entry => {
                return {
                    title: entry.title || 'No title',
                    link: (entry.link && entry.link.href) ? entry.link.href : 'No link',
                    pubDate: entry.updated || 'No publication date',
                    author: (entry.author && entry.author.name) ? entry.author.name : 'No author'
                };
            });

            // console.log(`Transformed ${transformedItems.length} items for BackingThePack`);
        } else {
            console.log('No entries found in feed.');
        }
    } catch (error) {
        console.error('Error transforming Atom feed data:', error);
    }
    // console.log('Erick ' + JSON.stringify(transformedItems));
    return transformedItems;
}



module.exports = transform;
