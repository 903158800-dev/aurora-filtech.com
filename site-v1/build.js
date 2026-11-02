// site-v1 主构建 —— 生成全部页面、JSON-LD、sitemap
// 用法: node build.js
const fs = require("fs");
const path = require("path");
const { BASE, IMG, homeCards, products } = require("./data-products");
const { industries, applications, posts, glossary } = require("./data-site");
const { CSS, layout, rfqSection, prodLink } = require("./design");
const { dryerPage, vacuumPage, formingPage, spiralPage } = require("./pages-df-vf");
const { squareMeshPage, pressFabricPage, pressBeltPage, filterCartridgePage } = require("./pages-sm");
const { aboutPage } = require("./pages-eq");

const OUT = __dirname;
const OG = `/qfy-content/uploads/2019/12/711b4e3ef611d676aa22b38c17cf53e4.jpg`;

const renderedPages = [];
function write(rel, content, pageUrl = null) {
  const fp = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  fs.writeFileSync(fp, content);
  if (pageUrl) renderedPages.push({ url: pageUrl, html: content });
  console.log("wrote", rel);
}

// ---------- JSON-LD ----------
const orgNode = {
  "@type": "Organization", "@id": `${BASE}/#organization`,
  name: "Aurora Filtech Co., Ltd", alternateName: "Aurora Filtech", url: `${BASE}/`,
  logo: { "@type": "ImageObject", url: `${BASE}/favicon.svg` },
  description: "Manufacturer of paper machine clothing, filter fabrics, spiral fabrics and mesh belts for paper, wood-based panel, mining, power, food and pharmaceutical industries.",
  email: "aaron@aurora-filtech.com", telephone: "+8615206119266",
  address: [
    { "@type": "PostalAddress", streetAddress: "8 Standard Road", addressLocality: "London", postalCode: "NY10 6EU", addressCountry: "GB" },
    { "@type": "PostalAddress", streetAddress: "Room 1103, Guanhe East Rd, Tianning District", addressLocality: "Changzhou", addressCountry: "CN" }
  ],
  contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: "johnson@aurora-filtech.com", telephone: "+8615206119266" }]
};

function productJsonld(p, extra = {}) {
  const graph = [
    orgNode,
    { "@type": "BreadcrumbList", itemListElement: extra.crumbs || [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: p.h1.split(" (")[0], item: p.url }] },
  ];
  if (p.banner) graph.push({ "@type": "ImageObject", "@id": p.url + `#image`, contentUrl: BASE + p.banner.url, encodingFormat: "image/jpeg", width: String(p.banner.w), height: String(p.banner.h), name: p.h1.split(" (")[0], caption: p.banner.caption, inLanguage: "en" });
  const prod = {
    "@type": "Product", "@id": p.url + "#product", name: p.h1.split(" (")[0], alternateName: p.altNames, description: p.pdesc, url: p.url,
    brand: { "@id": `${BASE}/#organization` }, manufacturer: { "@id": `${BASE}/#organization` },
    category: p.category || "Industrial filter fabrics", keywords: p.keywords,
    offers: {
      "@type": "Offer",
      url: p.url,
      priceCurrency: "USD",
      price: "0",
      priceValidUntil: "2027-12-31",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${BASE}/#organization` }
    },
    additionalProperty: (p.specs || []).map(s => {
      const idx = s.indexOf(":");
      return {
        "@type": "PropertyValue",
        name: idx > 0 ? s.slice(0, idx).trim() : "Specification",
        value: idx > 0 ? s.slice(idx + 1).trim() : s
      };
    })
  };
  if (p.banner) prod.image = { "@id": p.url + "#image" };
  graph.push(prod);
  if (extra.videos && extra.videos.length) graph.push(...extra.videos);
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);
}

// ---------- 首页 ----------
function card(pcard, i) {
  return `<div class="solution-card">
  <figure>
    <a href="/${pcard.slug}/"><img src="${pcard.img}" alt="${pcard.alt}" width="${pcard.w}" height="${pcard.h}" loading="lazy" decoding="async"></a>
    <figcaption>${pcard.caption}</figcaption>
  </figure>
  <div class="card-body">
    <h2><a href="/${pcard.slug}/">${pcard.h2}</a></h2>
    <p>${pcard.first}</p>
    <div class="card-cols">
      <div><h3>Equipment</h3><ul>${pcard.equipment.map(e => `<li><strong>${e}</strong></li>`).join("")}</ul></div>
      <div><h3>Applications</h3><ul>${pcard.applications.map(a => `<li>${a}</li>`).join("")}</ul></div>
    </div>
  </div>
</div>`;
}

