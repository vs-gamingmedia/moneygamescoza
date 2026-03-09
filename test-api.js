const https = require('https');

const API_TOKEN = 'NvbCQ508Hv0YvNCvz0o1YugDdpULSL8hHEXanUqnpqT47e7yNU';
const HOST = 'moneygames.co.za';

async function testApi() {
  const options = {
    hostname: 'slotslaunch.com',
    path: `/api/games?token=${API_TOKEN}&page=1&per_page=10`,
    method: 'GET',
    headers: {
      'Origin': `https://${HOST}`,
      'Referer': `https://${HOST}/`
    }
  };

  const req = https.request(options, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log(body);
    });
  });

  req.on('error', console.error);
  req.end();
}

testApi();
