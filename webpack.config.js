const path = require('path');

module.exports = {
  // other configuration options
  resolve: {
    fallback: {
      http: require.resolve('stream-http'),
      'rss-parser': require.resolve('rss-parser'),
    },
  },
};
