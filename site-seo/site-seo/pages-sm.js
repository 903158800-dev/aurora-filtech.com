// 自定义产品页模块 II —— 方孔网页 + 压滤布页
// 素材: 线上图片库/09-方孔网 与 04-压滤滤布(线上抓取), 图片名称含用途说明
function squareMeshPage(p) {
  return `
<section class="page-hero">
  <div class="wrap hero-flex">
    <div class="hero-main">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/#solutions">Products</a> › <span>Square Mesh</span></nav>
      <span class="series-chip">${p.series} — ${p.seriesIntro}</span>
      <h1>${p.h1}</h1>
      <p class="lede">Polyester monofilament woven 1/1 into precise square openings — heat-set belts and sieve cloth from 400 × 400 µm to 2100 × 2100 µm, up to 1750 CFM, flat and stable to 180 °C.</p>
    </div>
    <nav class="hero-jumps" aria-label="Jump to a square mesh topic">
      <span class="hj-label">On this page</span>
      <a href="#sm-structure">Woven Structure</a>
      <a href="#sm-family">Mesh Family</a>
      <a href="#sm-seams">Seams</a>
      <a href="#sm-apps">Applications</a>
    </nav>
  </div>
</section>

<section>
  <div class="wrap article">

    <p>${p.intro}</p>

    <h2 id="sm-structure">Woven to the micron</h2>
    <p>Every opening is formed by the weave itself — warp over weft, one crossing at a time — then heat-set so the aperture stays square at working temperature. Under the electron microscope the discipline shows: uniform openings, clean yarn crossings, no filler, no coating.</p>
    <div class="as-grid">
      <figure class="as-card">
        <img src="/qfy-content/uploads/df/sq-sem.jpg" alt="Electron microscope close-up of blue polyester square mesh showing uniform woven openings" width="1400" height="1050" loading="lazy" decoding="async">
        <figcaption><b>Blue square mesh, SEM view</b><span>Uniform square openings, clean monofilament crossings.</span></figcaption>
      </figure>
      <figure class="as-card">
        <img src="/qfy-content/uploads/df/sq-sem-white.jpg" alt="Electron microscope close-up of white polyester plain weave square mesh" width="1200" height="900" loading="lazy" decoding="async">
        <figcaption><b>White plain weave, SEM view</b><span>The 1/1 weave that keeps every aperture square.</span></figcaption>
      </figure>
      <figure class="as-card">
        <img src="/qfy-content/uploads/df/sq-small.jpg" alt="White square mesh belt with small openings for fine product support" width="500" height="350" loading="lazy" decoding="async">
        <figcaption><b>Fine aperture grade</b><span>Small openings for fine product support.</span></figcaption>
      </figure>
    </div>

    <h2 id="sm-family">The mesh family — custom-woven, flat &amp; stable</h2>
    <p>Nine standard apertures from 400 × 400 µm to 2100 × 2100 µm in white or blue, supplied seamless in widths to 6 m — as endless belts, seamed belts, or panels cut to your frame. And when a standard model does not fit, we weave to yours:</p>
    <div class="duo-compare">
      <div class="duo">
        <h4>Custom-woven to your spec</h4>
        <ul><li><b>Aperture</b> — any square opening, from fine support meshes to coarse 2 mm+ belts</li><li><b>Yarn diameter</b> — thicker yarns for wear life, finer for open area</li><li><b>Material</b> — PET standard; PPS, PTFE-added and other monofilaments on request</li></ul>
      </div>
      <div class="duo">
        <h4>Flat &amp; stable by construction</h4>
        <ul><li><b>High flatness</b> — heat-set finishing, no waviness across the belt width</li><li><b>Structurally stable</b> — the 1/1 weave locks every yarn; the mesh does not loosen or shift in service</li><li><b>Stable apertures</b> — openings stay square at working temperature to 180 °C</li></ul>
      </div>
    </div>

    <h2 id="sm-seams">Seams — joined to suit the machine</h2>
    <p>Square mesh belts arrive ready to run: joined on our tables or supplied truly endless. Four joins cover every platform — all finished to the same size, whatever the mesh:</p>
    <div class="as-grid">
      <figure class="as-card">
        <img src="/qfy-content/uploads/df/joint-loop.jpg" alt="Self-loop seam woven from the mesh's own yarns on a square mesh belt" width="500" height="350" loading="lazy" decoding="async">
        <figcaption><b>Self-loop seam</b><span>Woven from the belt's own yarns — the standard join.</span></figcaption>
      </figure>
      <figure class="as-card">
        <img src="/qfy-content/uploads/df/joint-reinforced.jpg" alt="Reinforced spiral loop seam on a square mesh belt" width="500" height="350" loading="lazy" decoding="async">
        <figcaption><b>Reinforced spiral loop</b><span>Strengthened loop seam for heavier belts and higher tension.</span></figcaption>
      </figure>
      <figure class="as-card">
        <img src="/qfy-content/uploads/df/joint-clipper.jpg" alt="Alligator clipper joint on a mesh belt, available on request" width="500" height="350" loading="lazy" decoding="async">
        <figcaption><b>Clipper (alligator) joint</b><span>For customers whose lines specify clipper lacing — on request.</span></figcaption>
      </figure>
      <figure class="as-card">
        <img src="/qfy-content/uploads/df/joint-endless.jpg" alt="Endless seamless join on a square mesh belt" width="500" height="350" loading="lazy" decoding="async">
        <figcaption><b>Endless (seamless)</b><span>Woven without a join — for the most sensitive webs.</span></figcaption>
      </figure>
    </div>

    <h2 id="sm-apps">Where square mesh runs</h2>
    <div class="app-row app-minor rev">
      <figure class="app-img sm">
        <img src="/qfy-content/uploads/df/sq-fruit.jpg" alt="Dried vegetables resting on a square mesh belt in a food drying line" width="1200" height="900" loading="lazy" decoding="async">
        <figcaption>Food duty — dried vegetables on a square mesh drying conveyor.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Food — draining &amp; drying</h3>
        <p class="app-tag">Food contact</p>
        <p>Vegetable draining and drying conveyors, fruit and produce belt dryers — food-contact compliant PET, easy-wash surfaces, apertures matched to the product.</p>
        <p class="app-links"><a href="/industries/food-and-pharma/">Food &amp; Pharma →</a></p>
      </div>
    </div>
    <div class="app-row app-minor">
      <figure class="app-img sm">
        <img src="/qfy-content/uploads/df/sq-screen.jpg" alt="Polyester square mesh screen cloth for wood flour and WPC fines sifting" width="1200" height="900" loading="lazy" decoding="async">
        <figcaption>Screening duty — square mesh sieve cloth for wood flour and WPC fines.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Wood — drying &amp; sifting</h3>
        <p class="app-tag">Belts + sieve cloth</p>
        <p>Wood chip, biomass and particle drying belts and MDF de-airing meshes — compatible with / alternative to OEM mesh belts. For wood flour and WPC fines, 40–200 mesh sieve cloth runs on vibrating and gyratory sifters.</p>
        <p class="app-links"><a href="/industries/wood-based-panels/mesh-belts/">Wood Panel Mesh Belts →</a> · <a href="/industries/wood-flour-sifting/">Wood Flour &amp; WPC Sifting →</a></p>
      </div>
    </div>

    <h2>Specifications — factory test data</h2>
    <table class="spec-table">
      <caption>${p.params.caption}</caption>
      <thead><tr>${p.params.head.map(h => `<th scope="col">${h}</th>`).join("")}</tr></thead>
      <tbody>${p.params.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>

    <div class="accounting"><span class="ico">Σ</span><p>${p.accounting}</p></div>

    <div class="oem-box">
      <h3>Machine &amp; platform fit</h3>
      <p>${p.oem.join(" · ")}</p>
    </div>

    <h2>Frequently Asked Questions</h2>
    <div class="faq">
      ${p.faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n      ")}
    </div>

    <div class="related">
      <h2>Related pages</h2>
      <div class="related-grid">
        <a href="/dryer-fabric/">Dryer Fabric →</a>
        <a href="/spiral-belt/">Spiral Fabric →</a>
        <a href="/industries/wood-based-panels/mesh-belts/">Wood Panel Mesh Belts →</a>
        <a href="/industries/wood-flour-sifting/">Wood Flour Sifting →</a>
      </div>
    </div>

    <div class="cta-band">
      <div><h2>Request a quote for square mesh</h2><p>Aperture + width + duty = specification matched within 24 hours.</p></div>
      <a class="btn" href="#rfq">Get a Quote</a>
    </div>
  </div>
</section>
<!--#RFQ#-->`.replace("<!--#RFQ#-->", "");
}

