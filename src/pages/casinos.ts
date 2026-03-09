import { injectLayout } from '../components/layout';

const casinos = [
  { name: '7Bit Casino', rank: 1, bonus: '100% up to 1.5 BTC + 100 Free Spins', rating: 4.9, code: '7BIT100' },
  { name: 'Stake', rank: 2, bonus: '200% up to $1,000 + 10% Rakeback', rating: 4.8, code: 'STAKE10' },
  { name: 'BitStarz', rank: 3, bonus: '100% up to 1 BTC + 180 Free Spins', rating: 4.7, code: 'BITSTARZ' },
  { name: 'Roobet', rank: 4, bonus: '7 Days of Cashback + $80 in Free Spins', rating: 4.6, code: 'ROOBET' },
  { name: 'Cloudbet', rank: 5, bonus: '100% up to 5 BTC Welcome Bonus', rating: 4.5, code: 'CLOUDBET' }
];

function init() {
  injectLayout();

  const casinoList = document.getElementById('casino-list');
  if (casinoList) {
    casinoList.innerHTML = casinos.map(casino => `
      <div class="casino-row">
        <div class="casino-rank ${casino.rank <= 3 ? 'top' : ''}">${casino.rank}</div>
        <div class="casino-info">
          <div class="casino-name">${casino.name}</div>
          <div class="casino-desc">${casino.bonus}</div>
          <div class="casino-stars">★★★★★ ${casino.rating}</div>
        </div>
        <div class="code-box">
          <div class="code-label">PROMO CODE</div>
          <div class="code-val">${casino.code}</div>
        </div>
        <a href="#" class="btn-primary">VISIT CASINO</a>
      </div>
    `).join('');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
