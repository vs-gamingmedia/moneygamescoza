import { injectLayout } from '../components/layout';

const categories = [
  { name: 'Slots', icon: '🎰', count: '3,400+' },
  { name: 'Live Casino', icon: '🃏', count: '450+' },
  { name: 'Crash', icon: '🚀', count: '120+' },
  { name: 'Table Games', icon: '🎲', count: '280+' },
  { name: 'Jackpots', icon: '💰', count: '85+' },
  { name: 'New', icon: '✨', count: '15+' }
];

const providers = [
  { name: 'Pragmatic Play', desc: 'The industry leader in innovative slots and live casino solutions.', games: '350+', rtp: '96.5%' },
  { name: 'Evolution', desc: 'The gold standard for live dealer experiences and game shows.', games: '120+', rtp: '97.2%' },
  { name: 'Hacksaw Gaming', desc: 'Unique art styles and high-volatility mechanics that stand out.', games: '85+', rtp: '96.3%' },
  { name: 'Spribe', desc: 'Pioneers of the crash game genre with the world-famous Aviator.', games: '15+', rtp: '97.0%' }
];

async function fetchFeaturedSlots() {
  const featuredGrid = document.getElementById('featured-slots');
  if (!featuredGrid) return;

  try {
    const response = await fetch('/api/games?page=1&per_page=12&category=slots');
    if (!response.ok) throw new Error('API failed');
    const result = await response.json();
    const games = result.data || [];

    if (games.length === 0) throw new Error('No games');

    featuredGrid.innerHTML = games.slice(0, 12).map((game: any) => {
      const gameId = game.id || game.slug;
      return `
        <a href="/game.html?id=${gameId}" class="slot-card">
          <div class="slot-thumb">
            <img src="https://picsum.photos/seed/${gameId}/400/300" alt="${game.name}" loading="lazy" onerror="this.src='https://picsum.photos/seed/casino/400/300'">
          </div>
          <div class="slot-body">
            <div class="slot-name">${game.name}</div>
            <div class="slot-meta">
              <span class="slot-rtp">${game.rtp || '96.5%'} RTP</span>
              <span class="slot-badge badge-hot">HOT</span>
            </div>
            <div class="slot-tags" style="display: flex; gap: 4px; margin-top: 8px; flex-wrap: wrap;">
              <span style="font-size: 0.6rem; background: rgba(232, 168, 0, 0.1); color: var(--gold); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(232, 168, 0, 0.2); font-weight: 600;">${game.provider || 'Unknown'}</span>
            </div>
          </div>
        </a>
      `;
    }).join('');
  } catch (error) {
    console.error('Error fetching featured slots:', error);
    featuredGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--muted);">Failed to load featured games.</div>';
  }
}

async function fetchStats() {
  try {
    const response = await fetch('/api/games?page=1');
    if (!response.ok) throw new Error('API failed');
    const result = await response.json();
    const allGames = result.data || [];

    // Categories with counts
    const categoryCounts: Record<string, number> = {};
    allGames.forEach((g: any) => {
      const cat = g.category || g.type || 'Slots';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    const dynamicCategories = [
      { name: 'Slots', icon: '🎰', count: `${categoryCounts['Slots'] || '3,400'}+` },
      { name: 'Live Casino', icon: '🃏', count: `${categoryCounts['Live Casino'] || '450'}+` },
      { name: 'Crash', icon: '🚀', count: `${categoryCounts['Crash'] || '120'}+` },
      { name: 'Table Games', icon: '🎲', count: `${categoryCounts['Table Games'] || '280'}+` },
      { name: 'Jackpots', icon: '💰', count: `${categoryCounts['Jackpots'] || '85'}+` },
      { name: 'New', icon: '✨', count: `${allGames.length > 0 ? '15+' : '0'}` }
    ];

    const catGrid = document.getElementById('category-grid');
    if (catGrid) {
      catGrid.innerHTML = dynamicCategories.map(cat => `
        <a href="/slots.html?category=${encodeURIComponent(cat.name)}" class="cat-card">
          <div class="cat-icon">${cat.icon}</div>
          <div class="cat-name">${cat.name}</div>
          <div class="cat-count">${cat.count}</div>
        </a>
      `).join('');
    }

    // Providers with counts
    const providerCounts: Record<string, number> = {};
    allGames.forEach((g: any) => {
      const prov = g.provider || g.provider_name || 'Unknown';
      providerCounts[prov] = (providerCounts[prov] || 0) + 1;
    });

    const topProviders = Object.entries(providerCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([name, count]) => ({
        name,
        count: `${count}+`,
        desc: `Top-tier games from ${name}, known for high quality and fair play.`,
        rtp: '96.5%'
      }));

    const provGrid = document.getElementById('provider-grid');
    if (provGrid) {
      provGrid.innerHTML = topProviders.map(prov => `
        <div class="prov-card">
          <div class="prov-name">${prov.name}</div>
          <p class="prov-desc">${prov.desc}</p>
          <div class="prov-stats">
            <div class="ps">
              <div class="ps-val">${prov.count}</div>
              <div class="ps-key">GAMES</div>
            </div>
            <div class="ps">
              <div class="ps-val">${prov.rtp}</div>
              <div class="ps-key">AVG RTP</div>
            </div>
          </div>
          <a href="/slots.html?provider=${encodeURIComponent(prov.name)}" class="btn-secondary" style="width: 100%; text-align: center;">VIEW GAMES</a>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
  }
}

function init() {
  injectLayout();
  fetchFeaturedSlots();
  fetchStats();

  const heroFloat = document.getElementById('hero-float');
  if (heroFloat) {
    const icons = ['🎰', '🚀', '🃏', '🎲', '💰', '✨', '💎', '🎯'];
    for (let i = 0; i < 15; i++) {
      const span = document.createElement('span');
      span.textContent = icons[Math.floor(Math.random() * icons.length)];
      span.style.left = `${Math.random() * 100}%`;
      span.style.animationDelay = `${Math.random() * 8}s`;
      span.style.fontSize = `${1 + Math.random() * 1.5}rem`;
      heroFloat.appendChild(span);
    }
  }

  const catGrid = document.getElementById('category-grid');
  if (catGrid) {
    catGrid.innerHTML = categories.map(cat => `
      <a href="/slots.html?category=${encodeURIComponent(cat.name)}" class="cat-card">
        <div class="cat-icon">${cat.icon}</div>
        <div class="cat-name">${cat.name}</div>
        <div class="cat-count">${cat.count}</div>
      </a>
    `).join('');
  }

  const provGrid = document.getElementById('provider-grid');
  if (provGrid) {
    provGrid.innerHTML = providers.map(prov => `
      <div class="prov-card">
        <div class="prov-name">${prov.name}</div>
        <p class="prov-desc">${prov.desc}</p>
        <div class="prov-stats">
          <div class="ps">
            <div class="ps-val">${prov.games}</div>
            <div class="ps-key">GAMES</div>
          </div>
          <div class="ps">
            <div class="ps-val">${prov.rtp}</div>
            <div class="ps-key">AVG RTP</div>
          </div>
        </div>
        <a href="/slots.html?provider=${encodeURIComponent(prov.name)}" class="btn-secondary" style="width: 100%; text-align: center;">VIEW GAMES</a>
      </div>
    `).join('');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