const homeJsonld = { "@context": "https://schema.org", "@graph": [orgNode,
  { "@type": "WebSite", "@id": `${BASE}/#website`, url: `${BASE}/`, name: "Aurora Filtech", publisher: { "@id": `${BASE}/#organization` }, inLanguage: "en" },
  {
    "@type": "ItemList",
    "@id": `${BASE}/#solutions-list`,
    name: "Aurora Filtech Industrial Filter Fabrics & Belts",
    itemListElement: homeCards.map((c, idx) => {
      const p = products[c.slug];
      return {
        "@type": "ListItem",
        position: idx + 1,
        name: p ? p.h1.split(" (")[0] : c.h2,
        url: p ? p.url : `${BASE}/${c.slug}/`,
        description: p ? p.pdesc : c.first
      };
    })
  },
  ...homeCards.flatMap(c => {
    const p = products[c.slug]; if (!p) return [];
    return [
      { "@type": "ImageObject", "@id": `${BASE}/#img-${c.slug.replace(/\//g, "-")}`, contentUrl: BASE + c.img, encodingFormat: "image/jpeg", width: String(c.w), height: String(c.h), name: c.h2.charAt(0) + c.h2.slice(1).toLowerCase(), caption: c.caption.split(" — ")[0], description: `${c.alt}, supplied by Aurora Filtech.`, inLanguage: "en" }
    ];
  })] };

const homeBody = `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <span class="kicker">Paper Machine Clothing & Industrial Filter Fabrics</span>
      <h1>Precision Engineered <em>Filtration.</em></h1>
      <p class="lede">Forming fabrics, dryer fabrics, spiral fabrics and filter cloths — woven for the machines they run on, from paper mills to wood-panel dryers and belt press filters.</p>
      <div class="hero-stats">
        <div><b>30+</b><span>Years Exp</span></div>
        <div><b>3</b><span>Factories</span></div>
        <div><b>Global</b><span>Standards</span></div>
      </div>
      <div class="hero-cta">
        <a class="btn btn-primary" href="#solutions">Explore Solutions</a>
        <a class="btn btn-ghost" href="#rfq">Get a Quote</a>
      </div>
    </div>
    <figure class="hero-photo">
      <img src="${IMG.h1}" alt="Filter fabric weaving looms inside the Aurora Filtech weaving workshop" width="2048" height="772" loading="eager" fetchpriority="high" decoding="async" style="aspect-ratio:2048/772;object-fit:cover">
      <figcaption>Aurora Filtech filter fabric weaving workshop.</figcaption>
    </figure>
  </div>
</section>

<section id="why-us" class="why">
  <div class="wrap why-grid">
    <div>
      <span class="kicker">Why Choose Us</span>
      <h2 style="margin-top:12px">Why Choose Us</h2>
      <p>Aurora Filtech combines 30+ years of expertise with advanced German technology to deliver filtration media that lasts longer and performs better. From proprietary monofilament production to automated joint, we control every step of the process. We also provide OEM/ODM service to help you develop your local business.</p>
    </div>
    <figure class="why-photo">
      <img src="/qfy-content/uploads/live/peek-yarn.jpg" alt="PEEK monofilament spool, in-house monofilament production for controlled quality and customization" width="700" height="291" loading="lazy" decoding="async">
      <figcaption>In-house monofilament production — quality under our control, and a high degree of customization.</figcaption>
    </figure>
  </div>
  <div class="wrap">
    <div class="feature-list">
      <div class="feature"><b>In-house monofilament</b><span>Proprietary yarn production for consistent fabric quality.</span></div>
      <div class="feature"><b>German weaving technology</b><span>Advanced looms and finishing for extreme durability.</span></div>
      <div class="feature"><b>Automated joints</b><span>Precision seams and endless belts, ready to run.</span></div>
      <div class="feature"><b>OEM / ODM</b><span>Former OEM weaver for European mesh houses — same discipline, direct.</span></div>
      <div class="feature"><b>Full in-house chain</b><span>Yarn to sewn cloth — spinning, warping, Dornier weaving, heat setting, laser cutting, sewing. <a href="/about/">See the production line →</a></span></div>
    </div>
  </div>
</section>

<section id="solutions">
  <div class="wrap">
    <div class="sec-head">
      <span class="kicker">Our Solutions</span>
      <h2 class="sec-title" style="margin-top:10px">OUR SOLUTIONS</h2>
      <p>Filter fabrics, spiral fabrics, mesh and belts — engineered for the machines they run on. Every product line carries a specification table and an OEM-fit guarantee.</p>
    </div>
    <div class="solutions">
${homeCards.map(card).join("\n")}
    </div>
    <div class="ind-strip">
      ${Object.values(industries).map(i => `<a href="${i.url}">${i.name}</a>`).join("")}
    </div>
  </div>
</section>
${rfqSection}`;

// ---------- 产品页模板 ----------
function prodParams(p) {
  return `<table class="spec-table">
<caption>${p.params.caption}</caption>
<thead><tr>${p.params.head.map(h => `<th scope="col">${h}</th>`).join("")}</tr></thead>
<tbody>${p.params.rows.map(r => `<tr>${r.map((c, ci) => `<td${ci === 0 ? "" : ""}>${c}</td>`).join("")}</tr>`).join("")}</tbody>
</table>`;
}

