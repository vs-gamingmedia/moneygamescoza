import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useInView } from 'react-intersection-observer';
import { BRANDS, GAME_TYPES, SLOTS as EDITOR_SLOTS } from './data';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const location = useLocation();

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <nav>
        <Link to="/" className="nav-logo">MONEY<span>GAMES</span></Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/game-types">Game Types</Link>
          <Link to="/slots">All Slots</Link>
          <Link to="/slots?provider=Pragmatic Play">Pragmatic Play</Link>
          <Link to="/slots?provider=Spribe">Spribe</Link>
          <Link to="/slots?provider=Hacksaw Gaming">Hacksaw Gaming</Link>
          <Link to="/casinos">Where to Play</Link>
          <Link to="/promos">Promo Codes</Link>
          <Link to="/about">About</Link>
          <Link to="/casinos" className="nav-cta">Play Now →</Link>
        </div>
        <div className="nav-right">
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/slots" element={<Slots />} />
        <Route path="/game/:slug" element={<GamePage />} />
        <Route path="/casinos" element={<Casinos />} />
        <Route path="/promos" element={<Promos />} />
        <Route path="/about" element={<About />} />
        <Route path="/game-types" element={<GameTypes />} />
      </Routes>

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo" style={{ marginBottom: '10px' }}>MONEY<span style={{ color: 'var(--gold)' }}>GAMES</span></div>
            <p>South Africa's honest real money slots guide. Tested with real rands. Written by actual SA players. Affiliate information site — not a casino.</p>
            <div style={{ marginTop: '11px', fontFamily: "'DM Mono', monospace", fontSize: '.62rem', color: 'var(--muted)' }}>info@moneygames.co.za</div>
          </div>
          <div className="footer-col">
            <h4>Slots</h4>
            <Link to="/slots?provider=Pragmatic Play">Pragmatic Play</Link>
            <Link to="/slots?provider=Spribe">Spribe</Link>
            <Link to="/slots?provider=Hacksaw Gaming">Hacksaw Gaming</Link>
            <Link to="/slots?provider=BGaming">BGaming</Link>
            <Link to="/slots">All Slots</Link>
            <Link to="/game-types">By Game Type</Link>
          </div>
          <div className="footer-col">
            <h4>Casinos</h4>
            <Link to="/casinos">Zarbet</Link>
            <Link to="/casinos">Playabets</Link>
            <Link to="/casinos">10Bet</Link>
            <Link to="/casinos">TicTacBet</Link>
            <Link to="/casinos">JackpotCity</Link>
            <Link to="/promos">Promo Codes</Link>
          </div>
          <div className="footer-col">
            <h4>Info</h4>
            <Link to="/about">About Our Team</Link>
            <Link to="/casinos">Where to Play</Link>
            <Link to="/">Home</Link>
            <div style={{ marginTop: '10px', fontFamily: "'DM Mono', monospace", fontSize: '.62rem', color: 'var(--red)' }}>🔴 0800 006 008<br/>NRGP · Free · 24/7</div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-disc">MoneyGames.co.za is an affiliate information site. We earn commission from operators listed — this never changes our editorial ratings. Not a casino. Not a gambling operator. 18+ only. Gambling can be addictive. National Responsible Gambling Programme: 0800 006 008 (free, 24/7, confidential). Always verify current bonus terms directly on the casino website before depositing. © 2026 MoneyGames.co.za</div>
          <div className="footer-age">18+</div>
        </div>
      </footer>
    </>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <div className="page active">
      <Helmet>
        <title>MoneyGames | Honest Real Money Slots Guide South Africa 2026</title>
        <meta name="description" content="South Africa's most brutally honest slots guide. Tested with real ZAR. Find the best RTP slots, real casino reviews, and working promo codes for 2026." />
      </Helmet>
      <div className="hero">
        <div className="hero-content">
          <div className="hero-tag">South Africa's Honest Slots Guide · 2026</div>
          <h1>REAL MONEY<br/>SLOTS WORTH<br/><span className="g">YOUR RANDS</span></h1>
          <p className="hero-sub"><em>Sies on the dodgy overseas sites.</em> MoneyGames is built by SA players who deposit real rands, endure the dry spells with dignity, and tell you exactly what's lekker — and what's a scam wearing a nice gradient.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate('/casinos')}>Find My Casino</button>
            <button className="btn-secondary" onClick={() => navigate('/slots')}>Browse Slots</button>
          </div>
          <div className="hero-stats">
            <div><div className="hstat-num">1300+</div><div className="hstat-label">Slots Available</div></div>
            <div><div className="hstat-num">5</div><div className="hstat-label">SA Casinos Rated</div></div>
            <div><div className="hstat-num">R10K</div><div className="hstat-label">Best Bonus</div></div>
            <div><div className="hstat-num">98%</div><div className="hstat-label">Highest RTP</div></div>
          </div>
        </div>
      </div>
      <div className="trust-strip">
        <div className="trust-inner">
          <div className="trust-item"><span style={{ color: 'var(--green)' }}>✓</span> ZAR Tested</div>
          <div className="trust-item"><span style={{ color: 'var(--green)' }}>✓</span> Licensed Operators Only</div>
          <div className="trust-item"><span style={{ color: 'var(--green)' }}>✓</span> Real Accounts Opened</div>
          <div className="trust-item"><span style={{ color: 'var(--green)' }}>✓</span> Promo Codes Verified March 2026</div>
          <div className="trust-item"><span style={{ color: 'var(--green)' }}>✓</span> No Paid Rankings. Ever.</div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="sec-label">Game Types</div>
          <h2 className="sec-title">Find Your Flavour</h2>
          <p className="sec-desc">Not all slots are created equal. Some will evaporate your bankroll faster than stage-6 load-shedding. Others will pay beautifully. Browse by type to find yours.</p>
          <div className="cat-grid">
            {GAME_TYPES.slice(0, 4).map(cat => (
              <div key={cat.id} className="cat-card" onClick={() => navigate(`/slots?theme=${cat.id}`)}>
                <div className="cat-icon">{cat.icon}</div>
                <div className="cat-name">{cat.name}</div>
                <div className="cat-count">{EDITOR_SLOTS.filter(s => s.types.includes(cat.id)).length}+ Games</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section section-alt">
        <div className="container">
          <div className="sec-label">Providers</div>
          <h2 className="sec-title">Top Providers. All Worth Your Data.</h2>
          <p className="sec-desc">Pragmatic Play, Spribe, Hacksaw Gaming and BGaming — deep catalogues, honest RTPs, and games that load on mobile data without requiring a sacrifice to the network gods.</p>
          <div className="provider-grid">
            <div className="prov-card" onClick={() => navigate('/slots?provider=Pragmatic Play')}>
              <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>🎯</div>
              <div className="prov-name">Pragmatic Play</div>
              <div className="prov-desc">Gates of Olympus. Sweet Bonanza. The slots SA players are genuinely obsessed with in 2026. High excitement, absurd multipliers, and volatility that teaches patience whether you want to learn it or not.</div>
              <div className="prov-stats"><div className="ps"><div className="ps-val">40+</div><div className="ps-key">Games</div></div><div className="ps"><div className="ps-val">96.5%</div><div className="ps-key">Avg RTP</div></div></div>
              <button className="btn-primary" style={{ fontSize: '.76rem', padding: '8px 16px' }}>Explore PP Slots →</button>
            </div>
            <div className="prov-card" onClick={() => navigate('/slots?provider=Spribe')}>
              <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>✈️</div>
              <div className="prov-name">Spribe</div>
              <div className="prov-desc">Home of Aviator. The game that redefined social betting in South Africa. Simple, fast, and incredibly addictive. Watch the plane, cash out before it flies away.</div>
              <div className="prov-stats"><div className="ps"><div className="ps-val">1</div><div className="ps-key">Games</div></div><div className="ps"><div className="ps-val">97.0%</div><div className="ps-key">RTP</div></div></div>
              <button className="btn-primary" style={{ fontSize: '.76rem', padding: '8px 16px' }}>Explore Spribe →</button>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="sec-label">Editor Picks</div>
          <h2 className="sec-title">Slots Our Team Actually Spends Money On</h2>
          <p className="sec-desc">500 real-money spins minimum. Tested on mobile MTN data. Survived Anke's spreadsheet. These made the cut.</p>
          <div className="slot-grid">
            {EDITOR_SLOTS.slice(0, 4).map(slot => (
              <div key={slot.slug} className="slot-card" onClick={() => navigate(`/game/${slot.slug}`)}>
                <div className="slot-thumb"><img src={slot.thumb} alt={slot.name} /></div>
                <div className="slot-body">
                  <div className="slot-name">{slot.name}</div>
                  <div className="slot-meta">
                    <span className="slot-rtp">{slot.rtp}</span>
                    {slot.hot && <span className="slot-badge badge-hot">HOT</span>}
                    {slot.isNew && <span className="slot-badge badge-new">NEW</span>}
                  </div>
                  <div className="slot-prov">{slot.provider}</div>
                  {slot.types && slot.types.length > 0 && (
                    <div style={{ marginTop: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {slot.types.slice(0, 3).map((t: string, i: number) => (
                        <span 
                          key={i} 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/slots?theme=${t}`); }}
                          style={{ fontSize: '.65rem', textTransform: 'uppercase', background: 'var(--border)', padding: '2px 6px', borderRadius: '8px', color: 'var(--fg)', cursor: 'pointer' }}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="section section-alt">
        <div className="container">
          <div className="sec-label">Where to Play</div>
          <h2 className="sec-title">Top SA Casinos — Ranked Without Fear or Favour</h2>
          <p className="sec-desc">Real accounts. Real deposits. Withdrawals timed to the minute. No casino paid to appear on this list. Two tried. They failed.</p>
          <div className="casino-list">
            {BRANDS.slice(0, 3).map(brand => (
              <div key={brand.id} className="casino-row" onClick={() => navigate('/casinos')}>
                <div className={`casino-rank ${brand.rank <= 3 ? 'top' : ''}`}>#{brand.rank}</div>
                <div className="casino-info">
                  <div className="casino-name">{brand.name} {brand.emoji}</div>
                  <div className="casino-desc">{brand.bonusDesc}</div>
                  <div className="casino-stars">{'★'.repeat(Math.floor(brand.stars))} {brand.stars}</div>
                </div>
                <div className="code-box">
                  <div className="code-label">PROMO CODE</div>
                  <div className="code-val">{brand.code}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}><button className="btn-secondary" onClick={() => navigate('/casinos')}>See All 5 Full Casino Reviews →</button></div>
        </div>
      </div>
    </div>
  );
}

function Casinos() {
  return (
    <div className="page active">
      <Helmet>
        <title>Best Online Casinos South Africa 2026 | Real Money Reviews</title>
        <meta name="description" content="Read our brutally honest reviews of the top 5 online casinos in South Africa. We test deposits, withdrawals, and support with real ZAR." />
      </Helmet>
      <div className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="breadcrumb"><Link to="/" className="lnk">Home</Link> › Where to Play</div>
          <div className="sec-label">Casino Reviews</div>
          <h1 className="sec-title">Best Online Casinos South Africa 2026</h1>
          <p className="sec-desc">5 casinos. Real accounts. Real deposits. Withdrawals timed to the minute. Support tested with real issues. Zero casinos paid to appear here.</p>
          <div className="casino-list">
            {BRANDS.map(brand => (
              <div key={brand.id} className="casino-row" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '24px' }}>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div className={`casino-rank ${brand.rank <= 3 ? 'top' : ''}`}>#{brand.rank}</div>
                    <div className="casino-info">
                      <div className="casino-name" style={{ fontSize: '1.5rem' }}>{brand.name} {brand.emoji}</div>
                      <div className="casino-stars">{'★'.repeat(Math.floor(brand.stars))} {brand.stars}</div>
                    </div>
                  </div>
                  <div className="code-box">
                    <div className="code-label">PROMO CODE</div>
                    <div className="code-val">{brand.code}</div>
                  </div>
                  <a href={brand.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '12px 24px', fontSize: '1rem' }}>Play Now</a>
                </div>
                
                <div style={{ width: '100%', background: 'var(--bg)', padding: '20px', borderRadius: '8px', marginTop: '10px' }}>
                  <h3 style={{ marginBottom: '10px', color: 'var(--gold)' }}>{brand.shortDesc}</h3>
                  <p dangerouslySetInnerHTML={{ __html: brand.review.overview }} style={{ marginBottom: '10px' }}></p>
                  <p dangerouslySetInnerHTML={{ __html: brand.review.bonuses }} style={{ marginBottom: '10px' }}></p>
                  <p dangerouslySetInnerHTML={{ __html: brand.review.payments }} style={{ marginBottom: '10px' }}></p>
                  <p dangerouslySetInnerHTML={{ __html: brand.review.support }} style={{ marginBottom: '20px' }}></p>
                  
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                      <h4 style={{ color: 'var(--green)', marginBottom: '8px' }}>Pros</h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {brand.review.pros.map((p, i) => <li key={i} style={{ marginBottom: '4px' }}>✓ {p}</li>)}
                      </ul>
                    </div>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                      <h4 style={{ color: 'var(--red)', marginBottom: '8px' }}>Cons</h4>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {brand.review.cons.map((c, i) => <li key={i} style={{ marginBottom: '4px' }}>✗ {c}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Slots() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialProvider = searchParams.get('provider') || 'all';
  const initialTheme = searchParams.get('theme') || 'all';
  
  const [providerFilter, setProviderFilter] = useState(initialProvider);
  const [themeFilter, setThemeFilter] = useState(initialTheme);
  const [sortOrder, setSortOrder] = useState('top');
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  });

  const fetchGames = async (pageNum: number, provider: string, theme: string, sort: string, append: boolean = false) => {
    setLoading(true);
    try {
      let url = `/api/games?page=${pageNum}`;
      if (provider !== 'all') url += `&provider=${encodeURIComponent(provider)}`;
      
      if (theme !== 'all') url += `&theme=${theme}`;
      if (sort) url += `&sort=${sort}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.data) {
        let formattedSlots = data.data.map((g: any) => {
          let rtpFormatted = 'N/A';
          if (g.rtp) {
            const rtpVal = parseFloat(g.rtp);
            rtpFormatted = rtpVal < 1 ? (rtpVal * 100).toFixed(2) + '%' : rtpVal + '%';
          }
          return {
            id: g.id,
            name: g.name,
            slug: g.slug,
            thumb: g.thumb,
            provider: g.provider_name,
            rtp: rtpFormatted,
            vol: g.volatility || 'Unknown',
            maxwin: g.max_exposure ? `${g.max_exposure}x` : 'N/A',
            types: g.themes ? g.themes.map((t: any) => t.slug) : []
          };
        });

        if (append) {
          setSlots(prev => [...prev, ...formattedSlots]);
        } else {
          setSlots(formattedSlots);
        }
        setHasMore(data.meta.current_page < data.meta.last_page);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    setProviderFilter(initialProvider);
    setThemeFilter(initialTheme);
  }, [initialProvider, initialTheme]);

  useEffect(() => {
    setPage(1);
    fetchGames(1, providerFilter, themeFilter, sortOrder, false);
  }, [providerFilter, themeFilter, sortOrder]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchGames(nextPage, providerFilter, themeFilter, sortOrder, true);
    }
  }, [inView, hasMore, loading, providerFilter, themeFilter, sortOrder]);

  const handleProviderChange = (prov: string) => {
    const params = new URLSearchParams();
    if (prov !== 'all') params.set('provider', prov);
    if (themeFilter !== 'all') params.set('theme', themeFilter);
    navigate(`/slots${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleThemeChange = (theme: string) => {
    const params = new URLSearchParams();
    if (providerFilter !== 'all') params.set('provider', providerFilter);
    if (theme !== 'all') params.set('theme', theme);
    navigate(`/slots${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <div className="page active">
      <Helmet>
        <title>All Real Money Slots South Africa | Play Online 2026</title>
        <meta name="description" content="Browse our massive database of real money slots available in South Africa. Filter by provider, sort by RTP, and find where to play safely." />
      </Helmet>
      <div className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="breadcrumb"><Link to="/" className="lnk">Home</Link> › All Slots</div>
          <div className="sec-label">All Slots</div>
          <h1 className="sec-title">Real Money Slot Games — South Africa 2026</h1>
          <p className="sec-desc">Tested on real SA accounts. RTP independently verified. Mobile performance rated on actual MTN data — not a "good signal" fantasy.</p>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '26px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              {['all', 'Pragmatic Play', 'Spribe', 'Hacksaw Gaming', 'BGaming', 'Evolution'].map(prov => (
                <button 
                  key={prov}
                  className={providerFilter === prov ? 'btn-primary' : 'btn-secondary'} 
                  style={{ fontSize: '.75rem', padding: '7px 15px' }} 
                  onClick={() => handleProviderChange(prov)}
                >
                  {prov === 'all' ? 'All Games' : prov}
                </button>
              ))}
              {themeFilter !== 'all' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '10px', padding: '6px 12px', background: 'var(--gold)', color: '#000', borderRadius: '20px', fontSize: '.75rem', fontWeight: 'bold' }}>
                  Theme: {themeFilter}
                  <button onClick={() => handleThemeChange('all')} style={{ background: 'transparent', border: 'none', color: '#000', cursor: 'pointer', padding: '0 4px', fontSize: '1rem', lineHeight: 1 }}>×</button>
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '.8rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase' }}>Sort By:</span>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ background: 'var(--bg2)', color: 'var(--fg)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: '6px', fontSize: '.85rem', outline: 'none' }}
              >
                <option value="top">Top Order (Recommended)</option>
                <option value="popular">Most Popular</option>
                <option value="latest">Latest Releases</option>
                <option value="a-z">A - Z</option>
                <option value="z-a">Z - A</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="section section-alt" style={{ paddingTop: '18px' }}>
        <div className="container">
          <div className="slot-grid">
            {slots.map(slot => (
              <Link to={`/game/${slot.slug}`} key={`${slot.id}-${slot.slug}`} className="slot-card" style={{ textDecoration: 'none' }}>
                <div className="slot-thumb"><img src={slot.thumb} alt={slot.name} loading="lazy" /></div>
                <div className="slot-body">
                  <div className="slot-name">{slot.name}</div>
                  <div className="slot-meta">
                    <span className="slot-rtp">{slot.rtp}</span>
                  </div>
                  <div className="slot-prov">{slot.provider}</div>
                  {slot.types && slot.types.length > 0 && (
                    <div style={{ marginTop: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {slot.types.slice(0, 3).map((t: string, i: number) => (
                        <span 
                          key={i} 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/slots?theme=${t}`; }}
                          style={{ fontSize: '.65rem', textTransform: 'uppercase', background: 'var(--border)', padding: '2px 6px', borderRadius: '8px', color: 'var(--fg)', cursor: 'pointer' }}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
          
          {/* Lazy loading trigger element */}
          <div ref={ref} style={{ height: '20px', margin: '20px 0' }}></div>
          
          {loading && <div style={{ textAlign: 'center', margin: '20px 0', color: 'var(--gold)' }}>Loading more slots...</div>}
        </div>
      </div>
    </div>
  );
}

function GameTypes() {
  return (
    <div className="page active">
      <Helmet>
        <title>Slot Game Types & Themes | South Africa</title>
        <meta name="description" content="Browse slots by game type: Megaways, Buy Bonus, High Volatility, and more. Find the exact flavour of slot you're looking for." />
      </Helmet>
      <div className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="breadcrumb"><Link to="/" className="lnk">Home</Link> › Game Types</div>
          <div className="sec-label">By Category</div>
          <h1 className="sec-title">Browse Slots by Game Type</h1>
          <p className="sec-desc">Because "high-RTP, medium-volatility, free-spins, mythology theme" is a completely reasonable request and we respect that level of specificity.</p>
          <div className="cat-grid">
            {GAME_TYPES.map(cat => (
              <Link to={`/slots?theme=${cat.id}`} key={cat.id} className="cat-card" style={{ textDecoration: 'none' }}>
                <div className="cat-icon">{cat.icon}</div>
                <div className="cat-name">{cat.name}</div>
                <div className="cat-count">{EDITOR_SLOTS.filter(s => s.types.includes(cat.id)).length}+ Games</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Promos() {
  return (
    <div className="page active">
      <Helmet>
        <title>Best Casino Promo Codes South Africa 2026</title>
        <meta name="description" content="Working promo codes for South African online casinos. Claim free spins, deposit matches, and no-deposit bonuses. Verified March 2026." />
      </Helmet>
      <div className="section">
        <div className="container">
          <div className="breadcrumb"><Link to="/" className="lnk">Home</Link> › Promo Codes</div>
          <div className="sec-label">Promo Codes</div>
          <h1 className="sec-title">Working Promo Codes — Verified March 2026</h1>
          <p className="sec-desc">Every code personally tested. No expired codes in fresh packaging. Click any code to copy instantly. Use it. Get your bonus. Enjoy responsibly.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginTop: '40px' }}>
            {BRANDS.map(brand => (
              <div key={brand.id} style={{ background: 'var(--bg2)', borderRadius: '12px', border: '1px solid var(--border)', overflow: 'hidden' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '24px', borderBottom: '1px solid var(--border)', gap: '20px' }}>
                  <div style={{ flex: '1 1 200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '2rem' }}>{brand.emoji}</span>
                      <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{brand.name}</h2>
                    </div>
                    <div style={{ color: 'var(--gold)', fontSize: '1.1rem', fontWeight: 600 }}>{brand.bonusDesc}</div>
                  </div>
                  
                  <div style={{ flex: '2 1 300px' }}>
                    <p style={{ margin: 0, fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                      {brand.promoDetails?.salesMessage || brand.shortDesc}
                    </p>
                  </div>
                  
                  <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                    <div className="promo-code-display" style={{ margin: 0, width: '100%' }}>
                      <div className="promo-code-val">{brand.code}</div>
                    </div>
                    <a href={brand.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>Claim Bonus</a>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', padding: '24px', background: 'rgba(0,0,0,0.1)' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--fg)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--gold)' }}>📋</span> How to Claim
                    </h3>
                    <ol style={{ margin: 0, paddingLeft: '20px', color: 'var(--muted)', fontSize: '.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {brand.promoDetails?.steps.map((step, i) => (
                        <li key={i} style={{ lineHeight: 1.4 }}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--fg)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--red)' }}>⚠️</span> Key Terms & Conditions
                    </h3>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--muted)', fontSize: '.9rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {brand.promoDetails?.terms.map((term, i) => (
                        <li key={i} style={{ lineHeight: 1.4 }}>{term}</li>
                      ))}
                    </ul>
                    <div style={{ marginTop: '16px', fontSize: '.8rem' }}>
                      <a href="https://www.bets.co.za/betting-sites/" target="_blank" rel="noreferrer" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>Read full terms on bets.co.za</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="page active">
      <Helmet>
        <title>About MoneyGames | Honest SA Casino Reviews</title>
        <meta name="description" content="Learn how MoneyGames reviews online casinos and slots in South Africa. Real accounts, real ZAR deposits, and brutal honesty." />
      </Helmet>
      <div className="section">
        <div className="container" style={{ maxWidth: '860px' }}>
          <div className="breadcrumb"><Link to="/" className="lnk">Home</Link> › About</div>
          <div className="sec-label">About Us</div>
          <h1 className="sec-title">Written by South Africans Who Actually Play</h1>
          <p style={{ color: 'var(--muted)', fontSize: '.87rem', maxWidth: '600px', marginBottom: '30px', fontWeight: 300 }}>No overseas content farms. No copy-pasted RTP data from provider PDFs. No "team of experts" who are suspiciously hard to name. Every review involves a real SA account, real rands, and real spins — with the bankroll hits to prove it.</p>
          <div className="sec-label" style={{ marginTop: '32px' }}>Methodology</div>
          <h2 className="sec-title" style={{ fontSize: '1.75rem' }}>How We Review</h2>
          <div className="how-grid" style={{ marginTop: '16px' }}>
            <div className="how-card"><div className="how-num">01</div><div className="how-title">Real SA Account</div><div className="how-desc">SA ID, local bank account, same registration flow as you. No demo reviews. Ever.</div></div>
            <div className="how-card"><div className="how-num">02</div><div className="how-title">Real ZAR Deposit</div><div className="how-desc">Via EFT, Ozow or instant banking. We budget the test deposits. They hurt just as much as yours do.</div></div>
            <div className="how-card"><div className="how-num">03</div><div className="how-title">500 Real Spins</div><div className="how-desc">Per slot, minimum. Real variance. Real dry spells. Real results — published exactly as they happened.</div></div>
            <div className="how-card"><div className="how-num">04</div><div className="how-title">Read Every T&C</div><div className="how-desc">Anke reads every footnote in 7pt grey font and calculates actual post-wagering value so you don't have to squint.</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GamePage() {
  const { slug } = useParams();
  const [game, setGame] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [relatedGames, setRelatedGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Sassy South African descriptions based on provider or game
  const getSassyDescription = (gameName: string, provider: string) => {
    if (provider === 'Pragmatic Play') {
      return `Look, it's ${gameName} from Pragmatic Play. You already know the drill: high volatility, flashy graphics, and the potential to either buy you a new braai or leave you eating two-minute noodles for a week. Don't say we didn't warn you, boet.`;
    } else if (provider === 'Habanero') {
      return `Ah, ${gameName} by Habanero. The maths on this one is tighter than a taxi driver's change. It's built to run on your cousin's borrowed Wi-Fi during load-shedding. A solid choice when you just want to spin without the heart palpitations.`;
    } else if (provider === 'Hacksaw Gaming') {
      return `Brace yourself. ${gameName} from Hacksaw is here to test your blood pressure. It's darker, it's meaner, and it pays out like a broken ATM when it hits. Just remember to budget properly, otherwise it's tears before bedtime.`;
    }
    return `Here we have ${gameName}. Give it a spin, see if the ancestors are smiling on you today. Just remember, the casino always has a bigger generator than you do.`;
  };

  useEffect(() => {
    setIsPlaying(false);
    setLoading(true);
    
    // First check if it's an editor pick
    const editorGame = EDITOR_SLOTS.find(s => s.slug === slug);
    
    if (editorGame) {
      setGame({
        ...editorGame,
        sassyDesc: getSassyDescription(editorGame.name, editorGame.provider)
      });
      fetchRelated(editorGame.provider, editorGame.id);
      setLoading(false);
    } else {
      // Fetch from API by searching
      const fetchGameFromApi = async () => {
        try {
          const res = await fetch(`/api/game/${slug}`);
          const data = await res.json();
          if (data.data) {
            const found = data.data;
            let rtpFormatted = 'N/A';
            if (found.rtp) {
              const rtpVal = parseFloat(found.rtp);
              rtpFormatted = rtpVal < 1 ? (rtpVal * 100).toFixed(2) + '%' : rtpVal + '%';
            }
            
            const formattedGame = {
              id: found.id,
              name: found.name,
              slug: found.slug,
              thumb: found.thumb,
              provider: found.provider_name,
              rtp: rtpFormatted,
              vol: found.volatility || 'Unknown',
              maxwin: found.max_exposure ? `${found.max_exposure}x` : 'N/A',
              types: found.themes ? found.themes.map((t: any) => t.slug) : [],
              sassyDesc: getSassyDescription(found.name, found.provider_name)
            };
            setGame(formattedGame);
            fetchRelated(formattedGame.provider, formattedGame.id);
          } else {
            setGame(null);
          }
        } catch (e) {
          console.error(e);
          setGame(null);
        }
        setLoading(false);
      };
      fetchGameFromApi();
    }
  }, [slug]);

  const fetchRelated = async (providerName: string, currentId: number) => {
    try {
      const res = await fetch(`/api/games?provider=${encodeURIComponent(providerName)}&page=1`);
      const data = await res.json();
      if (data.data) {
        const formatted = data.data
          .filter((g: any) => g.id !== currentId)
          .slice(0, 4)
          .map((g: any) => {
            let rtpFormatted = 'N/A';
            if (g.rtp) {
              const rtpVal = parseFloat(g.rtp);
              rtpFormatted = rtpVal < 1 ? (rtpVal * 100).toFixed(2) + '%' : rtpVal + '%';
            }
            return {
              id: g.id,
              name: g.name,
              slug: g.slug,
              thumb: g.thumb,
              provider: g.provider_name,
              rtp: rtpFormatted,
              types: g.themes ? g.themes.map((t: any) => t.slug) : []
            };
          });
        setRelatedGames(formatted);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div className="page active"><div className="container" style={{ textAlign: 'center', padding: '100px 0', color: 'var(--gold)' }}>Loading game data...</div></div>;
  }

  if (!game) {
    return <div className="page active"><div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>Game not found. Ag shame.</div></div>;
  }

  // Determine where to play based on provider
  let availableCasinos = BRANDS;
  if (game.provider === 'Hacksaw Gaming') {
    availableCasinos = BRANDS.filter(b => b.id === 'playabets');
  } else {
    // Pragmatic and Habanero are everywhere, but let's just show top 4
    availableCasinos = BRANDS.slice(0, 4);
  }

  return (
    <div className="page active">
      <Helmet>
        <title>Play {game.name} Slot Free Demo | Where to Play in South Africa</title>
        <meta name="description" content={`Play the free demo of ${game.name} by ${game.provider}. Find out where to play ${game.name} for real money in South Africa with the best bonuses.`} />
      </Helmet>
      <div className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="breadcrumb">
            <Link to="/" className="lnk">Home</Link> › 
            <Link to="/slots" className="lnk">All Slots</Link> › 
            {game.name}
          </div>
          
          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '30px' }}>
            <div style={{ flex: '1 1 600px' }}>
              <h1 className="sec-title" style={{ marginBottom: '10px' }}>{game.name}</h1>
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', fontFamily: "'DM Mono', monospace", fontSize: '.8rem', color: 'var(--muted)', flexWrap: 'wrap' }}>
                <span style={{ background: 'var(--bg2)', padding: '4px 8px', borderRadius: '4px' }}>Provider: <strong style={{ color: 'var(--gold)' }}>{game.provider}</strong></span>
                <span style={{ background: 'var(--bg2)', padding: '4px 8px', borderRadius: '4px' }}>RTP: <strong style={{ color: 'var(--green)' }}>{game.rtp}</strong></span>
                {game.vol && <span style={{ background: 'var(--bg2)', padding: '4px 8px', borderRadius: '4px' }}>Volatility: <strong>{game.vol}</strong></span>}
                {game.maxwin && <span style={{ background: 'var(--bg2)', padding: '4px 8px', borderRadius: '4px' }}>Max Win: <strong>{game.maxwin}</strong></span>}
              </div>

              {game.types && game.types.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                  {game.types.map((type: string, i: number) => (
                    <Link to={`/slots?theme=${type}`} key={i} style={{ fontSize: '.7rem', textTransform: 'uppercase', background: 'var(--border)', padding: '3px 8px', borderRadius: '12px', color: 'var(--fg)', textDecoration: 'none' }}>
                      #{type}
                    </Link>
                  ))}
                </div>
              )}

              <p style={{ fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '25px', color: 'var(--fg)', borderLeft: '3px solid var(--gold)', paddingLeft: '15px' }}>
                {game.sassyDesc}
              </p>

              <div className="iframe-outer" style={{ background: 'var(--bg2)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', position: 'relative', minHeight: '500px' }}>
                {!isPlaying ? (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(rgba(10,10,12,0.8), rgba(10,10,12,0.9)), url(${game.thumb}) center/cover` }}>
                    <img src={game.thumb} alt={game.name} style={{ width: '200px', borderRadius: '10px', marginBottom: '20px', border: '2px solid var(--gold)' }} />
                    <button className="btn-primary" style={{ fontSize: '1.2rem', padding: '15px 40px' }} onClick={() => setIsPlaying(true)}>
                      ▶ Play Free Demo
                    </button>
                    <p style={{ marginTop: '15px', fontSize: '.8rem', color: 'var(--muted)' }}>18+ | Play Responsibly | Free Demo Version</p>
                  </div>
                ) : (
                  <iframe 
                    src={`https://slotslaunch.com/iframe/${game.id}?token=NvbCQ508Hv0YvNCvz0o1YugDdpULSL8hHEXanUqnpqT47e7yNU`} 
                    width="100%" 
                    height="600px" 
                    style={{ border: 'none', display: 'block' }}
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
            
            <div style={{ flex: '1 1 300px' }}>
              <div className="sec-label">Play For Real Money</div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', marginBottom: '15px' }}>Where to Play {game.name} in South Africa</h3>
              <p style={{ fontSize: '.85rem', color: 'var(--muted)', marginBottom: '20px' }}>
                {game.provider === 'Hacksaw Gaming' 
                  ? "Hacksaw games are rare in SA. Currently, Playabets is the only licensed spot to play them." 
                  : "We've tested these casinos with real ZAR deposits. They actually pay out."}
              </p>
              <div className="casino-list">
                {availableCasinos.map(brand => (
                  <div key={brand.id} className="casino-row" style={{ padding: '16px', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: '10px' }}>
                      <div className="casino-name" style={{ fontSize: '1.2rem' }}>{brand.name} {brand.emoji}</div>
                      <div className="casino-stars" style={{ fontSize: '.8rem' }}>{'★'.repeat(Math.floor(brand.stars))}</div>
                    </div>
                    <div className="casino-desc" style={{ marginBottom: '15px', color: 'var(--gold)' }}>{brand.bonusDesc}</div>
                    <a href={brand.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '10px', fontSize: '.9rem', width: '100%', textAlign: 'center' }}>Play for Real Money</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section section-alt">
        <div className="container">
          <div className="sec-label">More from {game.provider}</div>
          <h2 className="sec-title">Related Games</h2>
          <div className="slot-grid">
            {relatedGames.map(slot => (
              <Link to={`/game/${slot.slug}`} key={slot.id} className="slot-card" style={{ textDecoration: 'none' }}>
                <div className="slot-thumb"><img src={slot.thumb} alt={slot.name} loading="lazy" /></div>
                <div className="slot-body">
                  <div className="slot-name">{slot.name}</div>
                  <div className="slot-meta">
                    <span className="slot-rtp">{slot.rtp}</span>
                  </div>
                  <div className="slot-prov">{slot.provider}</div>
                  {slot.types && slot.types.length > 0 && (
                    <div style={{ marginTop: '8px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {slot.types.slice(0, 3).map((t: string, i: number) => (
                        <span 
                          key={i} 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/slots?theme=${t}`; }}
                          style={{ fontSize: '.65rem', textTransform: 'uppercase', background: 'var(--border)', padding: '2px 6px', borderRadius: '8px', color: 'var(--fg)', cursor: 'pointer' }}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