// 压滤布产品页 —— 织物/板侧配件 两组归类; 含抗静电丝织物入织物组; 无缝线板块
function pressFabricPage(p) {
  const LF = "/qfy-content/uploads/live";
  return `
<section class="page-hero">
  <div class="wrap hero-flex">
    <div class="hero-main">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/#solutions">Products</a> › <span>Press Filter Fabric</span></nav>
      <span class="series-chip">${p.series} — ${p.seriesIntro}</span>
      <h1>${p.h1}</h1>
      <p class="lede">Filter cloths for frame press filters, membrane presses and drum, disc or leaf filters — monofilament for clean cake release, multifilament for clear filtrate, woven and finished to your slurry.</p>
    </div>
    <nav class="hero-jumps" aria-label="Jump to a press fabric topic">
      <span class="hj-label">On this page</span>
      <a href="#pf-weaves">The Cloths</a>
      <a href="#pf-vertical">Vertical Press</a>
      <a href="#pf-equipment">Equipment</a>
      <a href="#pf-case">Case</a>
      <a href="#pf-fittings">Fittings</a>
    </nav>
  </div>
</section>

<figure class="pp-hero">
  <img src="${LF}/pressfabric-dc4e3b5377d3d0f15ffd465b29b79700.jpg" alt="Press filter cloth running on a frame filter press" width="1920" height="834" loading="eager" decoding="async">
  <figcaption>Aurora PF cloth in service on a frame filter press.</figcaption>
</figure>

<section>
  <div class="wrap article">

    <p>${p.intro}</p>

    <h2 id="pf-weaves">The cloths — cotton, monofilament, anti-static</h2>
    <p>Weave, yarn type and micron rating decide how the cloth releases cake and how clear the filtrate runs. Three constructions cover the pressing spectrum:</p>
    <div class="as-grid">
      <figure class="as-card"><img src="/qfy-content/uploads/pf/pf-cotton.jpg" alt="Cotton press filter cloth for food-grade oil pressing duties" width="1200" height="675" loading="lazy" decoding="async"><figcaption><b>Cotton cloth</b><span>Food-grade pressing — rapeseed oil, essential oils and other food-contact duties.</span></figcaption></figure>
      <figure class="as-card"><img src="/qfy-content/uploads/pf/pf-mono.jpg" alt="Monofilament press filter cloth, cleaner cake discharge and longer life than multifilament" width="1182" height="887" loading="lazy" decoding="async"><figcaption><b>Monofilament cloth</b><span>Harder to weave than multifilament — but cleaner discharge, longer life. Frame presses, and fan-shaped segments for disc filters.</span></figcaption></figure>
      <figure class="as-card"><img src="${LF}/pressfabric-a4a0aa94d7ad188559cfe8cbe4570249.jpg" alt="Anti-static press filter cloth with conductive filaments woven into the weft" width="591" height="392" loading="lazy" decoding="async"><figcaption><b>Anti-static cloth</b><span>Conductive filaments woven into the weft — for static-prone slurries.</span></figcaption></figure>
    </div>

    <h2 id="pf-vertical">Vertical press filters — the cloth that has to walk</h2>
    <p>The vertical automatic press (Larox-type tower press) stacks horizontal chambers into a tower and runs <b>one continuous cloth zigzagging through the whole plate pack</b> — a walking cloth up to ~55 m long that must track true through tension and centering rollers, cycle after cycle. Membrane plates squeeze at up to <b>16 bar</b>, and the cloth is washed every cycle. That is the harshest cloth duty in filtration: dimensional stability so the long cloth never creases or wanders, precise edges that still seal the chambers at full squeeze, and weave construction that releases the cake cleanly at discharge — which is exactly what our weave is built for.</p>
    <div class="app-row app-major">
      <figure class="app-img sm">
        <div class="duo-imgs">
          <img src="/qfy-content/uploads/pf/pf-vertical.jpg" alt="Vertical automatic tower press filter with vertically stacked horizontal chambers" width="474" height="266" loading="lazy" decoding="async">
          <img src="${LF}/pressfabric-g3.jpg" alt="PF weave for vertical press filters, dimensionally stable walking cloth construction" width="500" height="350" loading="lazy" decoding="async">
        </div>
        <figcaption>The vertical tower press (left) and our walking-cloth weave for it (right).</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Walking-cloth weave for tower presses</h3>
        <p class="app-tag">Larox-type · up to 16 bar squeeze</p>
        <p>Dimensionally stable, calendered for release, edges finished for chamber sealing — supplied as endless walking cloth to your tower-press drawing, in food-grade or mining constructions.</p>
      </div>
    </div>

    <h2 id="pf-equipment">The filters our cloths serve</h2>
    <p>Beyond the frame and membrane presses in the banner: the same cloth platform covers vacuum drum filters, horizontal disc filters and vertical tower presses.</p>
    <div class="mini-gallery">
      <figure><img src="/qfy-content/uploads/pf/pf-drum.jpg" alt="Vacuum rotary drum filter running filter cloth" width="1200" height="800" loading="lazy" decoding="async"><figcaption><b>Vacuum drum filter</b> — rotating cloth-covered drum</figcaption></figure>
      <figure><img src="/qfy-content/uploads/pf/pf-disc.jpg" alt="Horizontal disc vacuum filter with fan-shaped cloth segments" width="1280" height="720" loading="lazy" decoding="async"><figcaption><b>Horizontal disc filter</b> — fan-shaped mono cloth segments</figcaption></figure>
      <figure><img src="/qfy-content/uploads/pf/pf-vertical.jpg" alt="Vertical automatic tower press filter" width="474" height="266" loading="lazy" decoding="async"><figcaption><b>Vertical tower press</b> — walking cloth, 16 bar</figcaption></figure>
    </div>

    <h2 id="pf-case">Case — 1.5 m wide cloth in service</h2>
    <p>A 1.5-metre-wide PF cloth running on a customer press — wide-width weaving keeps the chamber count per cloth joint low, so fewer seams sit inside the filtering area.</p>
    <div class="app-row app-minor">
      <figure class="app-img sm">
        <div class="duo-imgs">
          <img src="/qfy-content/uploads/pf/pf-site1.jpg" alt="1.5 metre wide press filter cloth in service on a customer press, view 1" width="1200" height="900" loading="lazy" decoding="async">
          <img src="/qfy-content/uploads/pf/pf-site2.jpg" alt="1.5 metre wide press filter cloth in service on a customer press, view 2" width="1200" height="900" loading="lazy" decoding="async">
        </div>
        <figcaption>1.5 m wide cloth on the customer's press — two views from the site.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Wide-width weaving, fewer in-area seams</h3>
        <p class="app-tag">Customer site</p>
        <p>Woven wide so the cloth covers the full plate pack with minimal joints — more filtering area, fewer potential leak paths, faster fitting.</p>
      </div>
    </div>

    <h2 id="pf-fittings">Plate-side fittings — eyelets &amp; seals</h2>
    <p>Every cloth is finished to fit its press: corner ties, center feed holes, rubber grommets and brass eyelets — positioned to your plate drawing.</p>
    <div class="mini-gallery compact">
      <figure><img src="${LF}/pressfabric-18c03ae3d80b0f015c20e834573e9a52.jpg" alt="Corner tie fixing a press filter cloth to the plate" width="375" height="245" loading="lazy" decoding="async"><figcaption><b>Corner tie</b> — cloth fixed to the plate corner</figcaption></figure>
      <figure><img src="${LF}/pressfabric-29db0c8745e1b8c6d8e536ddb216cccc.jpg" alt="Center feed hole in a press filter cloth" width="375" height="245" loading="lazy" decoding="async"><figcaption><b>Center feed hole</b> — cut for the feed port</figcaption></figure>
      <figure><img src="${LF}/pressfabric-66153bcbd4a8fbf457dd3486d2c713b9.jpg" alt="Rubber grommet fitted at a press filter cloth corner hole" width="375" height="245" loading="lazy" decoding="async"><figcaption><b>Rubber grommet</b> — sealed, wear-free hole</figcaption></figure>
      <figure><img src="${LF}/pressfabric-fdd3ca35bb35625310c5badb33eae602.jpg" alt="Brass eyelets with gasket along a press filter cloth edge" width="375" height="245" loading="lazy" decoding="async"><figcaption><b>Brass eyelets + gasket</b> — edge reinforcement</figcaption></figure>
    </div>

    <h2>Specifications — factory test data</h2>
    <table class="spec-table">
      <caption>${p.params.caption}</caption>
      <thead><tr>${p.params.head.map(h => `<th scope="col">${h}</th>`).join("")}</tr></thead>
      <tbody>${p.params.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>

    <div class="accounting"><span class="ico">Σ</span><p>${p.accounting}</p></div>

    <div class="oem-box">
      <h3>Machine &amp; platform fit</h3>
      <p>${p.oem.join(" · ")}</p>
    </div>

    <h2>Frequently Asked Questions</h2>
    <div class="faq">
      ${p.faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n      ")}
    </div>

    <div class="related">
      <h2>Related pages</h2>
      <div class="related-grid">
        <a href="/press-belt/">Press Filter Belt →</a>
        <a href="/vacuum-fabric/">Vacuum Filter Fabric →</a>
        <a href="/industries/mining/">Mining &amp; Minerals →</a>
        <a href="/industries/power-generation-fgd/">Power Generation &amp; FGD →</a>
      </div>
    </div>

    <div class="cta-band">
      <div><h2>Request a quote for press filter cloths</h2><p>Press model + slurry + cloth drawing = quotation within 24 hours.</p></div>
      <a class="btn" href="#rfq">Get a Quote</a>
    </div>
  </div>
</section>
<!--#RFQ#-->`.replace("<!--#RFQ#-->", "");
}

