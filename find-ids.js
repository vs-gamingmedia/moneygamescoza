import http from 'http';

async function search(provider, query) {
  for (let page = 1; page <= 10; page++) {
    const data = await new Promise(resolve => {
      http.get(`http://localhost:3000/api/games?provider=${provider}&page=${page}`, (res) => {
        let d = '';
        res.on('data', chunk => d += chunk);
        res.on('end', () => resolve(JSON.parse(d)));
      });
    });
    
    if (!data.data || data.data.length === 0) break;
    
    const found = data.data.find(g => g.name.toLowerCase().includes(query.toLowerCase()));
    if (found) {
      console.log(`${query}: ${found.id}`);
      return;
    }
  }
  console.log(`${query}: Not found`);
}

search(161, 'Gates of Olympus');
search(161, 'Sweet Bonanza');
search(96, 'Koi Gate');
search(97, 'Wanted Dead');
