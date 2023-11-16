const { parseDocument } = require('htmlparser2');
const cssSelect = require('css-select');

const utils = {
  extractText: (element) => {
    return element ? element.children.map(child => child.type === 'text' ? child.data : '').join('').trim() : '';
  },

  extractHref: (element) => {
    return element && element.attribs.href ? element.attribs.href.trim() : '';
  },

  // Other common functions can be added here
};

module.exports = utils;