// 压滤带产品页 —— 横幅条banner + 产品/接头 分组
function pressBeltPage(p) {
  const LF = "/qfy-content/uploads/live";
  return `
<section class="page-hero">
  <div class="wrap hero-flex">
    <div class="hero-main">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/#solutions">Products</a> › <span>Press Filter Belt</span></nav>
      <span class="series-chip">${p.series} — ${p.seriesIntro}</span>
      <h1>${p.h1}</h1>
      <p class="lede">Woven and spiral-link dewatering belts for belt press filters — gravity drainage, wedge and high-pressure pressing zones, with reinforced seams and custom lengths.</p>
    </div>
    <nav class="hero-jumps" aria-label="Jump to a press belt topic">
      <span class="hj-label">On this page</span>
      <a href="#pb-belts">The Belts</a>
      <a href="#pb-joints">Joints</a>
    </nav>
  </div>
</section>

<figure class="pp-hero" style="max-width:820px">
  <img src="${LF}/pressbelt-g7.jpg" alt="Press belt header strip from the production line, wide belt ready for finishing" width="800" height="213" loading="eager" decoding="async">
  <figcaption>PB press belts on the production line — woven wide, finished and joined to the press.</figcaption>
</figure>

<section>
  <div class="wrap article">

    <p>${p.intro}</p>

    <h2 id="pb-belts">The belts — woven constructions</h2>
    <p>Four platform weaves cover the permeability range from gravity drainage to the high-pressure zone — measured, not guessed:</p>
    <div class="as-grid">
      <figure class="as-card"><img src="${LF}/pressbelt-f.jpg" alt="601 woven press belt close-up, 2/1 twill construction" width="500" height="350" loading="lazy" decoding="async"><figcaption><b>601</b><span>2/1 twill — 433 CFM, the all-round pressing belt.</span></figcaption></figure>
      <figure class="as-card"><img src="${LF}/pressbelt-g1.jpg" alt="608 woven press belt, 3/2 satin construction" width="500" height="350" loading="lazy" decoding="async"><figcaption><b>608</b><span>3/2 satin — 510 CFM, high drainage.</span></figcaption></figure>
      <figure class="as-card"><img src="${LF}/pressbelt-g2.jpg" alt="613 woven press belt, 2/2 twill construction" width="500" height="350" loading="lazy" decoding="async"><figcaption><b>613</b><span>2/2 twill — 633 CFM for gravity zones.</span></figcaption></figure>
      <figure class="as-card"><img src="${LF}/pressbelt-g3.jpg" alt="626 woven press belt" width="500" height="350" loading="lazy" decoding="async"><figcaption><b>626</b><span>Fine-particle duties on double belt presses.</span></figcaption></figure>
      <figure class="as-card"><img src="/qfy-content/uploads/df/pb-656.jpg" alt="656 PA nylon press mesh for pulp dewatering, hot alkaline duties" width="500" height="350" loading="lazy" decoding="async"><figcaption><b>656</b><span>PA nylon for pulp dewatering — our nylon formula outlasts competitors’ by 2×.</span></figcaption></figure>
      <figure class="as-card"><img src="/qfy-content/uploads/sp/sp-9010-4.jpg" alt="Spiral press belt with PET filler yarns inside the spiral loops" width="466" height="350" loading="lazy" decoding="async"><figcaption><b>Spiral + filler</b><span>Spiral-link belt with PET filler yarns — the SP-P family, tuned permeability. Also in PTFE-added non-stick, high-temperature PPS and hydrolysis-resistant grades.</span></figcaption></figure>
    </div>

    <div class="app-row app-minor">
      <figure class="app-img sm">
        <img src="/qfy-content/uploads/df/pb-press3.jpg" alt="Belt press filter in operation with PB dewatering belts running" width="1066" height="800" loading="lazy" decoding="async">
        <figcaption>A belt press filter in operation — gravity drainage, wedge and pressing zones running left to right.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>On the machine</h3>
        <p class="app-tag">Belt press in operation</p>
        <p>The belts run the full cycle: free water drains in the gravity zone, the wedge squeezes the remaining liquor out, and the press rollers finish the job — permeability and seam strength are selected per zone.</p>
      </div>
    </div>

    <h2 id="pb-joints">Joints — reinforced for the press</h2>
    <p>Splice joints are the first thing a belt press punishes, so ours are reinforced and matched to the machine:</p>
    <div class="as-grid">
      <figure class="as-card"><img src="${LF}/pressbelt-g4.jpg" alt="Clipper splice joint on a press belt" width="500" height="303" loading="lazy" decoding="async"><figcaption><b>Clipper splice</b><span>Fast on-site fitting for scheduled belt changes.</span></figcaption></figure>
      <figure class="as-card"><img src="${LF}/pressbelt-g5.jpg" alt="Clipper splice joint closed and ready to run" width="500" height="350" loading="lazy" decoding="async"><figcaption><b>Clipper closed</b><span>Closed and ready — joint masked for smooth running.</span></figcaption></figure>
      <figure class="as-card"><img src="/qfy-content/uploads/df/joint-double-loop.jpg" alt="Double self-loop interlocked seam on a press belt" width="500" height="350" loading="lazy" decoding="async"><figcaption><b>Double self-loop</b><span>Interlocked double loop — strong and flexible.</span></figcaption></figure>
    </div>

    <h2>Specifications — factory test data</h2>
    <table class="spec-table">
      <caption>${p.params.caption}</caption>
      <thead><tr>${p.params.head.map(h => `<th scope="col">${h}</th>`).join("")}</tr></thead>
      <tbody>${p.params.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>

    <div class="accounting"><span class="ico">Σ</span><p>${p.accounting}</p></div>

    <div class="oem-box">
      <h3>Machine &amp; platform fit</h3>
      <p>${p.oem.join(" · ")}</p>
    </div>

    <h2>Frequently Asked Questions</h2>
    <div class="faq">
      ${p.faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n      ")}
    </div>

    <div class="related">
      <h2>Related pages</h2>
      <div class="related-grid">
        <a href="/press-fabric/">Press Filter Fabric →</a>
        <a href="/spiral-belt/">Spiral Press Filter Belts →</a>
        <a href="/industries/mining/">Mining &amp; Minerals →</a>
        <a href="/industries/power-generation-fgd/">Power Generation &amp; FGD →</a>
      </div>
    </div>

    <div class="cta-band">
      <div><h2>Request a quote for press belts</h2><p>Press model + slurry + belt width = quotation within 24 hours.</p></div>
      <a class="btn" href="#rfq">Get a Quote</a>
    </div>
  </div>
</section>
<!--#RFQ#-->`.replace("<!--#RFQ#-->", "");
}

