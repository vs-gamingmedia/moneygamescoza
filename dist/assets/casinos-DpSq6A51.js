import{i as e}from"./layout-B7mUZuDg.js";const s=[{name:"7Bit Casino",rank:1,bonus:"100% up to 1.5 BTC + 100 Free Spins",rating:4.9,code:"7BIT100"},{name:"Stake",rank:2,bonus:"200% up to $1,000 + 10% Rakeback",rating:4.8,code:"STAKE10"},{name:"BitStarz",rank:3,bonus:"100% up to 1 BTC + 180 Free Spins",rating:4.7,code:"BITSTARZ"},{name:"Roobet",rank:4,bonus:"7 Days of Cashback + $80 in Free Spins",rating:4.6,code:"ROOBET"},{name:"Cloudbet",rank:5,bonus:"100% up to 5 BTC Welcome Bonus",rating:4.5,code:"CLOUDBET"}];function i(){e();const n=document.getElementById("casino-list");n&&(n.innerHTML=s.map(a=>`
      <div class="casino-row">
        <div class="casino-rank ${a.rank<=3?"top":""}">${a.rank}</div>
        <div class="casino-info">
          <div class="casino-name">${a.name}</div>
          <div class="casino-desc">${a.bonus}</div>
          <div class="casino-stars">★★★★★ ${a.rating}</div>
        </div>
        <div class="code-box">
          <div class="code-label">PROMO CODE</div>
          <div class="code-val">${a.code}</div>
        </div>
        <a href="#" class="btn-primary">VISIT CASINO</a>
      </div>
    `).join(""))}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",i):i();
