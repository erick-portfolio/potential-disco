const xml2js = require('xml2js');

async function transformRSSAtomData(xml) {
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

module.exports = transformRSSAtomData;