function productPage(p, slug) {
  const bannerBlock = p.banner
    ? `<div class="page-banner" style="margin:36px auto 0;max-width:none;padding:0 24px;max-width:${p.banner.maxW}px"><figure><img src="${p.banner.url}" alt="${p.banner.alt}" width="${p.banner.w}" height="${p.banner.h}" loading="eager" fetchpriority="high" decoding="async"><figcaption>${p.banner.caption}</figcaption></figure></div>`
    : `<div class="page-banner" style="margin:36px auto 0;padding:0 24px"><div style="border:2px dashed var(--gold);border-radius:12px;background:var(--bg-soft);display:flex;align-items:center;justify-content:center;color:var(--ink-soft);min-height:170px">Banner image — to be supplied before launch</div></div>`;


  return `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/#solutions">Products</a> › <span>${p.h1.split(" (")[0]}</span></nav>
    <span class="series-chip">${p.series} — ${p.seriesIntro}</span>
    <h1>${p.h1}</h1>
    <p class="lede">${p.pdesc}</p>
  </div>
</section>
<section>
  <div class="wrap article">
    <p>${p.intro}</p>
    ${bannerBlock}
    ${p.gallery ? `<div class="gallery" style="margin-top:30px">${p.gallery.map(g => `<figure style="max-width:${g.maxW || 800}px"><img src="${g.url}" alt="${g.alt}" width="${g.w}" height="${g.h}" loading="lazy" decoding="async"><figcaption>${g.caption}</figcaption></figure>`).join("")}</div>` : ""}
    ${p.note ? `<div class="oem-note">${p.note}</div>` : ""}
    <h2>Specifications</h2>
    ${prodParams(p)}
    <div class="accounting"><span class="ico">Σ</span><p><b>The running-cost view.</b> ${p.accounting}</p></div>
    <h2>Applications</h2>
    <ul class="apps-list">${p.apps.map(a => `<li>${a}</li>`).join("")}</ul>
    <div class="oem-box">
      <h3>Machine & platform fit</h3>
      <p>${p.oem.join(" · ")}</p>
    </div>
    <h2>Supply specs</h2>
    <ul class="spec-list">${p.specs.map(s => `<li>${s}</li>`).join("")}</ul>
    <p>Browse by industry: ${p.industries.map(i => `<a href="/industries/${i}/">${industries[i].name}</a>`).join(" · ")}. Related: ${p.related.map(r => `<a href="/${r}/">${prodLink[r] || r}</a>`).join(" · ")}.</p>
    <h2>Frequently Asked Questions</h2>
    <div class="faq">
      ${p.faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n      ")}
    </div>
    <div class="related">
      <h2>Related Products & Guides</h2>
      <div class="related-grid">
        ${p.related.map(r => `<a href="/${r}/">${prodLink[r] || r} →</a>`).join("")}
        ${p.industries.slice(0, 1).map(i => `<a href="/industries/${i}/">${industries[i].name} industry →</a>`).join("")}
      </div>
    </div>
    <div class="cta-band">
      <div><h2>Request a quote for ${p.h1.split(" (")[0].toLowerCase()}</h2><p>Send your machine model, size and duty — specification matched within 24 hours.</p></div>
      <a class="btn" href="#rfq">Get a Quote</a>
    </div>
  </div>
</section>
${rfqSection}`;
}

