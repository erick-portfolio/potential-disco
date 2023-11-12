const xml2js = require('xml2js');

async function transformRSSData(xml) {
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

module.exports = transformRSSData;
