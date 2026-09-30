// 干燥网带 / 真空滤布 两个旗舰产品页 —— 按调研重新规划的自定义模板
// 依据: SEO-调研报告(Forbo 五段式/工序分区、Metso 应用词矩阵、AJ ExperTips、Clear Edge OEM 列表)、
//       SEO-词库补充(anti-static dryer fabric / FGD / horizontal vacuum belt filter 词族)、产品实拍说明
const { industries } = require("./data-site");

const DF = "/qfy-content/uploads/df";
const VF = "/qfy-content/uploads/vf";
const SP = "/qfy-content/uploads/sp";

/* ============================== 干燥网带页 ============================== */
function dryerPage(p) {
  return `
<section class="page-hero">
  <div class="wrap hero-flex">
    <div class="hero-main">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/#solutions">Products</a> › <span>Dryer Fabric</span></nav>
      <span class="series-chip">${p.series} — ${p.seriesIntro}</span>
      <h1>${p.h1}</h1>
      <p class="lede">Four families on one page: anti-static dryer belts for wool scouring and wood panel forming, spiral fabrics for open high-airflow drying, square mesh drying &amp; conveyor belts, and flat-yarn dryer fabrics for paper and nonwoven lines — all factory-tested and seamed to your machine.</p>
    </div>
    <nav class="hero-jumps" aria-label="Jump to a product family">
      <span class="hj-label">On this page</span>
      <a href="#fam-spiral">PPS Spiral Belt</a>
      <a href="#fam-square">Screen Mesh</a>
      <a href="#fam-anti">Anti-static Fabric</a>
      <a href="#fam-paper">Paper Drying</a>
    </nav>
  </div>
</section>

<!-- 旗舰大图 -->
<figure class="pp-hero">
  <img src="${DF}/hero.jpg" alt="Anti-static dryer fabric flagship close-up with conductive monofilaments" width="1200" height="525" loading="eager" decoding="async">
  <figcaption>Anti-static dryer fabric — the flagship family of the Aurora DF dryer fabric range.</figcaption>
</figure>

<section>
  <div class="wrap article">

    <p>${p.intro}</p>

    <!-- ═══ 家族一:抗静电干燥网带(主打) — 洗羊毛 + 人造板 ═══ -->
    <h2 id="fam-anti">Family 1 · Anti-static dryer belts — the flagship line</h2>
    <p>Static is the dryer's hidden tax: it pulls dust and lint into the fabric, wraps product around rolls and stings crews on every contact. Our flagship anti-static belts drain the charge through the yarn itself — and they serve two main duties: <b>wool scouring dryers</b> and <b>wood panel forming &amp; pre-press lines</b>. Three constructions:</p>
    <div class="as-grid">
      <figure class="as-card">
        <img src="${DF}/as-mono.jpg" alt="Anti-static dryer belt woven with anti-static monofilament yarns only" width="466" height="350" loading="lazy" decoding="async">
        <figcaption><b>Anti-static monofilament</b><span>Conductive yarn woven through the fabric — the standard for wool scouring and wood panel dryers.</span></figcaption>
      </figure>
      <figure class="as-card">
        <img src="${DF}/as-mixed.jpg" alt="Anti-static dryer belt with mixed anti-static yarn and copper wire weave" width="466" height="350" loading="lazy" decoding="async">
        <figcaption><b>Mixed yarn + copper wire</b><span>Hybrid construction for duties where static builds fastest.</span></figcaption>
      </figure>
      <figure class="as-card">
        <img src="${DF}/as-608b.jpg" alt="Type 608B anti-static dryer belt woven with copper wire only, close-up" width="1080" height="756" loading="lazy" decoding="async">
        <figcaption><b>608B — copper wire only</b><span>All-copper anti-static version for the most static-prone lines.</span></figcaption>
      </figure>
    </div>

    <!-- 家族一 · 用途1:人造板成型/预压 -->
    <div class="app-row app-major">
      <figure class="app-img">
        <img src="${DF}/wood-line.jpg" alt="Dieffenbacher-type wood panel production line where anti-static dryer belts run" width="539" height="404" loading="lazy" decoding="async">
        <figcaption>Wood panel forming line (Dieffenbacher-type) — the environment our anti-static belts are built for.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Wood-based panel forming &amp; pre-press</h3>
        <p class="app-tag">Main duty 1</p>
        <p>On MDF, OSB and particleboard forming lines, resin dust and high-speed friction charge the belt until fibers cling and mark the board. Anti-static monofilament keeps the belt clean through the forming and pre-press sections, and the spiral-linked enhanced seam survives the pre-press nip.</p>
        <p class="app-links"><a href="/industries/wood-based-panels/">Wood-based panel fabrics →</a></p>
      </div>
    </div>

    <!-- 家族一 · 人造板特供:4106S 硅胶涂覆(独立产品介绍) -->
    <div class="app-row app-minor rev">
      <figure class="app-img">
        <img src="${DF}/4106s.jpg" alt="Type 4106S dryer belt with a high-temperature silicone coating for MDF production" width="500" height="350" loading="lazy" decoding="async">
        <figcaption>Type 4106S — single-layer base fabric with a high-temperature silicone coat.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>4106S — silicone-coated belt for panel lines</h3>
        <p class="app-tag">Wood panel only</p>
        <p>Where resin-laden product must release cleanly, 4106S coats a single-layer dryer fabric with a layer of high-temperature silicone — a version supplied specifically for MDF and board production, running as a pre-press and transport belt where sticking costs downtime.</p>
      </div>
    </div>

    <!-- 家族一 · 客户现场视频(案例跟随产品) -->
    <h3 class="vid-h">See them run — filmed at customers' plants</h3>
    <div class="vid-grid">
      <figure class="vid-card">
        <video controls preload="metadata" playsinline poster="${DF}/hero.jpg">
          <source src="${DF}/prepress.mp4" type="video/mp4">
          Anti-static pre-press belt running on an MDF line.
        </video>
        <figcaption><b>Anti-static pre-press belt, MDF line</b><span>The belt working the pre-press section of a Chinese MDF plant (Dieffenbacher-type line).</span></figcaption>
      </figure>
      <figure class="vid-card">
        <video controls preload="metadata" playsinline poster="${DF}/silicone.jpg">
          <source src="${DF}/silicon.mp4" type="video/mp4">
          4106S silicone-coated belt in operation.
        </video>
        <figcaption><b>4106S silicone-coated belt in operation</b><span>The silicone surface in live board production — the moment product has to release.</span></figcaption>
      </figure>
    </div>

    <!-- 家族一 · 用途2:洗羊毛干燥(客户案例跟随产品介绍) -->
    <div class="app-row app-minor">
      <figure class="app-img">
        <img src="${DF}/wool-uni.jpg" alt="Customer case: wool scouring dryer running a blue anti-static dryer belt with wool on the belt" width="640" height="480" loading="lazy" decoding="async">
        <figcaption>Customer case — wool scouring dryer: the blue belt is our anti-static fabric, wool on deck.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Wool drying after scouring</h3>
        <p class="app-tag">Main duty 2 · customer case</p>
        <p>Wet wool after scouring dries in a charged, lint-heavy atmosphere — the textbook duty for anti-static monofilament, and the application where our fabric quality carries a direct quality and margin advantage. These photos come from a running customer line.</p>
      </div>
    </div>

    <!-- ═══ 家族二:螺旋网(简短介绍,详见 spiral fabric 产品页) ═══ -->
    <h2 id="fam-spiral">Family 2 · Spiral fabrics — open, high-airflow belts</h2>
    <p>Where a woven fabric runs too closed, spiral fabrics take over: monofilament spirals joined by hinge pins into an open, non-tracking belt that moves air, drains freely and cleans easily. Standard PET covers most drying and conveying duties; <b>PPS</b> serves high-temperature dryers; PET with added <b>PTFE</b> brings non-stick release — the orange masterbatch marks it, and colors are customizable. Filler yarns tune the permeability down when fines must be held.</p>
    <div class="app-row app-minor">
      <figure class="app-img">
        <img src="${SP}/sp-pps9010.jpg" alt="Type 9010 spiral fabric with PPS spiral yarns and PPS filler yarns for high-temperature drying" width="1000" height="750" loading="lazy" decoding="async">
        <figcaption>Type 9010 all-PPS — spirals and filler yarns both PPS.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>PPS spiral belts — the high-temperature option</h3>
        <p class="app-tag">To ~240 °C duty</p>
        <p>The 9010 in all-PPS — spiral yarns and filler yarns both PPS — is built for dryers running hot, where PET would age. It keeps the spiral family's easy cleaning and on-machine repairability at temperatures woven anti-static fabrics cannot reach.</p>
        <p class="app-links"><a href="/spiral-belt/">Spiral fabric product page →</a></p>
      </div>
    </div>

    <div class="mini-gallery two">
      <figure><img src="${SP}/sp-pet.jpg" alt="Standard polyester PET spiral fabric belt with pin-joined spiral links" width="1000" height="750" loading="lazy" decoding="async"><figcaption>Standard PET spiral fabric</figcaption></figure>
      <figure><img src="${SP}/sp-ptfe.jpg" alt="Orange PET spiral fabric with PTFE additive for non-stick duty, color customizable" width="466" height="350" loading="lazy" decoding="async"><figcaption>PET + PTFE non-stick (custom colors)</figcaption></figure>
    </div>

    <!-- ═══ 家族三:方孔网 ═══ -->
    <h2 id="fam-square">Family 3 · Square mesh belts — drying, conveying &amp; screening</h2>
    <p>Polyester monofilament woven into precise square openings — known as <b>square mesh</b> or <b>screen mesh</b>. More than 20 heat-set apertures, from 200&#8239;µm × 200&#8239;µm up to 4&#8239;mm × 4&#8239;mm, stay flat and dimensionally stable at working temperatures to 180&#8239;°C — supplied seamless in widths up to 6&#8239;m and lengths past 100&#8239;m.</p>
    <div class="seam-grid">
      <figure class="seam-feature">
        <img src="${DF}/sq-sem.jpg" alt="Electron-microscope close-up of a blue square mesh belt showing uniform woven openings" width="1400" height="1050" loading="lazy" decoding="async">
        <figcaption><b>Woven to the micron</b><span>Electron-microscope view of a finished square mesh — every opening to spec.</span></figcaption>
      </figure>
      <figure class="seam-item"><img src="${DF}/sq-white.jpg" alt="White polyester plain weave square mesh belt with even square openings" width="1200" height="900" loading="lazy" decoding="async"><figcaption>White plain-weave square mesh</figcaption></figure>
      <figure class="seam-item"><img src="${DF}/sq-blue.jpg" alt="Blue polyester square mesh belt for drying and conveying duties" width="1200" height="900" loading="lazy" decoding="async"><figcaption>Blue square mesh</figcaption></figure>
      <figure class="seam-item"><img src="${DF}/sq-small.jpg" alt="White square mesh belt with small openings for fine product support" width="500" height="350" loading="lazy" decoding="async"><figcaption>Small-aperture grade</figcaption></figure>
      <figure class="seam-item"><img src="${DF}/sq-loop.jpg" alt="Self-loop seam woven from the mesh's own yarns on a square mesh belt" width="800" height="600" loading="lazy" decoding="async"><figcaption>Self-loop seam — woven from the mesh's own yarns</figcaption></figure>
    </div>

    <div class="app-row app-minor rev">
      <figure class="app-img">
        <img src="${DF}/sq-fruit.jpg" alt="Dried vegetables resting on a square mesh belt in a food drying line" width="1200" height="900" loading="lazy" decoding="async">
        <figcaption>Food duty — dried vegetables on a square mesh drying conveyor.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Where square mesh runs</h3>
        <p class="app-tag">Drying · conveying · screening</p>
        <p><b>Food:</b> vegetable draining and drying conveyors. <b>Wood:</b> wood chip, biomass and particle drying belts, MDF de-airing meshes. <b>Nonwovens:</b> forming and drying supports. <b>Screening:</b> polyester screen mesh for vibrating and gyratory sifters, 40–200 mesh.</p>
        <p class="app-links"><a href="/products/square-mesh/">Square mesh product page →</a></p>
      </div>
    </div>

    <!-- ═══ 家族四:造纸/无纺布干网(扁丝) ═══ -->
    <h2 id="fam-paper">Family 4 · Paper &amp; nonwoven dryer fabrics — flat-yarn constructions</h2>
    <p>The classic dryer fabrics: more than ten flat- and round-yarn constructions woven for the dryer sections of paper machines and the forming decks of nonwoven spunlaid lines — specified by air permeability, layer count and sheet-side smoothness.</p>

    <div class="app-row app-minor">
      <figure class="app-img">
        <img src="${DF}/double-layer.jpg" alt="Double-layer flat yarn dryer fabric for paper machine drying sections" width="490" height="368" loading="lazy" decoding="async">
        <figcaption>Double-layer flat-yarn dryer fabric.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Double-layer flat yarn</h3>
        <p class="app-tag">After the press section</p>
        <p>Two flat-yarn layers give a smoother, more stable sheet run through the drying section after paper forming — the construction for grades where contact marks would end up in the finished sheet.</p>
      </div>
    </div>

    <div class="app-row app-minor rev">
      <figure class="app-img">
        <img src="${DF}/single-flat.jpg" alt="Single-layer flat yarn dryer fabric for paper drying and nonwoven spunlaid lines" width="466" height="350" loading="lazy" decoding="async">
        <figcaption>Single-layer flat-yarn dryer fabric.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Single-layer flat yarn</h3>
        <p class="app-tag">Open drying decks</p>
        <p>The open, high-airflow construction for paper drying decks — and the same fabric runs on nonwoven spunlaid (polymer-laid) forming lines, where an even, stable mesh carries the filament sheet through bonding.</p>
        <p class="app-links"><a href="/forming-fabric/">Paper machine clothing (forming fabric) →</a> · <a href="/industries/nonwovens/">Nonwovens →</a></p>
      </div>
    </div>

    <!-- 4. 接头技术(AJ ExperTips 式,一大四小) -->
    <h2>Seam technology</h2>
    <p>The seam is usually the first thing to fail on a dryer fabric — so it is where we put the work in. Our spiral-linked seams are reinforced ring by ring; joints for anti-static belts are made in <b>PEEK</b> — heat-resistant, hydrolysis-resistant and chemically inert — so the joint outlives the fabric around it.</p>
    <div class="seam-grid">
      <figure class="seam-feature">
        <img src="${DF}/peek-joint.jpg" alt="PEEK spiral joint on an anti-static dryer fabric, close-up" width="800" height="599" loading="lazy" decoding="async">
        <figcaption><b>PEEK spiral joint</b><span>Heat-, hydrolysis- and chemical-resistant joint rings on anti-static belts.</span></figcaption>
      </figure>
      <figure class="seam-item"><img src="${DF}/seam-spiral-enhanced.jpg" alt="Spiral seam with enhanced structural treatment" width="561" height="421" loading="lazy" decoding="async"><figcaption>Enhanced spiral seam</figcaption></figure>
      <figure class="seam-item"><img src="${DF}/seam-spiral-pin.jpg" alt="Single spiral pin seam on a dryer fabric" width="466" height="350" loading="lazy" decoding="async"><figcaption>Spiral pin seam</figcaption></figure>
      <figure class="seam-item"><img src="${DF}/seam-endless.jpg" alt="Endless seamless dryer fabric joint" width="465" height="309" loading="lazy" decoding="async"><figcaption>Endless (seamless)</figcaption></figure>
      <figure class="seam-item"><img src="${DF}/seam-double-loop.jpg" alt="Double loop seam on a dryer fabric" width="466" height="350" loading="lazy" decoding="async"><figcaption>Double loop seam</figcaption></figure>
    </div>
    <p class="seam-note">Alligator clipper joints are available on request for customers whose equipment specifies them — though on dryer fabrics we recommend spiral or endless seams first.</p>

    <!-- 5. 规格(实测) -->
    <h2>Specifications — factory test data</h2>
    <table class="spec-table">
      <caption>${p.params.caption}</caption>
      <thead><tr>${p.params.head.map(h => `<th scope="col">${h}</th>`).join("")}</tr></thead>
      <tbody>${p.params.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>

    <!-- 6. CFM 选型(已验证搜索词) -->
    <div class="accounting"><span class="ico">Σ</span><p><b>Drying is your most energy-hungry section.</b> A dryer fabric with the right air permeability (CFM) lets hot air reach the product instead of the fan fighting the belt — and a clean, anti-static fabric keeps that CFM stable between washes. Send us your dryer type, temperature and product; we match CFM, seam and edge per zone.</p></div>

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
        <a href="/industries/wood-based-panels/">Wood-based Panels industry →</a>
        <a href="/spiral-belt/">Spiral Fabric (open, high-CFM) →</a>
        <a href="/blog/spiral-fabric-guide/">Spiral vs woven dryer fabric guide →</a>
        <a href="/products/square-mesh/">Square mesh drying/conveyor belts →</a>
      </div>
    </div>

    <div class="cta-band">
      <div><h2>Request a quote for dryer fabrics</h2><p>Dryer type + temperature + target CFM = specification matched within 24 hours.</p></div>
      <a class="btn" href="#rfq">Get a Quote</a>
    </div>
  </div>
</section>
<!--#RFQ#-->`.replace("<!--#RFQ#-->", "");
}

