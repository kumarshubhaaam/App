const fetch = require('node-fetch');

exports.handler = async (event) => {
  const api_token = '5fb415cd7e6b42fd8ba25416066c25f44c85587b';

  const long_url = event.queryStringParameters.url || 'https://alphalinkz.netlify.app';
  const encoded_url = encodeURIComponent(long_url);
  const api_url = `https://linkshortify.com/api?api=${api_token}&url=${encoded_url}&format=text`;

  try {
    const response = await fetch(api_url);
    const shortUrl = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*"
      },
      body: shortUrl
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: `Error: ${error.message}`
    };
  }
};