// 滤芯产品页 —— 系列化结构(照搬线上归类 + 本地规格/FAQ)
function filterCartridgePage(p) {
  const LF = "/qfy-content/uploads/live";
  return `
<section class="page-hero">
  <div class="wrap hero-flex">
    <div class="hero-main">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/#solutions">Products</a> › <span>Filter Cartridge</span></nav>
      <span class="series-chip">${p.series} — ${p.seriesIntro}</span>
      <h1>${p.h1}</h1>
      <p class="lede">Seven cartridge series for dust collection and process filtration — anti-static, waterproof, flame-retardant, spun-bonded PET, PTFE-membrane PET, cellulose and high-temperature PPS / Nomex.</p>
    </div>
    <nav class="hero-jumps" aria-label="Jump to a cartridge series">
      <span class="hj-label">Series</span>
      <a href="#fc-anti">Anti-static</a>
      <a href="#fc-ptfe">PTFE Membrane</a>
      <a href="#fc-ht">High Temp</a>
    </nav>
  </div>
</section>

<figure class="pp-hero">
  <img src="${LF}/cartridge-ef0c498fdcbafdffb7218ce71b4da62a.jpg" alt="Filter cartridge range lined up, from cellulose to PTFE membrane series" width="1640" height="732" loading="eager" decoding="async">
  <figcaption>The Aurora cartridge range — cellulose, spun-bonded PET, PTFE-membrane and high-temperature series.</figcaption>
</figure>

<section>
  <div class="wrap article fc-compact">

    <p>${p.intro}</p>

    <h2 id="fc-series">The series — one construction per duty</h2>
    <div class="app-row app-minor">
      <figure class="app-img sm">
        <img src="${LF}/cartridge-52b0fa883f3179d5b4802e1e3ea48dc7.jpg" alt="Anti-static filter cartridge with conductive ALU polyester coating" width="293" height="618" loading="lazy" decoding="async">
        <figcaption>Anti-static series — conductive ALU coating.</figcaption>
      </figure>
      <div class="app-txt">
        <h3 id="fc-anti">Anti-static series</h3>
        <p class="app-tag">Dust collection in explosion-prone areas</p>
        <ul class="li-list">
          <li>Polyester coating with imported conductive ALU material</li>
          <li>Excellent anti-static performance; good chemical resistance; excellent dust release</li>
          <li>Operating temperature: 90 °C (moist), 120 °C (dry)</li>
        </ul>
      </div>
    </div>

    <div class="app-row app-minor rev">
      <figure class="app-img sm">
        <img src="${LF}/cartridge-786c3f8c1b7e40d945ff7560fa45cc6f.jpg" alt="Waterproof and anti-oil filter cartridge for wet oily dust" width="321" height="749" loading="lazy" decoding="async">
        <figcaption>Waterproof &amp; anti-oil series.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Waterproof &amp; anti-oil series</h3>
        <p class="app-tag">Wet, oily dust</p>
        <ul class="li-list">
          <li>Perfect waterproof and anti-oil performance — long service time, high filtration efficiency</li>
          <li>Application: wet, oily dust at high concentration — and it handles large, dry dust particles efficiently</li>
        </ul>
      </div>
    </div>

    <div class="app-row app-minor">
      <figure class="app-img sm">
        <img src="${LF}/cartridge-g4.jpg" alt="Flame-retardant filter cartridge for welding and grinding dust" width="375" height="600" loading="lazy" decoding="async">
        <figcaption>Flame-retardant series — EU-standard grade.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Flame-retardant series</h3>
        <p class="app-tag">Sparks and hot particles</p>
        <ul class="li-list">
          <li>Polyester + flame-retardant material, EU-standard flame-retardant grade</li>
          <li>High filtration efficiency, easier cleaning, greater ventilation volume; easy installation and maintenance</li>
          <li>Application: welding, cutting, grinding and other spark-generating conditions</li>
        </ul>
      </div>
    </div>

    <div class="app-row app-minor rev">
      <figure class="app-img sm">
        <img src="${LF}/cartridge-dfba4c1f2a18a18351122b8f0edc31a1.jpg" alt="Spun-bonded PET filter cartridge with galvanized top cap and inner frame" width="680" height="1471" loading="lazy" decoding="async">
        <figcaption>Spun-bonded PET — galvanized caps, chlorine-rubber gasket.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Spun-bonded PET series</h3>
        <p class="app-tag">Fine industrial dust</p>
        <ul class="li-list">
          <li>Imported long-fiber PET, tight pore structure — excellent moisture resistance and dust release; hard-wearing, keeps airflow up</li>
          <li>Galvanized top cap and inner frame, rust-resistant; special chlorine-rubber gasket for airtight sealing</li>
          <li>Application: fine dust in plastics, spray powder, sand blasting, pigment and wood industries</li>
        </ul>
      </div>
    </div>

    <div class="app-row app-minor">
      <figure class="app-img sm">
        <img src="${LF}/cartridge-0e225dccecd7ce6eca62b7930d9d6964.jpg" alt="PTFE membrane coated PET filter cartridge for sub-micron dust" width="602" height="1301" loading="lazy" decoding="async">
        <figcaption>PTFE-membrane PET — 99.99%+ filtration efficiency.</figcaption>
      </figure>
      <div class="app-txt">
        <h3 id="fc-ptfe">Spun-bonded PET, PTFE-membrane coated</h3>
        <p class="app-tag">The flagship — sub-micron emissions</p>
        <ul class="li-list">
          <li>Imported PTFE membrane helps meet EPA requirements (PM2.5, MACT, NESHAP) and cuts total cost of ownership</li>
          <li>Reduced emissions (PM10, PM2.5, sub-micron); filtration efficiency 99.99%+; service life 2–3 years under general temperatures</li>
          <li>Aids recovery from upset conditions (moisture, boiler tube leaks); excellent chemical corrosion resistance</li>
          <li>Higher throughput — a smaller dust collector matches the same demand, cutting capital cost</li>
          <li>Application: welding fume, shot blasting, pharmaceutical, cement, tobacco, textile</li>
        </ul>
      </div>
    </div>

    <div class="app-row app-minor rev">
      <figure class="app-img sm">
        <img src="${LF}/cartridge-6cba53c0be68a084572efd4e5139a53b.jpg" alt="Cellulose pleated filter cartridge with wide pleat design" width="793" height="1402" loading="lazy" decoding="async">
        <figcaption>Cellulose series — wide pleats, large filtration surface.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Cellulose series</h3>
        <p class="app-tag">Turbines, compressors, ash</p>
        <ul class="li-list">
          <li>Imported cellulose or synthetic fiber base media — excellent fiber efficiency</li>
          <li>Wide pleated design for a large filtration surface; galvanized cap and rhombus inner mesh, rust-resistant with good airflow</li>
          <li>Special chlorine-rubber gasket for airtight sealing</li>
          <li>Application: gas turbines, compressors, sand blasting, tobacco, ash and dust</li>
        </ul>
      </div>
    </div>

    <div class="app-row app-minor">
      <figure class="app-img sm">
        <img src="${LF}/cartridge-g1.jpg" alt="High-temperature PPS or Nomex filter cartridge rated to 190 degrees C" width="206" height="600" loading="lazy" decoding="async">
        <figcaption>High-temperature series — PPS (Ryton) / Nomex, to 190 °C.</figcaption>
      </figure>
      <div class="app-txt">
        <h3 id="fc-ht">High-temperature series — PPS / Nomex</h3>
        <p class="app-tag">Hot gas filtration</p>
        <ul class="li-list">
          <li><b>PPS (Ryton)</b> media from Toyabo and Toray — highest operating temperature 190 °C; <b>Nomex</b> high-temperature pleated media</li>
          <li>Galvanized and carbon-steel top and bottom caps; unique high-temperature adhesive; good chemical resistance</li>
        </ul>
      </div>
    </div>
    <h2>Specifications — factory test data</h2>
    <table class="spec-table">
      <caption>${p.params.caption}</caption>
      <thead><tr>${p.params.head.map(h => `<th scope="col">${h}</th>`).join("")}</tr></thead>
      <tbody>${p.params.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>

    <div class="accounting"><span class="ico">Σ</span><p>${p.accounting}</p></div>

    <div class="oem-box">
      <h3>Machine &amp; platform fit</h3>
      <p>${p.oem.join(" · ")}</p>
    </div>

    <h2>Frequently Asked Questions</h2>
    <div class="faq">
      ${p.faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n      ")}
    </div>

    <div class="related">
      <h2>Related pages</h2>
      <div class="related-grid">
        <a href="/products/filter-bag/">Filter Bag →</a>
        <a href="/industries/power-generation-fgd/">Power Generation &amp; FGD →</a>
        <a href="/industries/wood-based-panels/">Wood-based Panels →</a>
        <a href="/industries/mining/">Mining &amp; Minerals →</a>
      </div>
    </div>

    <div class="cta-band">
      <div><h2>Request a quote for filter cartridges</h2><p>Dust type + air volume + collector model = series and media matched within 24 hours.</p></div>
      <a class="btn" href="#rfq">Get a Quote</a>
    </div>
  </div>
</section>
<!--#RFQ#-->`.replace("<!--#RFQ#-->", "");
}

module.exports = { squareMeshPage, pressFabricPage, pressBeltPage, filterCartridgePage };
