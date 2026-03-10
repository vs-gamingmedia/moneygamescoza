(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();function i(){const n=document.getElementById("header"),s=document.getElementById("footer");if(n){n.innerHTML=`
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
    `;const r=document.getElementById("theme-toggle"),o=document.getElementById("theme-icon"),e=localStorage.getItem("theme")||"dark";document.body.className=e,o&&(o.textContent=e==="dark"?"☀️":"🌙"),r==null||r.addEventListener("click",()=>{const a=document.body.className==="dark"?"light":"dark";document.body.className=a,localStorage.setItem("theme",a),o&&(o.textContent=a==="dark"?"☀️":"🌙")})}s&&(s.innerHTML=`
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
    `)}export{i};
