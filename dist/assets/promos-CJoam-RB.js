import{i as s}from"./layout-B7mUZuDg.js";const i=[{title:"100% Welcome Bonus",desc:"Double your first deposit up to $500 and get 50 free spins on selected slots.",casino:"7Bit Casino",code:"WELCOME7"},{title:"No Deposit Free Spins",desc:"Get 20 free spins just for signing up. No deposit required to start playing.",casino:"BitStarz",code:"FREE20"},{title:"Weekly Reload Bonus",desc:"Every Monday, get a 50% reload bonus up to $250 on your first deposit of the day.",casino:"Stake",code:"RELOAD50"},{title:"Cashback Weekend",desc:"Get 15% of your losses back every weekend. No wagering requirements on cashback.",casino:"Roobet",code:"CASHBACK"}];function t(){s();const o=document.getElementById("promo-grid");o&&(o.innerHTML=i.map(e=>`
      <div class="prov-card">
        <div class="prov-name" style="font-size: 1.2rem;">${e.title}</div>
        <p class="prov-desc">${e.desc}</p>
        <div style="margin-bottom: 16px; font-size: .8rem; color: var(--gold); font-weight: 600;">CASINO: ${e.casino}</div>
        <div class="code-box" style="margin-bottom: 16px;">
          <div class="code-label">PROMO CODE</div>
          <div class="code-val">${e.code}</div>
        </div>
        <a href="#" class="btn-primary" style="width: 100%; text-align: center;">CLAIM OFFER</a>
      </div>
    `).join(""))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t):t();
