// site-seo 主构建 —— 生成全部页面、JSON-LD、sitemap
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

function write(rel, content) {
  const fp = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  fs.writeFileSync(fp, content);
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
    { "@type": "BreadcrumbList", itemListElement: extra.crumbs || [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: p.h1.split(" (")[0], item: p.url }] },
  ];
  if (p.banner) graph.push({ "@type": "ImageObject", "@id": p.url + `#image`, contentUrl: BASE + p.banner.url, encodingFormat: "image/jpeg", name: p.h1.split(" (")[0], caption: p.banner.caption, inLanguage: "en" });
  const prod = { "@type": "Product", "@id": p.url + "#product", name: p.h1.split(" (")[0], alternateName: p.altNames, description: p.pdesc, url: p.url,
    brand: { "@id": `${BASE}/#organization` }, manufacturer: { "@id": `${BASE}/#organization` },
    category: p.category || "Industrial filter fabrics", keywords: p.keywords };
  if (p.banner) prod.image = { "@id": p.url + "#image" };
  graph.push(prod);
  if (p.faqs && p.faqs.length) {
    graph.push({ "@type": "FAQPage", mainEntity: p.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);
}

// ---------- 首页 ----------
function card(pcard, i) {
  return `<div class="solution-card">
  <figure>
    <a href="/${pcard.slug}/"><img src="${pcard.img}" alt="${pcard.alt}" width="${pcard.w}" height="${pcard.h}" loading="${i < 3 ? "eager" : "lazy"}" decoding="async"></a>
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
  ...homeCards.flatMap(c => {
    const p = products[c.slug]; if (!p) return [];
    return [
      { "@type": "ImageObject", "@id": `${BASE}/#img-${c.slug.replace(/\//g, "-")}`, contentUrl: BASE + c.img, encodingFormat: "image/jpeg", width: String(c.w), height: String(c.h), name: c.h2.charAt(0) + c.h2.slice(1).toLowerCase(), caption: c.caption.split(" — ")[0], description: `${c.alt}, supplied by Aurora Filtech.`, inLanguage: "en" },
      { "@type": "Product", "@id": `${BASE}/#product-${c.slug.replace(/\//g, "-")}`, name: p.h1.split(" (")[0], alternateName: p.altNames, description: p.pdesc, url: p.url, image: { "@id": `${BASE}/#img-${c.slug.replace(/\//g, "-")}` }, brand: { "@id": `${BASE}/#organization` }, manufacturer: { "@id": `${BASE}/#organization` }, category: "Industrial filter fabrics", keywords: p.keywords }];
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
      <img src="${IMG.h1}" alt="Filter fabric weaving looms inside the Aurora Filtech weaving workshop" width="2048" height="772" loading="eager" decoding="async" style="aspect-ratio:2048/772;object-fit:cover">
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
    ? `<div class="page-banner" style="margin:36px auto 0;max-width:none;padding:0 24px;max-width:${p.banner.maxW}px"><figure><img src="${p.banner.url}" alt="${p.banner.alt}" width="${p.banner.w}" height="${p.banner.h}" loading="eager" decoding="async"><figcaption>${p.banner.caption}</figcaption></figure></div>`
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
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/#solutions">Industries</a> › <span>${ind.name}</span></nav>
    <span class="kicker">${ind.kicker}</span>
    <h1 style="margin-top:12px">${ind.name}</h1>
    <p class="lede">${ind.title.split("|")[0].trim()} — fabrics, belts and cloths matched to each stage of the process.</p>
  </div>
</section>
${ind.banner ? `
<figure class="pp-hero ind-banner">
  <img src="${ind.banner.img}" alt="${ind.banner.alt}" width="${ind.banner.w}" height="${ind.banner.h}" loading="eager" decoding="async">
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
          <video controls preload="metadata" playsinline poster="${pr.poster}"><source src="${pr.vid}" type="video/mp4">${pr.t}</video>
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
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/industries/wood-based-panels/">Industries</a>${parent ? ` › <a href="/industries/${parent}/">${industries[parent].name}</a>` : ""} › <span>${ap.name}</span></nav>
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
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog/` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE}${post.url}` }] },
    { "@type": "Article", headline: post.title, description: post.desc, datePublished: post.date, dateModified: post.date,
      author: { "@type": "Organization", name: "Aurora Filtech" }, publisher: { "@id": `${BASE}/#organization` }, inLanguage: "en", mainEntityOfPage: `${BASE}${post.url}` },
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
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <span>Resources</span> › <span>Glossary</span></nav>
    <h1>Filtration & Paper Machine Clothing Glossary</h1>
    <p class="lede">The vocabulary of our trade — forming fabrics, spiral belts, press cloths and dust media — in plain definitions.</p>
  </div>
</section>
<section>
  <div class="wrap">
    <dl class="gloss">
      ${glossary.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join("\n      ")}
    </dl>
  </div>
</section>
${rfqSection}`;

// ---------- 输出 ----------
write("assets/style.css", `/* Aurora Filtech site-seo — scheme 1 design, research content */${CSS}`);
write("index.html", layout({ url: `${BASE}/`, title: "Aurora Filtech | Industrial Filter Fabrics and Filter Belts",
  desc: "Manufacturer of forming fabrics, dryer fabrics, spiral fabrics, vacuum and press filter fabrics, filter bags and cartridges. 30+ years, 3 factories, OEM/ODM.",
  type: "website", jsonld: JSON.stringify(homeJsonld, null, 2), body: homeBody, activeNav: "home" }));

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
  else body = productPage(p, slug) + (slug.endsWith("square-mesh") || slug.startsWith("spiral") || true ? "" : "");
  if (!["dryer-fabric", "vacuum-fabric", "forming-fabric", "spiral-belt", "products/square-mesh", "press-fabric", "press-belt", "products/filter-cartridge"].includes(slug)) body = productPage(p, slug);
  write(`${slug}/index.html`, layout({ url: p.url, title: p.title, desc: p.desc, type: "product", jsonld: productJsonld(p), body, activeNav: "products" }));
}

write("about/index.html", layout({
  url: `${BASE}/about/`,
  title: "About Us | Filter Fabric Manufacturer | Aurora Filtech",
  desc: "Aurora Filtech: 30+ years weaving filter fabrics and paper machine clothing across 3 factories. In-house chain from yarn production to sewn cloth on German Dornier looms.",
  type: "website",
  jsonld: JSON.stringify({ "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: "About Us", item: `${BASE}/about/` }] },
    { "@type": "AboutPage", name: "About Aurora Filtech", url: `${BASE}/about/`, publisher: { "@id": `${BASE}/#organization` } }] }, null, 2),
  body: aboutPage() + rfqSection, activeNav: "about" }));

