// About Us 页 —— 公司介绍 + 生产能力(全流程在厂内)
function aboutPage() {
  const EQ = "/qfy-content/uploads/eq";
  const step = (n, title, tag, img, alt, w, h, txt, wide) => `
    <div class="eq-step">
      <div class="app-txt">
        <h3>${n} · ${title}</h3>
        <p class="app-tag">${tag}</p>
        <p>${txt}</p>
      </div>
      <figure class="eq-strip${wide ? "" : " half"}">
        <img src="${EQ}/${img}" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async">
      </figure>
    </div>`;
  return `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <span>About Us</span></nav>
    <span class="kicker">Company · About Us</span>
    <h1 style="margin-top:12px">About Aurora Filtech</h1>
    <p class="lede">A filter fabric manufacturer with 30+ years of weaving behind it — three factories, German looms, an in-house chain from yarn to sewn cloth, and the OEM discipline European mesh houses built their names on.</p>
  </div>
</section>

<figure class="pp-hero">
  <img src="${EQ}/eq-hero.jpg" alt="Panorama of the Aurora filter fabric weaving workshop with rows of looms" width="1400" height="527" loading="eager" decoding="async">
  <figcaption>The weaving workshop — filter fabrics for paper machines, dryers and filters, woven on German looms.</figcaption>
</figure>

<section>
  <div class="wrap article">

    <h2>Who we are</h2>
    <p>Aurora Filtech is a Chinese manufacturer of paper machine clothing and industrial filter fabrics — forming fabrics, dryer fabrics, spiral fabrics, square mesh belts and filter cloths for paper, wood-based panel, mining, power, food and pharmaceutical lines. We have woven for 30+ years across 3 factories, and for years before that we wove as an OEM supplier for European mesh houses: their drawings, their tolerances, their discipline — now direct to you.</p>
    <div class="hero-stats" style="margin:18px 0 8px">
      <div><b>30+</b><span>Years weaving</span></div>
      <div><b>3</b><span>Factories</span></div>
      <div><b>6</b><span>Step in-house chain</span></div>
      <div><b>Global</b><span>Standards</span></div>
    </div>
    <p>Offices in London (UK) and Changzhou (China) keep engineering support close to both markets — send a drawing to either — the looms answer from the same floor.</p>

    <h2>Production capability — the in-house chain</h2>
    <p>Most trading companies weave nothing. Aurora weaves everything: yarn production, warping, weaving, heat setting, laser cutting and sewing all sit inside our own plants — which is why a fabric that leaves here has a traceable history at every step, and why we can hold OEM tolerances that outsourced supply chains cannot. This is the chain as your fabric experiences it:</p>

    ${step(1, "Multifilament yarn production", "Where the fabric starts",
      "eq-yarn.jpg", "Multifilament yarn production line twisting polyester yarn for filter fabrics", 1300, 360,
      "We produce our own multifilament yarns — the raw material of clarity-critical filter cloths — so yarn count, twist and tenacity are set by us, not by a supplier's shelf.", true)}

    ${step(2, "Beam warping", "Thousands of ends, one beam",
      "eq-warping.jpg", "Beam warping frames winding thousands of warp yarns for filter fabric weaving", 1300, 360,
      "Warping frames wind thousands of yarns onto the beam in a fixed, tension-controlled order. Even tension here is what keeps the finished fabric's density — and its permeability — uniform across the width.", true)}

    ${step(3, "Weaving — the climate-controlled loom hall", "Constant temperature &amp; humidity",
      "eq-weaving.jpg", "Climate-controlled weaving workshop with rows of filter fabric looms running", 1300, 360,
      "Filter fabrics are woven in a constant-climate hall: stable temperature and humidity keep yarn moisture and tension consistent shift after shift, so the weave that ships in March matches the weave that shipped in September. German <b>Dornier looms</b> (below) are the weaving platform behind our PMC and filter fabric precision.", true)}

    <figure class="eq-strip">
      <img src="${EQ}/eq-dornier.jpg" alt="German Dornier weaving machine weaving filter fabric, close-up" width="1300" height="360" loading="lazy" decoding="async">
      <figcaption>German Dornier looms in the climate-controlled hall.</figcaption>
    </figure>

    ${step(4, "Heat setting", "Where the fabric gets its memory",
      "eq-heatset.jpg", "Heat setting line stabilizing woven filter fabric under controlled temperature", 1300, 360,
      "The woven fabric passes through the heat-setting line, where controlled temperature locks in the weave: aperture stays square, width stays stable, and permeability becomes a number you can rely on at working temperature.", true)}

    ${step(5, "Laser cutting", "Cloth shapes, cut clean",
      "eq-laser.jpg", "Large-format laser cutting bed cutting filter cloth to shape", 1000, 890,
      "Large-format laser beds cut the set cloth to shape — press cloths, cartridge media, belt blanks — with sealed edges and none of the fraying a blade leaves behind.")}

    ${step(6, "Sewing &amp; finishing", "Ready to run",
      "eq-sewing.jpg", "Sewing workstations finishing press filter cloths with multi-row seams", 1000, 682,
      "The final step: multi-row sewn seams, eyelets, grommets and edge reinforcements fitted to your machine's drawing — the cloth arrives ready to run, not ready to adapt.")}

    <div class="accounting"><span class="ico">Σ</span><p><b>Why the chain matters to you.</b> Every parameter you buy — CFM, micron rating, tensile, seam strength — was controlled at a step inside these walls. When something must be tuned for your machine, the people who spun, warped, wove, set, cut and sewed the fabric are the people who take your call.</p></div>

    <div class="cta-band">
      <div><h2>Send us your drawing — we make it in-house</h2><p>Cloth drawing or old sample + machine model = quotation within 24 hours.</p></div>
      <a class="btn" href="#rfq">Get a Quote</a>
    </div>
  </div>
</section>
<!--#RFQ#-->`.replace("<!--#RFQ#-->", "");
}

module.exports = { aboutPage };