/* ============================== 成型网页(三大成型路线) ============================== */
function formingPage(p) {
  return `
<section class="page-hero">
  <div class="wrap hero-flex">
    <div class="hero-main">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/#solutions">Products</a> › <span>Forming Fabric</span></nav>
      <span class="series-chip">${p.series} — ${p.seriesIntro}</span>
      <h1>${p.h1}</h1>
      <p class="lede">One weaving platform, three forming routes: graphite and thermal-sheet forming lines, paper machine forming (the wet end of the paper machine), and nonwoven web formation — anti-hydrolysis polyester monofilament, seamed to your machine.</p>
    </div>
    <nav class="hero-jumps" aria-label="Jump to a forming route">
      <span class="hj-label">On this page</span>
      <a href="#fam-graphite">Graphite Forming</a>
      <a href="#fam-paper">Paper Forming</a>
      <a href="#fam-nonwoven">Nonwoven Forming</a>
    </nav>
  </div>
</section>

<section>
  <div class="wrap article">

    <p>${p.intro}</p>

    <!-- ═══ 路线一:石墨/热扩散片成型 ═══ -->
    <h2 id="fam-graphite">Family 1 · Graphite &amp; thermal-sheet forming</h2>
    <p>Thermal-management sheets are continuous-forming products too. <b>Flexible graphite sheet</b> starts as expandable natural graphite: the intercalated flakes are shock-heated past 800&nbsp;°C into expanded graphite "worms", spread into a uniform mat on a moving forming surface, then calendered roll after roll into a binder-free foil (95–99% carbon) — Toyo Tanso's PERMA-FOIL is the classic example. <b>Synthetic graphite film</b> for smartphones takes the casting route: a polyimide precursor film is cast continuously, then carbonized and graphitized at up to 3&nbsp;300&nbsp;°C into film with 700–1&nbsp;950&nbsp;W/m·K of in-plane conductivity. Both routes run on precisely woven forming and support fabrics.</p>
    <div class="app-row app-major">
      <figure class="app-img">
        <img src="/qfy-content/uploads/gf/graphite-sheet.jpg" alt="Flexible graphite sheets, the heat-spreading graphite film layer formed on our fabrics" width="800" height="533" loading="lazy" decoding="async">
        <figcaption>Flexible graphite sheet — 95–99% carbon, no binder, rolled from 0.01 mm up. The layer our fabrics form.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>What the fabric forms — the sheet itself</h3>
        <p class="app-tag">Graphite sheet · graphite film · graphene film</p>
        <p>Expanded graphite worms are spread into a uniform mat and calendered into the flexible graphite sheet shown here; the cast route turns polyimide precursor film into graphite and graphene thermal film. Either way, the forming deck and support conveyor decide thickness uniformity — which is why thermal-film lines run fabrics built to calendering tolerances.</p>
      </div>
    </div>

    <div class="app-row app-major">
      <figure class="app-img">
        <img src="/qfy-content/uploads/gf/vc.jpg" alt="Ultra-thin vapor chamber plate for smartphone cooling, the assembly that graphite and graphene films laminate into" width="700" height="700" loading="lazy" decoding="async">
        <figcaption>An ultra-thin vapor chamber (VC) plate for smartphones — the graphite / graphene film is laminated into this kind of assembly.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Downstream — into the vapor-chamber stack</h3>
        <p class="app-tag">Where the film goes</p>
        <p>Three names, one role: the graphite sheet (expanded-graphite route), the graphite film and the graphene thermal film (cast PI route) are the lateral heat-spreading layers in a phone's thermal stack. They feed into vapor-chamber assemblies — the sealed plate shown here — where the VC handles hotspot spreading while the film conducts heat to the frame; Huawei's P30 Pro was the first to pair the two. Our forming fabrics produce that sheet / film layer itself.</p>
      </div>
    </div>

    <div class="accounting"><span class="ico">Σ</span><p><b>What the fabric must do on a graphite line.</b> Even, fine support so the sheet calenders to uniform thickness; a release surface graphite will not cling to; dimensional stability through the hot deck; and anti-static yarns — graphite dust is conductive, so a charged belt fouls fast. We weave the forming deck and support-conveyor fabrics to those four requirements.</p></div>

    <!-- ═══ 路线二:造纸成型(PMC 旗舰) ═══ -->
    <h2 id="fam-paper">Family 2 · Paper forming — the PMC flagship</h2>
    <p>Forming fabric — known in the trade as forming wire since the bronze-wire era — is the woven monofilament belt at the wet end of every paper machine, where the fiber web is formed and dewatered. Aurora FF fabrics cover 1-layer, 1.5-layer, 2-layer and 3-layer SSB constructions in anti-hydrolysis polyester, matched to machine speed, retention and drainage.</p>
    <div class="app-row app-major">
      <figure class="app-img">
        <div class="duo-imgs">
          <img src="/qfy-content/uploads/2019/09/c77f027fd05a12043ba86232dbdbd87a.jpg" alt="Forming fabric running on the forming section of a paper machine" width="671" height="386" loading="eager" decoding="async">
          <img src="/qfy-content/uploads/live/forming-g2.jpg" alt="Forming wire close-up, the white polyester weave with blue stripes used on paper machine formers" width="800" height="594" loading="lazy" decoding="async">
        </div>
        <figcaption>FF forming fabric on the paper machine (left) and the forming-wire weave up close (right).</figcaption>
      </figure>
      <div class="app-txt">
        <h3>FF series — paper machine forming</h3>
        <p class="app-tag">Packaging · Printing &amp; writing · Tissue</p>
        <p>Models 611, 624, 656 and 656A cover the common machine positions — from the open 2/2 twill of a packaging former to the fine 4/1 satin of a high-smoothness grade — with factory-tested air permeability, tensile and weight. Seamed to the machine or supplied endless.</p>
        <p class="app-links"><a href="/industries/paper-and-pulp/">Paper &amp; Pulp industry →</a></p>
      </div>
    </div>

    <h2 class="spec-h">Specifications — factory test data</h2>
    <table class="spec-table">
      <caption>${p.params.caption}</caption>
      <thead><tr>${p.params.head.map(h => `<th scope="col">${h}</th>`).join("")}</tr></thead>
      <tbody>${p.params.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>

    <!-- ═══ 路线三:无纺布成型 ═══ -->
    <h2 id="fam-nonwoven">Family 3 · Nonwoven forming</h2>
    <p>The same forming-wire discipline runs on nonwoven lines: spunlaid (spunbond &amp; meltblown) decks under the spinneret, airlaid and wet-laid forming wires, and spunlace conveying meshes — air-permeable, fiber-retaining and anti-static for clean web release.</p>
    <div class="app-row app-minor rev">
      <figure class="app-img">
        <img src="${DF}/single-flat.jpg" alt="Single-layer flat-yarn dryer fabric, also used as the forming deck fabric on spunlaid nonwoven lines" width="466" height="350" loading="lazy" decoding="async">
        <figcaption>Single-layer flat-yarn fabric — the spunlaid (spunbond) forming and drying deck.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Nonwoven forming wires</h3>
        <p class="app-tag">Spunbond · Airlaid · Spunlace</p>
        <p>Anti-hydrolysis monofilament woven for even suction through the deck and clean web release at the transfer — the same platform we supply to paper mills, tuned for synthetic fiber webs.</p>
        <p class="app-links"><a href="/industries/nonwovens/">Nonwovens industry →</a></p>
      </div>
    </div>

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
        <a href="/industries/nonwovens/">Nonwovens industry →</a>
        <a href="/blog/forming-fabric-guide/">Guide: what is a forming fabric →</a>
      </div>
    </div>

    <div class="cta-band">
      <div><h2>Request a quote for forming fabrics</h2><p>Machine model + grade = specification matched within 24 hours.</p></div>
      <a class="btn" href="#rfq">Get a Quote</a>
    </div>
  </div>
</section>
<!--#RFQ#-->`.replace("<!--#RFQ#-->", "");
}

