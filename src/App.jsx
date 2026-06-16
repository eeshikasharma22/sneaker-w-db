import { useState,useEffect } from "react";
import { supabase } from "./Sheru/supabase";

// ─── SEED DATA ────────────────────────────────────────────────────────────────

const SEED_SHOES = [
  { id: 1, name: "AIR RUNNER",   price: "$129", tag: "Best Seller", category: "All",  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800" },
  { id: 2, name: "PHANTOM",      price: "$149", tag: "New Drop",    category: "All",  image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800" },
  { id: 3, name: "URBAN X",      price: "$169", tag: "Limited",     category: "All",  image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800" },
  { id: 4, name: "SPORT PRO",    price: "$179", tag: "Hot",         category: "All",  image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800" },
  { id: 5, name: "CLOUD STRIDE", price: "$199", tag: "New Drop",    category: "All",  image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800" },
  { id: 6, name: "VELO FORCE",   price: "$219", tag: "Limited",     category: "All",  image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800" },
  { id: 7, name: "SOFT STEP",    price: "$119", tag: "Mom's Pick",  category: "Moms", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800" },
  { id: 8, name: "EASE WALK",    price: "$109", tag: "Best Seller", category: "Moms", image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800" },
  { id: 9, name: "DAILY BLOOM",  price: "$129", tag: "New Drop",    category: "Moms", image: "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=800" },
  { id:10, name: "ARCH ANGEL",   price: "$139", tag: "Hot",         category: "Moms", image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800" },
  { id:11, name: "VELVET SOLE",  price: "$149", tag: "Limited",     category: "Moms", image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800" },
  { id:12, name: "PETAL RUN",    price: "$125", tag: "New Drop",    category: "Moms", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800" },
  { id:13, name: "TINY BOLT",    price: "$59",  tag: "Kids' Fave",  category: "Kids", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800" },
  { id:14, name: "JUMP SQUAD",   price: "$65",  tag: "New Drop",    category: "Kids", image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800" },
  { id:15, name: "MINI RACER",   price: "$69",  tag: "Hot",         category: "Kids", image: "https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?w=800" },
  { id:16, name: "STAR DASH",    price: "$75",  tag: "Limited",     category: "Kids", image: "https://images.unsplash.com/photo-1580906853104-af4e70b23e41?w=800" },
  { id:17, name: "GLOW KICK",    price: "$79",  tag: "Best Seller", category: "Kids", image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800" },
  { id:18, name: "BOUNCE JR.",   price: "$85",  tag: "New Drop",    category: "Kids", image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800" },
];

const COLLECTIONS = [
  { name: "Running",        emoji: "🏃", desc: "Built for speed and endurance. Lightweight soles, breathable mesh, race-day ready.",                       count: "24 styles" },
  { name: "Lifestyle",      emoji: "✨", desc: "From coffee runs to street corners. Effortless looks for everyday movement.",                              count: "38 styles" },
  { name: "Basketball",     emoji: "🏀", desc: "Court-grade grip and ankle support for players who demand the edge.",                                      count: "16 styles" },
  { name: "Limited Edition",emoji: "🔥", desc: "Exclusive drops, rare colorways, and collab pieces. Once they're gone, they're gone.",                    count: "8 styles"  },
  { name: "Moms",           emoji: "💐", desc: "All-day arch support, cushioned soles, and styles that go from school run to everything else.",           count: "6 styles"  },
  { name: "Kids",           emoji: "⚡", desc: "Durable, playful, and easy to put on. Sizes 1–7, built to keep up with the energy.",                     count: "6 styles"  },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --black: #0a0a0a; --white: #f5f5f0; --accent: #ff3c00;
    --green: #00c853; --muted: #888; --card-bg: #141414; --border: #222;
    --font-display: 'Bebas Neue', sans-serif; --font-body: 'Inter', sans-serif;
  }
  body { background: var(--black); color: var(--white); font-family: var(--font-body); }

  /* BANNER */
  .banner { background: var(--accent); color: var(--white); text-align: center; padding: 10px 16px; font-size: 13px; font-weight: 600; letter-spacing: 0.04em; }

  /* NAVBAR */
  .navbar { display: flex; align-items: center; justify-content: space-between; padding: 20px 48px; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; background: rgba(10,10,10,0.92); backdrop-filter: blur(12px); }
  .navbar-logo { font-family: var(--font-display); font-size: 26px; letter-spacing: 0.06em; cursor: pointer; color: var(--white); }
  .navbar-logo span { color: var(--accent); }
  .navbar ul { display: flex; gap: 32px; list-style: none; }
  .navbar ul li { cursor: pointer; font-size: 13px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); transition: color 0.2s; }
  .navbar ul li:hover, .navbar ul li.active { color: var(--white); }
  .navbar ul li.active { border-bottom: 1px solid var(--accent); padding-bottom: 2px; }
  .navbar-actions { display: flex; gap: 10px; align-items: center; }
  .btn-sell { background: transparent; color: var(--white); border: 1px solid var(--border); padding: 9px 18px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 6px; }
  .btn-sell:hover { border-color: var(--white); background: #ffffff10; }
  .btn-sell .plus { font-size: 16px; line-height: 1; color: var(--accent); }
  .btn-primary { background: var(--accent); color: var(--white); border: none; padding: 10px 22px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: opacity 0.2s; }
  .btn-primary:hover { opacity: 0.85; }
  .btn-outline { background: transparent; color: var(--white); border: 1px solid var(--white); padding: 10px 22px; font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
  .btn-outline:hover { background: var(--white); color: var(--black); }

  /* HOME */
  .hero { display: grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - 110px); padding: 0 48px; }
  .hero-text { display: flex; flex-direction: column; justify-content: center; gap: 24px; padding: 60px 0; }
  .hero-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); }
  .hero-text h1 { font-family: var(--font-display); font-size: clamp(80px, 10vw, 128px); line-height: 0.92; letter-spacing: 0.02em; }
  .hero-text p { font-size: 15px; color: var(--muted); line-height: 1.7; max-width: 360px; }
  .hero-cta { display: flex; gap: 12px; margin-top: 8px; }
  .hero-image { position: relative; overflow: hidden; display: flex; align-items: center; }
  .hero-image img { width: 100%; height: 100%; object-fit: cover; filter: contrast(1.05) saturate(0.9); }
  .hero-image::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right, var(--black) 0%, transparent 30%); }
  .marquee-strip { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 14px 0; overflow: hidden; white-space: nowrap; background: var(--card-bg); }
  .marquee-inner { display: inline-flex; gap: 48px; animation: marquee 18s linear infinite; }
  .marquee-inner span { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }
  .marquee-inner span.dot { color: var(--accent); }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .trending { padding: 80px 48px; border-bottom: 1px solid var(--border); }
  .section-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 40px; }
  .section-header h2 { font-family: var(--font-display); font-size: 48px; letter-spacing: 0.03em; }
  .section-header a { font-size: 12px; color: var(--accent); cursor: pointer; letter-spacing: 0.08em; text-transform: uppercase; }
  .trend-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border); }
  .trend-card { background: var(--card-bg); padding: 32px 24px; display: flex; flex-direction: column; gap: 8px; cursor: pointer; transition: background 0.2s; }
  .trend-card:hover { background: #1a1a1a; }
  .trend-card .emoji { font-size: 32px; }
  .trend-card h3 { font-family: var(--font-display); font-size: 28px; letter-spacing: 0.04em; }
  .trend-card p { font-size: 12px; color: var(--muted); }
  .reviews { padding: 80px 48px; border-bottom: 1px solid var(--border); }
  .reviews h2 { font-family: var(--font-display); font-size: 48px; letter-spacing: 0.03em; margin-bottom: 40px; }
  .review-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .review-card { background: var(--card-bg); padding: 32px; border: 1px solid var(--border); }
  .review-stars { font-size: 14px; margin-bottom: 16px; }
  .review-text { font-size: 16px; line-height: 1.6; font-style: italic; }
  .review-author { margin-top: 16px; font-size: 12px; color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; }

  /* SNEAKERS */
  .page-header { padding: 80px 48px 48px; border-bottom: 1px solid var(--border); }
  .page-header .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
  .page-header h1 { font-family: var(--font-display); font-size: clamp(56px, 8vw, 96px); letter-spacing: 0.02em; line-height: 0.9; }
  .page-header p { margin-top: 20px; font-size: 15px; color: var(--muted); max-width: 480px; line-height: 1.7; }
  .filter-bar { padding: 24px 48px; display: flex; gap: 12px; align-items: center; border-bottom: 1px solid var(--border); flex-wrap: wrap; }
  .filter-chip { padding: 8px 18px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; border: 1px solid var(--border); background: transparent; color: var(--muted); transition: all 0.2s; }
  .filter-chip:hover, .filter-chip.active { border-color: var(--white); color: var(--white); }
  .filter-chip.active { background: var(--white); color: var(--black); }
  .shoe-grid-wrap { padding: 48px; }
  .shoe-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--border); }
  .shoe-card { background: var(--black); overflow: hidden; cursor: pointer; }
  .shoe-card-img { position: relative; aspect-ratio: 1; overflow: hidden; }
  .shoe-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
  .shoe-card:hover .shoe-card-img img { transform: scale(1.04); }
  .shoe-card-tag { position: absolute; top: 16px; left: 16px; background: var(--accent); color: var(--white); font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 10px; }
  .shoe-card-tag.user-listed { background: var(--green) !important; color: #000 !important; }
  .shoe-card-body { padding: 20px 24px 28px; }
  .shoe-card-body h3 { font-family: var(--font-display); font-size: 22px; letter-spacing: 0.05em; }
  .shoe-card-foot { display: flex; justify-content: space-between; align-items: center; margin-top: 14px; }
  .shoe-price { font-size: 18px; font-weight: 600; }
  .btn-add { background: var(--white); color: var(--black); border: none; padding: 9px 18px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
  .btn-add:hover { background: var(--accent); color: var(--white); }

  /* COLLECTIONS */
  .collections-grid { padding: 48px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; background: var(--border); }
  .col-card { background: var(--black); padding: 56px 48px; cursor: pointer; transition: background 0.2s; position: relative; overflow: hidden; }
  .col-card:hover { background: #111; }
  .col-card .col-emoji { font-size: 48px; margin-bottom: 24px; display: block; }
  .col-card h3 { font-family: var(--font-display); font-size: 52px; letter-spacing: 0.02em; line-height: 1; margin-bottom: 16px; }
  .col-card p { font-size: 14px; color: var(--muted); line-height: 1.7; max-width: 340px; }
  .col-card .col-count { margin-top: 24px; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent); }
  .col-card .col-arrow { position: absolute; bottom: 40px; right: 48px; font-size: 32px; color: var(--border); transition: color 0.2s; }
  .col-card:hover .col-arrow { color: var(--accent); }

  /* CONTACT */
  .contact-wrap { display: grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - 160px); }
  .contact-info { padding: 80px 48px; border-right: 1px solid var(--border); }
  .contact-info h2 { font-family: var(--font-display); font-size: 64px; letter-spacing: 0.02em; line-height: 0.9; margin-bottom: 32px; }
  .contact-info p { font-size: 15px; color: var(--muted); line-height: 1.8; max-width: 360px; }
  .contact-detail { margin-top: 48px; display: flex; flex-direction: column; gap: 24px; }
  .contact-item { display: flex; flex-direction: column; gap: 4px; }
  .contact-item .label { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); }
  .contact-item .value { font-size: 15px; }
  .contact-form { padding: 80px 48px; }
  .contact-form h3 { font-family: var(--font-display); font-size: 36px; letter-spacing: 0.04em; margin-bottom: 32px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
  .field label { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); }
  .field input, .field textarea, .field select { background: var(--card-bg); border: 1px solid var(--border); color: var(--white); padding: 14px 16px; font-family: var(--font-body); font-size: 14px; outline: none; transition: border-color 0.2s; resize: vertical; }
  .field input:focus, .field textarea:focus, .field select:focus { border-color: var(--white); }
  .field select option { background: var(--card-bg); }
  .form-submit { margin-top: 8px; }

  /* ── SELL PAGE ── */
  .sell-wrap { display: grid; grid-template-columns: 1fr 1fr; min-height: calc(100vh - 160px); }

  /* Left panel — info / steps */
  .sell-info { padding: 80px 48px; border-right: 1px solid var(--border); display: flex; flex-direction: column; gap: 40px; }
  .sell-info-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); }
  .sell-info h2 { font-family: var(--font-display); font-size: clamp(52px, 6vw, 80px); line-height: 0.9; letter-spacing: 0.02em; }
  .sell-info > p { font-size: 15px; color: var(--muted); line-height: 1.8; max-width: 380px; }
  .sell-steps { display: flex; flex-direction: column; gap: 0; border: 1px solid var(--border); }
  .sell-step { display: flex; gap: 20px; align-items: flex-start; padding: 24px; border-bottom: 1px solid var(--border); }
  .sell-step:last-child { border-bottom: none; }
  .sell-step-num { font-family: var(--font-display); font-size: 36px; color: var(--accent); line-height: 1; min-width: 36px; }
  .sell-step-body h4 { font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px; }
  .sell-step-body p { font-size: 13px; color: var(--muted); line-height: 1.6; }

  /* Right panel — form */
  .sell-form-panel { padding: 80px 48px; overflow-y: auto; }
  .sell-form-panel h3 { font-family: var(--font-display); font-size: 36px; letter-spacing: 0.04em; margin-bottom: 32px; }

  /* Image URL preview */
  .img-preview-wrap { margin-top: 10px; border: 1px solid var(--border); aspect-ratio: 1; max-width: 200px; overflow: hidden; background: var(--card-bg); display: flex; align-items: center; justify-content: center; }
  .img-preview-wrap img { width: 100%; height: 100%; object-fit: cover; }
  .img-preview-placeholder { font-size: 12px; color: var(--muted); text-align: center; padding: 16px; }

  /* Price prefix */
  .price-input-wrap { display: flex; }
  .price-prefix { background: var(--border); color: var(--muted); padding: 14px 14px; font-size: 14px; font-weight: 700; border: 1px solid var(--border); border-right: none; display: flex; align-items: center; }
  .price-input-wrap input { flex: 1; }

  /* Success state */
  .sell-success { padding: 60px 32px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; }
  .sell-success .tick { width: 64px; height: 64px; border-radius: 50%; background: var(--green); display: flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 8px; }
  .sell-success h3 { font-family: var(--font-display); font-size: 40px; letter-spacing: 0.04em; }
  .sell-success p { font-size: 14px; color: var(--muted); max-width: 320px; line-height: 1.7; }
  .sell-success .preview-card { border: 1px solid var(--border); width: 220px; overflow: hidden; margin-top: 8px; }
  .sell-success .preview-card img { width: 100%; aspect-ratio: 1; object-fit: cover; }
  .sell-success .preview-card-body { padding: 16px; text-align: left; }
  .sell-success .preview-card-body h4 { font-family: var(--font-display); font-size: 20px; letter-spacing: 0.04em; }
  .sell-success .preview-card-body p { font-size: 14px; color: var(--muted); margin-top: 4px; }
  .sell-success-actions { display: flex; gap: 12px; margin-top: 8px; flex-wrap: wrap; justify-content: center; }

  /* SELL SAVING STATE */
  .btn-saving { opacity: 0.6; cursor: not-allowed !important; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid #ffffff40; border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; vertical-align: middle; margin-right: 8px; }


  .footer { padding: 48px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
  .footer-logo { font-family: var(--font-display); font-size: 24px; letter-spacing: 0.06em; }
  .footer-logo span { color: var(--accent); }
  .footer-tagline { font-size: 13px; color: var(--muted); }
  .footer-copy { font-size: 12px; color: var(--border); }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .navbar { padding: 16px 20px; }
    .navbar ul { display: none; }
    .hero { grid-template-columns: 1fr; padding: 0 20px; }
    .hero-image { display: none; }
    .trending, .reviews, .shoe-grid-wrap, .page-header { padding: 48px 20px; }
    .trend-grid, .review-grid { grid-template-columns: 1fr 1fr; }
    .shoe-grid { grid-template-columns: 1fr 1fr; }
    .collections-grid { grid-template-columns: 1fr; padding: 20px; }
    .contact-wrap, .sell-wrap { grid-template-columns: 1fr; }
    .contact-info { border-right: none; border-bottom: 1px solid var(--border); }
    .sell-info { border-right: none; border-bottom: 1px solid var(--border); padding: 48px 20px; }
    .sell-form-panel { padding: 48px 20px; }
    .contact-info, .contact-form { padding: 48px 20px; }
    .filter-bar { padding: 16px 20px; }
    .footer { flex-direction: column; gap: 16px; text-align: center; padding: 32px 20px; }
    .form-row { grid-template-columns: 1fr; }
  }
`;

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function Banner() {
  return <div className="banner">🔥 Summer Sale — Up To 40% Off On Selected Sneakers</div>;
}

function Navbar({ page, setPage }) {
  const links = ["Home", "Sneakers", "Collections", "Contact"];
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => setPage("Home")}>EESHA <span>KICKS</span></div>
      <ul>
        {links.map(l => (
          <li key={l} className={page === l ? "active" : ""} onClick={() => setPage(l)}>{l}</li>
        ))}
      </ul>
      <div className="navbar-actions">
        <button className="btn-sell" onClick={() => setPage("Sell")}>
          <span className="plus">+</span> Sell Your Pair
        </button>
        <button className="btn-primary" onClick={() => setPage("Sneakers")}>Shop Now</button>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">EESHA <span>KICKS</span></div>
      <div className="footer-tagline">Premium Sneakers For Everyday Legends</div>
      <div className="footer-copy">© 2026 EESHA KICKS</div>
    </footer>
  );
}

// ─── PAGES ────────────────────────────────────────────────────────────────────

function HomePage({ setPage }) {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p className="hero-eyebrow">Limited Drop 2026</p>
          <h1>RUN<br />FASTER.<br />LOOK<br />BETTER.</h1>
          <p>Premium sneakers designed for comfort, performance and style. Built for everyday legends.</p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => setPage("Sneakers")}>Explore Collection</button>
            <button className="btn-outline" onClick={() => setPage("Collections")}>Browse Categories</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200" alt="Featured sneaker" />
        </div>
      </section>

      <div className="marquee-strip">
        <div className="marquee-inner">
          {["Free Shipping Over $100","·","New Drops Weekly","·","Premium Quality","·","30-Day Returns","·",
            "Free Shipping Over $100","·","New Drops Weekly","·","Premium Quality","·","30-Day Returns","·"].map((t,i)=>(
            <span key={i} className={t==="·"?"dot":""}>{t}</span>
          ))}
        </div>
      </div>

      <section className="trending">
        <div className="section-header">
          <h2>Trending Now</h2>
          <a onClick={() => setPage("Collections")}>View All →</a>
        </div>
        <div className="trend-grid">
          {[{emoji:"🏃",name:"Running",count:"24 styles"},{emoji:"✨",name:"Lifestyle",count:"38 styles"},
            {emoji:"🏀",name:"Basketball",count:"16 styles"},{emoji:"🔥",name:"Limited Edition",count:"8 styles"}]
            .map(t => (
            <div className="trend-card" key={t.name} onClick={() => setPage("Collections")}>
              <span className="emoji">{t.emoji}</span>
              <h3>{t.name}</h3>
              <p>{t.count}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reviews">
        <h2>What People Say</h2>
        <div className="review-grid">
          {[{text:"Most comfortable sneakers I've ever owned. Wore them straight out of the box.",name:"— Arjun M."},
            {text:"Perfect combination of style and comfort. I get compliments every single day.",name:"— Priya S."},
            {text:"Premium quality and fast delivery. Worth every rupee, no question.",name:"— Rahul K."}]
            .map((r,i)=>(
            <div className="review-card" key={i}>
              <div className="review-stars">⭐⭐⭐⭐⭐</div>
              <p className="review-text">"{r.text}"</p>
              <p className="review-author">{r.name}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function SneakersPage({ shoes }) {
  const filters = ["All","Moms","Kids","Running","Lifestyle","Basketball","Limited"];
  const [active, setActive] = useState("All");
  const tagColorMap = { "Mom's Pick":"#c0568a", "Kids' Fave":"#1e88d4", "Your Drop":"#00c853" };
  const filtered = active === "All" ? shoes : shoes.filter(s => s.category === active);

  return (
    <>
      <div className="page-header">
        <p className="eyebrow">Our Collection</p>
        <h1>ALL<br />SNEAKERS</h1>
        <p>Every pair engineered for the way you move. Premium materials, zero compromise.</p>
      </div>
      <div className="filter-bar">
        {filters.map(f => (
          <button key={f} className={`filter-chip ${active===f?"active":""}`} onClick={() => setActive(f)}>
            {f==="Moms"?"💐 Moms":f==="Kids"?"⚡ Kids":f}
          </button>
        ))}
      </div>
      <div className="shoe-grid-wrap">
        <div className="shoe-grid">
          {filtered.map((shoe,i) => (
            <div className="shoe-card" key={shoe.id||i}>
              <div className="shoe-card-img">
                <img src={shoe.image} alt={shoe.name} />
                <span
                  className={`shoe-card-tag${shoe.userListed?" user-listed":""}`}
                  style={tagColorMap[shoe.tag]?{background:tagColorMap[shoe.tag]}:{}}
                >{shoe.tag}</span>
              </div>
              <div className="shoe-card-body">
                <h3>{shoe.name}</h3>
                <div className="shoe-card-foot">
                  <span className="shoe-price">{shoe.price}</span>
                  <button className="btn-add">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function CollectionsPage({ setPage }) {
  return (
    <>
      <div className="page-header">
        <p className="eyebrow">Shop By Category</p>
        <h1>COLLECTIONS</h1>
        <p>Find your fit. Every category, every style — curated for how you live.</p>
      </div>
      <div className="collections-grid">
        {COLLECTIONS.map((c,i) => (
          <div className="col-card" key={i} onClick={() => setPage("Sneakers")}>
            <span className="col-emoji">{c.emoji}</span>
            <h3>{c.name}</h3>
            <p>{c.desc}</p>
            <div className="col-count">{c.count}</div>
            <span className="col-arrow">→</span>
          </div>
        ))}
      </div>
    </>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="contact-wrap">
      <div className="contact-info">
        <h2>GET IN<br />TOUCH</h2>
        <p>Have a question about sizing, a collab idea, or just want to know when the next drop lands? We're here.</p>
        <div className="contact-detail">
          {[["Email","hello@eeshakicks.com"],["WhatsApp","+91 98765 43210"],
            ["Store Hours","Mon – Sat, 10am – 8pm IST"],["Location","Virar West, Mumbai, Maharashtra"]].map(([l,v])=>(
            <div className="contact-item" key={l}>
              <span className="label">{l}</span>
              <span className="value">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="contact-form">
        <h3>Send Us a Message</h3>
        {sent ? (
          <div style={{padding:"48px 0",textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:16}}>✅</div>
            <p style={{fontFamily:"var(--font-display)",fontSize:28,letterSpacing:"0.04em"}}>MESSAGE SENT</p>
            <p style={{color:"var(--muted)",marginTop:12}}>We'll get back to you within 24 hours.</p>
            <button className="btn-primary" style={{marginTop:32}} onClick={()=>setSent(false)}>Send Another</button>
          </div>
        ) : (
          <>
            <div className="form-row">
              <div className="field"><label>First Name</label><input type="text" placeholder="Eesha" /></div>
              <div className="field"><label>Last Name</label><input type="text" placeholder="Sharma" /></div>
            </div>
            <div className="field"><label>Email</label><input type="email" placeholder="you@example.com" /></div>
            <div className="field">
              <label>Subject</label>
              <select>
                <option>Order Inquiry</option><option>Size & Fit</option>
                <option>Returns & Exchanges</option><option>Collab / Partnership</option><option>Other</option>
              </select>
            </div>
            <div className="field"><label>Message</label><textarea rows={5} placeholder="Tell us what's on your mind..." /></div>
            <div className="form-submit"><button className="btn-primary" onClick={()=>setSent(true)}>Send Message</button></div>
          </>
        )}
      </div>
    </div>
  );
}

// ── SELL PAGE ─────────────────────────────────────────────────────────────────

const CATEGORIES = ["All","Moms","Kids","Running","Lifestyle","Basketball","Limited"];

function SellPage({ onListProduct, setPage }) {
  const [form, setForm] = useState({
    name: "", price: "", category: "All", tag: "New Drop",
    imageUrl: "", sellerName: "", sellerEmail: "", description: ""
  });
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors]       = useState({});

  const set = (k, v) => {
    setForm(f => ({...f, [k]: v}));
    setErrors(e => ({...e, [k]: ""}));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())        e.name       = "Shoe name is required.";
    if (!form.price.trim())       e.price      = "Price is required.";
    else if (isNaN(Number(form.price.replace(/[^0-9.]/g,"")))) e.price = "Enter a valid number.";
    if (!form.imageUrl.trim())    e.imageUrl   = "Please provide an image URL.";
    if (!form.sellerName.trim())  e.sellerName = "Your name is required.";
    if (!form.sellerEmail.trim()) e.sellerEmail= "Your email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.sellerEmail)) e.sellerEmail = "Enter a valid email.";
    return e;
  };
  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const rawPrice = form.price.replace(/[^0-9.]/g, "");
    const newProduct = {
      id:         Date.now(),
      name:       form.name.trim().toUpperCase(),
      price:      `$${rawPrice}`,
      tag:        form.tag,
      category:   form.category,
      image:      form.imageUrl.trim(),
      userListed: true,
    };
    await onListProduct(newProduct);
    setSubmitted(newProduct);
  };

  if (submitted) {
    return (
      <div className="sell-wrap" style={{display:"block"}}>
        <div className="sell-success">
          <div className="tick">✓</div>
          <h3>YOU'RE LIVE!</h3>
          <p>Your sneaker is now listed on EESHA KICKS and visible in the store for everyone to shop.</p>
          <div className="preview-card">
            <img src={submitted.image} alt={submitted.name}
              onError={e => e.target.src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"} />
            <div className="preview-card-body">
              <h4>{submitted.name}</h4>
              <p>{submitted.price} · {submitted.category}</p>
            </div>
          </div>
          <div className="sell-success-actions">
            <button className="btn-primary" onClick={() => setPage("Sneakers")}>View in Store</button>
            <button className="btn-outline" onClick={() => { setForm({name:"",price:"",category:"All",tag:"New Drop",imageUrl:"",sellerName:"",sellerEmail:"",description:""}); setSubmitted(null); }}>List Another</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sell-wrap">
      {/* Left: info panel */}
      <div className="sell-info">
        <p className="sell-info-eyebrow">Become a Seller</p>
        <h2>SELL YOUR<br />KICKS HERE</h2>
        <p>Got a pair you no longer wear? List it on EESHA KICKS and reach thousands of sneaker lovers instantly.</p>
        <div className="sell-steps">
          {[
            ["01","Fill the form","Add your shoe's name, price, category, and a photo URL."],
            ["02","Go live instantly","Your listing appears in the Sneakers page right away — no approval wait."],
            ["03","Get connected","Buyers reach out to you directly via the contact you provide."],
          ].map(([n,h,d]) => (
            <div className="sell-step" key={n}>
              <span className="sell-step-num">{n}</span>
              <div className="sell-step-body"><h4>{h}</h4><p>{d}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: form */}
      <div className="sell-form-panel">
        <h3>List Your Sneaker</h3>

        {/* Shoe name */}
        <div className="field">
          <label>Shoe Name *</label>
          <input type="text" placeholder="e.g. ULTRA BOOST 5.0"
            value={form.name} onChange={e => set("name", e.target.value)} />
          {errors.name && <span style={{fontSize:12,color:"#ff6b6b"}}>{errors.name}</span>}
        </div>

        {/* Price */}
        <div className="field">
          <label>Price (USD) *</label>
          <div className="price-input-wrap">
            <span className="price-prefix">$</span>
            <input type="text" placeholder="129" value={form.price} onChange={e => set("price", e.target.value)} />
          </div>
          {errors.price && <span style={{fontSize:12,color:"#ff6b6b"}}>{errors.price}</span>}
        </div>

        {/* Category + Tag */}
        <div className="form-row">
          <div className="field">
            <label>Category *</label>
            <select value={form.category} onChange={e => set("category", e.target.value)}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Badge</label>
            <select value={form.tag} onChange={e => set("tag", e.target.value)}>
              {["New Drop","Best Seller","Limited","Hot","Your Drop"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Image URL */}
        <div className="field">
          <label>Image URL *</label>
          <input type="text" placeholder="https://images.unsplash.com/..."
            value={form.imageUrl} onChange={e => set("imageUrl", e.target.value)} />
          {errors.imageUrl && <span style={{fontSize:12,color:"#ff6b6b"}}>{errors.imageUrl}</span>}
          {form.imageUrl && (
            <div className="img-preview-wrap">
              <img src={form.imageUrl} alt="preview"
                onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
              />
              <div className="img-preview-placeholder" style={{display:"none"}}>⚠️ Can't load image</div>
            </div>
          )}
          {!form.imageUrl && (
            <div className="img-preview-wrap">
              <div className="img-preview-placeholder">Image preview will appear here</div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="field">
          <label>Description (optional)</label>
          <textarea rows={3} placeholder="Condition, size available, any details buyers should know..."
            value={form.description} onChange={e => set("description", e.target.value)} />
        </div>

        <div style={{borderTop:"1px solid var(--border)",marginBottom:24,paddingTop:24}}>
          <p style={{fontSize:12,color:"var(--muted)",marginBottom:20,lineHeight:1.6}}>
            Your contact details let interested buyers reach you directly.
          </p>

          {/* Seller name */}
          <div className="field">
            <label>Your Name *</label>
            <input type="text" placeholder="Eesha Sharma"
              value={form.sellerName} onChange={e => set("sellerName", e.target.value)} />
            {errors.sellerName && <span style={{fontSize:12,color:"#ff6b6b"}}>{errors.sellerName}</span>}
          </div>

          {/* Seller email */}
          <div className="field">
            <label>Your Email *</label>
            <input type="email" placeholder="you@example.com"
              value={form.sellerEmail} onChange={e => set("sellerEmail", e.target.value)} />
            {errors.sellerEmail && <span style={{fontSize:12,color:"#ff6b6b"}}>{errors.sellerEmail}</span>}
          </div>
        </div>

        <button className="btn-primary" style={{width:"100%", padding:"14px"}} onClick={handleSubmit}>
          List My Sneaker →
        </button>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("Home");
  const [shoes, setShoes] = useState(SEED_SHOES);

  // Load shoes from Supabase on mount
  useEffect(() => {
    supabase
      .from("shoe")
      .select("*")
      .then(({ data, error }) => {
        if (error) { console.error(error); return; }
        if (data && data.length > 0) {
          const mapped = data.map(row => ({
            id:         row.id,
            name: row["shoe name"],      // your "text" column = shoe name
            price:      `$${row.price}`,
            tag:        row.badge || "New Drop",
            category:   row.category || "All",
            image:      row.image_url,
            userListed: true,
          }));
          setShoes(prev => [...mapped, ...prev]);
        }
      });
  }, []);

  const handleListProduct = async (product) => {
    // Optimistically add to UI
    setShoes(prev => [product, ...prev]);

    // Save to Supabase
    const { error } = await supabase.from("shoe").insert({
      "shoe name": product.name,
      price:     parseInt(product.price.replace(/[^0-9]/g, "")),
      category:  product.category,
      badge:     product.tag,
      image_url: product.image,
    });

    if (error) console.error("Supabase insert error:", error);
  };

  return (
    <>
      <style>{css}</style>
      <Banner />
      <Navbar page={page} setPage={setPage} />
      {page === "Home" && <HomePage setPage={setPage} />}
      {page === "Sneakers" && <SneakersPage shoes={shoes} />}
      {page === "Collections" && <CollectionsPage setPage={setPage} />}
      {page === "Contact" && <ContactPage />}
      {page === "Sell" && <SellPage onListProduct={handleListProduct} setPage={setPage} />}
      <Footer />
    </>
  );
}