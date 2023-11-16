const { parseDocument } = require('htmlparser2');
const cssSelect = require('css-select');
const utils = require('./utils'); // Import the utility functions


const sourcesConfig =
  [
    {
      name: 'CBSSports',
      url: 'https://www.cbssports.com/college-football/teams/NCST/nc-state-wolfpack/',
      responseType: 'text',
      itemType: 'html',
      customTransform: function (html) {
        const document = parseDocument(html);
        const itemElements = cssSelect.selectAll('.NewsFeed-container', document);

        return itemElements.map(element => {
          const titleEl = cssSelect.selectOne('.NewsFeed-title a', element);
          const title = titleEl ? utils.extractText(titleEl).trim() : '';
          const link = titleEl && titleEl.attribs.href ? titleEl.attribs.href.trim() : '';
          const authorEl = cssSelect.selectOne('.NewsFeed-author', element);
          const author = authorEl ? utils.extractText(authorEl).trim() : '';
          const pubDateEl = cssSelect.selectOne('.NewsFeed-date time', element);
          const pubDate = pubDateEl ? utils.extractText(pubDateEl).trim() : '';

          return { title, link, pubDate, author };
        });
      }
    },
    {
      name: 'GoPack',
      url: 'https://gopack.com/services/adaptive_components.ashx?type=stories&count=6&start=0&sport_id=0',
      responseType: 'json',
      itemType: 'json',
      customTransform: function (jsonData) {
        return jsonData.map(item => ({
          title: item.title,
          link: 'https://gopack.com' + item.url,
          pubDate: item.content_date,
          author: item.writer ?? ''
        }));
      }
    },
    {
      name: 'InsidePack',
      url: 'https://insidepacksports.com/premium/feed',
      responseType: 'text',
      itemType: 'html',
      customTransform: function (html) {
        const document = parseDocument(html);
        const feedArray = [];

        cssSelect.selectAll('.story.item', document).forEach(element => {
          const author = utils.extractText(cssSelect.selectOne('.author-link', element));
          const link = utils.extractHref(cssSelect.selectOne('a', element));
          const pubDate = utils.extractText(cssSelect.selectOne('.details', element), true);
          const title = utils.extractText(cssSelect.selectOne('.title', element));

          feedArray.push({ author, link, pubDate, title });
        });

        return feedArray;
      }
    },
    {
      name: 'Technician',
      url: 'https://www.technicianonline.com/sports',
      responseType: 'text',
      itemType: 'html',
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

        return feedArray;
      }
    },
    {
      name: 'Wolfpacker',
      url: 'https://www.on3.com/teams/nc-state-wolfpack/',
      responseType: 'text',
      itemType: 'html',
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

        return feedArray;
      }
    },
    {
      name: 'PackInsider',
      url: 'https://packinsider.com/feed/',
      responseType: 'text',
      itemType: 'rss',
    },
    {
      name: 'BustingBrackets',
      url: 'https://bustingbrackets.com/acc/nc-state-wolfpack/feed/',
      responseType: 'text',
      itemType: 'rss',
    },
    {
      name: 'BackingThePack',
      url: 'https://www.backingthepack.com/rss/current.xml',
      responseType: 'text',
      itemType: 'rss-atom',
    }
  ];

module.exports = sourcesConfig;
