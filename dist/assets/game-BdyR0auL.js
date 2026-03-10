import{i as v}from"./layout-B7mUZuDg.js";async function m(){const s=new URLSearchParams(window.location.search).get("id");if(!s){window.location.href="/slots.html";return}const a=document.getElementById("game-content");if(a)try{const t=(await(await fetch(`/api/game/${s}`)).json()).data;if(t){const o=await(await fetch("/api/games?page=1")).json();n(t,o.data)}else{const o=await(await fetch("/src/data/games.json")).json(),l=o.find(c=>c.id===s);if(!l){a.innerHTML='<div style="text-align: center; padding: 100px; color: var(--muted);">Game not found.</div>';return}n(l,o)}}catch(i){console.error("Error fetching game data:",i);try{const t=await(await fetch("/src/data/games.json")).json(),d=t.find(o=>o.id===s);d&&n(d,t)}catch(r){console.error("Fallback failed:",r)}}}function n(e,s){const a=document.getElementById("game-content");if(!a)return;document.title=`${e.name} - MoneyGames`;let i="";e.themes&&Array.isArray(e.themes)&&(i=e.themes.map(r=>`
      <span style="font-size: 0.75rem; background: rgba(232, 168, 0, 0.05); color: var(--muted); padding: 4px 10px; border-radius: 6px; border: 1px solid var(--border);">${r.name||r.slug}</span>
    `).join("")),a.innerHTML=`
    <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; align-items: start;">
      <div class="slot-card" style="cursor: default;">
        <div class="slot-thumb" style="aspect-ratio: 16/9;">
          <img src="https://picsum.photos/seed/${e.id||e.slug}/800/450" alt="${e.name}" onerror="this.src='https://picsum.photos/seed/casino/800/450'">
        </div>
        <div class="slot-body" style="padding: 20px;">
          <div class="slot-name" style="font-size: 1.5rem; margin-bottom: 12px;">${e.name}</div>
          <div class="slot-meta" style="margin-bottom: 12px;">
            <span class="slot-rtp" style="font-size: .8rem;">${e.rtp||"96.5%"} RTP</span>
            <span class="slot-badge badge-hot" style="font-size: .75rem;">HOT</span>
            <span class="slot-badge badge-new" style="font-size: .75rem;">NEW</span>
          </div>
          <div class="slot-tags" style="display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap;">
            <span style="font-size: 0.75rem; background: rgba(232, 168, 0, 0.1); color: var(--gold); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(232, 168, 0, 0.2); font-weight: 600;">${e.provider}</span>
            <span style="font-size: 0.75rem; background: var(--bg2); color: var(--muted); padding: 4px 10px; border-radius: 6px; border: 1px solid var(--border);">${e.category||"Slot"}</span>
            ${i}
          </div>
        </div>
      </div>
      <div>
        <div class="sec-label">Game Overview</div>
        <h2 class="sec-title">${e.name}</h2>
        <p class="sec-desc" style="max-width: 100%;">Experience the thrill of ${e.name} by ${e.provider}. This ${e.category||"Slot"} game offers high-quality graphics, immersive sound effects, and exciting bonus features that keep you on the edge of your seat.</p>
        
        <div style="background: var(--bg3); border: 1px solid var(--border); border-radius: 12px; padding: 24px; margin-bottom: 32px;">
          <h3 style="font-family: 'Bebas Neue', sans-serif; font-size: 1.2rem; margin-bottom: 16px; color: var(--gold);">GAME SPECS</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
            <div>
              <div style="font-size: .7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px;">Volatility</div>
              <div style="font-weight: 600;">${e.volatility||"High"}</div>
            </div>
            <div>
              <div style="font-size: .7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px;">Max Win</div>
              <div style="font-weight: 600;">${e.max_win||"5,000x"}</div>
            </div>
            <div>
              <div style="font-size: .7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px;">Reels</div>
              <div style="font-weight: 600;">${e.reels||"5x3"}</div>
            </div>
            <div>
              <div style="font-size: .7rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px;">Paylines</div>
              <div style="font-weight: 600;">${e.paylines||"20"}</div>
            </div>
          </div>
        </div>
        
        <a href="#" class="btn-primary" style="width: 100%; text-align: center; padding: 16px; font-size: 1rem;">PLAY FOR REAL MONEY</a>
      </div>
    </div>
  `,f(s,e)}function f(e,s){const a=document.getElementById("related-grid");if(!a)return;const i=s.id||s.slug,r=e.filter(t=>(t.id||t.slug)!==i&&(t.provider===s.provider||t.category===s.category)).slice(0,6);a.innerHTML=r.map(t=>`
    <a href="/game.html?id=${t.id||t.slug}" class="slot-card">
      <div class="slot-thumb">
        <img src="https://picsum.photos/seed/${t.id||t.slug}/400/300" alt="${t.name}" loading="lazy">
      </div>
      <div class="slot-body">
        <div class="slot-name">${t.name}</div>
        <div class="slot-meta">
          <span class="slot-rtp">96.5% RTP</span>
        </div>
        <div class="slot-tags" style="display: flex; gap: 4px; margin-top: 6px; flex-wrap: wrap;">
          <span style="font-size: 0.6rem; background: var(--bg2); color: var(--gold); padding: 2px 6px; border-radius: 4px; border: 1px solid var(--border);">${t.provider}</span>
        </div>
      </div>
    </a>
  `).join("")}function p(){v(),m()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",p):p();