// ---------- 行业页 ----------
// 非织造页图片固有尺寸(供 width/height 属性,避免 CLS)
const NW_DIMS = {
  "nw-diag-spunlaid.jpg":[524,333], "nw-diag-airlaid.jpg":[524,333], "nw-diag-drylaid.jpg":[524,333], "nw-diag-wetlaid.jpg":[524,333],
  "nw-pr-spunlaid.jpg":[300,210], "nw-pr-airlaid.jpg":[300,210], "nw-pr-drylaid.jpg":[302,212], "nw-pr-wetlaid.jpg":[278,209],
  "nw-seam-single.jpg":[300,210], "nw-seam-double.jpg":[292,210], "nw-seam-endless.jpg":[281,186],
};
const nwDim = f => { const d = NW_DIMS[f.split("/").pop()]; return d ? ` width="${d[0]}" height="${d[1]}"` : ""; };
function industryPage(key) {
  const ind = industries[key];
  return `
<section class="ind-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/industries/">Industries</a> › <span>${ind.name}</span></nav>
    <span class="kicker">${ind.kicker}</span>
    <h1 style="margin-top:12px">${ind.name}</h1>
    <p class="lede">${ind.title.split("|")[0].trim()} — fabrics, belts and cloths matched to each stage of the process.</p>
  </div>
</section>
${ind.banner ? `
<figure class="pp-hero ind-banner">
  <img src="${ind.banner.img}" alt="${ind.banner.alt}" width="${ind.banner.w}" height="${ind.banner.h}" loading="eager" fetchpriority="high" decoding="async">
  <figcaption>${ind.banner.cap}</figcaption>
</figure>` : ""}
<section>
  <div class="wrap article">
    <p>${ind.intro}</p>
    <h2>By process stage</h2>
    <div class="proc-list">
      ${ind.processes.map((pr, i) => pr.vid ? `
      <div class="app-row app-minor${i % 2 ? " rev" : ""}">
        <figure class="app-img">
          <video controls preload="metadata" playsinline width="640" height="480" poster="${pr.poster}"><source src="${pr.vid}" type="video/mp4">${pr.t}</video>
          <figcaption>${pr.cap}</figcaption>
        </figure>
        <div class="app-txt">
          <h3>${pr.t}</h3>
          ${pr.tag ? `<p class="app-tag">${pr.tag}</p>` : ""}
          <p>${pr.txt}</p>
          <p class="app-links"><a href="/${pr.link}/">${prodLink[pr.link] || "Product page"} →</a></p>
        </div>
      </div>` : pr.gallery ? `
      <div class="proc-item">
        <h3>${pr.t}</h3>
        <div class="mini-gallery three">
          ${pr.gallery.map(g => `<figure><img src="${g.src}" alt="${g.alt}"${nwDim(g.src)} loading="lazy" decoding="async"><figcaption>${g.cap || ""}</figcaption></figure>`).join("\n          ")}
        </div>
        <p>${pr.txt}</p>
      </div>` : pr.imgs ? `
      <div class="app-row app-minor${i % 2 ? " rev" : ""}">
        <figure class="app-img">
          <div class="duo-imgs">
            ${pr.imgs.map((im, k) => `<img src="${im}" alt="${pr.alts[k] || pr.t}"${nwDim(im)} loading="lazy" decoding="async">`).join("\n            ")}
          </div>
          <figcaption>${pr.cap}</figcaption>
        </figure>
        <div class="app-txt">
          <h3>${pr.t}</h3>
          ${pr.tag ? `<p class="app-tag">${pr.tag}</p>` : ""}
          <p>${pr.txt}</p>
          <p class="app-links"><a href="/${pr.link}/">${prodLink[pr.link] || "Product page"} →</a></p>
        </div>
      </div>` : pr.img ? `
      <div class="app-row app-minor${i % 2 ? " rev" : ""}">
        <figure class="app-img">
          <img src="${pr.img}" alt="${pr.alt}" width="${pr.w}" height="${pr.h}" loading="lazy" decoding="async">
          <figcaption>${pr.cap}</figcaption>
        </figure>
        <div class="app-txt">
          <h3>${pr.t}</h3>
          ${pr.tag ? `<p class="app-tag">${pr.tag}</p>` : ""}
          <p>${pr.txt}</p>
          <p class="app-links"><a href="/${pr.link}/">${prodLink[pr.link] || "Product page"} →</a></p>
        </div>
      </div>` : `
      <div class="proc-item">
        <h3><a href="/${pr.link}/">${pr.t}</a></h3>
        <p>${pr.txt}</p>
      </div>`).join("\n      ")}
    </div>
    <div class="oem-note"><strong>Platform note.</strong> ${ind.oemNote}</div>
    <div class="related">
      <h2>Products for this industry</h2>
      <div class="related-grid">${ind.related.map(r => `<a href="/${r}/">${prodLink[r] || r} →</a>`).join("")}</div>
    </div>
    <div class="cta-band">
      <div><h2>Ask for the ${ind.name.toLowerCase()} fabric set</h2><p>Machine model + duty = specification matched in 24 hours.</p></div>
      <a class="btn" href="#rfq">Get a Quote</a>
    </div>
  </div>
</section>
${rfqSection}`;
}

// ---------- 应用页 ----------
function appPage(key) {
  const ap = applications[key];
  const parent = key === "wood-mesh-belts" ? "wood-based-panels" : null;
  return `
<section class="ind-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/industries/">Industries</a>${parent ? ` › <a href="/industries/${parent}/">${industries[parent].name}</a>` : ""} › <span>${ap.name}</span></nav>
    <span class="kicker">${ap.kicker}</span>
    <h1 style="margin-top:12px">${ap.name}</h1>
    <p class="lede">${ap.title.split("|")[0].trim()} — mesh and belt selections for this duty.</p>
  </div>
</section>
<section>
  <div class="wrap article">
    <p>${ap.intro}</p>
    <h2>By duty</h2>
    <div class="proc-list">
      ${ap.sections.map(s => `<div class="proc-item">
        <h3><a href="/${s.link}/">${s.t}</a></h3>
        <p>${s.txt}</p>
      </div>`).join("\n      ")}
    </div>
    <div class="oem-note"><strong>Platform note.</strong> ${ap.oemNote}</div>
    <div class="related">
      <h2>Products for this application</h2>
      <div class="related-grid">${ap.related.map(r => `<a href="/${r}/">${prodLink[r] || r} →</a>`).join("")}</div>
    </div>
    <div class="cta-band">
      <div><h2>Send us your old belt</h2><p>Drawing, spec tag or photo — we quote the direct-factory equivalent.</p></div>
      <a class="btn" href="#rfq">Get a Quote</a>
    </div>
  </div>
</section>
${rfqSection}`;
}

// ---------- 博客 ----------
function blogBody() {
  return `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/resources/glossary/">Resources</a> › <span>Blog</span></nav>
    <h1>Blog & Guides</h1>
    <p class="lede">Selection guides and terminology explainers written by our engineers — the questions our customers actually ask.</p>
  </div>
</section>
<section>
  <div class="wrap article">
    <div class="blog-index">
      ${Object.entries(posts).map(([slug, post]) => `<a href="${post.url}">
        <div class="post-meta"><span class="tag">${post.tag}</span><time datetime="${post.date}">${post.date}</time></div>
        <h2>${post.title}</h2>
        <p>${post.desc}</p>
      </a>`).join("\n      ")}
    </div>
  </div>
</section>
${rfqSection}`;
}