/* ============================== 螺旋网页(干网/压滤双板块) ============================== */
function spiralPage(p) {
  return `
<section class="page-hero">
  <div class="wrap hero-flex">
    <div class="hero-main">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/#solutions">Products</a> › <span>Spiral Fabric</span></nav>
      <span class="series-chip">${p.series} — ${p.seriesIntro}</span>
      <h1>${p.h1}</h1>
      <p class="lede">Endless belts of monofilament spirals joined by hinge pins — one weaving platform, two families: open spiral dryer fabrics with no filler yarns (SP-D), and filled spiral press filter belts (SP-P) where 2–5 filler yarns tune the permeability down for filtration.</p>
    </div>
    <nav class="hero-jumps" aria-label="Jump to a spiral family">
      <span class="hj-label">On this page</span>
      <a href="#fam-spd">Spiral Dryer (SP-D)</a>
      <a href="#fam-spp">Spiral Press Filter (SP-P)</a>
      <a href="#fam-special">Special Materials</a>
    </nav>
  </div>
</section>

<section>
  <div class="wrap article">

    <p>${p.intro}</p>

    <h2 id="fam-spd">SP-D · Spiral dryer fabrics — hollow, no filler yarns</h2>
    <p>Without filler yarns the spiral structure stays fully open — our 6890 and 9010 weaves measure <b>875–1016 CFM</b>, so drying air passes through belt and product instead of fighting the belt. That is exactly what multi-layer board dryers, paper and food belt dryers and washing/cooling conveyors want, and the open structure resists blinding and cleans easily. Anti-static monofilament versions serve static-prone board forming dryers; <b>PPS</b> versions run around 240&nbsp;°C long-term.</p>
    <div class="app-row app-major">
      <figure class="app-img">
        <img src="/qfy-content/uploads/sp/sp-pet.jpg" alt="Standard PET spiral dryer fabric, monofilament spirals joined by hinge pins" width="1000" height="750" loading="lazy" decoding="async">
        <figcaption>Standard PET — the SP-D workhorse construction.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Open spiral dryer fabrics</h3>
        <p class="app-tag">Board dryers · Paper &amp; food belts · Conveying</p>
        <p>Models 6890 and 9010 cover the two platform weaves; PET as standard, PPS woven to order for heat. Non-stick PET+PTFE grades are available where product release matters.</p>
      </div>
    </div>

    <table class="spec-table">
      <caption>${p.paramsSPD.caption}</caption>
      <thead><tr>${p.paramsSPD.head.map(h => `<th scope="col">${h}</th>`).join("")}</tr></thead>
      <tbody>${p.paramsSPD.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>

    <h2 id="fam-spp">SP-P · Spiral press filter belts — filled for filtration</h2>
    <p>Add 2–5 filler yarns inside the spiral loops and the open dryer structure becomes a true filter belt — the spiral dewatering belt, as belt-press operators call it: density rises, air permeability drops from ~1000 to as low as <b>325 CFM</b>, and fines stay in the product instead of washing through. Round fillers maximize open area for heavy drainage; flat fillers give a smoother surface and better fines retention for juice and palm-oil squeezing.</p>
    <div class="app-row app-minor rev">
      <figure class="app-img">
        <img src="/qfy-content/uploads/sp/sp-9010-4.jpg" alt="Type 9010-4 spiral fabric with PET filler yarns for press filtration" width="466" height="350" loading="lazy" decoding="async">
        <figcaption>Filled 9010-4 — the SP-P press-filtration construction.</figcaption>
      </figure>
      <div class="app-txt">
        <h3>Filled spiral press filter belts</h3>
        <p class="app-tag">Belt press filters · Sludge · Juice &amp; palm oil</p>
        <p>Sludge dewatering, sand washing, juice squeezing and palm oil pressing — the filler count and cross-section set the permeability and surface balance. We match both to your duty from the measured table below.</p>
        <p class="app-links"><a href="/industries/mining/">Mining &amp; Minerals →</a> · <a href="/press-belt/">Press Filter Belt (woven) →</a></p>
      </div>
    </div>

    <table class="spec-table">
      <caption>${p.paramsSPP.caption}</caption>
      <thead><tr>${p.paramsSPP.head.map(h => `<th scope="col">${h}</th>`).join("")}</tr></thead>
      <tbody>${p.paramsSPP.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>

    <h2 id="fam-special">Special materials series — beyond standard PET</h2>
    <p>Three specialty material lines run on the same spiral platform — chosen by environment, not by duty:</p>
    <div class="as-grid">
      <figure class="as-card">
        <img src="/qfy-content/uploads/live/teflon-g2.jpg" alt="Hydrolysis-resistant spiral fabric for acid and alkaline environments, close-up" width="500" height="350" loading="lazy" decoding="async">
        <figcaption><b>Hydrolysis-resistant spiral</b><span>Outstanding hydrolysis resistance — built for acid and alkaline environments.</span></figcaption>
      </figure>
      <figure class="as-card">
        <img src="/qfy-content/uploads/sp/sp-pps.jpg" alt="PPS spiral fabric for high-temperature dryer belts around 240 degrees C" width="466" height="350" loading="lazy" decoding="async">
        <figcaption><b>PPS spiral</b><span>High-temperature duty to ~240 °C.</span></figcaption>
      </figure>
      <figure class="as-card">
        <img src="/qfy-content/uploads/sp/sp-ptfe.jpg" alt="Orange PET spiral fabric with PTFE additive for non-stick duty, color customizable" width="466" height="350" loading="lazy" decoding="async">
        <figcaption><b>PTFE-added spiral</b><span>Non-stick release — orange masterbatch, colors customizable.</span></figcaption>
      </figure>
    </div>

    <div class="accounting"><span class="ico">Σ</span><p><b>One weaving platform, two duties.</b> Open spirals move air (drying); filled spirals hold fines (filtration) — and the filler count tunes permeability anywhere between. Send us your CFM target and duty; we match model and material within 24 hours.</p></div>

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
        <a href="/press-belt/">Press Filter Belt →</a>
        <a href="/blog/spiral-fabric-guide/">Spiral vs woven fabric guide →</a>
        <a href="/industries/mining/">Mining &amp; Minerals →</a>
      </div>
    </div>

    <div class="cta-band">
      <div><h2>Request a quote for spiral fabrics</h2><p>Duty + CFM target + width = model matched within 24 hours.</p></div>
      <a class="btn" href="#rfq">Get a Quote</a>
    </div>
  </div>
</section>
<!--#RFQ#-->`.replace("<!--#RFQ#-->", "");
}

