import{i as p}from"./layout-B7mUZuDg.js";const v=[{name:"Slots",icon:"🎰",count:"3,400+"},{name:"Live Casino",icon:"🃏",count:"450+"},{name:"Crash",icon:"🚀",count:"120+"},{name:"Table Games",icon:"🎲",count:"280+"},{name:"Jackpots",icon:"💰",count:"85+"},{name:"New",icon:"✨",count:"15+"}],g=[{name:"Pragmatic Play",desc:"The industry leader in innovative slots and live casino solutions.",games:"350+",rtp:"96.5%"},{name:"Evolution",desc:"The gold standard for live dealer experiences and game shows.",games:"120+",rtp:"97.2%"},{name:"Hacksaw Gaming",desc:"Unique art styles and high-volatility mechanics that stand out.",games:"85+",rtp:"96.3%"},{name:"Spribe",desc:"Pioneers of the crash game genre with the world-famous Aviator.",games:"15+",rtp:"97.0%"}];async function h(){const a=document.getElementById("featured-slots");if(a)try{const i=await fetch("/api/games?page=1&per_page=12&category=slots");if(!i.ok)throw new Error("API failed");const e=(await i.json()).data||[];if(e.length===0)throw new Error("No games");a.innerHTML=e.slice(0,12).map(t=>{const n=t.id||t.slug;return`
        <a href="/game.html?id=${n}" class="slot-card">
          <div class="slot-thumb">
            <img src="https://picsum.photos/seed/${n}/400/300" alt="${t.name}" loading="lazy" onerror="this.src='https://picsum.photos/seed/casino/400/300'">
          </div>
          <div class="slot-body">
            <div class="slot-name">${t.name}</div>
            <div class="slot-meta">
              <span class="slot-rtp">${t.rtp||"96.5%"} RTP</span>
              <span class="slot-badge badge-hot">HOT</span>
            </div>
            <div class="slot-tags" style="display: flex; gap: 4px; margin-top: 8px; flex-wrap: wrap;">
              <span style="font-size: 0.6rem; background: rgba(232, 168, 0, 0.1); color: var(--gold); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(232, 168, 0, 0.2); font-weight: 600;">${t.provider||"Unknown"}</span>
            </div>
          </div>
        </a>
      `}).join("")}catch(i){console.error("Error fetching featured slots:",i),a.innerHTML='<div style="grid-column: 1/-1; text-align: center; color: var(--muted);">Failed to load featured games.</div>'}}async function u(){try{const a=await fetch("/api/games?page=1");if(!a.ok)throw new Error("API failed");const c=(await a.json()).data||[],e={};c.forEach(s=>{const o=s.category||s.type||"Slots";e[o]=(e[o]||0)+1});const t=[{name:"Slots",icon:"🎰",count:`${e.Slots||"3,400"}+`},{name:"Live Casino",icon:"🃏",count:`${e["Live Casino"]||"450"}+`},{name:"Crash",icon:"🚀",count:`${e.Crash||"120"}+`},{name:"Table Games",icon:"🎲",count:`${e["Table Games"]||"280"}+`},{name:"Jackpots",icon:"💰",count:`${e.Jackpots||"85"}+`},{name:"New",icon:"✨",count:`${c.length>0?"15+":"0"}`}],n=document.getElementById("category-grid");n&&(n.innerHTML=t.map(s=>`
        <a href="/slots.html?category=${encodeURIComponent(s.name)}" class="cat-card">
          <div class="cat-icon">${s.icon}</div>
          <div class="cat-name">${s.name}</div>
          <div class="cat-count">${s.count}</div>
        </a>
      `).join(""));const r={};c.forEach(s=>{const o=s.provider||s.provider_name||"Unknown";r[o]=(r[o]||0)+1});const m=Object.entries(r).sort((s,o)=>o[1]-s[1]).slice(0,4).map(([s,o])=>({name:s,count:`${o}+`,desc:`Top-tier games from ${s}, known for high quality and fair play.`,rtp:"96.5%"})),d=document.getElementById("provider-grid");d&&(d.innerHTML=m.map(s=>`
        <div class="prov-card">
          <div class="prov-name">${s.name}</div>
          <p class="prov-desc">${s.desc}</p>
          <div class="prov-stats">
            <div class="ps">
              <div class="ps-val">${s.count}</div>
              <div class="ps-key">GAMES</div>
            </div>
            <div class="ps">
              <div class="ps-val">${s.rtp}</div>
              <div class="ps-key">AVG RTP</div>
            </div>
          </div>
          <a href="/slots.html?provider=${encodeURIComponent(s.name)}" class="btn-secondary" style="width: 100%; text-align: center;">VIEW GAMES</a>
        </div>
      `).join(""))}catch(a){console.error("Error fetching stats:",a)}}function l(){p(),h(),u();const a=document.getElementById("hero-float");if(a){const e=["🎰","🚀","🃏","🎲","💰","✨","💎","🎯"];for(let t=0;t<15;t++){const n=document.createElement("span");n.textContent=e[Math.floor(Math.random()*e.length)],n.style.left=`${Math.random()*100}%`,n.style.animationDelay=`${Math.random()*8}s`,n.style.fontSize=`${1+Math.random()*1.5}rem`,a.appendChild(n)}}const i=document.getElementById("category-grid");i&&(i.innerHTML=v.map(e=>`
      <a href="/slots.html?category=${encodeURIComponent(e.name)}" class="cat-card">
        <div class="cat-icon">${e.icon}</div>
        <div class="cat-name">${e.name}</div>
        <div class="cat-count">${e.count}</div>
      </a>
    `).join(""));const c=document.getElementById("provider-grid");c&&(c.innerHTML=g.map(e=>`
      <div class="prov-card">
        <div class="prov-name">${e.name}</div>
        <p class="prov-desc">${e.desc}</p>
        <div class="prov-stats">
          <div class="ps">
            <div class="ps-val">${e.games}</div>
            <div class="ps-key">GAMES</div>
          </div>
          <div class="ps">
            <div class="ps-val">${e.rtp}</div>
            <div class="ps-key">AVG RTP</div>
          </div>
        </div>
        <a href="/slots.html?provider=${encodeURIComponent(e.name)}" class="btn-secondary" style="width: 100%; text-align: center;">VIEW GAMES</a>
      </div>
    `).join(""))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",l):l();