function postPage(slug) {
  const post = posts[slug];
  const jsonld = { "@context": "https://schema.org", "@graph": [
    orgNode,
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog/` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE}${post.url}` }] },
    { "@type": "Article", headline: post.title, description: post.desc, image: `${BASE}${OG}`, datePublished: `${post.date}T08:00:00+08:00`, dateModified: `${post.date}T08:00:00+08:00`,
      author: { "@id": `${BASE}/#organization` }, publisher: { "@id": `${BASE}/#organization` }, inLanguage: "en", mainEntityOfPage: `${BASE}${post.url}` },
  ] };
  return { jsonld: JSON.stringify(jsonld, null, 2), body: `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog/">Blog</a> › <span>${post.tag}</span></nav>
    <div class="post-meta"><span class="tag">${post.tag}</span><time datetime="${post.date}">${post.date}</time></div>
    <h1 style="max-width:24em">${post.title}</h1>
  </div>
</section>
<section>
  <div class="wrap article post-body">
    ${post.body.map(([t, c]) => t === "h2" ? `<h2>${c}</h2>` : t === "p" ? `<p>${c}</p>` : `<ul>${c.map(li => `<li>${li}</li>`).join("")}</ul>`).join("\n    ")}
    ${post.related && post.related.length ? `<div class="related">
      <h2>Related Products &amp; Guides</h2>
      <div class="related-grid">
        ${post.related.map(r => `<a href="/${r}/">${prodLink[r] || r} →</a>`).join("")}
      </div>
    </div>` : ""}
    <div class="cta-band">
      <div><h2>Need this specified for your machine?</h2><p>Our engineers match construction, CFM and seams to your duty.</p></div>
      <a class="btn" href="#rfq">Get a Quote</a>
    </div>
  </div>
</section>
${rfqSection}` };
}

// ---------- 术语表 ----------
const glossBody = `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/resources/glossary/">Resources</a> › <span>Glossary</span></nav>
    <h1>Filtration & Paper Machine Clothing Glossary</h1>
    <p class="lede">The vocabulary of our trade — forming fabrics, spiral belts, press cloths and dust media — in plain definitions.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <h2 class="sec-title" style="margin-bottom:24px;font-size:1.5rem">Key Filtration &amp; Weaving Terms (A–Z)</h2>
    <dl class="gloss">
      ${glossary.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join("\n      ")}
    </dl>
  </div>
</section>
${rfqSection}`;

// ---------- 输出 ----------
write("assets/style.css", `/* Aurora Filtech site-v1 — scheme 1 design, research content */${CSS}`);
write("index.html", layout({ url: `${BASE}/`, title: "Aurora Filtech | Industrial Filter Fabrics and Filter Belts",
  desc: "Manufacturer of forming fabrics, dryer fabrics, spiral fabrics, vacuum and press filter fabrics, filter bags and cartridges. 30+ years, 3 factories, OEM/ODM.",
  type: "website", jsonld: JSON.stringify(homeJsonld, null, 2), body: homeBody, activeNav: "home", og: IMG.h1 }), `${BASE}/`);

for (const [slug, p] of Object.entries(products)) {
  let body;
  if (slug === "dryer-fabric") body = dryerPage(p) + rfqSection;
  else if (slug === "forming-fabric") body = formingPage(p) + rfqSection;
  else if (slug === "spiral-belt") body = spiralPage(p) + rfqSection;
  else if (slug === "products/square-mesh") body = squareMeshPage(p) + rfqSection;
  else if (slug === "press-fabric") body = pressFabricPage(p) + rfqSection;
  else if (slug === "press-belt") body = pressBeltPage(p) + rfqSection;
  else if (slug === "products/filter-cartridge") body = filterCartridgePage(p) + rfqSection;
  else if (slug === "vacuum-fabric") body = vacuumPage(p) + rfqSection;
  else body = productPage(p, slug);
  const extra = slug === "dryer-fabric" ? {
    videos: [
      { "@type": "VideoObject", name: "Anti-static pre-press belt running on an MDF line", description: "Aurora anti-static dryer belt working the pre-press section of an MDF plant (Dieffenbacher-type line).", thumbnailUrl: `${BASE}/qfy-content/uploads/df/hero.jpg`, contentUrl: `${BASE}/qfy-content/uploads/df/prepress.mp4`, uploadDate: "2026-09-10T08:00:00+08:00" },
      { "@type": "VideoObject", name: "4106S silicone-coated dryer belt in operation", description: "Aurora 4106S silicone-coated dryer belt in live MDF board production.", thumbnailUrl: `${BASE}/qfy-content/uploads/df/silicone.jpg`, contentUrl: `${BASE}/qfy-content/uploads/df/silicon.mp4`, uploadDate: "2026-09-10T08:00:00+08:00" },
    ]
  } : {};
  write(`${slug}/index.html`, layout({ url: p.url, title: p.title, desc: p.desc, type: "product", jsonld: productJsonld(p, extra), body, activeNav: "products", og: p.banner ? p.banner.url : "" }), p.url);
}

