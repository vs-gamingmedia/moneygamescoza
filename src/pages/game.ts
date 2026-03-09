import { injectLayout } from '../components/layout';

interface Game {
  id: string;
  slug?: string;
  name: string;
  provider: string;
  category?: string;
}

async function fetchGameData() {
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('id');
  if (!gameId) {
    window.location.href = '/slots.html';
    return;
  }

  const gameContent = document.getElementById('game-content');
  if (!gameContent) return;

  try {
    const response = await fetch(`/api/game/${gameId}`);
    const result = await response.json();
    const game = result.data;

    if (!game) {
      // Fallback to local data
      const localResponse = await fetch('/src/data/games.json');
      const allGames: Game[] = await localResponse.json();
      const localGame = allGames.find(g => g.id === gameId);
      
      if (!localGame) {
        gameContent.innerHTML = '<div style="text-align: center; padding: 100px; color: var(--muted);">Game not found.</div>';
        return;
      }
      renderGamePage(localGame, allGames);
    } else {
      // Fetch all games for related section
      const allResponse = await fetch('/api/games?page=1');
      const allResult = await allResponse.json();
      renderGamePage(game, allResult.data);
    }
  } catch (error) {
    console.error('Error fetching game data:', error);
    // Fallback
    try {
      const response = await fetch('/src/data/games.json');
      const allGames: Game[] = await response.json();
      const game = allGames.find(g => g.id === gameId);
      if (game) renderGamePage(game, allGames);
    } catch (e) {
      console.error('Fallback failed:', e);
    }
  }
}

function renderGamePage(game: any, allGames: any[]) {
  const gameContent = document.getElementById('game-content');
  if (!gameContent) return;

  document.title = `${game.name} - MoneyGames`;

  // Extract additional tags if available
  let extraTags = '';
  if (game.themes && Array.isArray(game.themes)) {
    extraTags = game.themes.map((t: any) => `
      <span style="font-size: 0.75rem; background: rgba(232, 168, 0, 0.05); color: var(--muted); padding: 4px 10px; border-radius: 6px; border: 1px solid var(--border);">${t.name || t.slug}</span>
    `).join('');
  }

  gameContent.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; align-items: start;">
      <div class="slot-card" style="cursor: default;">
        <div class="slot-thumb" style="aspect-ratio: 16/9;">
          <img src="https://picsum.photos/seed/${game.id || game.slug}/800/450" alt="${game.name}" onerror="this.src='https://picsum.photos/seed/casino/800/450'">
        </div>
        <div class="slot-body" style="padding: 20px;">
          <div class="slot-name" style="font-size: 1.5rem; margin-bottom: 12px;">${game.name}</div>
          <div class="slot-meta" style="margin-bottom: 12px;">
            <span class="slot-rtp" style="font-size: .8rem;">${game.rtp || '96.5%'} RTP</span>
            <span class="slot-badge badge-hot" style="font-size: .75rem;">HOT</span>
            <span class="slot-badge badge-new" style="font-size: .75rem;">NEW</span>
          </div>
          <div class="slot-tags" style="display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap;">
            <span style="font-size: 0.75rem; background: rgba(232, 168, 0, 0.1); color: var(--gold); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(232, 168, 0, 0.2); font-weight: 600;">${game.provider}</span>
            <span style="font-size: 0.75rem; background: var(--bg2); color: var(--muted); padding: 4px 10px; border-radius: 6px; border: 1px solid var(--border);">${game.category || 'Slot'}</span>
            ${extraTags}
          </div>
        </div>
      </div>
      <div>
        <div class="sec-label">Game Overview</div>
        <h2 class="sec-title">${game.name}</h2>
        <p class="sec-desc" style="max-width: 100%;">Experience the thrill of ${game.name} by ${game.provider}. This ${game.category || 'Slot'} game offers high-quality graphics, immersive sound effects, and exciting bonus features that keep you on the edge of your seat.</p>
        
        <div style="background: var(--bg3); border: 1px solid var(--border); border-radius: 12px; padding: 24px; margin-bottom: 32px;">
          <h3 style="font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; margin-bottom: 16px; color: var(--gold);">GAME SPECS</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <div style="font-size: .7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px;">Volatility</div>
              <div style="font-weight: 600;">${game.volatility || 'High'}</div>
            </div>
            <div>
              <div style="font-size: .7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px;">Max Win</div>
              <div style="font-weight: 600;">${game.max_win || '5,000x'}</div>
            </div>
            <div>
              <div style="font-size: .7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px;">Reels</div>
              <div style="font-weight: 600;">${game.reels || '5x3'}</div>
            </div>
            <div>
              <div style="font-size: .7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px;">Paylines</div>
              <div style="font-weight: 600;">${game.paylines || '20'}</div>
            </div>
          </div>
        </div>
        
        <a href="#" class="btn-primary" style="width: 100%; text-align: center; padding: 16px; font-size: 1rem;">PLAY FOR REAL MONEY</a>
      </div>
    </div>
  `;

  renderRelatedGames(allGames, game);
}

function renderRelatedGames(allGames: any[], currentGame: any) {
  const relatedGrid = document.getElementById('related-grid');
  if (!relatedGrid) return;

  const currentId = currentGame.id || currentGame.slug;
  const related = allGames
    .filter(g => (g.id || g.slug) !== currentId && (g.provider === currentGame.provider || g.category === currentGame.category))
    .slice(0, 6);

  relatedGrid.innerHTML = related.map(game => `
    <a href="/game.html?id=${game.id || game.slug}" class="slot-card">
      <div class="slot-thumb">
        <img src="https://picsum.photos/seed/${game.id || game.slug}/400/300" alt="${game.name}" loading="lazy">
      </div>
      <div class="slot-body">
        <div class="slot-name">${game.name}</div>
        <div class="slot-meta">
          <span class="slot-rtp">96.5% RTP</span>
        </div>
        <div class="slot-tags" style="display: flex; gap: 4px; margin-top: 6px; flex-wrap: wrap;">
          <span style="font-size: 0.6rem; background: var(--bg2); color: var(--gold); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border);">${game.provider}</span>
        </div>
      </div>
    </a>
  `).join('');
}

function init() {
  injectLayout();
  fetchGameData();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