for (const key of Object.keys(industries)) {
  const ind = industries[key];
  write(`${ind.url}index.html`, layout({ url: `${BASE}${ind.url}`, title: ind.title, desc: ind.desc, type: "website",
    jsonld: JSON.stringify({ "@context": "https://schema.org", "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${BASE}/industries/` },
        { "@type": "ListItem", position: 3, name: ind.name, item: `${BASE}${ind.url}` }] },
      { "@type": "CollectionPage", name: ind.name, url: `${BASE}${ind.url}`, publisher: { "@id": `${BASE}/#organization` } }] }, null, 2),
    body: industryPage(key), activeNav: "industries" }));
}
write("industries/index.html", layout({ url: `${BASE}/industries/`, title: "Industries | Aurora Filtech",
  desc: "Aurora Filtech fabrics by industry: wood-based panels, paper & pulp, mining, power & FGD, food & pharma, nonwovens.",
  type: "website", body: `<section class="page-hero"><div class="wrap"><nav class="crumbs"><a href="/">Home</a> › <span>Industries</span></nav><h1>Industries We Serve</h1><p class="lede">Fabrics and belts matched to each process stage of your industry.</p></div></section>
<section><div class="wrap"><div class="related-grid">${Object.values(industries).map(i => `<a href="${i.url}">${i.name} →</a>`).join("")}${Object.values(applications).map(a => `<a href="${a.url}">${a.name} →</a>`).join("")}</div></div></section>${rfqSection}` }));

