const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fetch = require('node-fetch');
const transformCBSData = require('./transformCBSSports');
const transformGoPackData = require('./transformGoPack');
const transformInsidePackData = require('./transformInsidePack');
const transformRSSData = require('./transformRSS');
const transformRSSAtomData = require('./transformRSSAtom');
const transformTechnicianData = require('./transformTechnician');
const transformWolfpackerData = require('./transformWolfpacker');

const client = new S3Client({});

// Source configurations with responseType attribute
const sources = [
  {
    name: 'CBSSports',
    url: 'https://www.cbssports.com/college-football/teams/NCST/nc-state-wolfpack/',
    transform: transformCBSData,
    responseType: 'text' // HTML response
  },
  {
    name: 'GoPack',
    url: 'https://gopack.com/services/adaptive_components.ashx?type=stories&count=6&start=0&sport_id=0',
    transform: transformGoPackData,
    responseType: 'json' // JSON response
  },
  {
    name: 'InsidePack',
    url: 'https://insidepacksports.com/premium/feed',
    transform: transformInsidePackData,
    responseType: 'text' // HTML response
  },
  {
    name: 'PackInsider',
    url: 'https://packinsider.com/feed/',
    transform: transformRSSData,
    responseType: 'text' // RSS feed is XML (text) format
  },
  {
    name: 'BustingBrackets',
    url: 'https://bustingbrackets.com/acc/nc-state-wolfpack/feed/',
    transform: transformRSSData,
    responseType: 'text' // RSS feed is XML (text) format
  },
  {
    name: 'BackingThePack',
    url: 'https://www.backingthepack.com/rss/current.xml',
    transform: transformRSSAtomData,
    responseType: 'text' // RSS/Atom feed is XML (text) format
  },
  {
    name: 'Technician',
    url: 'https://www.technicianonline.com/sports', // Replace with the actual URL if different
    transform: transformTechnicianData,
    responseType: 'text' // HTML response
  },
  {
    name: 'Wolfpacker',
    url: 'https://www.on3.com/teams/nc-state-wolfpack/', // Replace with the actual URL
    transform: transformWolfpackerData,
    responseType: 'text' // HTML response
  }
];

async function fetchDataAndUpload(source) {
  try {
    const response = await fetch(source.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${source.url}, status: ${response.status}`);
    }

    const data = source.responseType === 'json' ? await response.json() : await response.text();
    
    const items = await source.transform(data);

    await client.send(new PutObjectCommand({
      Bucket: process.env.STORAGE_S3AEFC79B6_BUCKETNAME,
      Key: `public/${source.name}.content.json`,
      Body: JSON.stringify(items),
      ContentType: 'application/json'
    }));

    console.log(`${source.name}.content.json created and uploaded successfully.`);
  } catch (error) {
    console.error(`Error processing ${source.name}:`, error);
  }
}


exports.handler = async (event) => {
  for (const source of sources) {
    await fetchDataAndUpload(source);
  }

  console.log('All sources processed.');
  return {
    statusCode: 200,
    body: JSON.stringify('Content files for all sources created and uploaded successfully.'),
  };
};