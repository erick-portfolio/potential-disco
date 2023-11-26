const { parseDocument } = require('htmlparser2');
const cssSelect = require('css-select');
const utils = require('./utils'); // Import the utility functions
const xml2js = require('xml2js');


const sourcesConfig =
  [
    {
      name: 'CBSSports',
      url: 'https://www.cbssports.com/college-football/teams/NCST/nc-state-wolfpack/',
      responseType: 'text',
      customTransform: function (html) {
        const document = parseDocument(html);
        const feedArray = [];
    
        const itemElements = cssSelect.selectAll('.NewsFeed-container', document);
        itemElements.forEach(element => {
          const titleEl = cssSelect.selectOne('.NewsFeed-title a', element);
          const title = titleEl ? utils.extractText(titleEl).trim() : '';
          const link = titleEl && titleEl.attribs.href ? titleEl.attribs.href.trim() : '';
          const authorEl = cssSelect.selectOne('.NewsFeed-author', element);
          const author = authorEl ? utils.extractText(authorEl).trim() : '';
          const pubDateEl = cssSelect.selectOne('.NewsFeed-date time', element);
          const pubDate = pubDateEl ? utils.extractText(pubDateEl).trim() : '';
    
          feedArray.push({ title, link, pubDate, author });
        });
    
        // Returning an object with homepage, sourceTitle, and feed array
        return {
          homepage: 'https://www.cbssports.com/college-football/teams/NCST/nc-state-wolfpack/',
          sourceTitle: 'CBS Sports',
          feed: feedArray
        };
      }
    },
    {
      name: 'GoPack',
      url: 'https://gopack.com/services/adaptive_components.ashx?type=stories&count=6&start=0&sport_id=0',
      responseType: 'json',
      customTransform: function (jsonData) {
        // Mapping each item in the jsonData to the desired format
        const feedItems = jsonData.map(item => ({
          title: item.title,
          link: 'https://gopack.com' + item.url,
          pubDate: item.content_date,
          author: item.writer ?? ''
        }));
    
        // Returning an object with homepage, sourceTitle, and feed array
        return {
          homepage: 'https://gopack.com/',
          sourceTitle: 'Go Pack',
          feed: feedItems
        };
      }
    },
    {
      name: 'InsidePack',
      url: 'https://insidepacksports.com/premium/feed',
      responseType: 'text',
      customTransform: function (html) {
        const document = parseDocument(html);
        const feedArray = [];
        
        cssSelect.selectAll('.story.item', document).forEach(element => {
          const author = utils.extractText(cssSelect.selectOne('.author-link', element));
          const link = utils.extractHref(cssSelect.selectOne('a', element));
          let pubDate = utils.extractText(cssSelect.selectOne('.details', element), true);
          // Sanitize the pubDate by removing unwanted characters
          pubDate = pubDate.replace(/^[\s\S]*?(\d+)/, '$1'); // This will remove any characters before the first digit
    
          const title = utils.extractText(cssSelect.selectOne('.title', element));
    
          feedArray.push({ author, link, pubDate, title });
        });
    
        // Returning an object with homepage, sourceTitle, and feed array
        return {
          homepage: 'https://insidepacksports.com/',
          sourceTitle: 'Inside Pack Sports',
          feed: feedArray
        };
      }
    },
    {
      name: 'Technician',
      url: 'https://www.technicianonline.com/sports',
      responseType: 'text',
      customTransform: function (html) {
        const document = parseDocument(html);
        const feedArray = [];
    
        cssSelect.selectAll('.tnt-headline.headline', document).forEach(element => {
          const linkElement = cssSelect.selectOne('a', element);
          const title = utils.extractText(element).trim();
          const link = linkElement ? linkElement.attribs.href : '';
    
          if (title && link) {
            feedArray.push({ author: '', link, pubDate: 'Latest', title });
          }
        });
    
        cssSelect.selectAll('article', document).forEach(element => {
          const titleElement = cssSelect.selectOne('.tnt-asset-link', element);
          const linkElement = cssSelect.selectOne('a', element);
          const authorElement = cssSelect.selectOne("[id^='author']", element);
          const dateElement = cssSelect.selectOne('.asset-date', element);
    
          const title = titleElement ? titleElement.attribs['aria-label'] : 'Title Error';
          const link = linkElement ? linkElement.attribs.href : '';
          const author = authorElement ? utils.extractText(authorElement).trim() : '';
          const pubDate = dateElement ? utils.extractText(dateElement).trim() : 'Latest';
    
          if (title !== 'Title Error' && link) {
            feedArray.push({ author, link, pubDate, title });
          }
        });
    
        // Returning an object with homepage, sourceTitle, and feed array
        return {
          homepage: 'https://www.technicianonline.com/',
          sourceTitle: 'Technician',
          feed: feedArray
        };
      }
    },
    {
      name: 'Wolfpacker',
      url: 'https://www.on3.com/teams/nc-state-wolfpack/',
      responseType: 'text',
      customTransform: function (html) {
        const document = parseDocument(html);
        const feedArray = [];
    
        cssSelect.selectAll('article', document).forEach(element => {
          feedArray.push({
            author: utils.extractText(cssSelect.selectOne('.ArticleFeed_authorblock__eesEX, .ArticleCover_author__O0ZMp', element)),
            link: 'https://www.on3.com' + utils.extractHref(cssSelect.selectOne('a.MuiTypography-root, .ArticleCover_titlelink__TvbbB', element)),
            pubDate: utils.extractText(cssSelect.selectOne('.ArticleFeed_date__rTL2d, .ArticleCover_time__vAnWk', element), true),
            title: utils.extractText(cssSelect.selectOne('.ArticleFeed_title__ct_XL, .ArticleCover_title__7E2I0', element))
          });
        });
    
        // Returning an object with homepage, sourceTitle, and feed array
        return {
          homepage: 'https://www.on3.com/teams/nc-state-wolfpack/',
          sourceTitle: 'Wolfpacker',
          feed: feedArray
        };
      }
    },
    {
      name: 'PackInsider',
      url: 'https://packinsider.com/feed/',
      responseType: 'text',
      customTransform: async (xmlData) => {
        const parser = new xml2js.Parser({ explicitArray: false });
        const result = await parser.parseStringPromise(xmlData);
    
        // Mapping each entry in the feed to the desired format
        const feedItems = (Array.isArray(result.rss.channel.item) ? result.rss.channel.item : [result.rss.channel.item]).map(item => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          author: item.author || item['dc:creator']
        }));
    
        // Returning an object with homepage, sourceTitle, and feed array
        return {
          homepage: 'https://packinsider.com/',
          sourceTitle: 'Pack Insider',
          feed: feedItems
        };
      }
    },
    // {
    //   name: 'BustingBrackets',
    //   url: 'https://bustingbrackets.com/acc/nc-state-wolfpack/feed/',
    //   responseType: 'text',
    //   customTransform: async (xmlData) => {
    //     const parser = new xml2js.Parser({ explicitArray: false });
    //     const result = await parser.parseStringPromise(xmlData);
    //     return result.rss.channel.item.map(item => ({
    //       title: item.title,
    //       link: item.link,
    //       pubDate: item.pubDate,
    //       author: item.author || item['dc:creator']
    //     }));
    //   }
    // },
    {
      name: 'BackingThePack',
      url: 'https://www.backingthepack.com/rss/current.xml',
      responseType: 'text',
      customTransform: async (xmlData) => {
        const parser = new xml2js.Parser({ explicitArray: false });
        const result = await parser.parseStringPromise(xmlData);
    
        // Mapping each entry to the desired format
        const feedItems = (Array.isArray(result.feed.entry) ? result.feed.entry : [result.feed.entry]).map(entry => ({
          title: entry.title,
          link: entry.id,
          pubDate: entry.updated,
          author: entry.author && entry.author.name
        }));
    
        // Returning an object with homepage, sourceTitle, and feed array
        return {
          homepage: 'https://www.backingthepack.com/',
          sourceTitle: 'Backing The Pack',
          feed: feedItems
        };
      }
    }    
  ];

module.exports = sourcesConfig;

