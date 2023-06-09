const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/proxy', async function(req, res) {
  const url = req.query.url;
  const decodedUrl = decodeURIComponent(url);

  try {
    const response = await axios.get(decodedUrl);

    // Extract the contents of the Atom feed from the response data
    const feedContents = response.data;

    res.json({ success: 'get call succeed!', feedContents });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the Atom feed.' });
  }
});


app.listen(3000, function() {
  console.log('App started');
});

module.exports = app;