for (const key of Object.keys(applications)) {
  const ap = applications[key];
  write(`${ap.url}index.html`, layout({ url: `${BASE}${ap.url}`, title: ap.title, desc: ap.desc, type: "website",
    jsonld: JSON.stringify({ "@context": "https://schema.org", "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${BASE}/industries/` },
        { "@type": "ListItem", position: 3, name: ap.name, item: `${BASE}${ap.url}` }] }] }, null, 2),
    body: appPage(key), activeNav: "industries" }));
}

write("blog/index.html", layout({ url: `${BASE}/blog/`, title: "Blog & Guides | Aurora Filtech", desc: "Filtration and paper machine clothing selection guides and terminology explainers from Aurora Filtech engineers.", type: "website", body: blogBody() }));
for (const slug of Object.keys(posts)) {
  const { jsonld, body } = postPage(slug);
  write(`${posts[slug].url}index.html`, layout({ url: `${BASE}${posts[slug].url}`, title: `${posts[slug].title} | Aurora Filtech`, desc: posts[slug].desc, type: "article", jsonld, body }));
}

write("resources/glossary/index.html", layout({ url: `${BASE}/resources/glossary/`, title: "Filtration Glossary | Filter Fabric & PMC Terms | Aurora Filtech",
  desc: "Glossary of filtration and paper machine clothing terms: forming fabric, forming wire, CFM, filler yarns, spiral dryer fabric, press cloth, mesh count and more.",
  type: "website", jsonld: JSON.stringify({ "@context": "https://schema.org", "@type": "DefinedTermSet", name: "Filtration & Paper Machine Clothing Glossary", url: `${BASE}/resources/glossary/`, publisher: { "@id": `${BASE}/#organization` } }, null, 2),
  body: glossBody }));

// sitemap
const urls = [`${BASE}/`, `${BASE}/about/`, ...Object.values(products).map(p => p.url),
  ...Object.values(industries).map(i => `${BASE}${i.url}`), `${BASE}/industries/`,
  ...Object.values(applications).map(a => `${BASE}${a.url}`), `${BASE}/blog/`,
  ...Object.values(posts).map(p => `${BASE}${p.url}`), `${BASE}/resources/glossary/`];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><lastmod>2026-09-18</lastmod><changefreq>monthly</changefreq></url>`).join("\n")}
</urlset>`);

const esc = s => s.replace(/&/g, "&amp;");
function imgEntry(loc, title, caption) { loc = loc.startsWith("/") ? BASE + loc : loc; return `    <image:image>\n      <image:loc>${loc}</image:loc>\n      <image:title>${esc(title)}</image:title>\n      <image:caption>${esc(caption)}</image:caption>\n    </image:image>`; }
write("sitemap-image.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url><loc>${BASE}/</loc>
${[[IMG.h1, "Filter fabric weaving workshop", "Aurora Filtech filter fabric weaving workshop."],
   [IMG.h2, "Monofilament", "Proprietary monofilament production for filter fabrics and industrial belts."],
   ...homeCards.map(c => [c.img, c.h2.charAt(0) + c.h2.slice(1).toLowerCase(), c.caption.replace(/—/g, "-")])].map(([l, t, c]) => imgEntry(l, t, c)).join("\n")}
  </url>
</urlset>`);

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
  type: "website", jsonld: "", body: `
<section class="page-hero"><div class="wrap">
    <span class="kicker">404</span>
    <h1 style="margin-top:12px">Page not found</h1>
    <p class="lede">That URL does not exist — it may have moved when we merged product families. Try one of these instead:</p>
  </div></section>
<section><div class="wrap article">
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

console.log("DONE site-seo —", urls.length + "+ pages");