write("about/index.html", layout({
  url: `${BASE}/about/`,
  title: "About Us | Filter Fabric Manufacturer | Aurora Filtech",
  desc: "Aurora Filtech: 30+ years weaving filter fabrics and paper machine clothing across 3 factories. In-house chain from yarn extrusion to German Dornier looms.",
  type: "website",
  og: "/qfy-content/uploads/eq/eq-hero.jpg",
  jsonld: JSON.stringify({ "@context": "https://schema.org", "@graph": [
    orgNode,
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "About Us", item: `${BASE}/about/` }] },
    { "@type": "AboutPage", name: "About Aurora Filtech", url: `${BASE}/about/`, publisher: { "@id": `${BASE}/#organization` } }] }, null, 2),
  body: aboutPage() + rfqSection, activeNav: "about" }), `${BASE}/about/`);

for (const key of Object.keys(industries)) {
  const ind = industries[key];
  const indGraph = [
    orgNode,
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${BASE}/industries/` },
      { "@type": "ListItem", position: 3, name: ind.name, item: `${BASE}${ind.url}` }] },
    { "@type": "CollectionPage", name: ind.name, description: ind.desc, url: `${BASE}${ind.url}`, publisher: { "@id": `${BASE}/#organization` } }
  ];
  if (key === "wood-based-panels") {
    indGraph.push({ "@type": "VideoObject", name: "Anti-static pre-press belt filmed on an MDF line", description: "Aurora anti-static belt working the pre-press section of a Chinese MDF plant (Dieffenbacher-type line).", thumbnailUrl: `${BASE}/qfy-content/uploads/df/as-mono.jpg`, contentUrl: `${BASE}/qfy-content/uploads/df/prepress.mp4`, uploadDate: "2026-09-10T08:00:00+08:00" });
  }
  write(`${ind.url}index.html`, layout({ url: `${BASE}${ind.url}`, title: ind.title, desc: ind.desc, type: "website",
    og: ind.banner ? ind.banner.img : "",
    jsonld: JSON.stringify({ "@context": "https://schema.org", "@graph": indGraph }, null, 2),
    body: industryPage(key), activeNav: "industries" }), `${BASE}${ind.url}`);
}
write("industries/index.html", layout({ url: `${BASE}/industries/`, title: "Industries We Serve | Filter Fabrics | Aurora Filtech",
  desc: "Aurora Filtech fabrics by industry: wood-based panels, paper & pulp, mining, power & FGD, food & pharma, nonwovens.",
  type: "website",
  activeNav: "industries",
  jsonld: JSON.stringify({ "@context": "https://schema.org", "@graph": [
    orgNode,
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${BASE}/industries/` }] },
    { "@type": "CollectionPage", name: "Industries We Serve", description: "Aurora Filtech fabrics by industry: wood-based panels, paper & pulp, mining, power & FGD, food & pharma, nonwovens.", url: `${BASE}/industries/`, publisher: { "@id": `${BASE}/#organization` } }
  ] }, null, 2),
  body: `<section class="page-hero"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <span>Industries</span></nav><h1>Industries We Serve</h1><p class="lede">Fabrics and belts matched to each process stage of your industry.</p></div></section>
<section><div class="wrap"><h2 class="sec-title" style="margin-bottom:20px;font-size:1.5rem">Industries &amp; Process Applications</h2><div class="related-grid">${Object.values(industries).map(i => `<a href="${i.url}">${i.name} →</a>`).join("")}${Object.values(applications).map(a => `<a href="${a.url}">${a.name} →</a>`).join("")}</div></div></section>${rfqSection}` }), `${BASE}/industries/`);

for (const key of Object.keys(applications)) {
  const ap = applications[key];
  const parent = key === "wood-mesh-belts" ? industries["wood-based-panels"] : null;
  const crumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
    { "@type": "ListItem", position: 2, name: "Industries", item: `${BASE}/industries/` },
  ];
  if (parent) {
    crumbs.push({ "@type": "ListItem", position: 3, name: parent.name, item: `${BASE}${parent.url}` });
    crumbs.push({ "@type": "ListItem", position: 4, name: ap.name, item: `${BASE}${ap.url}` });
  } else {
    crumbs.push({ "@type": "ListItem", position: 3, name: ap.name, item: `${BASE}${ap.url}` });
  }
  write(`${ap.url}index.html`, layout({ url: `${BASE}${ap.url}`, title: ap.title, desc: ap.desc, type: "website",
    og: "/qfy-content/uploads/df/sq-sem.jpg",
    jsonld: JSON.stringify({ "@context": "https://schema.org", "@graph": [
      orgNode,
      { "@type": "BreadcrumbList", itemListElement: crumbs },
      { "@type": "CollectionPage", name: ap.name, description: ap.desc, url: `${BASE}${ap.url}`, publisher: { "@id": `${BASE}/#organization` } }] }, null, 2),
    body: appPage(key), activeNav: "industries" }), `${BASE}${ap.url}`);
}

