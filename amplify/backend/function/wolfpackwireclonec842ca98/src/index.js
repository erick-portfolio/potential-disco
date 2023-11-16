const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fetch = require('node-fetch');
const sourcesConfig = require('./sourcesConfig');
const transform = require('./transform');

const client = new S3Client({});

async function fetchDataAndUpload(source) {
  try {
    const response = await fetch(source.url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${source.url}, status: ${response.status}`);
    }

    const data = source.responseType === 'json' ? await response.json() : await response.text();
    const items = await transform(data, source);

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
  try {
      // Create an array of promises for each source
      const promises = sourcesConfig.map(source => fetchDataAndUpload(source));

      // Wait for all promises to resolve
      await Promise.all(promises);

      console.log('All sources processed.');
      return {
          statusCode: 200,
          body: JSON.stringify('Content files for all sources created and uploaded successfully.'),
      };
  } catch (error) {
      console.error('Error during processing:', error);
      return {
          statusCode: 500,
          body: JSON.stringify('An error occurred during processing.'),
      };
  }
};
