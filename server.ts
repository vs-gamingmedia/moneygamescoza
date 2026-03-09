import express from "express";
import { createServer as createViteServer } from "vite";
import https from "https";
import { ALLOWED_GAMES, ALLOWED_GAMES_LIST } from "./src/allowedGames";

const API_TOKEN = 'NvbCQ508Hv0YvNCvz0o1YugDdpULSL8hHEXanUqnpqT47e7yNU';
const HOST = 'moneygames.co.za';

let gamesCache: any[] = [];
let fetchCachePromise: Promise<void> | null = null;

async function fetchAllGames() {
  if (fetchCachePromise) return fetchCachePromise;
  
  fetchCachePromise = (async () => {
    try {
      let allGames: any[] = [];
      let page = 1;
      let lastPage = 1;
      
      do {
        const data = await new Promise<any>((resolve, reject) => {
          const options = {
            hostname: 'slotslaunch.com',
            path: `/api/games?token=${API_TOKEN}&page=${page}&per_page=100`,
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
              try {
                resolve(JSON.parse(body));
              } catch (e) {
                resolve({ data: [], meta: { last_page: 1 } });
              }
            });
          });

          req.on('error', reject);
          req.end();
        });
        
        if (data.data) {
          const filtered = data.data.filter((g: any) => {
            const providerName = g.provider_name;
            const gameName = g.name;
            
            if (ALLOWED_GAMES[providerName]) {
              // Check if game name is in the allowed list for this provider
              // Using some fuzzy matching or exact matching
              return ALLOWED_GAMES[providerName].some(allowedName => 
                gameName.toLowerCase() === allowedName.toLowerCase() ||
                gameName.toLowerCase().includes(allowedName.toLowerCase())
              );
            }
            return false;
          });
          allGames = [...allGames, ...filtered];
        }
        
        if (data.meta && data.meta.last_page) {
          lastPage = data.meta.last_page;
        }
        
        page++;
      } while (page <= lastPage);
      
      gamesCache = allGames;
      console.log(`Cached ${gamesCache.length} games.`);
    } catch (error) {
      console.error('Failed to fetch all games for cache:', error);
    } finally {
      fetchCachePromise = null;
    }
  })();
  
  return fetchCachePromise;
}

// Fetch cache on startup
fetchAllGames();

// Refresh cache every hour
setInterval(fetchAllGames, 60 * 60 * 1000);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.get("/api/games", async (req, res) => {
    const { page = 1, provider, name, theme, sort } = req.query;
    const pageNum = parseInt(page as string) || 1;
    const perPage = 50;
    
    // If cache is empty, wait for it to populate
    if (gamesCache.length === 0) {
      await fetchAllGames();
    }
    
    // Use cache
    let filteredGames = [...gamesCache];
    
    // Filter by provider
    if (provider) {
      const providerId = parseInt(provider as string);
      if (!isNaN(providerId)) {
        filteredGames = filteredGames.filter(g => g.provider_id === providerId);
      } else {
        const providerName = (provider as string).toLowerCase();
        filteredGames = filteredGames.filter(g => g.provider_name.toLowerCase() === providerName);
      }
    }
    
    // Filter by name
    if (name) {
      const searchName = (name as string).toLowerCase();
      filteredGames = filteredGames.filter(g => g.name.toLowerCase().includes(searchName));
    }
    
    // Filter by theme
    if (theme && theme !== 'all') {
      filteredGames = filteredGames.filter(g => 
        g.themes && g.themes.some((t: any) => t.slug === theme)
      );
    }
    
    // Sort
    if (sort === 'a-z') {
      filteredGames.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'z-a') {
      filteredGames.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sort === 'latest') {
      filteredGames.sort((a, b) => b.id - a.id);
    } else if (sort === 'top' || !sort || sort === 'popular') {
      // Sort by Provider Rank then Game Rank from ALLOWED_GAMES_LIST
      filteredGames.sort((a, b) => {
        const provIndexA = ALLOWED_GAMES_LIST.findIndex(p => p.provider === a.provider_name);
        const provIndexB = ALLOWED_GAMES_LIST.findIndex(p => p.provider === b.provider_name);
        
        if (provIndexA !== provIndexB) {
          return provIndexA - provIndexB;
        }
        
        // Same provider, sort by game rank
        const gamesList = ALLOWED_GAMES_LIST[provIndexA].games;
        const gameIndexA = gamesList.findIndex(name => 
          a.name.toLowerCase() === name.toLowerCase() || a.name.toLowerCase().includes(name.toLowerCase())
        );
        const gameIndexB = gamesList.findIndex(name => 
          b.name.toLowerCase() === name.toLowerCase() || b.name.toLowerCase().includes(name.toLowerCase())
        );
        
        return gameIndexA - gameIndexB;
      });
    } else {
      // Default fallback
      filteredGames.sort((a, b) => b.id - a.id);
    }
    
    // Paginate
    const total = filteredGames.length;
    const lastPage = Math.ceil(total / perPage);
    const start = (pageNum - 1) * perPage;
    const end = start + perPage;
    const paginatedGames = filteredGames.slice(start, end);
    
    res.json({
      data: paginatedGames,
      meta: {
        current_page: pageNum,
        last_page: lastPage,
        total: total,
        per_page: perPage
      }
    });
  });

  app.get("/api/game/:slug", async (req, res) => {
    const { slug } = req.params;
    
    if (gamesCache.length === 0) {
      await fetchAllGames();
    }
    
    const game = gamesCache.find(g => g.slug === slug);
    
    if (game) {
      res.json({ data: game });
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