write("blog/index.html", layout({
  url: `${BASE}/blog/`,
  title: "Blog & Guides | Filtration & PMC | Aurora Filtech",
  desc: "Filtration and paper machine clothing selection guides and terminology explainers from Aurora Filtech engineers.",
  type: "website",
  jsonld: JSON.stringify({ "@context": "https://schema.org", "@graph": [
    orgNode,
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog & Guides", item: `${BASE}/blog/` }] },
    { "@type": "Blog", name: "Aurora Filtech Blog & Guides", description: "Filtration and paper machine clothing selection guides and terminology explainers from Aurora Filtech engineers.", url: `${BASE}/blog/`, publisher: { "@id": `${BASE}/#organization` } }
  ] }, null, 2),
  body: blogBody() }), `${BASE}/blog/`);
for (const slug of Object.keys(posts)) {
  const { jsonld, body } = postPage(slug);
  write(`${posts[slug].url}index.html`, layout({ url: `${BASE}${posts[slug].url}`, title: posts[slug].seoTitle || `${posts[slug].title} | Aurora Filtech`, desc: posts[slug].desc, type: "article", jsonld, body }), `${BASE}${posts[slug].url}`);
}

write("resources/glossary/index.html", layout({ url: `${BASE}/resources/glossary/`, title: "Filtration Glossary | PMC & Filter Terms | Aurora Filtech",
  desc: "Glossary of filtration and paper machine clothing terms: forming fabric, forming wire, CFM, filler yarns, spiral dryer fabric, press cloth, mesh count and more.",
  type: "website", jsonld: JSON.stringify({ "@context": "https://schema.org", "@graph": [
    orgNode,
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Filtration Glossary", item: `${BASE}/resources/glossary/` }] },
    {
      "@type": "DefinedTermSet",
      name: "Filtration & Paper Machine Clothing Glossary",
      url: `${BASE}/resources/glossary/`,
      publisher: { "@id": `${BASE}/#organization` },
      hasDefinedTerm: glossary.map(([t, d]) => ({
        "@type": "DefinedTerm",
        name: t,
        description: d.replace(/<[^>]+>/g, "")
      }))
    }
  ] }, null, 2),
  body: glossBody }), `${BASE}/resources/glossary/`);

write("llms.txt", `# Aurora Filtech Co., Ltd

> Manufacturer of paper machine clothing (PMC), industrial filter fabrics, spiral fabrics, square mesh belts, dust filter bags and filter cartridges. 30+ years of weaving expertise across 3 factories (German Dornier looms, full in-house chain from monofilament extrusion to finished cloth).

## Core Product Lines
- [Forming Fabric (Forming Wire)](${BASE}/forming-fabric/): 1-layer to 3-layer SSB anti-hydrolysis polyester forming fabrics for paper machines, nonwoven lines and flexible graphite sheet forming.
- [Dryer Fabric](${BASE}/dryer-fabric/): Anti-static dryer belts (wool scouring & wood panel forming), 4106S silicone-coated belts, spiral dryer fabrics, square mesh belts and flat-yarn paper dryer fabrics.
- [Spiral Fabric (Spiral Belt)](${BASE}/spiral-belt/): Open SP-D spiral dryer fabrics (875–1016 CFM) and filled SP-P spiral press filter belts (325–783 CFM) in PET, PPS (~240 °C) and PTFE-added grades.
- [Polyester Square Mesh](${BASE}/products/square-mesh/): Heat-set plain-weave (1/1) polyester monofilament square mesh (400–2100 µm, up to 1750 CFM) and 40–200 mesh sifting cloth.
- [Vacuum Filter Fabric](${BASE}/vacuum-fabric/): Horizontal vacuum belt filter, disc filter and drum filter cloths (models 610, 617, 620, 623, 623A, PP MD-series) for FGD gypsum, phosphoric acid and mining concentrates.
- [Press Filter Fabric](${BASE}/press-fabric/): Monofilament, multifilament and cotton filter press cloths for chamber, membrane and Larox-type vertical tower presses (up to 16 bar).
- [Press Filter Belt](${BASE}/press-belt/): Woven dewatering belts (models 601, 603, 604, 608, 613, 626, 656 PA nylon, 701) for belt press filters.
- [Filter Bag](${BASE}/products/filter-bag/): Baghouse dust collector bags in PET, PPS, Nomex, P84 and PTFE membrane.
- [Filter Cartridge](${BASE}/products/filter-cartridge/): Pleated dust, air, water and oil filter cartridges (anti-static, PTFE membrane, spun-bonded PET, cellulose, PPS/Nomex).

## Industries & Applications
- [Industries Overview](${BASE}/industries/)
- [Wood-based Panels (MDF, OSB, Particleboard)](${BASE}/industries/wood-based-panels/)
- [Wood Panel & Biomass Drying Mesh Belts](${BASE}/industries/wood-based-panels/mesh-belts/)
- [Wood Flour Sieving Mesh for WPC](${BASE}/industries/wood-flour-sifting/)
- [Paper & Pulp (Paper Machine Clothing)](${BASE}/industries/paper-and-pulp/)
- [Mining & Minerals](${BASE}/industries/mining/)
- [Power Generation & FGD](${BASE}/industries/power-generation-fgd/)
- [Food & Pharmaceutical](${BASE}/industries/food-and-pharma/)
- [Nonwovens (Drylaid, Airlaid, Spunlaid, Wetlaid)](${BASE}/industries/nonwovens/)

## Technical Guides & Resources
- [About Aurora Filtech & In-house Production Chain](${BASE}/about/)
- [Filtration & PMC Glossary (32 Terms)](${BASE}/resources/glossary/)
- [Blog & Engineering Guides](${BASE}/blog/)
- [What Is a Forming Fabric (Forming Wire)?](${BASE}/blog/forming-fabric-guide/)
- [Spiral Fabric Guide: Dryer Fabric vs Press Belt](${BASE}/blog/spiral-fabric-guide/)
- [PTFE / Teflon Belt Joint Types Compared](${BASE}/blog/ptfe-belt-joint-types/)

## Contact & RFQ
- Email: johnson@aurora-filtech.com / aaron@aurora-filtech.com
- Tel / WhatsApp: +86 152 0611 9266
- UK Office: 8 Standard Road, London NY10 6EU, United Kingdom
- China Factory HQ: Room 1103, Guanhe East Rd, Tianning District, Changzhou, China
`);

