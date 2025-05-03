const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  const uniqueCode = Math.random().toString(36).substring(2, 10);
  const longUrl = `https://alphalinkz.netlify.app/posts.html?key=${uniqueCode}`;
  const apiToken = '5fb415cd7e6b42fd8ba25416066c25f44c85587b';
  const apiUrl = `https://linkshortify.com/api?api=${apiToken}&url=${encodeURIComponent(longUrl)}&format=text`;

  try {
    const res = await fetch(apiUrl);
    const shortUrl = await res.text();

    // Save code to keys.json
    const keysPath = path.resolve(__dirname, '..', 'keys.json');
    let keys = [];

    if (fs.existsSync(keysPath)) {
      keys = JSON.parse(fs.readFileSync(keysPath));
    }

    keys.push(uniqueCode);
    fs.writeFileSync(keysPath, JSON.stringify(keys));

    return {
      statusCode: 200,
      body: JSON.stringify({ shortUrl })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to create link' })
    };
  }
};
