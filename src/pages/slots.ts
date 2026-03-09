import { injectLayout } from '../components/layout';

interface Game {
  id: string;
  slug?: string;
  name: string;
  provider: string;
  category?: string;
}

let allGames: Game[] = [];

async function fetchGames() {
  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'block';

  const searchTerm = (document.getElementById('game-search') as HTMLInputElement)?.value.toLowerCase() || '';
  const categoryFilter = (document.getElementById('category-filter') as HTMLSelectElement)?.value || '';
  const providerFilter = (document.getElementById('provider-filter') as HTMLSelectElement)?.value || '';
  const sortFilter = (document.getElementById('sort-filter') as HTMLSelectElement)?.value || 'latest';

  // Update URL params without reloading
  const url = new URL(window.location.href);
  if (searchTerm) url.searchParams.set('search', searchTerm); else url.searchParams.delete('search');
  if (categoryFilter) url.searchParams.set('category', categoryFilter); else url.searchParams.delete('category');
  if (providerFilter) url.searchParams.set('provider', providerFilter); else url.searchParams.delete('provider');
  if (sortFilter !== 'latest') url.searchParams.set('sort', sortFilter); else url.searchParams.delete('sort');
  window.history.replaceState({}, '', url);

  try {
    console.log('Fetching games from /api/games...');
    const queryParams = new URLSearchParams({
      page: '1',
      name: searchTerm,
      category: categoryFilter,
      provider: providerFilter,
      sort: sortFilter
    });
    
    const response = await fetch(`/api/games?${queryParams.toString()}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const result = await response.json();
    console.log('API Result:', result);
    
    allGames = result.data || [];
    
    if (allGames.length === 0 && !searchTerm && !categoryFilter && !providerFilter) {
      console.warn('API returned no games, trying fallback...');
      throw new Error('Empty data');
    }
    
    // Only populate providers once if not already done
    const providerFilterEl = document.getElementById('provider-filter') as HTMLSelectElement;
    if (providerFilterEl && providerFilterEl.options.length <= 1) {
      populateProviders();
    }
    
    renderGames();
  } catch (error) {
    console.error('Error fetching games:', error);
    // Fallback in case API fails
    try {
      console.log('Fetching fallback games from /src/data/games.json...');
      const response = await fetch('/src/data/games.json');
      if (!response.ok) throw new Error('Fallback file not found');
      
      allGames = await response.json();
      console.log('Fallback games loaded:', allGames.length);
      
      populateProviders();
      renderGames();
    } catch (e) {
      console.error('Fallback fetch failed:', e);
      const slotGrid = document.getElementById('slot-grid');
      if (slotGrid) {
        slotGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--red);">Failed to load games. Please refresh the page.</div>';
      }
    }
  } finally {
    if (loading) loading.style.display = 'none';
  }
}

function populateProviders() {
  const providerFilter = document.getElementById('provider-filter') as HTMLSelectElement;
  if (!providerFilter) return;

  // Clear existing options except the first one
  while (providerFilter.options.length > 1) {
    providerFilter.remove(1);
  }

  // We need all games to populate providers, but we might only have filtered ones
  // For now, we'll use the current allGames, but ideally we'd have a separate endpoint for providers
  const providers = Array.from(new Set(allGames.map(g => g.provider).filter(Boolean))).sort();
  providers.forEach(p => {
    const option = document.createElement('option');
    option.value = p;
    option.textContent = p;
    providerFilter.appendChild(option);
  });

  // Check URL params
  const urlParams = new URLSearchParams(window.location.search);
  const provParam = urlParams.get('provider');
  if (provParam) providerFilter.value = provParam;
  
  const catParam = urlParams.get('category');
  const catFilter = document.getElementById('category-filter') as HTMLSelectElement;
  if (catParam && catFilter) catFilter.value = catParam;

  const sortParam = urlParams.get('sort');
  const sortFilter = document.getElementById('sort-filter') as HTMLSelectElement;
  if (sortParam && sortFilter) sortFilter.value = sortParam;

  const searchParam = urlParams.get('search');
  const searchInput = document.getElementById('game-search') as HTMLInputElement;
  if (searchParam && searchInput) searchInput.value = searchParam;
}

function renderGames() {
  const slotGrid = document.getElementById('slot-grid');
  if (!slotGrid) return;

  if (allGames.length === 0) {
    slotGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--muted);">No games found matching your criteria.</div>';
    return;
  }

  slotGrid.innerHTML = allGames.map(game => {
    const gameId = game.id || game.slug;
    const provider = game.provider || 'Unknown';
    const category = game.category || 'Slot';
    
    // Extract additional tags if available (e.g. from themes or types)
    let extraTags = '';
    if ((game as any).themes && Array.isArray((game as any).themes)) {
      extraTags = (game as any).themes.slice(0, 2).map((t: any) => `
        <span style="font-size: 0.6rem; background: rgba(232, 168, 0, 0.05); color: var(--muted); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border);">${t.name || t.slug}</span>
      `).join('');
    }

    return `
      <a href="/game.html?id=${gameId}" class="slot-card">
        <div class="slot-thumb">
          <img src="https://picsum.photos/seed/${gameId}/400/300" alt="${game.name}" loading="lazy" onerror="this.src='https://picsum.photos/seed/casino/400/300'">
        </div>
        <div class="slot-body">
          <div class="slot-name">${game.name}</div>
          <div class="slot-meta">
            <span class="slot-rtp">${(game as any).rtp || '96.5%'} RTP</span>
            <span class="slot-badge badge-hot">HOT</span>
          </div>
          <div class="slot-tags" style="display: flex; gap: 4px; margin-top: 8px; flex-wrap: wrap;">
            <span style="font-size: 0.6rem; background: rgba(232, 168, 0, 0.1); color: var(--gold); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(232, 168, 0, 0.2); font-weight: 600;">${provider}</span>
            <span style="font-size: 0.6rem; background: var(--bg2); color: var(--muted); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border);">${category}</span>
            ${extraTags}
          </div>
        </div>
      </a>
    `;
  }).join('');
}

function debounce(fn: Function, delay: number) {
  let timeoutId: any;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

function init() {
  injectLayout();
  fetchGames();

  const debouncedFetch = debounce(fetchGames, 300);

  document.getElementById('game-search')?.addEventListener('input', debouncedFetch);
  document.getElementById('category-filter')?.addEventListener('change', fetchGames);
  document.getElementById('provider-filter')?.addEventListener('change', fetchGames);
  document.getElementById('sort-filter')?.addEventListener('change', fetchGames);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
