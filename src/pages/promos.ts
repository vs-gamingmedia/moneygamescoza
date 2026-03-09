import { injectLayout } from '../components/layout';

const promos = [
  { title: '100% Welcome Bonus', desc: 'Double your first deposit up to $500 and get 50 free spins on selected slots.', casino: '7Bit Casino', code: 'WELCOME7' },
  { title: 'No Deposit Free Spins', desc: 'Get 20 free spins just for signing up. No deposit required to start playing.', casino: 'BitStarz', code: 'FREE20' },
  { title: 'Weekly Reload Bonus', desc: 'Every Monday, get a 50% reload bonus up to $250 on your first deposit of the day.', casino: 'Stake', code: 'RELOAD50' },
  { title: 'Cashback Weekend', desc: 'Get 15% of your losses back every weekend. No wagering requirements on cashback.', casino: 'Roobet', code: 'CASHBACK' }
];

function init() {
  injectLayout();

  const promoGrid = document.getElementById('promo-grid');
  if (promoGrid) {
    promoGrid.innerHTML = promos.map(promo => `
      <div class="prov-card">
        <div class="prov-name" style="font-size: 1.2rem;">${promo.title}</div>
        <p class="prov-desc">${promo.desc}</p>
        <div style="margin-bottom: 16px; font-size: .8rem; color: var(--gold); font-weight: 600;">CASINO: ${promo.casino}</div>
        <div class="code-box" style="margin-bottom: 16px;">
          <div class="code-label">PROMO CODE</div>
          <div class="code-val">${promo.code}</div>
        </div>
        <a href="#" class="btn-primary" style="width: 100%; text-align: center;">CLAIM OFFER</a>
      </div>
    `).join('');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
