export function injectLayout() {
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');

  if (header) {
    header.innerHTML = `
      <nav>
        <a href="/" class="nav-logo">MONEY<span>GAMES</span></a>
        <div class="nav-links">
          <a href="/slots.html">SLOTS</a>
          <a href="/casinos.html">CASINOS</a>
          <a href="/promos.html">PROMOS</a>
          <a href="/about.html">ABOUT</a>
          <a href="#" class="nav-cta">PLAY NOW</a>
        </div>
        <div class="nav-right">
          <button class="theme-btn" id="theme-toggle">
            <span id="theme-icon">☀️</span>
          </button>
        </div>
      </nav>
    `;

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.className = savedTheme;
    if (themeIcon) themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    themeToggle?.addEventListener('click', () => {
      const currentTheme = document.body.className;
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.body.className = newTheme;
      localStorage.setItem('theme', newTheme);
      if (themeIcon) themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
  }

  if (footer) {
    footer.innerHTML = `
      <footer>
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="nav-logo" style="margin-bottom: 12px;">MONEY<span>GAMES</span></div>
            <p>Your ultimate destination for the best online slots, casino reviews, and exclusive bonuses. Play smart, win big.</p>
          </div>
          <div class="footer-col">
            <h4>GAMES</h4>
            <a href="/slots.html?category=Slots">Slots</a>
            <a href="/slots.html?category=Live Casino">Live Casino</a>
            <a href="/slots.html?category=Crash">Crash Games</a>
            <a href="/slots.html?category=Table Games">Table Games</a>
          </div>
          <div class="footer-col">
            <h4>PLATFORM</h4>
            <a href="/casinos.html">Top Casinos</a>
            <a href="/promos.html">Promotions</a>
            <a href="/about.html">About Us</a>
            <a href="#">Contact</a>
          </div>
          <div class="footer-col">
            <h4>LEGAL</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Responsible Gaming</a>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="footer-disc">
            © 2026 MoneyGames. Gambling can be addictive. Please play responsibly. 
            If you or someone you know has a gambling problem, call 1-800-GAMBLER.
          </div>
          <div class="footer-age">18+</div>
        </div>
      </footer>
    `;
  }
}