// sitemap
const urls = [`${BASE}/`, `${BASE}/about/`, ...Object.values(products).map(p => p.url),
  ...Object.values(industries).map(i => `${BASE}${i.url}`), `${BASE}/industries/`,
  ...Object.values(applications).map(a => `${BASE}${a.url}`), `${BASE}/blog/`,
  ...Object.values(posts).map(p => `${BASE}${p.url}`), `${BASE}/resources/glossary/`];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><lastmod>2026-10-26</lastmod></url>`).join("\n")}
</urlset>`);

const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const imgUrlEntries = renderedPages.map(({ url, html }) => {
  const seen = new Set();
  const imgs = [];
  const re = /<img\b[^>]*?\bsrc="([^"]+)"[^>]*>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const src = m[1];
    if (!src || src.startsWith("data:") || src.endsWith(".svg")) continue;
    const loc = src.startsWith("http") ? src : BASE + src;
    if (seen.has(loc)) continue;
    seen.add(loc);
    imgs.push(`    <image:image>\n      <image:loc>${esc(loc)}</image:loc>\n    </image:image>`);
  }
  return imgs.length ? `  <url>\n    <loc>${url}</loc>\n${imgs.join("\n")}\n  </url>` : "";
}).filter(Boolean);

write("sitemap-image.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imgUrlEntries.join("\n")}
</urlset>`);

write(".assetsignore", `build.js
data-products.js
data-site.js
design.js
pages-df-vf.js
pages-sm.js
pages-eq.js
live-std.json
site-v1
site-seo
`);

write("_headers", `# Cloudflare Pages cache policy
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/qfy-content/*
  Cache-Control: public, max-age=31536000, immutable
/favicon.svg
  Cache-Control: public, max-age=604800
/*
  X-Content-Type-Options: nosniff
`);

write("_redirects", `/spiral-dryer-fabric/ /spiral-belt/ 301
/spiral-press-filter-belt/ /spiral-belt/ 301
/products/paper-machine-clothing/ /forming-fabric/ 301
/teflon-belt/ /spiral-belt/ 301
/production-capability/ /about/ 301\n/about-us/ /about/ 301\n/contact-us/ / 301\n/food-filtration-fabric/ /industries/food-and-pharma/ 301\n/mining-filter-fabric/ /industries/mining/ 301\n/nonwoven/ /industries/nonwovens/ 301\n/products/panel-board/ /industries/wood-based-panels/ 301\n/peek-fiber-pps-monofilament/ /spiral-belt/ 301\n/products/feed/ /blog/ 301
`);
write("404.html", layout({
  url: `${BASE}/404.html`, title: "Page Not Found | Aurora Filtech",
  desc: "The page you requested does not exist. Browse Aurora filter fabrics, dryer fabrics and mesh belts, or ask for a quote.",
  type: "website", jsonld: "", noindex: true, body: `
<section class="page-hero"><div class="wrap">
    <span class="kicker">404</span>
    <h1 style="margin-top:12px">Page not found</h1>
    <p class="lede">That URL does not exist — it may have moved when we merged product families. Try one of these instead:</p>
  </div></section>
<section><div class="wrap article">
    <h2 class="sec-title" style="margin-bottom:18px;font-size:1.4rem">Popular Product &amp; Industry Pages</h2>
    <div class="related-grid">
      <a href="/">Home</a>
      <a href="/dryer-fabric/">Dryer Fabric</a>
      <a href="/forming-fabric/">Forming Fabric</a>
      <a href="/spiral-belt/">Spiral Fabric</a>
      <a href="/vacuum-fabric/">Vacuum Filter Fabric</a>
      <a href="/press-fabric/">Press Filter Fabric</a>
      <a href="/products/square-mesh/">Square Mesh</a>
      <a href="/about/">About Us</a>
    </div>
</div></section>` }));

write("robots.txt", `# robots.txt — www.aurora-filtech.com
User-agent: *
Allow: /
Disallow: /wp-admin/
Disallow: /wp-login.php
Disallow: /*?s=

Sitemap: ${BASE}/sitemap.xml
Sitemap: ${BASE}/sitemap-image.xml
`);

write("favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0F6E66"/><path d="M12 44c8-2 10-24 20-24s10 22 20 24" stroke="#C4A265" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`);

console.log("DONE site-v1 —", urls.length + "+ pages");