/* ============================== 真空滤布页 ============================== */
function vacuumPage(p) {
  return `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <span>Products</span> › <span>Vacuum Filter Fabric</span></nav>
    <span class="series-chip">${p.series} — ${p.seriesIntro}</span>
    <h1>${p.h1}</h1>
    <p class="lede">Horizontal vacuum belt filter fabrics engineered model by model — from FGD gypsum dewatering to phosphoric acid and mining concentrates, each weave tuned for permeability, release and scraper life.</p>
  </div>
</section>

<figure class="pp-hero">
  <img src="${VF}/strip.jpg" alt="Vacuum belt filter operation schematic showing how the filter fabric runs on the machine" width="960" height="255" loading="eager" decoding="async">
  <figcaption>Operation schematic — how the fabric runs on a horizontal vacuum belt filter.</figcaption>
</figure>

<section>
  <div class="wrap article">

    <p>Everything on a horizontal vacuum belt filter is decided by the fabric: the vacuum the pump can pull, how clean the filtrate runs, how the cake releases, and how long the cloth survives the scraper. Aurora VF fabrics are woven in five model families — each answering a different duty, all factory-tested.</p>

    <!-- 1. 选型总表(页面核心) -->
    <h2>Choose by duty — the five model families</h2>
    <div class="model-list">

      <div class="model-row">
        <figure class="model-img"><img src="${VF}/m623a.jpg" alt="Type 623A vacuum filter fabric, side view showing the all-monofilament weave" width="640" height="480" loading="eager" decoding="async"><figcaption>623A — side view: plied monofilament weft</figcaption></figure>
        <div class="model-txt">
          <h3>623A <span class="chip">Mining &amp; precision</span></h3>
          <p>The same structure as 623, re-engineered with an <b>all-monofilament weft</b> — several fine monofilaments plied into one yarn — for higher fabric strength and a step up in filtration precision. The choice for demanding mining dewatering duties.</p>
          <p class="m-tags">All-mono weft · High strength · Filtration precision</p>
        </div>
      </div>

      <div class="model-row rev">
        <figure class="model-img"><img src="${VF}/m623.jpg" alt="Type 623 vacuum filter fabric with all-monofilament surface for FGD gypsum" width="466" height="350" loading="lazy" decoding="async"><figcaption>623 — clean mono surface, multifilament hidden on the back</figcaption></figure>
        <div class="model-txt">
          <h3>623 <span class="chip">FGD gypsum — upgraded</span></h3>
          <p>Surface is <b>100% monofilament</b> with the multifilament buried on the machine side: the gypsum cake releases cleanly, the surface resists the scraper, and service life runs well above 617. The more complex structure makes it thicker — a few close-clearance belt filters suit 617 better.</p>
          <p class="m-tags">Mono surface · Scraper-resistant · Longer life than 617</p>
        </div>
      </div>

      <div class="model-row">
        <figure class="model-img"><img src="${VF}/m617.jpg" alt="Type 617 vacuum filter fabric with multifilament weft for FGD gypsum" width="466" height="350" loading="lazy" decoding="async"><figcaption>617 — multifilament weft, low permeability</figcaption></figure>
        <div class="model-txt">
          <h3>617 <span class="chip">FGD gypsum — low permeability</span></h3>
          <p>A multifilament weft takes air permeability down to a fine band — right for <b>FGD gypsum dewatering</b> after flue-gas desulfurization, and for coal-ash (fly ash) slurries that need a tight cloth. The economical FGD workhorse.</p>
          <p class="m-tags">MF weft · 33–41 CFM · FGD &amp; fly ash</p>
        </div>
      </div>

      <div class="model-row rev">
        <figure class="model-img"><img src="${VF}/m620.jpg" alt="Type 620 double-layer vacuum filter fabric for chemical filtration" width="466" height="350" loading="lazy" decoding="async"><figcaption>620 — double layer, calendered surface</figcaption></figure>
        <div class="model-txt">
          <h3>620 <span class="chip">Chemicals — most versatile</span></h3>
          <p>A <b>double-layer</b> structure with a fine monofilament sheet side and a drain layer beneath (mono or multifilament variants). Surface calendering tunes the permeability down to very fine bands, while the mono top keeps cake release excellent — the most widely used family across chemical processes, with the most derived variants.</p>
          <p class="m-tags">Double layer · Calender-tuned CFM · Best release</p>
        </div>
      </div>

      <div class="model-row">
        <figure class="model-img"><img src="${VF}/m610.jpg" alt="Type 610 vacuum filter fabric for phosphoric acid filtration" width="466" height="350" loading="lazy" decoding="async"><figcaption>610 — satin weave for phosphoric acid duty</figcaption></figure>
        <div class="model-txt">
          <h3>610 <span class="chip">Phosphoric acid</span></h3>
          <p>A satin-weave monofilament fabric in blue PET, a long-standing choice for <b>phosphoric acid</b> and general chemical duties on horizontal belt filters.</p>
          <p class="m-tags">Satin weave · PET blue · H₃PO₄ duty</p>
        </div>
      </div>

    </div>

    <!-- 2. FGD 叙事(算账) -->
    <h2>FGD gypsum: 617 or 623?</h2>
    <div class="duo-compare">
      <div class="duo">
        <h4>Start with 617 when…</h4>
        <ul><li>Budget leads, or the filter has tight clearances (617 is thinner)</li><li>Standard gypsum dewatering with moderate scraper contact</li><li>Also suits fly-ash slurries at low permeability</li></ul>
      </div>
      <div class="duo">
        <h4>Upgrade to 623 when…</h4>
        <ul><li>Cake release and scraper wear drive your cloth costs</li><li>You want longer campaigns between changes (623 outlasts 617)</li><li>Filtrate clarity must hold at higher loads</li></ul>
      </div>
    </div>
    <div class="accounting"><span class="ico">Σ</span><p><b>On a vacuum filter, cloth choice is throughput.</b> A blinded or wrongly specified fabric throttles the vacuum and the whole filter slows down. Picking between 617 and 623 by total cost per tonne of dry gypsum — not price per m² — typically pays back in longer campaigns and drier cakes. Send us your cycle data and we will do the comparison on your numbers.</p></div>

    <!-- 3. 设备适配 -->
    <h2>Joints — steel clipper and flap seams</h2>
    <p>Seamed cloths are joined to suit the filter: the steel <b>clipper joint</b> is the standard on press and vacuum cloths, while the <b>flap-covered clipper</b> — a cloth flap over the lacing — protects the joint where it runs against the wear surface, common on vacuum drying belts. Both are fitted in-house to your filter drawing; endless cloths on request.</p>
    <div class="mini-gallery">
      <figure><img src="/qfy-content/uploads/vf/vf-joint-clipper.jpg" alt="Steel clipper joint on a vacuum filter cloth, the standard seamed join" width="500" height="350" loading="lazy" decoding="async"><figcaption><b>Steel clipper joint</b> — the standard seamed join</figcaption></figure>
      <figure><img src="/qfy-content/uploads/vf/vf-joint-flap.jpg" alt="Flap-covered clipper joint on a cloth for vacuum drying belts" width="500" height="350" loading="lazy" decoding="async"><figcaption><b>Flap-covered clipper</b> — common on vacuum drying belts</figcaption></figure>
    </div>

    <div class="oem-box">
      <h3>Machine &amp; platform fit</h3>
      <p>${p.oem.join(" · ")}</p>
    </div>

    <!-- 4. 规格(实测) -->
    <h2>Specifications — factory test data</h2>
    <table class="spec-table">
      <caption>${p.params.caption}</caption>
      <thead><tr>${p.params.head.map(h => `<th scope="col">${h}</th>`).join("")}</tr></thead>
      <tbody>${p.params.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
    <p class="table-note">PP MD-series belts (8–120 µm ratings, 3500 mm width) cover fine-rating duties — ask for the full sheet.</p>

    <h2>Frequently Asked Questions</h2>
    <div class="faq">
      ${p.faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n      ")}
    </div>

    <div class="related">
      <h2>Related pages</h2>
      <div class="related-grid">
        <a href="/industries/power-generation-fgd/">Power Generation &amp; FGD industry →</a>
        <a href="/industries/mining/">Mining &amp; Minerals industry →</a>
        <a href="/press-fabric/">Press Filter Fabric →</a>
        <a href="/products/square-mesh/">Square mesh belts →</a>
      </div>
    </div>

    <div class="cta-band">
      <div><h2>Request a quote for vacuum filter fabrics</h2><p>Filter model + slurry + target permeability = model recommendation within 24 hours.</p></div>
      <a class="btn" href="#rfq">Get a Quote</a>
    </div>
  </div>
</section>
<!--#RFQ#-->`.replace("<!--#RFQ#-->", "");
}

module.exports = { dryerPage, vacuumPage, formingPage, spiralPage };
