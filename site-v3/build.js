// Aurora Filtech V3 — "aurora gradient" design. Output: site-v3/ (this directory)
// Content/SEO data identical to site/ (spec aurora-site-spec.md); layout is fully independent.
// Source of truth: aurora-site-spec.md (v1.0, 2026-09-01)
const fs = require("fs");
const path = require("path");

const BASE = "https://www.aurora-filtech.com";
const OUT = __dirname;

// Images use root-relative stable /qfy-content/uploads/... paths (spec §0.3, §5, §7).
// Local copies live in site/qfy-content/uploads/ (mirrors production layout 1:1).
const IMG = {
  h1: `/qfy-content/uploads/2019/12/711b4e3ef611d676aa22b38c17cf53e4.jpg`,
  h2: `/qfy-content/uploads/2019/11/67a7f86dc4882ac91d995df779417576.jpg`,
  c1: `/qfy-content/uploads/2019/09/c77f027fd05a12043ba86232dbdbd87a.jpg`,
  c2: `/qfy-content/uploads/2019/09/01208d8bdb0d682815afe19b9446d8c6.jpg`,
  c3: `/qfy-content/uploads/2019/09/bb3b48e5c553055326e399fcff852e84.jpg`,
  c4: `/qfy-content/uploads/2019/09/d4f377239978d23c7b1098681b945ba0.jpg`,
  c5: `/qfy-content/uploads/2019/09/a6367e490f2e5ab99344dcb378e531e9.jpg`,
  c6: `/qfy-content/uploads/2019/09/1c0c07699ea224e04294c3c12fdf7bde.jpg`,
  c7: `/qfy-content/uploads/2019/09/45a34d52de579ededcbaa17342a7bba5.jpg`,
  c8: `/qfy-content/uploads/2023/02/3aacdceeba645c1a58a832b60137c3b7.jpg`,
  og: `/qfy-content/uploads/2019/12/711b4e3ef611d676aa22b38c17cf53e4.jpg`,
  dryer1: `/qfy-content/uploads/2023/02/fe14b23c21fc9da13b521b792acf44ee.jpg`,
  vacuumBanner: `/qfy-content/uploads/2018/01/c758862f83257dc972f1e1934586c5f1.jpg`,
  pressBeltBanner: `/qfy-content/uploads/2018/01/fe3317fefb27841fe260dfab9a83a362.jpg`,
  teflonBanner: `/qfy-content/uploads/2019/09/0016072e9e586e75a7b3560370c90d92.jpg`,
  filterBagBanner: `/qfy-content/uploads/2023/02/filter-bag-banner.jpg`,
};

// ---- product data (spec §2, §4.2, §6.2, §8.2) ----
const products = [
  {
    slug: "forming-fabric", name: "Forming Fabric", h1: "Forming Fabric",
    title: "Forming Fabric | Paper Machine Clothing | Aurora Filtech",
    desc: "Forming fabrics for paper machines, nonwoven lines and graphite sheet forming. 1-layer to 3-layer SSB anti-hydrolysis polyester. Paper machine clothing OEM/ODM.",
    card: { h2: "FORMING FABRIC", img: "/qfy-content/uploads/2019/09/c77f027fd05a12043ba86232dbdbd87a.jpg", w: 671, h: 386, alt: "Forming fabric running on the forming section of a paper machine", caption: "Forming fabrics for paper machines and nonwoven fabric forming machines — paper forming, nonwoven forming and graphite flake forming.", first: "Our forming fabrics keep paper machines, belt conveyors and nonwoven fabric forming machines running at full speed.",
      equipment: ["Paper mills", "Belt conveyor", "Nonwoven fabric forming machine"], applications: ["Nonwoven fabric forming", "Paper forming", "Graphite flake forming"] },
    jsonldId: "forming-fabric", imageId: "image-forming-fabric",
    altNames: ["Paper machine clothing", "Forming wire", "Polyester forming wire", "Forming belt", "Paper making mesh"],
    keywords: "paper machine clothing, forming fabric, forming wire, graphite sheet forming fabric, graphene film forming belt, polyester forming fabric, paper machine clothing, forming fabrics for paper machines, nonwoven forming fabric, graphite flake forming",
    category: "Industrial filter fabrics",
    pdesc: "Forming fabrics (also known as forming wire) for paper machines and nonwoven forming machines. 1-layer, 1.5-layer, 2-layer and 3-layer constructions with anti-hydrolysis monofilament.",
    banner: {"url": "/qfy-content/uploads/live/forming-f.jpg", "alt": "Close-up of a polyester forming fabric for paper machines", "caption": "Close-up of a polyester forming fabric for paper machines.", "w": 800, "h": 252, "maxW": 800},
    gallery: [{"url": "/qfy-content/uploads/gf/graphite-sheet.jpg", "w": 800, "h": 533, "alt": "Flexible graphite sheets, the heat-spreading graphite film layer formed on our fabrics", "caption": "Graphite sheet — one of the three forming routes this page covers."}, {"url": "/qfy-content/uploads/live/forming-g1.jpg", "w": 800, "h": 400, "alt": "Paper machine running forming fabrics in the wet end of a paper machine", "caption": "Paper forming — the PMC flagship duty."}, {"url": "/qfy-content/uploads/df/single-flat.jpg", "w": 466, "h": 350, "alt": "Single-layer flat-yarn dryer fabric, also used as the forming deck fabric on spunlaid nonwoven lines", "caption": "Nonwoven forming — the spunlaid deck fabric."}],
    sections: [{h:"Three forming routes, one weaving platform",html:"<p>Graphite and thermal-sheet forming, paper machine forming (the PMC flagship) and nonwoven web formation — all three run on the same anti-hydrolysis monofilament platform. The quick specs above and the FAQ below cover how we specify each route.</p>__UL_START__[\"Graphite sheet / graphite film / graphene film forming lines\",\"Paper machines — forming section (PMC)\",\"Nonwoven forming — spunlaid, airlaid, wetlaid, spunlace\"]__UL_END__"}],
    paramsData: {"caption": "Aurora forming fabrics — factory test data (max width 6000 / 4200 mm)", "head": ["Model", "Warp yarn (mm)", "Weft yarn (mm)", "Warp/Weft dens. (/cm)", "Weave", "Air perm. (CFM)", "Thickness (mm)", "Weight (g/m²)", "Tensile (N/cm)"], "rows": [["611", "PET 0.8 × 0.42 red", "PET 0.8 white", "11 / 5.5", "2/2 twill", "799", "1.25", "896", "1102"], ["624", "PET 0.5 white", "PET 0.5 white", "24 / 12", "Double layer", "781", "2.26", "1212", "1029"], ["656", "PET 0.35 white", "PET 0.55 white", "33 / 8.4", "4/1 satin", "211–219", "0.92", "890", "1502"], ["656A", "PET 0.35 white", "PET 0.55 white", "40 / 11", "4/1 satin", "76–86", "0.92", "890", "1151"]]}, paramsSPD: null, paramsSPP: null,
    custom: true,
    related: ["dryer-fabric", "spiral-belt", "blog/forming-fabric-guide"],
    faqs: [["What is a forming fabric and why is it also called forming wire?", "A forming fabric is the woven monofilament belt that forms and dewaters the fiber web at the wet end of a paper machine. It is still commonly called a forming wire (or simply wire) because early paper machines used woven bronze wires — polyester fabrics replaced them, but the old name survives among machine crews."], ["Which layer construction should I choose?", "1-layer fabrics give maximum drainage for fast machines and heavy stock; 2-layer and 3-layer (SSB) constructions give a smoother surface, better fiber support and finer retention for quality grades. We recommend per paper grade and machine speed."], ["What does mesh count mean on a forming fabric?", "Mesh count is the number of MD yarns (and CD yarns) per centimetre — higher counts mean smaller openings and better fiber retention, lower counts drain faster. Our spec table lists typical mesh counts per series."], ["Do you offer anti-hydrolysis forming fabrics?", "Yes. Anti-hydrolysis monofilament extends fabric life in hot, humid forming sections — typically the economical choice for brown-stock and recycled lines."], ["Can you make belts endless or with special seams?", "Yes: pin seams, clipper seams and endless (seamless) edges, with sealed or reinforced edges to suit your machine."], ["Do you supply fabrics for nonwoven forming machines?", "Yes — spunlace, needle-punch and airlaid forming fabrics are a core line, in the same anti-hydrolysis polyester monofilament."], ["Do you supply forming fabrics for graphite sheet lines?", "Yes. We weave the forming-deck and support-conveyor fabrics for continuous flexible-graphite and thermal-film lines — even fine support for uniform calendering, a release surface graphite will not cling to, heat stability, and anti-static yarns as standard (graphite dust is conductive)."], ["Graphite sheet or vapor chamber — what does the fabric form?", "The fabric forms the graphite / thermal sheet itself (expanded-graphite mat or cast film). The sheet is later laminated into vapor-chamber and heat-spreader assemblies; the copper chamber itself does not run on a forming fabric."]],
    specs: ["Constructions: 1-layer, 1.5-layer, 2-layer, 3-layer (SSB)", "Yarn: polyester (PET) monofilament, anti-hydrolysis option", "Seam: pin seam, clipper seam or endless on request", "Edges: sealed or reinforced", "Widths and lengths: custom", "OEM/ODM: available"],
    apps: ["Paper mills — packaging, printing & writing, tissue grades", "Non-woven forming machines — spunlace, needle-punch, airlaid", "Belt conveyors and graphite flake forming lines"],
  },
  {
    slug: "dryer-fabric", name: "Dryer Fabric", h1: "Dryer Fabric",
    title: "Dryer Fabric | Anti-static to Square Mesh | Aurora Filtech",
    desc: "Dryer fabrics in four families: anti-static belts for wool and panel lines, spiral and square mesh belts, flat-yarn paper and nonwoven fabrics.",
    card: { h2: "DRYER FABRIC", img: "/qfy-content/uploads/2019/09/01208d8bdb0d682815afe19b9446d8c6.jpg", w: 671, h: 386, alt: "Anti-static dryer fabric running on a board forming dryer", caption: "Anti-static dryer fabrics for board forming machines, food drying machines and belt drying machines — wood panel board forming, paper drying and food drying.", first: "Anti-static dryer fabrics eliminate static build-up on board forming machines, food drying machines and belt drying machines.",
      equipment: ["Board forming machine", "Food drying machine", "Belt drying machine"], applications: ["Wood panel board forming", "Paper drying", "Food drying"] },
    jsonldId: "dryer-fabric", imageId: "image-dryer-fabric",
    altNames: ["Dryer belt", "Anti-static dryer belt", "Dryer screen mesh", "Drying mesh", "Anti-hydrolysis dryer fabric", "Dryer fabric"],
    keywords: "dryer fabric, dryer belt, anti-static dryer fabric, dryer fabrics for paper machines, board forming dryer mesh, food drying belt, pre-press fabric",
    category: "Industrial filter fabrics",
    pdesc: "Anti-static dryer fabrics and dryer belts for board forming, paper drying and food drying machines. Anti-static, anti-hydrolysis and heat-resistant constructions with strong warp loop seams.",
    banner: {"url": "/qfy-content/uploads/live/dryer-f.jpg", "alt": "Polyester dryer fabric close-up", "caption": "Polyester dryer fabric close-up.", "w": 500, "h": 350, "maxW": 500},
    gallery: [{"url": "/qfy-content/uploads/df/hero.jpg", "w": 1200, "h": 525, "alt": "Anti-static dryer fabric close-up with conductive monofilaments", "caption": "Anti-static monofilament — the flagship family."}, {"url": "/qfy-content/uploads/df/4106s.jpg", "w": 500, "h": 350, "alt": "Type 4106S dryer belt with a high-temperature silicone coating for MDF production", "caption": "4106S — silicone-coated belt for panel lines."}, {"url": "/qfy-content/uploads/df/wool-uni.jpg", "w": 640, "h": 480, "alt": "Customer case: wool scouring dryer running a blue anti-static dryer belt with wool on the belt", "caption": "Wool drying after scouring — customer case."}, {"url": "/qfy-content/uploads/sp/sp-pet.jpg", "w": 1000, "h": 750, "alt": "Standard PET spiral fabric belt with pin-joined spiral links", "caption": "Open spiral construction — the drying air reaches the product."}, {"url": "/qfy-content/uploads/df/sq-blue.jpg", "w": 1200, "h": 900, "alt": "Blue polyester square mesh belt for wood chip and biomass drying", "caption": "Square mesh — fine, stable, heat-set."}],
    sections: [{h:"Four families on one page",html:"<p>Family 1 anti-static dryer belts (wool scouring and wood panel forming on Dieffenbacher-type lines — our flagship line), Family 2 spiral fabrics with and without filler yarns for open high-airflow drying, Family 3 square mesh belts for drying, conveying and screening, and Family 4 flat-yarn dryer fabrics for paper and nonwoven lines.</p>__UL_START__[\"Anti-static belts — wool drying, MDF/OSB forming and pre-press (Dieffenbacher-type)\",\"Spiral fabrics — with or without filler yarns, up to ~1000 CFM\",\"Square mesh — food, wood chip and biomass drying\",\"Flat-yarn fabrics — paper dryer sections, nonwoven spunlaid\"]__UL_END__"}],
    paramsData: {"caption": "Aurora dryer fabrics — factory test data (max width 6000 mm)", "head": ["Model", "Warp yarn (mm)", "Weft yarn (mm)", "Warp/Weft dens. (/cm)", "Weave", "Air perm. (CFM)", "Thickness (mm)", "Weight (g/m²)"], "rows": [["12804TK", "PET 0.8/0.65/0.45 anti-static", "PET 0.8", "12.7 / 4.5", "Anti-static", "528", "2.19", "1460"], ["16804K", "PET 0.68/0.64 anti-static", "PET 0.8", "16.6 / 6.9", "Anti-static", "282", "1.84", "1420"], ["611", "PET 0.8 × 0.42 red", "PET 0.8 white", "11 / 5.5", "2/2 twill", "799", "1.25", "896"], ["624", "PET 0.5 white", "PET 0.5 white", "24 / 12", "Double layer", "781", "2.26", "1212"], ["625A", "PET 0.38 × 0.58 red", "PET 0.5 red", "20 / 11.7", "Satin", "427", "1.73", "1050"]]}, paramsSPD: null, paramsSPP: null,
    custom: true,
    related: ["forming-fabric", "spiral-belt"],
    faqs: [["Why choose an anti-static dryer fabric?", "Anti-static yarns (carbon filament) drain the static charges that build up on high-speed dryers — preventing dust attraction, sheet wrap-ups and shocks to crews, especially on board forming and food drying machines."], ["What is air permeability (CFM) and why does it matter?", "CFM (cubic feet per minute per square foot) measures how easily drying air passes through the fabric. Too open and the sheet loses contact; too tight and the fan works against the fabric. We select CFM per dryer zone, product and temperature."], ["What seam options are available?", "Strong warp loop seams as standard — the seam is usually the first failure point on a dryer fabric — plus pin seams and endless seaming for smooth high-speed running."], ["Can dryer fabrics be used for food drying?", "Yes. We supply food-grade anti-static dryer fabrics for food belt dryers, with food-contact compliant materials."], ["Do you supply fabrics for wood panel drying?", "Yes — belt dryer fabrics for particleboard and OSB lines are a core application. See also our spiral dryer fabrics for open, high-CFM duties."], ["How do I keep dryer fabrics clean?", "Periodic cleaning keeps CFM stable: clogged fabrics raise steam use. Ask us for a cleaning and conditioning schedule for your duty."], ["What is the silicone-coated (4106S) version for?", "4106S coats a single-layer dryer fabric with high-temperature silicone — used in MDF production where the belt must release resin-laden product cleanly. See the video above."], ["What are the joints made of?", "Spiral joints on our anti-static belts are made of PEEK — heat-resistant, hydrolysis-resistant and chemically inert — so the joint outlives the fabric. Steel clipper and endless joints are available on request."], ["Dryer fabric, dryer belt or dryer conveyor fabric — what is the difference?", "The three names cover the same product family. “Dryer fabric” is the paper-industry term; “dryer belt” and “dryer conveyor belt” emphasise the conveying duty on board, food and wool lines. We map every enquiry to the right construction for the machine."], ["What opening sizes do your square mesh belts come in?", "More than 20 heat-set square openings from 200 µm × 200 µm up to 4 mm × 4 mm, woven from polyester monofilament and heat-set for low shrinkage at working temperatures to 180 °C — supplied flat and stable in seamless widths up to 6 m."]],
    specs: ["Constructions: anti-static, anti-hydrolysis, heat-resistant", "Seam: strong warp loop seam, pin seam or endless", "Custom widths for every dryer width", "Food-grade options available", "OEM/ODM: available"],
    apps: ["Wood panel board forming and MDF/PB drying lines", "Wool scouring dryers", "Paper machines — drying section", "Food drying machines and belt drying machines", "Square mesh drying, conveying and screening"],
  },
  {
    slug: "spiral-belt", name: "Spiral Fabric", h1: "Spiral Fabric (Spiral Belt)",
    title: "Spiral Fabric | Spiral Dryer and Filter Belts | Aurora Filtech",
    desc: "Spiral fabrics in two families — open dryer belts (no filler yarns) and filled press filter belts. PET and PPS monofilament, custom widths. OEM/ODM.",
    card: { h2: "SPIRAL FABRIC", img: "/qfy-content/uploads/sp/sp-pps9010.jpg", w: 1000, h: 750, alt: "PPS spiral fabric belt with pin-joined monofilament spirals for high-temperature drying", caption: "Spiral fabrics (spiral belts) in PET, PPS and PTFE-added grades — with or without filler yarns for dryer, belt press filter and conveying duties.", first: "Spiral fabrics and spiral belts built from PET or PPS monofilament spirals — open high-airflow dryer belts, or dense filled belts for belt press filtration.",
      equipment: ["Belt & tunnel dryers", "Belt press filters", "Washing & conveying lines"], applications: ["Board & food drying", "Sludge dewatering", "High-temperature drying (PPS)"] },
    jsonldId: "spiral-belt", imageId: "image-spiral-belt",
    altNames: ["Spiral belt", "Spiral dryer fabric", "Spiral press filter belt", "Spiral filter belt", "Spiral conveyor belt", "Spiral link fabric"],
    keywords: "spiral fabric, spiral belt, spiral dryer fabric, spiral press filter belt, spiral filter belt, dewatering belt, spiral conveyor belt, belt press filter belt",
    category: "Industrial filter fabrics",
    pdesc: "Spiral fabrics and spiral belts for belt press filter dewatering and dryer applications. PET and PPS monofilament spirals joined by hinge pins — with or without filler yarns — custom widths and edge treatments.",
    banner: {"url": "/qfy-content/uploads/sp/sp-pet.jpg", "alt": "Polyester PET spiral fabric belt, monofilament spirals joined by hinge pins", "caption": "PET spiral fabric — the standard construction of the Aurora SP range.", "w": 1000, "h": 750, "maxW": 1000},
    gallery: [{"url": "/qfy-content/uploads/sp/sp-pet.jpg", "w": 1000, "h": 750, "alt": "Standard PET spiral dryer fabric, monofilament spirals joined by hinge pins", "caption": "SP-D in standard PET."}, {"url": "/qfy-content/uploads/sp/sp-9010-4.jpg", "w": 466, "h": 350, "alt": "Type 9010-4 spiral fabric with PET filler yarns for press filtration", "caption": "SP-P — filled 9010-4 construction."}, {"url": "/qfy-content/uploads/live/teflon-g2.jpg", "w": 500, "h": 350, "alt": "Hydrolysis-resistant spiral fabric for acid and alkaline environments, close-up", "caption": "Special materials — hydrolysis-resistant, PPS, PTFE-added."}],
    sections: [],
    paramsData: null, paramsSPD: {"caption": "Aurora SP-D spiral dryer fabrics — factory test data (open, no filler yarns)", "head": ["Model", "Spiral/cross yarn (mm)", "Filler yarns", "Air perm. (CFM)", "Thickness (mm)", "Weight (g/m²)", "Tensile (N/cm)"], "rows": [["6890", "PET 0.68 / 0.90", "None — open", "959–1016", "2.4", "1301", "890"], ["9010", "PET 0.90 / 1.05", "None — open", "875–991", "3.12", "1627", "1300"]]}, paramsSPP: {"caption": "Aurora SP-P spiral press filter belts — factory test data (filler yarns per loop)", "head": ["Model", "Spiral/cross yarn (mm)", "Filler yarns (weft)", "Air perm. (CFM)", "Thickness (mm)", "Weight (g/m²)", "Tensile (N/cm)"], "rows": [["6890T2", "PET 0.68 / 0.90", "×0.8 × 2 round", "741–783", "2.4", "1521", "890"], ["6890T3", "PET 0.68 / 0.90", "×0.7 × 3 round", "633–666", "2.4", "1632", "890"], ["9010T3", "PET 0.90 / 1.05", "×0.9 × 3 round", "675–716", "3.12", "2017", "1300"], ["9010T4", "PET 0.90 / 1.05", "×0.9 × 4 round", "413–441", "3.12", "2147", "1300"], ["9010T5", "PET 0.90 / 1.05", "×0.8 × 5 round", "325–358", "3.12", "2277", "1300"], ["9010TF1", "PET 0.90 / 1.05", "0.65 × 2.0 flat", "741–783", "3.12", "1905", "1300"]]},
    custom: true,
    related: ["dryer-fabric", "spiral-belt", "blog/spiral-fabric-guide"],
    faqs: [["What is the difference between a spiral fabric and a woven dryer fabric?", "A spiral fabric is assembled from monofilament spirals joined by hinge pins, giving an open, non-tracking structure with high drainage. A woven dryer fabric is woven from warp and weft yarns and provides a smoother surface. Spiral fabrics are easier to repair on the machine; woven fabrics usually offer higher stability at high speeds. Full comparison in our spiral fabric guide."], ["With or without filler yarns — how do I choose?", "Without fillers you get maximum open area and air flow (drying and conveying). Adding 1–5 filler yarns increases density and lowers permeability — right for filtration duties on belt press filters."], ["Can spiral fabric be used on belt press filters?", "Yes — with filler yarns, spiral fabrics work as filter belts for sludge dewatering, sand washing, juice squeezing and palm oil squeezing. Their open structure drains quickly and releases the filter cake easily."], ["Do you offer PPS spiral fabrics for higher temperatures?", "Yes — PPS monofilament spiral fabrics serve higher-temperature drying applications (long-term duty around 240 °C, verified on request). Tell us your working temperature and we will recommend the right material."], ["Is it called spiral belt or spiral fabric?", "Both are used. Spiral fabric matches our structure best and matches Google image results; spiral belt is a common alias (often for food conveyor spirals). We cover both spellings across this family of pages."], ["Why no filler yarns on a dryer fabric?", "Dryers need air: without filler yarns the spiral structure stays fully open — our 6890 and 9010 weaves measure 875–1016 CFM — so drying air passes through belt and product instead of being blocked."], ["Do you offer anti-static spiral dryer fabrics?", "Yes — anti-static monofilament versions for static-prone board forming dryers."], ["Round or flat filler yarns — which should I choose?", "Round monofilament fillers maximize open area and CFM, keeping channels clear longer — good for heavy drainage. Flat fillers give a smoother contact surface and better fines retention while keeping good permeability."], ["How many filler yarns do I need?", "2–3 fillers for coarse, free-draining duties (sand washing); 3–4 for typical municipal sludge; 5 (or flat fillers) for fine solids and juice/oil squeezing. Measured CFM per model is in our spec table — we match the count to your target."]],
    specs: ["Material: PET (polyester) / PPS monofilament", "Spiral loop sizes: wide range", "Filler yarns: 2–5, round (Ø0.65–0.9 mm) or flat (0.65 × 2.0 mm), to tune permeability", "Edges: sealed, welded or reinforced", "Widths: custom", "OEM/ODM: available"],
    apps: ["Belt press filters — sludge, sand, juice and palm oil (SP-P)", "Dryers — board, paper and food drying (SP-D)", "General conveyor duties — washing, cooling, transporting"],
  },
  {
    slug: "vacuum-fabric", name: "Vacuum Filter Fabric", h1: "Vacuum Filter Fabric (Vacuum Filter Belt)",
    title: "Vacuum Filter Fabric | FGD and Mining Filtration | Aurora Filtech",
    desc: "Vacuum filter fabrics for vacuum belt filters and vacuum disc filters. Power plant FGD, phosphoric acid and mining filtration. Custom sizes.",
    card: { h2: "VACUUM FILTER FABRIC", img: "/qfy-content/uploads/2019/09/bb3b48e5c553055326e399fcff852e84.jpg", w: 671, h: 386, alt: "Vacuum belt filter with filter fabric for FGD gypsum dewatering", caption: "Vacuum filter fabrics for vacuum belt filters and vacuum disc filters — power plant FGD, phosphoric acid and mining filtration.", first: "Vacuum filter fabrics engineered for vacuum belt filters and vacuum disc filters in demanding dewatering duties.",
      equipment: ["Vacuum belt filter", "Vacuum disc filter"], applications: ["Power plant FGD filtration", "Phosphoric acid filtration", "Mining plant filtration"] },
    jsonldId: "vacuum-fabric", imageId: "image-vacuum-fabric",
    altNames: ["Vacuum filter belt", "Vacuum fabric", "FGD filter fabric", "Vacuum belt filter fabric", "Horizontal vacuum belt filter cloth"],
    keywords: "vacuum filter fabric, vacuum filter belt, horizontal vacuum belt filter cloth, vacuum disc filter bag, FGD gypsum dewatering fabric, phosphoric acid filtration, mining dewatering cloth",
    category: "Industrial filter fabrics",
    pdesc: "Vacuum filter fabrics for vacuum belt filters and vacuum disc filters in power plant FGD, phosphoric acid and mining filtration. Seamless or seamed, custom sizes.",
    banner: {"url": "/qfy-content/uploads/live/vacuum-f.jpg", "alt": "610D vacuum filter fabric close-up", "caption": "610D vacuum filter fabric close-up.", "w": 640, "h": 480, "maxW": 640},
    gallery: [{"url": "/qfy-content/uploads/vf/strip.jpg", "w": 960, "h": 255, "alt": "Vacuum belt filter operation schematic showing how the filter fabric runs on the machine", "caption": "Operation schematic — the fabric on a horizontal vacuum belt filter."}, {"url": "/qfy-content/uploads/vf/m623a.jpg", "w": 640, "h": 480, "alt": "Type 623A vacuum filter fabric, side view showing the all-monofilament weave", "caption": "623A — plied monofilament weft for mining precision."}, {"url": "/qfy-content/uploads/vf/vf-joint-clipper.jpg", "w": 500, "h": 350, "alt": "Steel clipper joint on a vacuum filter cloth, the standard seamed join", "caption": "Steel clipper joint — the standard seamed join."}, {"url": "/qfy-content/uploads/vf/vf-joint-flap.jpg", "w": 500, "h": 350, "alt": "Flap-covered clipper joint on a cloth for vacuum drying belts", "caption": "Flap-covered clipper — common on vacuum drying belts."}],
    sections: [{h:"Choose by duty — the five model families",html:"<p><b>623A</b> mining precision (all-monofilament plied weft), <b>623</b> the FGD upgrade (mono surface, scraper-resistant), <b>617</b> the economical low-permeability FGD workhorse, <b>620</b> the most versatile calendered double layer for chemicals, <b>610</b> satin weave for phosphoric acid. Measured air permeability for every model is in the factory test table below.</p>"},{h:"FGD gypsum: 617 or 623?",html:"<p>Start with 617 when budget leads or the filter has tight clearances; upgrade to 623 when cake release and scraper wear drive your cloth costs — 623 runs longer campaigns and holds filtrate clarity at higher loads.</p>"}],
    paramsData: {"caption": "Aurora vacuum filter fabrics — factory test data (PET max width 6000 mm; PP MD series 3500 mm)", "head": ["Model", "Yarn", "Warp/Weft dens. (/cm)", "Weave", "Air perm. (CFM)", "Thickness (mm)", "Weight (g/m²)", "Tensile (N/cm)"], "rows": [["610D", "PET 0.33 / 0.5 blue", "40 / 11.5", "5/1 satin", "205–218", "1.16", "870", "1604"], ["620", "PET 0.2+0.35 / 0.23+0.32", "52+13 / 27", "3/1 + 2/2", "306–640", "1.43", "796", "1231"], ["620A", "PET 0.2+0.35 / 0.4+600D", "52+13 / 27", "3/1 + 2/2", "50–54", "1.27", "776", "1099"], ["623A", "PET 0.48 orange / 0.5 white", "27.5 / 18.5", "6/2 satin", "100–150", "1.83", "1448", "1543"], ["3356", "PET 0.35 / 0.5 blue", "27 / 12", "5/1 satin", "292", "1.1", "816", "1159"], ["008MD", "PP — 8 µm rating", "192 / 54", "Double layer", "13–20", "0.85", "560", "5500"], ["030MD", "PP — 30 µm rating", "192 / 54", "Double layer", "38–43", "0.9", "560", "5500"], ["120D", "PP — 120 µm rating", "140 / 57", "Plain", "333–366", "1.18", "510", "5000"]]}, paramsSPD: null, paramsSPP: null,
    custom: true,
    related: ["press-fabric", "press-belt", "products/square-mesh"],
    faqs: [["617 or 623 for FGD gypsum — which should I choose?", "617 is the economical FGD workhorse: a multifilament weft gives low permeability (33–41 CFM) for gypsum and fly-ash slurries. 623 upgrades it — 100% monofilament surface with the multifilament hidden on the back — for better cake release, better scraper-wear resistance and longer life; the trade-off is a thicker fabric that a few close-clearance filters won't take. We help you compare on total cost per tonne."], ["Do you supply fabrics for vacuum disc filters?", "Yes — we cut and seam vacuum filter fabrics to fit disc filter sectors, and drum filter panels, in custom sizes for every model."], ["Can vacuum filter belts be made endless?", "Yes. Horizontal vacuum belt filter fabrics can be supplied endless or with pin/spiral seams, with sealed or reinforced edges."], ["How do I match cloth to my cake?", "Fine cakes need tighter weaves for clear filtrate; coarse, free-draining cakes reward open monofilament weaves for capacity. We select weave and CFM from your particle size and loading."], ["Do you supply to common OEM filter brands?", "Yes — our fabrics are dimensioned to fit the common horizontal belt, disc and drum filter platforms; tell us the machine model and we cut to it."]],
    specs: ["Materials: polyester (PET), polypropylene (PP), PVDF options", "Custom sizes for every belt and disc filter", "Seam: pin seam or endless", "Edges: sealed, welded or reinforced", "OEM/ODM: available"],
    apps: ["Power plant FGD gypsum dewatering on vacuum belt filters", "Phosphoric acid and chemical process filtration", "Mining plant filtration — concentrates and tailings on vacuum disc / drum filters"],
  },
  {
    slug: "press-fabric", name: "Press Filter Fabric", h1: "Press Filter Fabric (Filter Cloth)",
    title: "Press Filter Fabric | Frame and Membrane Press | Aurora Filtech",
    desc: "Press filter fabrics for frame press filters, membrane presses, drum, disc and leaf filters. Oil, mining, lithium phosphate and sludge dewatering.",
    card: { h2: "PRESS FILTER FABRIC", img: "/qfy-content/uploads/2019/09/d4f377239978d23c7b1098681b945ba0.jpg", w: 671, h: 386, alt: "Frame press filter with press filter fabric for sludge dewatering", caption: "Press filter fabrics for frame press filters, membrane press filters, drum, disc and leaf filters — oil, mining, lithium phosphate filtration and sludge dewatering.", first: "Press filter fabrics for frame press filters, membrane press filters and drum, disc or leaf filters.",
      equipment: ["Frame press filter", "Membrane press filter", "Drum / Disc / Leaf filter"], applications: ["Oil filtration", "Mining filtration", "Lithium phosphate filtration", "Sludge dewatering"] },
    jsonldId: "press-fabric", imageId: "image-press-fabric",
    altNames: ["Press fabric", "Filter cloth", "Filter press cloth", "Membrane filter fabric", "Frame press filter fabric", "Drum filter fabric"],
    keywords: "press filter fabric, filter press cloth, filter cloth selection, frame press cloth, membrane filter press fabric, sludge dewatering cloth, lithium phosphate filtration cloth",
    category: "Industrial filter fabrics",
    pdesc: "Press filter fabrics and filter cloths for frame press filters, membrane press filters, drum, disc and leaf filters — oil, mining, lithium phosphate filtration and sludge dewatering.",
    banner: {"url": "/qfy-content/uploads/live/pressfabric-dc4e3b5377d3d0f15ffd465b29b79700.jpg", "alt": "Press filter cloth running on a frame filter press", "caption": "PF cloth in service on a frame filter press.", "w": 1920, "h": 834, "maxW": 1920},
    gallery: [{"url": "/qfy-content/uploads/live/pressfabric-dc4e3b5377d3d0f15ffd465b29b79700.jpg", "w": 1640, "h": 714, "alt": "Press filter cloth running on a frame filter press", "caption": "PF cloth in service on a frame filter press."}, {"url": "/qfy-content/uploads/pf/pf-cotton.jpg", "w": 1200, "h": 675, "alt": "Cotton press filter cloth for food-grade oil pressing duties", "caption": "Cotton cloth — food-grade pressing."}, {"url": "/qfy-content/uploads/pf/pf-mono.jpg", "w": 1182, "h": 887, "alt": "Monofilament press filter cloth, cleaner cake discharge and longer life than multifilament", "caption": "Monofilament cloth — cleaner discharge, longer life."}, {"url": "/qfy-content/uploads/pf/pf-vertical.jpg", "w": 474, "h": 266, "alt": "Vertical automatic tower press filter with vertically stacked horizontal chambers", "caption": "The vertical tower press — walking cloth, up to 16 bar."}, {"url": "/qfy-content/uploads/pf/pf-site1.jpg", "w": 1200, "h": 900, "alt": "1.5 metre wide press filter cloth in service on a customer press, view 1", "caption": "Case — 1.5 m wide cloth on the customer press."}],
    sections: [{h:"Vertical press filters — the cloth that has to walk",html:"<p>The vertical automatic press (Larox-type tower press) runs one continuous cloth zigzagging through the whole plate pack — a walking cloth up to ~55 m long, squeezed at up to 16 bar and washed every cycle. Dimensional stability, precise sealing edges and clean cake release are built into our weave for this duty.</p>"},{h:"Filters our cloths serve",html:"__UL_START__[\"Frame (chamber) plate presses\",\"Membrane plate presses\",\"Drum, disc and leaf filters\",\"Vertical tower presses (Larox type)\"]__UL_END__"},{h:"Case — 1.5 m wide cloth in service",html:"<p>Woven wide so the cloth covers the full plate pack with minimal joints — more filtering area, fewer potential leak paths, faster fitting.</p>"}],
    paramsData: {"caption": "Aurora PF filter cloths — factory test data (air permeability at 125 Pa)", "head": ["Model", "Yarn family", "Air perm. (CFM)", "Thickness (mm)", "Weight (g/m²)", "Tensile (N/cm)"], "rows": [["Z223-PP", "Monofilament PP", "30", "0.74", "431", "775"], ["Z3232-PP", "Monofilament PP (open)", "346", "0.80", "380", "829"], ["Z1616-PP", "Monofilament PP (dense)", "6", "0.44", "289", "908"], ["Z53-PP", "Monofilament PP (fine)", "25", "0.39", "288", "592"], ["Z1820-PA", "Monofilament PA", "68", "0.87", "500", "980"], ["Z2230-PET", "Monofilament PET (open)", "370", "0.60", "383", "780"], ["Z600-PP", "Multifilament PP", "42", "0.65", "328", "850"], ["Z21213-PP", "Multifilament PP (dense)", "3", "0.94", "613", "1200"], ["Z1584-PP", "Mono + multifilament PP", "15", "0.70", "405", "746"], ["Z40150-99", "Mono + multifilament (heavy)", "2", "1.38", "819", "2000"]]}, paramsSPD: null, paramsSPP: null,
    custom: true,
    related: ["press-belt", "vacuum-fabric", "products/square-mesh"],
    faqs: [["How do I choose a filter press cloth?", "Start from your filter type, particle size and chemistry: monofilament weaves release cakes easily and resist blinding; multifilament and staple weaves give finer retention; combination weaves balance both. We recommend per slurry."], ["What is the difference between monofilament and multifilament cloth?", "Monofilament cloth is woven from single smooth yarns — best cake release and blinding resistance. Multifilament cloth uses twisted yarn bundles — finer filtration and clearer filtrate, at the cost of harder cake release."], ["Do you supply cloths for membrane filter presses?", "Yes — including centrate drainage designs and seal edges for membrane plates."], ["Can the cloths be made seamless?", "Barrel-neck and seamless cloths are available for full-plate designs on request."], ["What micron ratings are available?", "From around 1 µm (needled) to 200 µm (open monofilament) — we quote a rating per weave after seeing your particle distribution."], ["Which material for lithium phosphate duty?", "PP and PET cloths are typical; PVDF where temperature and chemistry demand. Send us pH and temperature for a recommendation."]],
    specs: ["Materials: PET, PP, PA, PVDF", "Weaves: plain, twill, satin; mono-filament, multi-filament and staple yarn", "Filter ratings from 1 to 200 microns", "Custom cut & sewn to your plate size", "OEM/ODM: available"],
    apps: ["Frame and membrane filter presses — sludge dewatering and lithium phosphate", "Drum, disc and leaf filters — mining and oil filtration", "Chemical and food process filtration"],
  },
  {
    slug: "press-belt", name: "Press Filter Belt", h1: "Press Filter Belt (Dewatering Belt)",
    title: "Press Filter Belt | Dewatering Belts | Aurora Filtech",
    desc: "Press filter belts for belt press filters. Sludge dewatering, sand washing, juice and palm oil squeezing. Reinforced seams, custom lengths.",
    card: { h2: "PRESS FILTER BELT", img: "/qfy-content/uploads/2019/09/a6367e490f2e5ab99344dcb378e531e9.jpg", w: 671, h: 386, alt: "Belt press filter with press filter belt for sludge dewatering", caption: "Press filter belts (dewatering belts) for belt press filters — sludge dewatering, sand washing, juice squeezing and palm oil squeezing.", first: "Press filter belts built for belt press filters — designed for long service life under high squeeze pressure.",
      equipment: ["Belt press filter"], applications: ["Sludge dewatering", "Sand washing", "Juice squeezing", "Palm oil squeezing"] },
    jsonldId: "press-belt", imageId: "image-press-belt",
    altNames: ["Press belt", "Dewatering belt", "Belt press filter belt", "Belt press cloth"],
    keywords: "press filter belt, dewatering belt, belt press filter belt, sludge dewatering belt, belt press cloth, sand washing belt, juice pressing belt, spiral press filter belt",
    category: "Industrial filter fabrics",
    pdesc: "Press filter belts (dewatering belts) for belt press filters in sludge dewatering, sand washing, juice squeezing and palm oil squeezing. Reinforced seams, custom lengths.",
    banner: {"url": "/qfy-content/uploads/live/pressbelt-g7.jpg", "alt": "Press belt header strip from the production line, wide belt ready for finishing", "caption": "PB press belts on the production line.", "w": 800, "h": 213, "maxW": 800},
    gallery: [{"url": "/qfy-content/uploads/live/pressbelt-g7.jpg", "w": 800, "h": 213, "alt": "Press belt header strip from the production line, wide belt ready for finishing", "caption": "PB press belts on the production line."}, {"url": "/qfy-content/uploads/df/pb-656.jpg", "w": 500, "h": 350, "alt": "656 PA nylon press mesh for pulp dewatering, hot alkaline duties", "caption": "656 — PA nylon for pulp dewatering."}, {"url": "/qfy-content/uploads/df/joint-double-loop.jpg", "w": 500, "h": 350, "alt": "Double self-loop interlocked seam on a press belt", "caption": "Double self-loop seam — strong and flexible."}, {"url": "/qfy-content/uploads/df/pb-press3.jpg", "w": 1066, "h": 800, "alt": "Belt press filter in operation with PB dewatering belts running", "caption": "A belt press filter in operation."}],
    sections: [{h:"The belts — woven constructions",html:"<p>601 (2/1 twill, 433 CFM), 608 (3/2 satin, 510 CFM), 613 (2/2 twill, 633 CFM), 626 for fine-particle duties, 656 PA nylon for pulp dewatering (outlasts competing nylon cloths by 2x), and the SP-P spiral family with filler yarns — also in PTFE-added non-stick, high-temperature PPS and hydrolysis-resistant grades.</p>"},{h:"Joints — reinforced for the press",html:"<p>Clipper splice for fast on-site fitting, double self-loop interlocked seams, or truly endless weaving — matched to the machine.</p>"}],
    paramsData: {"caption": "Aurora PB woven press belts — factory test data (max width 6000 mm)", "head": ["Model", "Warp yarn (mm)", "Weft yarn (mm)", "Warp/Weft dens. (/cm)", "Weave", "Air perm. (CFM)", "Thickness (mm)", "Weight (g/m²)", "Tensile (N/cm)"], "rows": [["601", "PET 0.68 white", "PET 0.9 white", "16 / 5", "2/1 twill", "433", "2.02", "1476", "1366"], ["603", "PET 0.5 white", "PET 0.8 white", "24 / 7.3", "6/2 satin", "478", "1.85", "1310", "1282"], ["604", "PET 0.5 white", "PET 0.7 white", "24 / 9", "6/2 satin", "341", "1.80", "1280", "1306"], ["608", "PET 0.65 white", "PET 1.0 red", "18 / 5.5", "3/2 satin", "510", "2.23", "1588", "1786"], ["613", "PET 0.7 white", "PET 0.9 white", "16 / 4.5", "2/2 twill", "633", "2.20", "1405", "1604"], ["626", "PET 0.5 white", "PET 1.0 red", "24 / 6.7", "6/2 satin", "457", "2.15", "1657", "1370"], ["701", "PA 0.5", "PA 0.95", "25 / 6.5", "3/2 satin", "360", "2.05", "1428", "1356"]]}, paramsSPD: null, paramsSPP: null,
    custom: true,
    related: ["spiral-belt", "press-fabric", "vacuum-fabric"],
    faqs: [["What is a dewatering belt?", "A dewatering belt is the press filter belt that runs on a belt press filter: it drains water through its openings while withstanding high squeeze pressure between the press rollers."], ["Which belt permeability do I need?", "Coarser, more permeable belts suit the gravity drainage zone; tighter weaves suit the high-pressure pressing zone. We select permeability per press zone and material."], ["Are reinforced seams available?", "Yes — reinforced seams extend belt life under high squeeze pressure; stainless steel clipper seams are available on request."], ["Spiral or woven belt — which one?", "Spiral belts (with filler yarns) resist heavy squeeze and release cakes well; woven belts give a smoother surface and finer retention. See our spiral press filter belt page for the spiral option."], ["Do you supply food-juice pressing belts?", "Yes — food-grade PET weaves for juice and fruit squeezing presses, with endless or pin seams."]],
    specs: ["Material: polyester (PET) monofilament", "Seam: reinforced pin seam (stainless steel clipper on request)", "Permeability range: wide selection by dewatering stage", "Edges: sealed, welded or reinforced", "Widths and lengths: custom", "OEM/ODM: available"],
    apps: ["Municipal and industrial sludge dewatering belt presses", "Sand washing and aggregate plants", "Fruit juice squeezing and palm oil squeezing presses"],
  },
  {
    slug: "products/filter-bag", name: "Filter Bag", h1: "Filter Bag (Dust Collector Bag)",
    title: "Filter Bag | Dust Collector Bags | Aurora Filtech",
    desc: "Dust filter bags for bag filters and dust collectors in power plants and cement plants. PET, PPS, Nomex and PTFE options.",
    card: { h2: "FILTER BAG", img: "/qfy-content/uploads/2019/09/45a34d52de579ededcbaa17342a7bba5.jpg", w: 671, h: 386, alt: "Dust filter bags inside a baghouse dust collector", caption: "Dust filter bags for bag filters and dust collectors — power plant and cement plant applications.", first: "Dust filter bags for bag filters and dust collectors in power plants and cement plants.",
      equipment: ["Bag filter", "Dust collector"], applications: ["Power plant", "Cement plant"] },
    jsonldId: "products-filter-bag", imageId: "image-products-filter-bag",
    altNames: ["Dust filter bag", "Dust collector bag", "Bag filter", "Baghouse filter bag", "Filter bag for dust collector"],
    keywords: "filter bag, dust filter bag, dust collector bag, baghouse filter bag, PPS filter bag, Nomex filter bag, PET filter bag, power plant baghouse, cement plant dust collector",
    category: "Industrial filter fabrics",
    pdesc: "Dust filter bags for bag filters and dust collectors in power plants and cement plants. PET, PPS, Nomex, P84 and PTFE felt options with membrane and anti-static finishes.",
    banner: {"url": "/qfy-content/uploads/live/filterbag-f.jpg", "alt": "Dust filter bags in a baghouse", "caption": "Dust filter bags in a baghouse.", "w": 800, "h": 386, "maxW": 800},
    gallery: [],
    sections: [],
    paramsData: {"caption": "Aurora BG series — typical media (values to be confirmed per application)", "head": ["Media", "Weight (g/m²)", "Cont. temp (°C)", "Chemistry", "Typical duty"], "rows": [["PET (polyester)", "450–550", "130", "General, dry", "Cement, steel, generic dust"], ["PPS (ryton)", "500–600", "160", "Sulphur / moisture resistant", "Coal-fired power baghouses"], ["Nomex (m-aramid)", "500–600", "180–200", "Dry heat", "Asphalt, cement kiln"], ["PTFE membrane on PPS/PET", "550–650", "160 / 130", "Fine emission limits", "PM limits < 10 mg/Nm³"]]}, paramsSPD: null, paramsSPP: null,
    custom: true,
    related: ["products/filter-cartridge", "press-fabric"],
    faqs: [["Which filter bag material suits a coal-fired power plant?", "PPS felt bags are the standard for coal-fired baghouses, offering sulphur and heat resistance. PTFE-membrane PPS bags are used where finer emission limits apply."], ["How do I select dust collector filter bags?", "Match media to gas temperature, moisture and chemistry first, then to emission limits: PET for dry generic dust, PPS for acidic coal flue gas, Nomex for dry heat, membrane laminates for strict PM limits."], ["Do you make custom bag sizes?", "Yes — every dust filter bag is sewn to your tube sheet diameter and length, with snap-band, flange or ring tops."], ["Are anti-static filter bags available?", "Yes — anti-static felt bags (carbon-scrim / conductive yarn) for explosive dust applications."], ["What is the difference between singed and membrane finish?", "Singed surfaces improve cake release cheaply; PTFE membrane laminates capture fine dust on the surface and serve the strictest emission limits."]],
    specs: ["Materials: PET, PPS, Nomex, P84, PTFE", "Weights: 350–800 g/m²", "Finish: singed, calendared, PTFE membrane, anti-static", "Sizes: custom to your tube sheet", "Tops: snap-band, flange or ring; triple-stitched seams", "OEM/ODM: available"],
    apps: ["Power plant baghouses — coal-fired and biomass FGD dust collection", "Cement plant bag filters — kiln, raw mill and cement mill dedusting", "Steel, chemical and general industrial dust collection"],
  },
  {
    slug: "products/filter-cartridge", name: "Filter Cartridge", h1: "Filter Cartridge (Cartridge Filter)",
    title: "Filter Cartridge | Air, Water and Oil Cartridges | Aurora Filtech",
    desc: "Industrial filter cartridges for air, water and oil filtration. Anti-static, PTFE, PPS, cellulose and Nomex series.",
    card: { h2: "FILTER CARTRIDGE", img: "/qfy-content/uploads/2023/02/3aacdceeba645c1a58a832b60137c3b7.jpg", w: 442, h: 401, alt: "Industrial filter cartridge for air, water and oil filtration", caption: "Filter cartridges for air filtration, water filtration and oil filtration.", first: "Filter cartridges for air, water and oil filtration systems — anti-static, PTFE, PPS, cellulose and Nomex series available.",
      equipment: ["Air filter", "Water filter", "Oil filter"], applications: ["Air filtration", "Water filtration", "Oil filtration"] },
    jsonldId: "products-filter-cartridge", imageId: "image-products-filter-cartridge",
    altNames: ["Cartridge filter", "Air filter cartridge", "Oil filter cartridge", "Water filter cartridge", "Dust collector cartridge"],
    keywords: "filter cartridge, cartridge filter, air filter cartridge, dust collector cartridge, water filter cartridge, oil filter cartridge, PTFE cartridge, PPS cartridge, Nomex cartridge",
    category: "Industrial filter fabrics",
    pdesc: "Industrial filter cartridges for air, water and oil filtration systems. Anti-static, PTFE, PPS, cellulose and Nomex series with matched end caps and gaskets.",
    banner: {"url": "/qfy-content/uploads/live/cartridge-f.jpg", "alt": "Industrial filter cartridges for air, water and oil", "caption": "Industrial filter cartridges for air, water and oil.", "w": 693, "h": 309, "maxW": 693},
    gallery: [{"url": "/qfy-content/uploads/live/cartridge-ef0c498fdcbafdffb7218ce71b4da62a.jpg", "w": 1640, "h": 732, "alt": "Filter cartridge range lined up, from cellulose to PTFE membrane series", "caption": "The Aurora cartridge range — seven series."}, {"url": "/qfy-content/uploads/live/cartridge-0e225dccecd7ce6eca62b7930d9d6964.jpg", "w": 602, "h": 801, "alt": "PTFE membrane coated PET filter cartridge for sub-micron dust", "caption": "PTFE-membrane PET — the flagship, 99.99%+ efficiency."}, {"url": "/qfy-content/uploads/live/cartridge-6cba53c0be68a084572efd4e5139a53b.jpg", "w": 793, "h": 1181, "alt": "Cellulose pleated filter cartridge with wide pleat design", "caption": "Cellulose series — wide pleats, large filtration surface."}],
    sections: [{h:"The series",html:"__UL_START__[\"Anti-static series — conductive ALU coating; 90 °C moist / 120 °C dry\",\"Waterproof and anti-oil series — wet, oily dust at high concentration\",\"Flame-retardant series — EU grade, for welding, cutting, grinding\",\"Spun-bonded PET — galvanized caps, chlorine-rubber gasket\",\"Spun-bonded PET + PTFE membrane — 99.99%+, EPA (PM2.5/MACT/NESHAP)\",\"Cellulose series — wide pleats, turbines and compressors\",\"High-temperature series — PPS (Ryton) / Nomex, to 190 °C\"]__UL_END__"}],
    paramsData: {"caption": "Aurora CT series — typical media (values to be confirmed per application)", "head": ["Media", "Rating (µm)", "Temp (°C)", "Finish", "Typical duty"], "rows": [["Cellulose / polyester pleated", "1–100", "80 / 130", "Standard", "General dust, intake air"], ["PTFE membrane polyester", "0.5–5 surface", "130", "Water/oil-repellent", "Fine dust, strict emissions"], ["PPS / Nomex pleated", "1–50", "160 / 190", "Standard", "Hot flue gas dust"], ["Water/oil process media", "0.5–50", "per media", "NSF options", "Water & oil systems"]]}, paramsSPD: null, paramsSPP: null,
    custom: true,
    related: ["products/filter-bag", "press-fabric"],
    faqs: [["Which cartridge media suits hot flue gas dust collection?", "PPS and Nomex cartridges handle higher temperatures; PTFE-membrane polyester serves the finest emissions at moderate temperature. We recommend per gas condition."], ["Do cartridges fit standard housings?", "Yes — cartridges are made to standard and custom housing sizes, with matched end caps and gaskets."], ["Are anti-static cartridges available?", "Yes — anti-static series cartridges prevent static discharge in explosive-dust applications."], ["Cartridge or bag — which for my dust collector?", "Cartridges give more filter area in the same housing and suit fine, dry dust; bags handle higher dust loads and heavier duty. Ask us to compare on your loading."]],
    specs: ["Media: cellulose, polyester, PTFE membrane, PPS, Nomex", "Series: anti-static, water-repellent, oil-repellent finishes", "Ratings from 0.5 to 100 microns", "Sizes: custom to your housing", "End caps: galvanised or stainless steel; gasket options", "OEM/ODM: available"],
    apps: ["Air filtration — dust collector cartridge filters and intake air", "Water filtration — process and circulating water cartridges", "Oil filtration — hydraulic and lubrication oil cartridge filters"],
  },
  {
    slug: "products/square-mesh", name: "Polyester Square Mesh", h1: "Polyester Square Mesh (Plain Weave)",
    title: "Polyester Square Mesh | Square Weave Mesh Belts | Aurora Filtech",
    desc: "Polyester monofilament square mesh, plain weave — 0.4–2.1 mm apertures, up to 1750 CFM. Custom-woven belts and sieve cloth for food, wood panel and biomass duties.",
    card: { h2: "SQUARE MESH", img: "/qfy-content/uploads/df/sq-sem.jpg", w: 1400, h: 1050, alt: "Electron microscope close-up of polyester square mesh showing uniform woven openings", caption: "Polyester square mesh, plain weave — 0.4–2.1 mm apertures, custom-woven belts and sieve cloth.", first: "Custom-woven square mesh belts and sieve cloth — flat, stable, apertures and materials to your spec.",
      equipment: ["Belt dryers", "Vibrating sifters"], applications: ["Food drying", "Wood flour sieving"] },
    jsonldId: "products-square-mesh", imageId: "image-products-square-mesh",
    altNames: ["Square weave mesh", "Plain weave mesh", "Polyester monofilament mesh", "Square opening mesh", "PET square mesh", "Tetoron mesh"],
    keywords: "polyester square mesh, plain weave mesh, square weave polyester mesh, monofilament square mesh, PET square mesh, screening mesh, sifter mesh, mesh belt, wood flour sieving mesh",
    category: "Industrial filter fabrics",
    pdesc: "Polyester monofilament square mesh (plain weave, square weave) from 40 to 200 mesh count — fine mesh conveyor belts for wood panel and biomass drying, and screening/sifting mesh for wood flour and WPC.",
    banner: {"url": "/qfy-content/uploads/live/squaremesh-f.jpg", "alt": "Polyester dryer screen mesh in square weave", "caption": "Polyester square weave screen mesh.", "w": 500, "h": 350, "maxW": 500},
    gallery: [{"url": "/qfy-content/uploads/df/sq-sem.jpg", "w": 1400, "h": 1050, "alt": "Electron microscope close-up of blue polyester square mesh showing uniform woven openings", "caption": "Blue square mesh, SEM view — uniform square openings."}, {"url": "/qfy-content/uploads/df/sq-white.jpg", "w": 1200, "h": 900, "alt": "White polyester plain weave square mesh belt with even square openings", "caption": "White plain-weave square mesh."}, {"url": "/qfy-content/uploads/df/joint-loop.jpg", "w": 500, "h": 350, "alt": "Self-loop seam woven from the mesh's own yarns on a square mesh belt", "caption": "Self-loop seam — the standard join."}, {"url": "/qfy-content/uploads/df/sq-fruit.jpg", "w": 1200, "h": 900, "alt": "Dried vegetables resting on a square mesh belt in a food drying line", "caption": "Food duty — dried vegetables on a square mesh belt."}],
    sections: [{h:"Custom-woven, flat and stable",html:"__UL_START__[\"Aperture — any square opening from fine support meshes to coarse 2 mm+ belts\",\"Yarn diameter — thicker for wear life, finer for open area\",\"Material — PET standard; PPS, PTFE-added and other monofilaments on request\",\"High flatness — heat-set finishing, no waviness across the belt width\",\"Structurally stable — the 1/1 weave locks every yarn; no loosening in service\"]__UL_END__"},{h:"Seams",html:"<p>Self-loop seam (the standard join), reinforced spiral loop, clipper joint on request, or truly endless weaving.</p>"}],
    paramsData: {"caption": "Aurora SM square mesh belts — factory test data (max width 6000 mm)", "head": ["Model", "Aperture (µm)", "Yarn (mm)", "Warp/Weft dens. (/cm)", "Air perm. (CFM)", "Thickness (mm)", "Weight (g/m²)", "Tensile (N/cm)"], "rows": [["622", "400 × 400", "PET 0.5 white", "9 / 9", "650", "0.9", "677", "1050"], ["600×650", "600 × 650", "PET 0.65 white", "3 / 3.2", "730", "1.2", "732", "1028"], ["800×600", "800 × 600", "PET 0.65 white", "4.6 / 5.4", "870", "1.3", "685", "1029"], ["800×800", "800 × 800", "PET 0.8 white", "5.6 / 6.1", "767", "1.4", "872", "860"], ["800×1200", "800 × 1200", "PET 0.8 white", "4.6 / 6.0", "752", "1.38", "849", "910"], ["1100×1100", "1100 × 1100", "PET 0.8 white", "7 / 6.6", "1192", "1.47", "809", "812"], ["1300×1600", "1300 × 1600", "PET 0.8 white", "4.6 / 4.0", "1477", "1.68", "656", "1042"], ["2000×2000", "2000 × 2000", "PET 1.0 white", "7 / 7.5", "1750", "1.9", "769", "930"], ["621", "2100 × 2100", "PET 0.9 / 1.0 white", "3 / 3", "1726", "1.65", "695", "580"]]}, paramsSPD: null, paramsSPP: null,
    custom: true,
    related: ["dryer-fabric", "spiral-belt", "vacuum-fabric"],
    faqs: [["Mesh, screen or fabric — what is the difference?", "Mesh refers to the woven structure and its opening count; screen means the whole sieve surface fitted to a machine; fabric is the woven goods. In practice: fine round-sifter duties say sieve/sifter mesh, heavier duties say screen mesh, belt duties say mesh belt — we cover all three wordings."], ["What mesh count do I need for wood flour?", "WPC wood flour is typically classified on 40–140 mesh screens (60 and 80 mesh the common cuts). Our standard square mesh belts cover 0.4–2.1 mm apertures for drying and conveying; finer sifting meshes are woven on request — tell us your cut points."], ["Can polyester square mesh replace stainless steel mesh?", "On dry, low-abrasion duties (wood flour, fines sifting) woven PET mesh lasts well at a fraction of the cost, with lighter frames and quieter running. Heavy, wet or abrasive duties still favour steel."], ["Do you supply belts and cut panels?", "Both — seamed or endless belts for dryers and conveyors, and panels cut and edged to your sifter frame (including re-mesh for circular sifters)."], ["Do you weave for OEM mesh houses?", "We are a former OEM weaver for European mesh brands — same tolerances, available direct."]],
    specs: ["Weave: plain (1/1), all-PET monofilament", "Standard apertures: 400–2100 µm (models listed above); finer sifting meshes on request", "Air permeability: 650–1750 CFM standard", "Forms: belts (seamed/endless) or panels cut to your frame", "Edges: sealed, welded or reinforced", "OEM/ODM: available"],
    apps: ["Fine mesh belts — wood panel, pellet & biomass drying (see wood panel mesh belts)", "Screening & sifting — wood flour, WPC fines (see wood flour sifting)", "Food, chemical and general purpose sieve cloth"],
  },
];

const bySlug = Object.fromEntries(products.map(p => [p.slug, p]));
const nameOf = s => (bySlug[s] ? bySlug[s].name : s.split("/").pop().replace(/-/g," ").replace(/\w/g, c => c.toUpperCase()));
const urlOf = s => `${BASE}/${s.replace(/^\/?/, "")}/`;

// ============================ V3 DESIGN LAYER ============================
// Style: "aurora gradient" — airy near-white base, teal→blue→violet aurora
// accents, floating glass pill nav, centered hero, bento product grid
// (mixed wide/narrow cards), pill spec chips, gradient-hairline cards.

const CSS = `
:root{
  --bg:#FBFBFD; --surface:#FFFFFF; --ink:#232A40; --mute:#5D6480;
  --line:#E7E8F0;
  --teal:#0FA89B; --blue:#4F7CF7; --violet:#8B5CF6;
  --grad:linear-gradient(100deg,#0FA89B,#4F7CF7 48%,#8B5CF6);
  --grad-soft:linear-gradient(100deg,rgba(15,168,155,.12),rgba(79,124,247,.12),rgba(139,92,246,.14));
  --r-lg:24px; --r-md:16px;
  --shadow:0 16px 44px rgba(35,42,64,.10);
  --shadow-sm:0 6px 18px rgba(35,42,64,.07);
  --sans:"Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",Arial,sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--sans);background:var(--bg);color:var(--ink);font-size:16.5px;line-height:1.7}
a{color:var(--blue);text-decoration:none}
a:hover{text-decoration:underline}
img{display:block;max-width:100%;height:auto}
.wrap{max-width:1200px;margin:0 auto;padding:0 24px}
.g-text{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.kicker-chip{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--teal);background:var(--grad-soft);border:1px solid rgba(79,124,247,.18);border-radius:999px;padding:7px 16px}
.kicker-chip::before{content:"";width:7px;height:7px;border-radius:50%;background:var(--grad)}

/* floating glass pill nav */
.topbar{position:sticky;top:14px;z-index:60;padding:0 24px;margin-top:14px}
.pillnav{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.78);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(35,42,64,.08);border-radius:999px;box-shadow:var(--shadow-sm);padding:10px 14px}
.pillnav .brand{display:flex;align-items:center;gap:10px;font-weight:800;font-size:1.08rem;color:var(--ink);margin-right:8px}
.pillnav .menu{display:flex;align-items:center;gap:2px;margin-left:auto}
.pillnav .menu>a,.pillnav .menu>.pm>a{display:inline-block;padding:9px 15px;border-radius:999px;font-size:13.5px;font-weight:600;color:var(--mute)}
.pillnav .menu>a:hover,.pillnav .menu>.pm>a:hover{background:rgba(79,124,247,.10);color:var(--ink);text-decoration:none}
.pm{position:relative}
.pm .pop{display:none;position:absolute;top:calc(100% + 10px);right:0;min-width:270px;background:var(--surface);border:1px solid var(--line);border-radius:18px;box-shadow:var(--shadow);padding:10px}
.pm:hover .pop{display:block}
.pm .pop a{display:block;padding:9px 14px;border-radius:10px;font-size:14px;font-weight:600;color:var(--ink)}
.pm .pop a:hover{background:rgba(79,124,247,.08);text-decoration:none}
.pillnav .cta{background:var(--grad);color:#fff;border-radius:999px;padding:10px 20px;font-size:13.5px;font-weight:700}
.pillnav .cta:hover{filter:brightness(1.06);text-decoration:none}
.burger3{display:none;margin-left:auto;border:1px solid var(--line);background:#fff;border-radius:999px;padding:9px 16px;font:inherit;font-weight:700;cursor:pointer}

/* hero */
.hero3{position:relative;text-align:center;padding:76px 0 66px;overflow:hidden}
.hero3 .blob{position:absolute;border-radius:50%;filter:blur(70px);opacity:.5;pointer-events:none}
.hero3 .b1{width:420px;height:420px;background:rgba(15,168,155,.28);top:-140px;left:-80px}
.hero3 .b2{width:380px;height:380px;background:rgba(139,92,246,.24);top:-100px;right:-60px}
.hero3 .b3{width:300px;height:300px;background:rgba(79,124,247,.22);bottom:-160px;left:38%}
.hero3 h1{font-size:clamp(2.4rem,5vw,4rem);font-weight:800;letter-spacing:-.03em;line-height:1.06;margin:22px auto 18px;max-width:14em}
.hero3 .lede{color:var(--mute);font-size:1.12rem;max-width:34em;margin:0 auto}
.hero3 .cta{margin-top:32px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
.btn{display:inline-block;padding:15px 34px;border-radius:999px;font-weight:700;font-size:15px}
.btn-grad{background:var(--grad);color:#fff;box-shadow:0 10px 26px rgba(79,124,247,.35)}
.btn-grad:hover{filter:brightness(1.06);text-decoration:none}
.btn-line{border:1.5px solid rgba(35,42,64,.22);color:var(--ink);background:rgba(255,255,255,.6)}
.btn-line:hover{border-color:var(--ink);text-decoration:none}
.hero3 .stage{position:relative;margin:54px auto 0;max-width:980px;border-radius:var(--r-lg);padding:10px;background:var(--grad);box-shadow:var(--shadow)}
.hero3 .stage figure{border-radius:calc(var(--r-lg) - 6px);overflow:hidden;background:#fff}
.hero3 .stage img{width:100%;height:auto;aspect-ratio:2048/772;object-fit:cover}
.hero3 .stage figcaption{font-size:.85rem;color:var(--mute);padding:13px 8px;background:#fff}
.hero3 .stats{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;margin-top:34px}
.hero3 .stats .s{display:flex;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:10px 22px;box-shadow:var(--shadow-sm)}
.hero3 .stats b{font-size:1.25rem;font-weight:800}
.hero3 .stats span{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--mute)}

/* sections */
.sec3{padding:84px 0}
.sec3-head{text-align:center;max-width:700px;margin:0 auto 46px}
.sec3-head h2{font-size:clamp(1.7rem,3.2vw,2.3rem);font-weight:800;letter-spacing:-.02em;margin:16px 0 12px}
.sec3-head p{color:var(--mute)}

/* why: gradient-washed panel */
.why3{background:var(--grad-soft);border-radius:var(--r-lg);position:relative}
.why3 .inner{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;padding:16px}
.why3 .shot{border-radius:var(--r-md);overflow:hidden;border:6px solid #fff;box-shadow:var(--shadow-sm)}
.why3 .shot img{width:100%;height:auto;object-fit:cover}
.why3 .shot figcaption{font-size:.83rem;color:var(--mute);padding:10px 14px;background:#fff}
.why3 h2{font-size:clamp(1.6rem,3vw,2.15rem);font-weight:800;letter-spacing:-.02em;margin:14px 0}
.why3 p{color:var(--mute)}
.feat3{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:24px}
.feat3 .f{background:rgba(255,255,255,.85);border:1px solid rgba(255,255,255,.9);border-radius:var(--r-md);padding:15px 17px;box-shadow:var(--shadow-sm)}
.feat3 .f i{font-style:normal;display:inline-flex;width:34px;height:34px;border-radius:11px;background:var(--grad);color:#fff;font-size:.8rem;font-weight:800;align-items:center;justify-content:center;margin-bottom:9px}
.feat3 .f b{display:block;font-size:.98rem}
.feat3 .f span{font-size:.85rem;color:var(--mute)}

/* bento grid: wide cards alternate with narrow */
.bento{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.bcard{background:var(--surface);border:1px solid var(--line);border-radius:var(--r-lg);overflow:hidden;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;transition:transform .25s,box-shadow .25s}
.bcard:hover{transform:translateY(-5px);box-shadow:var(--shadow)}
.bcard figure{position:relative;overflow:hidden;aspect-ratio:671/386;background:#F1F2F7}
.bcard figure img{width:100%;height:100%;object-fit:cover}
.bcard figure figcaption{position:absolute;inset:auto 0 0 0;background:linear-gradient(transparent,rgba(20,26,44,.82));color:#fff;font-size:.78rem;line-height:1.45;padding:36px 16px 12px}
.bcard .body{padding:20px 22px 24px;display:flex;flex-direction:column;gap:10px;flex:1}
.bcard h3{font-size:1.14rem;font-weight:800;letter-spacing:-.01em}
.bcard h3 a{color:var(--ink)}
.bcard h3 a:hover{color:var(--blue)}
.bcard .first{font-size:.9rem;color:var(--mute)}
.bcard .mini{display:flex;flex-wrap:wrap;gap:7px;margin-top:auto;padding-top:12px}
.bcard .mini span{font-size:11.5px;font-weight:700;letter-spacing:.05em;color:var(--teal);background:rgba(15,168,155,.09);border:1px solid rgba(15,168,155,.18);border-radius:999px;padding:4px 12px}
.bcard.wide{grid-column:span 2;flex-direction:row}
.bcard.wide figure{flex:0 0 46%;aspect-ratio:auto;min-height:230px}
.bcard.wide .body{padding:26px 28px}
.ghost{grid-column:span 1;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;gap:12px;border:1.5px dashed rgba(79,124,247,.4);border-radius:var(--r-lg);padding:26px;color:var(--mute);background:rgba(79,124,247,.04)}
.ghost a{font-weight:800;color:var(--blue)}
.ghost .plus{font-size:1.6rem;font-weight:800;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}

/* contact: gradient-border card */
.contact3 .card{position:relative;border-radius:var(--r-lg);padding:2px;background:var(--grad);box-shadow:var(--shadow)}
.contact3 .inner{background:#fff;border-radius:calc(var(--r-lg) - 2px);display:grid;grid-template-columns:.9fr 1.1fr;gap:44px;padding:48px}
.contact3 h2{font-size:clamp(1.6rem,3vw,2.1rem);font-weight:800;letter-spacing:-.02em;margin:14px 0 12px}
.contact3 p{color:var(--mute)}
.contact3 .meta{margin-top:22px;display:grid;gap:9px;font-size:.92rem;color:var(--mute)}
.contact3 .meta b{color:var(--ink)}
form .row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.field{margin-bottom:15px}
label{display:block;font-size:11.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--mute);margin-bottom:6px}
input,textarea{width:100%;padding:13px 16px;border:1.5px solid var(--line);border-radius:14px;background:#FAFAFC;font:inherit;color:var(--ink);transition:border .15s}
input:focus,textarea:focus{outline:none;border-color:var(--blue);box-shadow:0 0 0 4px rgba(79,124,247,.12)}

/* product page */
.p3-head{text-align:center;padding:64px 0 40px;position:relative;overflow:hidden}
.p3-head .crumbs{font-size:.83rem;color:var(--mute);margin-bottom:20px}
.p3-head .crumbs a{color:var(--mute)}
.p3-head h1{font-size:clamp(2rem,4.2vw,3.1rem);font-weight:800;letter-spacing:-.03em;line-height:1.08;max-width:18em;margin:18px auto 16px}
.p3-head .lede{color:var(--mute);max-width:44em;margin:0 auto;font-size:1.05rem}
.article3{max-width:800px;margin:0 auto;padding:0 24px 80px}
.article3 h2{font-size:1.5rem;font-weight:800;letter-spacing:-.015em;margin:44px 0 16px;display:flex;align-items:center;gap:14px}
.article3 h2::after{content:"";height:3px;flex:1;border-radius:3px;background:var(--grad-soft)}
.article3 p{color:var(--mute);margin-bottom:15px}
.shot3{margin:10px 0 14px}
.shot3 figure{border-radius:var(--r-lg);overflow:hidden;border:1px solid var(--line);box-shadow:var(--shadow-sm);background:#fff}
.shot3 img{width:100%;height:auto}
.shot3 figcaption{font-size:.83rem;color:var(--mute);padding:11px 16px;border-top:1px solid var(--line)}
.gal3{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin:24px 0}
.gal3 figure{border-radius:var(--r-md);overflow:hidden;border:1px solid var(--line);background:#fff}
.gal3 img{width:100%;height:auto}
.gal3 figcaption{font-size:.8rem;color:var(--mute);padding:9px 13px;border-top:1px solid var(--line)}
.apps3{list-style:none;display:grid;gap:11px;margin:18px 0}
.apps3 li{display:flex;gap:12px;align-items:baseline;background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:13px 18px;font-size:.94rem;color:var(--mute)}
.apps3 li::before{content:"";flex:none;width:9px;height:9px;border-radius:50%;background:var(--grad);transform:translateY(-1px)}
.chips{display:flex;flex-wrap:wrap;gap:10px;margin:18px 0}
.chips .chip{background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:8px 18px;font-size:.87rem;color:var(--mute);box-shadow:var(--shadow-sm)}
.chips .chip b{color:var(--ink);margin-right:6px}
.faq3 details{background:var(--surface);border:1px solid var(--line);border-radius:var(--r-md);margin-bottom:12px;overflow:hidden}
.faq3 summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;gap:14px;align-items:center;padding:17px 22px;font-weight:700;font-size:1rem}
.faq3 summary::-webkit-details-marker{display:none}
.faq3 summary::after{content:"+";font-size:1.3rem;font-weight:800;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent}
.faq3 details[open] summary::after{content:"–"}
.faq3 details p{padding:0 22px 18px;color:var(--mute)}
.cta3{margin-top:48px;border-radius:var(--r-lg);background:var(--grad);color:#fff;padding:40px 44px;display:flex;align-items:center;justify-content:space-between;gap:22px;flex-wrap:wrap;box-shadow:var(--shadow)}
.cta3 h2{color:#fff;font-size:1.45rem;font-weight:800;margin:0}
.cta3 p{color:rgba(255,255,255,.88);margin:6px 0 0}
.cta3 .btn{background:#fff;color:var(--blue)}
.cta3 .btn:hover{color:var(--violet)}
.rel3{margin-top:44px}
.rel3 h2{font-size:1.3rem;font-weight:800;margin-bottom:16px}
.rel3 .links{display:flex;flex-wrap:wrap;gap:10px}
.rel3 .links a{background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:10px 20px;font-weight:700;color:var(--ink);box-shadow:var(--shadow-sm)}
.rel3 .links a:hover{border-color:var(--blue);color:var(--blue);text-decoration:none}
.ph-placeholder3{border:1.5px dashed rgba(79,124,247,.45);background:rgba(79,124,247,.05);border-radius:var(--r-lg);color:var(--blue);display:flex;align-items:center;justify-content:center;min-height:180px;font-weight:600;margin:10px 0 14px}

/* footer */
.foot3{background:#20263A;color:#A7ADC4;margin-top:20px}
.foot3 .top{height:5px;background:var(--grad)}
.foot3 .grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1.2fr;gap:38px;padding:56px 0 34px}
.foot3 h3{color:#fff;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;margin-bottom:14px}
.foot3 a{display:block;color:#A7ADC4;font-size:.9rem;padding:3px 0}
.foot3 a:hover{color:#fff}
.foot3 p{font-size:.88rem}
.foot3 .base{border-top:1px solid rgba(255,255,255,.1);padding:18px 0;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:12.5px}

@media(max-width:1020px){
  .pillnav .menu{display:none;position:absolute;top:calc(100% + 10px);left:24px;right:24px;background:var(--surface);border:1px solid var(--line);border-radius:20px;box-shadow:var(--shadow);flex-direction:column;padding:10px;align-items:stretch}
  .pillnav .menu.open{display:flex}
  .pillnav .menu>a,.pillnav .menu>.pm>a{padding:12px 16px}
  .pm .pop{position:static;display:block;box-shadow:none;border:none;padding:0 0 0 14px}
  .burger3{display:block}
  .why3 .inner,.contact3 .inner{grid-template-columns:1fr}
  .bento{grid-template-columns:1fr 1fr}
  .bcard.wide{grid-column:span 2;flex-direction:row}
  .foot3 .grid{grid-template-columns:1fr 1fr}
}
@media(max-width:660px){
  .bento{grid-template-columns:1fr}
  .bcard.wide,.ghost{grid-column:span 1}
  .bcard.wide{flex-direction:column}
  .bcard.wide figure{min-height:0;aspect-ratio:671/386}
  .feat3{grid-template-columns:1fr}
  form .row{grid-template-columns:1fr}
  .foot3 .grid{grid-template-columns:1fr}
  .hero3 .stats{flex-direction:column;align-items:center}
}

/* 内容移植补充 (文本/图片来自生产版, 版式为本方案) */
.rowblock{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:24px;align-items:center;border-top:1px dashed var(--line);padding:22px 0;margin:6px 0}
.rowblock .rowshot img{width:100%;height:auto;display:block}
.rowshot video{width:100%;display:block}
.rowtxt .apptag{display:inline-block;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.66;margin-bottom:8px}
@media(max-width:820px){.rowblock{grid-template-columns:1fr}}
.ptable{width:100%;border-collapse:collapse;margin:18px 0;font-size:.88rem}
.ptable caption{text-align:left;font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;padding-bottom:8px;opacity:.75}
.ptable th{background:linear-gradient(100deg,#0FA89B,#4F7CF7);color:#fff;padding:8px 10px;text-align:left;font-size:.76rem}
.ptable td{padding:8px 10px;border-bottom:1px solid var(--line)}
@media(max-width:900px){.ptable{display:block;overflow-x:auto;white-space:nowrap}}
`;

const navLinks3 = products.map(p => `<a href="/${p.slug}/">${p.name}</a>`).join("");

function layout({ url, title, desc, type = "website", jsonld = "", body, activeNav = "" }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="${url}">
<meta property="og:site_name" content="Aurora Filtech">
<meta property="og:type" content="${type}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://www.aurora-filtech.com${IMG.og}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${IMG.og}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/style.css">
${jsonld ? `<script type="application/ld+json">\n${jsonld}\n</script>` : ""}
</head>
<body>
<div class="topbar">
  <nav class="pillnav" aria-label="Main navigation">
    <a class="brand" href="/"><svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0FA89B"/><stop offset=".5" stop-color="#4F7CF7"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient></defs><rect width="64" height="64" rx="18" fill="url(#g3)"/><path d="M12 44c8-2 10-24 20-24s10 22 20 24" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></svg>Aurora Filtech</a>
    <button class="burger3" aria-label="Toggle menu">☰ Menu</button>
    <div class="menu">
      <a href="/"${activeNav === "home" ? ' aria-current="page"' : ""}>Home</a>
      <div class="pm">
        <a href="#products"${activeNav === "products" ? ' aria-current="page"' : ""}>Products ▾</a>
        <div class="pop">${navLinks3}</div>
      </div>
      <a href="/#contact">Contact</a>
      <a href="/#why">About Us</a>
      <a class="cta" href="/#contact">Get a Quote</a>
    </div>
  </nav>
</div>
<main>
${body}
</main>
<footer class="foot3">
  <div class="top"></div>
  <div class="wrap grid">
    <div>
      <h3>Aurora Filtech Co., Ltd</h3>
      <p>Professional manufacturer of filter fabrics and industrial belts for paper, mining, power, food and pharmaceutical industries. 30+ years of expertise, 3 factories, OEM/ODM service.</p>
    </div>
    <div>
      <h3>Quick Links</h3>
      <a href="/dryer-fabric/">Dryer Conveyor Fabric</a>
      <a href="/forming-fabric/">Forming Fabric</a>
      <a href="/spiral-belt/">Spiral Fabric</a>
      <a href="/vacuum-fabric/">Vacuum Filter Fabric</a>
      <a href="/press-fabric/">Press Filter Fabric</a>
      <a href="/products/filter-bag/">Filter Bag</a>
      <a href="/products/filter-cartridge/">Cartridge Filter</a>
    </div>
    <div>
      <h3>More Products</h3>
      <a href="/press-belt/">Press Filter Belt</a>
      <a href="/about/">About Us</a>
      <a href="/forming-fabric/">Forming Fabric</a>
    </div>
    <div>
      <h3>Contact</h3>
      <p><a href="mailto:aaron@aurora-filtech.com" style="display:inline">aaron@aurora-filtech.com</a><br>London: 8 Standard Road, NY10 6EU, UK<br>Changzhou: Room 1103, Guanhe East Rd, Tianning District, China<br>Tel: +86 152 0611 9266</p>
    </div>
  </div>
  <div class="wrap base">
    <span>© ${new Date().getFullYear()} Aurora Filtech Co., Ltd. All rights reserved.</span>
    <span>Industrial filter fabrics &amp; filter belts manufacturer</span>
  </div>
</footer>
<script>
document.querySelector('.burger3').addEventListener('click',function(){document.querySelector('.pillnav .menu').classList.toggle('open')});
</script>
</body>
</html>`;
}

const contactSection = `
<section id="contact" class="contact3 sec3">
  <div class="wrap">
    <div class="card">
      <div class="inner">
        <div>
          <span class="kicker-chip">Contact Us</span>
          <h2>Tell us about your filtration duty</h2>
          <p>Send your machine model, product and operating conditions — our engineers will recommend the right filter fabric or belt and quote within 24 hours.</p>
          <div class="meta">
            <div><b>Email:</b> johnson@aurora-filtech.com</div>
            <div><b>Tel / WhatsApp:</b> +86 152 0611 9266</div>
            <div><b>UK office:</b> 8 Standard Road, London NY10 6EU, GB</div>
            <div><b>China factory:</b> Room 1103, Guanhe East Rd, Tianning District, Changzhou, CN</div>
          </div>
        </div>
        <form action="mailto:johnson@aurora-filtech.com" method="post" enctype="text/plain">
          <div class="row">
            <div class="field"><label for="f-company">Company Name *</label><input id="f-company" name="company" required></div>
            <div class="field"><label for="f-email">Email *</label><input id="f-email" name="email" type="email" required></div>
          </div>
          <div class="field"><label for="f-name">Your Name</label><input id="f-name" name="name"></div>
          <div class="field"><label for="f-request">Request</label><textarea id="f-request" name="request" rows="5" placeholder="Machine type, product, dimensions, operating temperature..."></textarea></div>
          <button class="btn btn-grad" type="submit">Send Request</button>
        </form>
      </div>
    </div>
  </div>
</section>`;

// ---------- home (V3: centered hero + bento grid) ----------
const homeCards = products.filter(p => p.card);
// bento spans: rows of 3 → [2+1], [1+2], [1+1+1], [1+ghost]
const wideAt = new Set([0, 3, 7]);

const bentoCards = homeCards.map((p, i) => `
<article class="bcard${wideAt.has(i) ? " wide" : ""}">
  <figure>
    <a href="/${p.slug}/"><img src="${p.card.img}" alt="${p.card.alt}" width="${p.card.w}" height="${p.card.h}" loading="${i < 3 ? "eager" : "lazy"}" decoding="async"></a>
    <figcaption>${p.card.caption}</figcaption>
  </figure>
  <div class="body">
    <h3><a href="/${p.slug}/">${p.card.h2}</a></h3>
    <p class="first">${p.card.first}</p>
    <div class="mini">${p.card.equipment.map(e => `<span>${e}</span>`).join("")}</div>
  </div>
</article>`).join("\n") + `
<div class="ghost">
  <span class="plus">+</span>
  <p>Also available: <a href="/about/">about our production capability</a> · <a href="/industries/">industries we serve</a>.</p>
</div>`;

const homeJsonld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "Aurora Filtech Co., Ltd",
      alternateName: "Aurora Filtech",
      url: `${BASE}/`,
      logo: { "@type": "ImageObject", url: `${BASE}/qfy-content/uploads/2023/02/7a282ca2a1e95695ea78344b556f18b7.jpg` },
      description: "Professional manufacturer of filter fabrics and industrial belts. Forming fabrics, dryer fabrics, press filter fabrics, vacuum filter fabrics, filter bags and filter cartridges for paper, mining, power, food and pharmaceutical industries.",
      email: "aaron@aurora-filtech.com",
      telephone: "+8615206119266",
      address: [
        { "@type": "PostalAddress", streetAddress: "8 Standard Road", addressLocality: "London", postalCode: "NY10 6EU", addressCountry: "GB" },
        { "@type": "PostalAddress", streetAddress: "Room 1103, Guanhe East Rd, Tianning District", addressLocality: "Changzhou", addressCountry: "CN" }
      ],
      contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: "johnson@aurora-filtech.com", telephone: "+8615206119266" }]
    },
    { "@type": "WebSite", "@id": `${BASE}/#website`, url: `${BASE}/`, name: "Aurora Filtech", publisher: { "@id": `${BASE}/#organization` }, inLanguage: "en" },
    ...homeCards.flatMap(p => [
      { "@type": "ImageObject", "@id": `${BASE}/#${p.imageId}`, contentUrl: `${BASE}${p.card.img}`, encodingFormat: "image/jpeg", width: String(p.card.w), height: String(p.card.h), name: p.card.h2.charAt(0) + p.card.h2.slice(1).toLowerCase(), caption: p.card.caption.split(" — ")[0], description: `${p.card.alt}, supplied by Aurora Filtech.`, inLanguage: "en" },
      { "@type": "Product", "@id": `${BASE}/#product-${p.jsonldId}`, name: p.name, alternateName: p.altNames, description: p.pdesc, url: urlOf(p.slug), image: { "@id": `${BASE}/#${p.imageId}` }, brand: { "@id": `${BASE}/#organization` }, manufacturer: { "@id": `${BASE}/#organization` }, category: p.category, keywords: p.keywords }
    ])
  ]
};

const homeBody = `
<section class="hero3">
  <div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div>
  <div class="wrap">
    <span class="kicker-chip">Industrial Filter Media · 30+ Years</span>
    <h1>Precision engineered<br><span class="g-text">filtration.</span></h1>
    <p class="lede">Experience the next generation of industrial filter media. Designed for extreme durability, maximum efficiency, and zero compromise.</p>
    <div class="cta">
      <a class="btn btn-grad" href="#products">Explore Solutions</a>
      <a class="btn btn-line" href="#contact">Get a Quote</a>
    </div>
    <div class="stage">
      <figure>
        <img src="${IMG.h1}" alt="Filter fabric weaving looms inside the Aurora Filtech weaving workshop" width="2048" height="772" loading="eager" decoding="async">
        <figcaption>Aurora Filtech filter fabric weaving workshop.</figcaption>
      </figure>
    </div>
    <div class="stats">
      <div class="s"><b class="g-text">30+</b><span>Years Exp</span></div>
      <div class="s"><b class="g-text">3</b><span>Factories</span></div>
      <div class="s"><b class="g-text">Global</b><span>Standards</span></div>
    </div>
  </div>
</section>

<section id="why" class="sec3">
  <div class="wrap">
    <div class="why3">
      <div class="inner">
        <div>
          <span class="kicker-chip">Why Choose Us</span>
          <h2>Filtration media that lasts longer and performs better.</h2>
          <p>Aurora Filtech combines 30+ years of expertise with advanced German technology to deliver filtration media that lasts longer and performs better. From proprietary monofilament production to automated joint, we control every step of the process. We also provide OEM/ODM service to help you develop your local business.</p>
          <div class="feat3">
            <div class="f"><i>01</i><b>In-house monofilament</b><span>Proprietary yarn production for consistent quality.</span></div>
            <div class="f"><i>02</i><b>German weaving technology</b><span>Advanced looms and finishing.</span></div>
            <div class="f"><i>03</i><b>Automated joints</b><span>Precision seams, ready to run.</span></div>
            <div class="f"><i>04</i><b>OEM / ODM</b><span>Custom fabrics for your local business.</span></div>
          </div>
        </div>
        <figure class="shot">
          <img src="/qfy-content/uploads/live/peek-yarn.jpg" alt="PEEK monofilament spool, in-house monofilament production for controlled quality and customization" width="700" height="291" loading="lazy" decoding="async">
          <figcaption>In-house monofilament production — quality under our control, and a high degree of customization.</figcaption>
        </figure>
      </div>
    </div>
  </div>
</section>

<section id="products" class="sec3">
  <div class="wrap">
    <div class="sec3-head">
      <span class="kicker-chip">Our Solutions</span>
      <h2>OUR SOLUTIONS</h2>
      <p>Filter fabrics, filter belts, bags and cartridges — engineered for the machines they run on.</p>
    </div>
    <div class="bento">
${bentoCards}
    </div>
  </div>
</section>
${contactSection}`;

// ---------- product pages (V3: centered column + pill chips) ----------
function productJsonld(p, faqs) {
  const graph = [
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: p.name, item: urlOf(p.slug) }
    ] }
  ];
  if (p.banner) {
    graph.push({ "@type": "ImageObject", "@id": urlOf(p.slug) + `#${p.imageId}-page`, contentUrl: `${BASE}${p.banner.url}`, encodingFormat: "image/jpeg", name: p.name, caption: p.banner.caption, description: `${p.banner.alt}, supplied by Aurora Filtech.`, inLanguage: "en" });
  }
  const prod = { "@type": "Product", "@id": urlOf(p.slug) + `#product-${p.jsonldId}-page`, name: p.name, alternateName: p.altNames, description: p.pdesc, url: urlOf(p.slug), brand: { "@id": `${BASE}/#organization` }, manufacturer: { "@id": `${BASE}/#organization` }, category: p.category, keywords: p.keywords };
  if (p.banner) prod.image = { "@id": urlOf(p.slug) + `#${p.imageId}-page` };
  graph.push(prod);
  if (faqs && faqs.length) {
    graph.push({ "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);
}

function chipList(list) {
  return `<div class="chips">${list.map(s => {
    const idx = s.indexOf(":");
    const k = idx > 0 ? s.slice(0, idx) : "";
    const v = idx > 0 ? s.slice(idx + 1).trim() : s;
    return `<span class="chip">${k ? `<b>${k}:</b>` : ""}${v}</span>`;
  }).join("")}</div>`;
}

function ptable(t) { if (!t) return "";
  const head = t.head.map(h => `<th>${h}</th>`).join("");
  const rows = t.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("");
  return `<figure><table class="ptable"><caption>${t.caption}</caption><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></figure>`;
}

function productBody(p) {
  let faqs, main;
    if (p.slug === "spiral-belt") {
    faqs = [["What is the difference between a spiral fabric and a woven dryer fabric?", "A spiral fabric is assembled from monofilament spirals joined by hinge pins, giving an open, non-tracking structure with high drainage. A woven dryer fabric is woven from warp and weft yarns and provides a smoother surface. Spiral fabrics are easier to repair on the machine; woven fabrics usually offer higher stability at high speeds. Full comparison in our spiral fabric guide."], ["With or without filler yarns — how do I choose?", "Without fillers you get maximum open area and air flow (drying and conveying). Adding 1–5 filler yarns increases density and lowers permeability — right for filtration duties on belt press filters."], ["Can spiral fabric be used on belt press filters?", "Yes — with filler yarns, spiral fabrics work as filter belts for sludge dewatering, sand washing, juice squeezing and palm oil squeezing. Their open structure drains quickly and releases the filter cake easily."], ["Do you offer PPS spiral fabrics for higher temperatures?", "Yes — PPS monofilament spiral fabrics serve higher-temperature drying applications (long-term duty around 240 °C, verified on request). Tell us your working temperature and we will recommend the right material."], ["Is it called spiral belt or spiral fabric?", "Both are used. Spiral fabric matches our structure best and matches Google image results; spiral belt is a common alias (often for food conveyor spirals). We cover both spellings across this family of pages."], ["Why no filler yarns on a dryer fabric?", "Dryers need air: without filler yarns the spiral structure stays fully open — our 6890 and 9010 weaves measure 875–1016 CFM — so drying air passes through belt and product instead of being blocked."], ["Do you offer anti-static spiral dryer fabrics?", "Yes — anti-static monofilament versions for static-prone board forming dryers."], ["Round or flat filler yarns — which should I choose?", "Round monofilament fillers maximize open area and CFM, keeping channels clear longer — good for heavy drainage. Flat fillers give a smoother contact surface and better fines retention while keeping good permeability."], ["How many filler yarns do I need?", "2–3 fillers for coarse, free-draining duties (sand washing); 3–4 for typical municipal sludge; 5 (or flat fillers) for fine solids and juice/oil squeezing. Measured CFM per model is in our spec table — we match the count to your target."]];
    main = `
<p>Aurora SP spiral fabrics are endless belts built from polyester (PET) or PPS monofilament spirals joined by hinge pins — an open, non-tracking structure with high drainage and easy cleaning, equally at home as dryer belts and as filter belts. Two families cover the two duties: <b>without filler yarns</b> for maximum air flow (up to ~1000 CFM) — the open SP-D models 6890 / 9010 for drying and conveying; or <b>with 2–5 filler yarns</b> for higher density and lower permeability (down to ~325 CFM) — the <a href="#fam-spp">spiral press filter belt (SP-P, below)</a> for belt press filtration. See them alongside the whole <a href="/dryer-fabric/">dryer fabric range</a>.</p>
<div class="gal3"><figure><img src="/qfy-content/uploads/sp/sp-pet.jpg" alt="Standard PET spiral dryer fabric, monofilament spirals joined by hinge pins" width="1000" height="750" loading="lazy" decoding="async"><figcaption>SP-D in standard PET.</figcaption></figure><figure><img src="/qfy-content/uploads/sp/sp-9010-4.jpg" alt="Type 9010-4 spiral fabric with PET filler yarns for press filtration" width="466" height="350" loading="lazy" decoding="async"><figcaption>SP-P — filled 9010-4 construction.</figcaption></figure><figure><img src="/qfy-content/uploads/live/teflon-g2.jpg" alt="Hydrolysis-resistant spiral fabric for acid and alkaline environments, close-up" width="500" height="350" loading="lazy" decoding="async"><figcaption>Special materials — hydrolysis-resistant, PPS, PTFE-added.</figcaption></figure></div>
<h2>SP-D &middot; Spiral dryer fabrics — hollow, no filler yarns</h2>
<p>Without filler yarns the spiral structure stays fully open — our 688 and 9010 weaves measure 875–1016 CFM, so drying air passes through belt and product instead of fighting the belt. Anti-static monofilament versions serve static-prone board forming dryers; PPS versions run around 240 &deg;C long-term.</p>
${ptable(p.paramsSPD)}
<h2>SP-P &middot; Spiral press filter belts — filled for filtration</h2>
<p>Add 2–5 filler yarns inside the spiral loops and the open dryer structure becomes a true filter belt: density rises, air permeability drops from ~1000 to as low as 325 CFM, and fines stay in the product. Round fillers maximise open area; flat fillers give a smoother surface for juice and palm-oil squeezing.</p>
${ptable(p.paramsSPP)}
<h2>Special materials series</h2>
<p>Three specialty lines run on the same spiral platform — chosen by environment, not by duty: hydrolysis-resistant (outstanding resistance for acid and alkaline environments), high-temperature PPS, and PTFE-added non-stick.</p>`;
  } else {
    faqs = p.faqs;
    main = `
<p>${p.intro}</p>
${p.banner ? `<div class="shot3" style="max-width:${p.banner.maxW || 1180}px;margin-left:auto;margin-right:auto"><figure><img src="${p.banner.url}" alt="${p.banner.alt}" width="${p.banner.w}" height="${p.banner.h}" loading="eager" decoding="async"><figcaption>${p.banner.caption}</figcaption></figure></div>` : ""}
${p.gallery ? `<div class="gal3">${p.gallery.map(g => `<figure><img src="${g.url}" alt="${g.alt}" loading="lazy" decoding="async"><figcaption>${g.caption}</figcaption></figure>`).join("")}</div>` : ""}
${(p.sections || []).map(s => `<h2>${s.h}</h2>${s.html}`).join("")}
${p.paramsData ? ptable(p.paramsData) : ""}
<h2>Applications</h2>
<ul class="apps3">${p.apps.map(a => `<li>${a}</li>`).join("")}</ul>
<p>Related products: ${p.related.map(r => `<a href="/${r}/">${nameOf(r)}</a>`).join(" · ")}.</p>
<h2>Specifications</h2>
${chipList(p.specs)}`;
  }

  return `
<section class="p3-head">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <span>${p.name}</span></nav>
    <span class="kicker-chip">${p.name}</span>
    <h1>${p.h1.replace(/\((.*?)\)/, '<span class="g-text">($1)</span>')}</h1>
    <p class="lede">${p.pdesc}</p>
  </div>
</section>
<div class="article3">
  ${main}
  <h2>Frequently Asked Questions</h2>
  <div class="faq3">
    ${faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n  ")}
  </div>
  <div class="rel3">
    <h2>Related Products</h2>
    <div class="links">${p.related.map(r => `<a href="/${r}/">${nameOf(r)} →</a>`).join("")}</div>
  </div>
  <div class="cta3">
    <div><h2>Request a quote for ${p.name.toLowerCase()}</h2><p>Custom sizes, seams and materials — OEM/ODM available.</p></div>
    <a class="btn" href="/#contact">Contact Us</a>
  </div>
</div>
${contactSection}`;
}

// ---------- write files ----------
function write(rel, content) {
  const fp = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  fs.writeFileSync(fp, content);
  console.log("wrote", rel);
}

write("assets/style.css", `/* Aurora Filtech V3 — aurora gradient theme */${CSS}`);
write("index.html", layout({
  url: `${BASE}/`,
  title: "Aurora Filtech | Industrial Filter Fabrics and Filter Belts",
  desc: "Manufacturer of forming fabrics, dryer fabrics, press filter fabrics, vacuum filter fabrics, filter bags and cartridges. 30+ years, 3 factories, OEM/ODM.",
  type: "website",
  jsonld: JSON.stringify(homeJsonld, null, 2),
  body: homeBody, activeNav: "home"
}));

for (const p of products) {
  const faqs = p.slug === "spiral-belt" ? null : p.faqs;
  write(`${p.slug}/index.html`, layout({
    url: urlOf(p.slug),
    title: p.title,
    desc: p.desc,
    type: "product",
    jsonld: productJsonld(p, faqs),
    body: productBody(p), activeNav: "products"
  }));
}

// ---------- 内容移植新增页面（正文提取自生产版, 版式为本方案组件） ----------
write("industries/index.html", layout({ url: `${BASE}/industries/`, title: "Industries | Aurora Filtech", desc: "Aurora Filtech fabrics by industry.", type: "website", body: `<section class="p3-head"><div class="wrap"><nav class="crumbs"><a href="/">Home</a> › <span>Industries</span></nav><h1>Industries We Serve</h1><p class="lede">Fabrics matched to each stage of the process.</p></div></section><div class="wrap article3"><ul class="apps3"><li><a href="/industries/wood-based-panels/">Wood-based Panels</a></li><li><a href="/industries/paper-and-pulp/">Paper & Pulp</a></li><li><a href="/industries/mining/">Mining & Minerals</a></li><li><a href="/industries/power-generation-fgd/">Power Generation & FGD</a></li><li><a href="/industries/food-and-pharma/">Food & Pharmaceutical</a></li><li><a href="/industries/nonwovens/">Nonwovens</a></li></ul></div>${contactSection}` }));
write("industries/wood-based-panels/index.html", layout({ url: `${BASE}/industries/wood-based-panels/`, title: "Wood-based Panel Belts | MDF, OSB & Particleboard | Aurora Filtech", desc: "Forming fabrics, dryer fabrics, spiral dryer belts and square mesh belts for MDF, OSB and particleboard lines. Dieffenbacher / Siempelkamp type plants.", type: "website", body: `
<section class="p3-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/industries/">Industries</a> › <span>Wood Based Panels</span></nav><h1>Wood-based Panel Belts</h1></div></section>
<div class="wrap article3">
<p>From the forming line to the press outfeed, every deck of an MDF, OSB or particleboard line runs on woven and spiral fabrics. Aurora supplies the belts that matter at each stage — forming and pre-press, the drying decks, the biomass dryers — cut to the common plant platforms.</p>
    <h2>By process stage</h2>
    <div class="proc-list">
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/df/hero.jpg" alt="Anti-static dryer fabric close-up with conductive monofilaments for wood panel forming lines" width="1200" height="525" loading="lazy" decoding="async">
          <figcaption>Anti-static monofilament construction — the flagship panel-line fabric.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Mat forming & pre-press</h3>
          <p class="app-tag">Anti-static fabrics</p>
          <p>On MDF, OSB and particleboard forming lines, resin dust and high-speed friction charge the belt until fibers cling and mark the board. Anti-static monofilament drains the charge in the yarn itself; the spiral-linked enhanced seam survives the pre-press nip.</p>
          <p class="app-links"><a href="/dryer-fabric/">Dryer Fabric →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <video controls preload="metadata" playsinline poster="/qfy-content/uploads/df/as-mono.jpg"><source src="/qfy-content/uploads/df/prepress.mp4" type="video/mp4">Pre-press belt, filmed on an MDF line</video>
          <figcaption>Anti-static pre-press belt in live operation.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Pre-press belt, filmed on an MDF line</h3>
          
          <p>Our anti-static belt working the pre-press section of a Chinese MDF plant (Dieffenbacher-type line) — clean release and no dust cling, filmed as supplied.</p>
          <p class="app-links"><a href="/dryer-fabric/">Dryer Fabric →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/df/4106s.jpg" alt="Type 4106S dryer belt with high-temperature silicone coating for MDF production" width="500" height="350" loading="lazy" decoding="async">
          <figcaption>4106S — single-layer base with a high-temperature silicone coat.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Release-critical duties — 4106S silicone-coated</h3>
          <p class="app-tag">Panel lines only</p>
          <p>Where resin-laden product must release cleanly, 4106S coats a single-layer fabric with high-temperature silicone — a version supplied specifically for MDF and board production.</p>
          <p class="app-links"><a href="/dryer-fabric/">Dryer Fabric →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/sp/sp-pet.jpg" alt="Open PET spiral fabric belt for OSB strand and particle drying" width="1000" height="750" loading="lazy" decoding="async">
          <figcaption>Open spiral construction — the drying air reaches the product.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Strand & particle belt dryers</h3>
          
          <p>Multi-layer belt dryers move OSB strands and particles on open spiral fabrics — no filler yarns, up to ~1000 CFM, so hot air passes through belt and product instead of fighting it.</p>
          <p class="app-links"><a href="/spiral-belt/">Spiral Fabric →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/df/sq-blue.jpg" alt="Blue polyester square mesh belt for wood chip and biomass drying" width="1200" height="900" loading="lazy" decoding="async">
          <figcaption>Square mesh — fine, stable, heat-set.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Biomass & pellet drying</h3>
          
          <p>Fine square mesh belts for wood chip, shavings and pellet dryers — heat-set polyester that stays flat and stable to 180 °C; compatible with / alternative to OEM mesh belts.</p>
          <p class="app-links"><a href="/products/square-mesh/">Polyester Square Mesh →</a></p>
        </div>
      </div>
      
      <div class="proc-item">
        <h3><a href="/spiral-belt/">Press & cooling decks</a></h3>
        <p>PTFE belts for release-sensitive press-outfeed duties and spiral belts for cooling and conveying decks.</p>
      </div>
    </div>
    <div class="oem-note"><strong>Platform note.</strong> Belts dimensioned for the common plant platforms — Dieffenbacher, Siempelkamp / Büttner, Swiss Combi-type belt dryers and Chinese line builders.</div>
    <div class="related">
      <h2>Products for this industry</h2>
      <div class="related-grid"><a href="/forming-fabric/">Forming Fabric →</a><a href="/dryer-fabric/">Dryer Fabric →</a><a href="/spiral-belt/">Spiral Fabric →</a><a href="/products/square-mesh/">Polyester Square Mesh →</a><a href="/spiral-belt/">Spiral Fabric →</a></div>
    </div>
</div>${contactSection}`, activeNav: "industries" }));
write("industries/paper-and-pulp/index.html", layout({ url: `${BASE}/industries/paper-and-pulp/`, title: "Paper Machine Clothing | Forming, Press & Dryer Fabrics | Aurora Filtech", desc: "Paper machine clothing for paper mills: forming fabrics (forming wire), dryer fabrics and spiral fabrics. Packaging, printing, tissue and nonwovens.", type: "website", body: `
<section class="p3-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/industries/">Industries</a> › <span>Paper And Pulp</span></nav><h1>Paper Machine Clothing</h1></div></section>
<div class="wrap article3">
<p>Paper machine clothing is our founding trade. Aurora supplies the full wet-to-dry fabric line — forming fabrics (the forming wire of the old bronze era), dryer fabrics with anti-static yarns, and spiral fabrics for dryer and press duties — to paper mills and nonwovens producers.</p>
    <h2>By process stage</h2>
    <div class="proc-list">
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/live/forming-g1.jpg" alt="Polyester forming fabric running in the wet end of a paper machine" width="800" height="400" loading="lazy" decoding="async">
          <figcaption>Forming fabric — 1-layer to 3-layer SSB.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Forming section</h3>
          <p class="app-tag">FF series</p>
          <p>Aurora FF forming fabrics — 1-layer to 3-layer SSB in anti-hydrolysis monofilament, matched to machine speed, retention and drainage for packaging, printing & writing and tissue grades.</p>
          <p class="app-links"><a href="/forming-fabric/">Forming Fabric →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/df/single-flat.jpg" alt="Single-layer flat yarn dryer fabric for paper machine drying sections" width="466" height="350" loading="lazy" decoding="async">
          <figcaption>Single-layer flat-yarn dryer fabric.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Dryer section — flat-yarn fabrics</h3>
          <p class="app-tag">DF series</p>
          <p>More than ten flat- and round-yarn constructions for paper machine dryer decks — specified by air permeability (CFM), layer count and sheet-side smoothness.</p>
          <p class="app-links"><a href="/dryer-fabric/">Dryer Fabric →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/df/double-layer.jpg" alt="Double-layer flat yarn dryer fabric for quality paper grades" width="490" height="368" loading="lazy" decoding="async">
          <figcaption>Double-layer flat-yarn dryer fabric.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>High-smoothness duties — double layer</h3>
          
          <p>Two flat-yarn layers give a smoother, more stable sheet run after the press section — the construction for grades where contact marks would end up in the finished sheet.</p>
          <p class="app-links"><a href="/dryer-fabric/">Dryer Fabric →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/sp/sp-9010-4.jpg" alt="Spiral fabric with PET filler yarns for open paper machine drying decks" width="466" height="350" loading="lazy" decoding="async">
          <figcaption>Spiral fabric with PET filler yarns.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Open, high-airflow decks</h3>
          
          <p>Where decks run hot and open, spiral fabrics move air without tracking — PET as standard, PPS for high-temperature positions.</p>
          <p class="app-links"><a href="/spiral-belt/">Spiral Fabric →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/live/pulp-nylon.jpg" alt="PA nylon press mesh for pulp dewatering, the press-ap pulp fabric" width="900" height="675" loading="lazy" decoding="async">
          <figcaption>PA nylon press mesh for pulp — and vacuum fabrics for washing.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Pulp mill filtration</h3>
          
          <p>Two cloths for the pulp mill: vacuum filter fabrics for disc, drum and belt washing/thickening duties — and our PA nylon press mesh for pulp pressing (the press-ap fabric): nylon outperforms PET on hot alkaline stock, and our proprietary formulation lasts 2× longer than competing cloths.</p>
          <p class="app-links"><a href="/vacuum-fabric/">Vacuum Filter Fabric →</a></p>
        </div>
      </div>
    </div>
    <div class="oem-note"><strong>Platform note.</strong> Fabrics to fit Fourdrinier, hybrid and gap former machines; also nonwoven spunlace, needle-punch and airlaid lines.</div>
    <div class="related">
      <h2>Products for this industry</h2>
      <div class="related-grid"><a href="/forming-fabric/">Forming Fabric →</a><a href="/dryer-fabric/">Dryer Fabric →</a><a href="/spiral-belt/">Spiral Fabric →</a><a href="/vacuum-fabric/">Vacuum Filter Fabric →</a></div>
    </div>
</div>${contactSection}`, activeNav: "industries" }));
write("industries/mining/index.html", layout({ url: `${BASE}/industries/mining/`, title: "Mining Filtration Fabrics | Dewatering & Tailings | Aurora Filtech", desc: "Filter fabrics for mining: vacuum filter fabrics, press filter cloths and spiral press belts for iron ore, copper, lithium and non-metallic minerals.", type: "website", body: `
<section class="p3-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/industries/">Industries</a> › <span>Mining</span></nav><h1>Mining Filtration Fabrics</h1></div></section>
<div class="wrap article3">
<p>Mineral processing runs on filter area. Aurora supplies vacuum filter fabrics for horizontal belt, disc and drum filters (ANDRITZ / Dorr-Oliver type platforms among them), press filter cloths for frame and membrane presses, and spiral press filter belts for belt-press dewatering — across iron ore, copper, lithium and industrial minerals.</p>
    <h2>By process stage</h2>
    <div class="proc-list">
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/vf/m620.jpg" alt="Type 620 double-layer vacuum filter fabric for horizontal belt filters" width="466" height="350" loading="lazy" decoding="async">
          <figcaption>620 — double layer, calendered surface.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Horizontal vacuum belt filters</h3>
          <p class="app-tag">ANDRITZ / Dorr-Oliver type</p>
          <p>Aurora VF fabrics for horizontal belt filters — clear filtrate, easy cake release, endless or seamed. For precision concentrate duties, 623A adds an all-monofilament plied weft: higher strength, finer filtration.</p>
          <p class="app-links"><a href="/vacuum-fabric/">Vacuum Filter Fabric →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/pf/pf-disc.jpg" alt="Horizontal disc vacuum filter running fan-shaped cloth segments" width="1280" height="720" loading="lazy" decoding="async">
          <figcaption>Horizontal disc vacuum filter — fan-shaped segments, re-clothed by Aurora.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Disc & drum filters</h3>
          
          <p>Satin-weave vacuum fabrics sized for disc and drum filter duty across ore concentrates — a long-standing construction on these platforms.</p>
          <p class="app-links"><a href="/vacuum-fabric/">Vacuum Filter Fabric →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/live/pressfabric-g1.jpg" alt="Frame press filter running press filter cloths for concentrate dewatering" width="800" height="348" loading="lazy" decoding="async">
          <figcaption>Frame press filter on concentrate duty.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Press filtration (frame / membrane)</h3>
          
          <p>Monofilament cloths for fast cake release on concentrate duties; monofilament-multifilament combinations where filtrate clarity leads.</p>
          <p class="app-links"><a href="/press-fabric/">Press Filter Fabric →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/live/pressbelt-f.jpg" alt="White herringbone woven press filter belt for tailings dewatering" width="500" height="350" loading="lazy" decoding="async">
          <figcaption>Woven press belt — herringbone surface.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Tailings & sludge (belt press)</h3>
          
          <p>Woven press belts and SP-P spiral belts with filler yarns — high squeeze resistance and controlled permeability for tailings dry-stacking feed.</p>
          <p class="app-links"><a href="/press-belt/">Press Filter Belt →</a></p>
        </div>
      </div>
      
      <div class="proc-item">
        <h3><a href="/products/square-mesh/">Fines classification</a></h3>
        <p>Square mesh and fine screening cloth for classification sifters (40–200 mesh).</p>
      </div>
    </div>
    <div class="oem-note"><strong>Platform note.</strong> Cloths dimensioned to the common filter platforms — ANDRITZ / Dorr-Oliver horizontal belt filters, disc and drum filters, Delkor, Pannevis, WesTech-type belts and the main press brands.</div>
    <div class="related">
      <h2>Products for this industry</h2>
      <div class="related-grid"><a href="/vacuum-fabric/">Vacuum Filter Fabric →</a><a href="/press-fabric/">Press Filter Fabric →</a><a href="/spiral-belt/">Spiral Fabric →</a><a href="/products/filter-bag/">Filter Bag →</a></div>
    </div>
</div>${contactSection}`, activeNav: "industries" }));
write("industries/power-generation-fgd/index.html", layout({ url: `${BASE}/industries/power-generation-fgd/`, title: "FGD Filtration & Baghouse Media | Power Plants | Aurora Filtech", desc: "FGD gypsum dewatering fabrics, sludge dewatering belts and PPS dust filter bags for coal-fired and biomass power plants.", type: "website", body: `
<section class="p3-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/industries/">Industries</a> › <span>Power Generation Fgd</span></nav><h1>FGD Filtration & Baghouse Media</h1></div></section>
<div class="wrap article3">
<p>A power plant filters at both ends of the boiler: flue gas through the baghouse, and gypsum / sludge through the vacuum and press filters. Aurora supplies both — PPS dust bags for the baghouse, and the 617 / 623 vacuum fabric pair for limestone-gypsum FGD dewatering.</p>
    <h2>By process stage</h2>
    <div class="proc-list">
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/vf/m617.jpg" alt="Type 617 vacuum filter fabric with multifilament weft for FGD gypsum dewatering" width="466" height="350" loading="lazy" decoding="async">
          <figcaption>617 — multifilament weft, low permeability.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>FGD gypsum — 617, the economical workhorse</h3>
          <p class="app-tag">Low permeability</p>
          <p>A multifilament weft takes air permeability into a fine band — right for limestone-gypsum FGD dewatering on horizontal vacuum belt filters, and the low-cost entry point.</p>
          <p class="app-links"><a href="/vacuum-fabric/">Vacuum Filter Fabric →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/vf/m623.jpg" alt="Type 623 vacuum filter fabric with all-monofilament surface for FGD gypsum" width="466" height="350" loading="lazy" decoding="async">
          <figcaption>623 — clean monofilament surface, multifilament hidden on the back.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>FGD gypsum — 623, the upgrade</h3>
          <p class="app-tag">Mono surface · scraper-resistant</p>
          <p>Surface 100% monofilament with the multifilament buried on the machine side: the gypsum cake releases cleanly, the surface resists the scraper, and campaigns run well above 617. Thicker than 617 — check filter clearances.</p>
          <p class="app-links"><a href="/vacuum-fabric/">Vacuum Filter Fabric →</a></p>
        </div>
      </div>
      
      <div class="proc-item">
        <h3><a href="/vacuum-fabric/">Fly-ash & coal-ash slurries</a></h3>
        <p>The same low-permeability constructions handle fly-ash (coal-ash) slurries that need a tight cloth.</p>
      </div>
      
      <div class="proc-item">
        <h3><a href="/products/filter-bag/">Baghouse dust collection</a></h3>
        <p>PPS felt filter bags (membrane options) for coal-fired flue gas; PET bags for biomass and generic duties.</p>
      </div>
      
      <div class="proc-item">
        <h3><a href="/press-belt/">Sludge & wastewater (belt press)</a></h3>
        <p>PB woven press belts and SP-P spiral belts for dewatering FGD and plant sludges.</p>
      </div>
    </div>
    <div class="oem-note"><strong>Platform note.</strong> Bags and fabrics sized to the common FGD and baghouse platforms.</div>
    <div class="related">
      <h2>Products for this industry</h2>
      <div class="related-grid"><a href="/vacuum-fabric/">Vacuum Filter Fabric →</a><a href="/products/filter-bag/">Filter Bag →</a><a href="/press-belt/">Press Filter Belt →</a><a href="/products/filter-cartridge/">Filter Cartridge →</a></div>
    </div>
</div>${contactSection}`, activeNav: "industries" }));
write("industries/food-and-pharma/index.html", layout({ url: `${BASE}/industries/food-and-pharma/`, title: "Food & Pharma Filtration and Drying Belts | Aurora Filtech", desc: "Food-grade dryer fabrics, PTFE (teflon) belts for vacuum dryers, spiral belts for juice and palm oil pressing. Food-contact materials.", type: "website", body: `
<section class="p3-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/industries/">Industries</a> › <span>Food And Pharma</span></nav><h1>Food & Pharma Filtration and Drying Belts</h1></div></section>
<div class="wrap article3">
<p>Food and pharma lines need belts that release cleanly and fabrics that meet the standards. Aurora supplies food-grade square mesh drying conveyors, anti-static dryer fabrics for food belt dryers, non-stick PTFE belts for vacuum belt dryers (liquid medicine, food pastes) and noodle drying lines, plus spiral press belts for juice and palm-oil pressing.</p>
    <h2>By process stage</h2>
    <div class="proc-list">
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/df/sq-white.jpg" alt="White polyester plain weave square mesh belt for food drying and draining" width="1200" height="900" loading="lazy" decoding="async">
          <figcaption>White plain-weave square mesh — food-contact material.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Vegetable & food drying conveyors</h3>
          <p class="app-tag">Food contact</p>
          <p>Polyester square mesh draining and drying conveyors — more than 20 heat-set apertures from 200 µm to 4 mm, flat and stable to 180 °C, in food-contact compliant materials.</p>
          <p class="app-links"><a href="/products/square-mesh/">Polyester Square Mesh →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/df/as-mixed.jpg" alt="Anti-static dryer fabric with mixed conductive yarn and copper wire for food belt dryers" width="466" height="350" loading="lazy" decoding="async">
          <figcaption>Anti-static construction for food belt dryers.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Food belt dryers — anti-static</h3>
          
          <p>Food-grade anti-static dryer fabrics for belt dryers — no dust cling, no product wrap-up, stable air permeability between washes.</p>
          <p class="app-links"><a href="/dryer-fabric/">Dryer Fabric →</a></p>
        </div>
      </div>
      
      <div class="proc-item">
        <h3><a href="/spiral-belt/">Vacuum belt drying (liquid medicine, extracts)</a></h3>
        <p>Non-stick PTFE belts for multi-layer vacuum belt dryers — mesh belts for evaporation, solid belts for pastes — the standard duty for liquid medicine and food extracts.</p>
      </div>
      
      <div class="proc-item">
        <h3><a href="/spiral-belt/">Noodle drying belts</a></h3>
        <p>PTFE and polyester drying belts for noodle and strip-product drying lines — non-stick surfaces, anti-static options.</p>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <img src="/qfy-content/uploads/live/pressbelt-f.jpg" alt="Woven press belt fabric for juice and palm oil squeezing lines" width="500" height="350" loading="lazy" decoding="async">
          <figcaption>Press belt fabric — smooth, easy-cleaning surface.</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Juice & palm oil pressing</h3>
          
          <p>SP-P spiral press belts with flat filler yarns and woven press belts — smooth surface, high juice yield, easy cleaning.</p>
          <p class="app-links"><a href="/spiral-belt/">Spiral Fabric →</a></p>
        </div>
      </div>
      
      <div class="proc-item">
        <h3><a href="/products/square-mesh/">Sieving & sifting</a></h3>
        <p>Fine polyester square mesh for flour, powder and ingredient sieving (40–200 mesh).</p>
      </div>
    </div>
    <div class="oem-note"><strong>Platform note.</strong> Food-contact compliant materials on request; document pack available.</div>
    <div class="related">
      <h2>Products for this industry</h2>
      <div class="related-grid"><a href="/spiral-belt/">Spiral Fabric →</a><a href="/dryer-fabric/">Dryer Fabric →</a><a href="/spiral-belt/">Spiral Fabric →</a><a href="/products/square-mesh/">Polyester Square Mesh →</a></div>
    </div>
</div>${contactSection}`, activeNav: "industries" }));
write("industries/nonwovens/index.html", layout({ url: `${BASE}/industries/nonwovens/`, title: "Nonwoven Forming Belts & Conveyor Meshes | Aurora Filtech", desc: "Forming belts and conveyor meshes for nonwoven production — drylaid, airlaid, spunlaid (spunbond & meltblown) and wetlaid. Polyester, PPS and stainless steel.", type: "website", body: `
<section class="p3-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/industries/">Industries</a> › <span>Nonwovens</span></nav><h1>Nonwoven Forming Belts & Conveyor Meshes</h1></div></section>
<div class="wrap article3">
<p>Every nonwoven starts as a web laid on a forming belt, and is consolidated in a second step — hydroentanglement (spunlace), needle punch or thermal bonding. The route differs; the belt is the constant. Aurora weaves the forming belts and conveyor meshes for all four web-formation routes — drylaid, airlaid, spunlaid and wetlaid — plus the dryer fabrics downstream. Anti-static, quick-draining, fiber-retaining, in polyester, PPS or stainless steel.</p>
    <h2>By process stage</h2>
    <div class="proc-list">
      
      <div class="rowblock">
        <figure class="rowshot">
          <div class="gal3">
            <img src="/qfy-content/uploads/nw/nw-diag-drylaid.jpg" alt="Drylaid nonwoven process diagram: carding and cross-lapping build the batt" width="524" height="333" loading="lazy" decoding="async">
            <img src="/qfy-content/uploads/nw/nw-pr-drylaid.jpg" alt="Dryer screen mesh — fine square mesh belt carrying the drylaid batt" width="302" height="212" loading="lazy" decoding="async">
          </div>
          <figcaption>Drylaid route (left) — the dryer screen mesh that carries the batt (right).</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Drylaid — carding &amp; cross-lapping</h3>
          <p class="app-tag">Web formation</p>
          <p>Staple fibers are opened, carded and cross-lapped into a batt on the forming belt. The belt under a drylaid line is a fine square mesh (dryer screen mesh): heat-set, flat and dimensionally stable, so the batt builds evenly and the belt tracks true through card and lapper, run after run.</p>
          <p class="app-links"><a href="/products/square-mesh/">Polyester Square Mesh →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <div class="gal3">
            <img src="/qfy-content/uploads/nw/nw-diag-airlaid.jpg" alt="Airlaid nonwoven process diagram: fibers dispersed in air and deposited under vacuum" width="524" height="333" loading="lazy" decoding="async">
            <img src="/qfy-content/uploads/nw/nw-pr-airlaid.jpg" alt="Forming fabric for airlaid nonwoven fabric production" width="300" height="210" loading="lazy" decoding="async">
          </div>
          <figcaption>Airlaid route (left) — the forming fabric under the former (right).</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Airlaid</h3>
          <p class="app-tag">Web formation</p>
          <p>Short fibers and pulp are dispersed in air and deposited onto a forming fabric, with vacuum beneath pulling the web together in one step. Air permeability and fiber retention decide how even that web is — the two properties we tune first on an airlaid forming belt.</p>
          <p class="app-links"><a href="/products/square-mesh/">Polyester Square Mesh →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <div class="gal3">
            <img src="/qfy-content/uploads/nw/nw-diag-spunlaid.jpg" alt="Spunlaid nonwoven process diagram: filaments laid onto the forming screen" width="524" height="333" loading="lazy" decoding="async">
            <img src="/qfy-content/uploads/nw/nw-pr-spunlaid.jpg" alt="Anti-hydrolysis dryer fabric used downstream of spunlaid nonwoven lines" width="300" height="210" loading="lazy" decoding="async">
          </div>
          <figcaption>Spunlaid route (left) — anti-hydrolysis dryer fabric downstream (right).</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Spunlaid — spunbond &amp; meltblown</h3>
          <p class="app-tag">Web formation</p>
          <p>Polymer is spun, drawn and laid directly onto a forming screen under the spinneret — vacuum boxes beneath pull air through so the filament web lies flat. Downstream of bonding, anti-hydrolysis dryer fabrics carry the web through the line; the screen mesh for spunlaid and this dryer fabric usually come as a set from us.</p>
          <p class="app-links"><a href="/dryer-fabric/">Dryer Fabric →</a></p>
        </div>
      </div>
      
      <div class="rowblock">
        <figure class="rowshot">
          <div class="gal3">
            <img src="/qfy-content/uploads/nw/nw-diag-wetlaid.jpg" alt="Wetlaid nonwoven process diagram: web formed from a fiber slurry, then bonded and dried" width="524" height="333" loading="lazy" decoding="async">
            <img src="/qfy-content/uploads/nw/nw-pr-wetlaid.jpg" alt="Wetlaid forming fabric for nonwoven fabric production" width="278" height="209" loading="lazy" decoding="async">
          </div>
          <figcaption>Wetlaid route (left) — the wetlaid forming fabric (right).</figcaption>
        </figure>
        <div class="rowtxt">
          <h3>Wetlaid</h3>
          <p class="app-tag">Web formation</p>
          <p>Wetlaid lines form the web from a fiber slurry, exactly as a paper machine does: the forming fabric drains water while retaining fiber. Fine, uniform openings and easy cleaning make our wetlaid forming fabrics a natural extension of the paper machine clothing we have woven for 30 years.</p>
          <p class="app-links"><a href="/forming-fabric/">Forming Fabric →</a></p>
        </div>
      </div>
      
      <div class="proc-item">
        <h3>Seam types</h3>
        <div class="gal3">
          <figure><img src="/qfy-content/uploads/nw/nw-seam-single.jpg" alt="Single loop seam of a nonwoven filter fabric belt, close-up" width="300" height="210" loading="lazy" decoding="async"><figcaption>Single loop seam</figcaption></figure>
          <figure><img src="/qfy-content/uploads/nw/nw-seam-double.jpg" alt="Double rim seam on an anti-static nonwoven dryer fabric" width="292" height="210" loading="lazy" decoding="async"><figcaption>Double rim seam — anti-static fabrics</figcaption></figure>
          <figure><img src="/qfy-content/uploads/nw/nw-seam-endless.jpg" alt="Endless joint nonwoven belt, close-up of the seamless edge" width="281" height="186" loading="lazy" decoding="async"><figcaption>Endless joint</figcaption></figure>
        </div>
        <p>Every belt is joined to suit the machine: single loop for quick change-outs, double rim — standard on our anti-static fabrics — or a truly endless joint where the most sensitive webs demand it.</p>
      </div>
      
      <div class="proc-item">
        <h3><a href="/spiral-belt/">Materials, temperature &amp; duty</a></h3>
        <p>Nonwoven belts run from 180 °C up to 260 °C duty — polyester as standard, PPS and stainless steel where heat demands it. Special weave structures keep the belt stable under needle looms and high-pressure water jets alike, and high air flow through the belt is what makes web bonding efficient.</p>
      </div>
    </div>
    <div class="oem-note"><strong>Platform note.</strong> Fabrics to fit the common nonwoven line platforms.</div>
    <div class="related">
      <h2>Products for this industry</h2>
      <div class="related-grid"><a href="/dryer-fabric/">Dryer Fabric →</a><a href="/products/square-mesh/">Polyester Square Mesh →</a><a href="/spiral-belt/">Spiral Fabric →</a></div>
    </div>
</div>${contactSection}`, activeNav: "industries" }));
write("industries/wood-based-panels/mesh-belts/index.html", layout({ url: `${BASE}/industries/wood-based-panels/mesh-belts/`, title: "Wood Panel & Biomass Drying Mesh Belts | Aurora Filtech", desc: "Square mesh and spiral dryer belts for wood chip, shavings, strand and pellet drying — alternative to OEM mesh belts for panel board plants.", type: "website", body: `
<section class="p3-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/industries/">Industries</a> › <span>Mesh Belts</span></nav><h1>Wood Panel & Biomass Drying Mesh Belts</h1></div></section>
<div class="wrap article3">
<p>Wood panel and biomass dryers run on permeable mesh belts: chips, shavings and strands carried on decks where hot air is pulled through belt and product. Aurora SM square mesh belts and SP-D spiral dryer fabrics serve these decks — woven to the same disciplines as the OEM mesh belts they replace, at direct factory pricing.</p>
    <h2>By duty</h2>
    <div class="proc-list">
      <div class="proc-item">
        <h3><a href="/products/square-mesh/">Drying decks (chips, shavings, pellets)</a></h3>
        <p>Fine square mesh belts in plain weave PET — quiet running, stable tracking, high open area for through-air drying.</p>
      </div>
      <div class="proc-item">
        <h3><a href="/spiral-belt/">Strand & particle dryers (OSB / PB)</a></h3>
        <p>Open spiral dryer fabrics without filler yarns, up to ~900 CFM, anti-static versions available.</p>
      </div>
      <div class="proc-item">
        <h3><a href="/forming-fabric/">Forming & pre-press</a></h3>
        <p>Anti-static forming fabrics for forming lines and pre-press inlets.</p>
      </div>
    </div>
    <div class="oem-note"><strong>Platform note.</strong> Alternative / compatible with OEM mesh belts on the common belt dryer platforms (Swiss Combi and Büttner-type low-temperature belt dryers; Chinese line builders). Send us the old belt's drawing or a photo of its data tag.</div>
    <div class="related">
      <h2>Products for this application</h2>
      <div class="related-grid"><a href="/products/square-mesh/">Polyester Square Mesh →</a><a href="/spiral-belt/">Spiral Fabric →</a><a href="/dryer-fabric/">Dryer Fabric →</a></div>
    </div>
</div>${contactSection}`, activeNav: "industries" }));
write("industries/wood-flour-sifting/index.html", layout({ url: `${BASE}/industries/wood-flour-sifting/`, title: "Wood Flour Sieving Mesh for WPC | Aurora Filtech", desc: "Polyester square mesh (40-140 mesh count) for wood flour and WPC fines classification on vibrating, gyratory and circular sifters.", type: "website", body: `
<section class="p3-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/industries/">Industries</a> › <span>Wood Flour Sifting</span></nav><h1>Wood Flour Sieving Mesh for WPC</h1></div></section>
<div class="wrap article3">
<p>Wood-plastic composite (WPC) lines classify wood flour on vibrating, rotating or oscillating screens — typically 40 to 140 mesh, with 60 and 80 mesh the common cuts. Aurora SM polyester square mesh gives stainless-steel precision at lighter weight and lower cost on these dry, low-abrasion duties, supplied as cut panels edged to your frame or as re-mesh for circular sifters.</p>
    <h2>By duty</h2>
    <div class="proc-list">
      <div class="proc-item">
        <h3><a href="/products/square-mesh/">Mesh count selection</a></h3>
        <p>40–140 mesh for WPC flour; aperture and open area per count in our spec table.</p>
      </div>
      <div class="proc-item">
        <h3><a href="/products/square-mesh/">Panels & re-mesh</a></h3>
        <p>Cut and edged panels for gyratory / oscillating sifters; re-mesh service for SWECO-type circular separators.</p>
      </div>
      <div class="proc-item">
        <h3><a href="/products/square-mesh/">Fines recovery on panel lines</a></h3>
        <p>Sifting mesh for fines streams beside the main (roller / disc) screen lines.</p>
      </div>
    </div>
    <div class="oem-note"><strong>Platform note.</strong> Popular in North American WPC and panel plants; also supplied for general flour and powder sieving.</div>
    <div class="related">
      <h2>Products for this application</h2>
      <div class="related-grid"><a href="/products/square-mesh/">Polyester Square Mesh →</a><a href="/products/filter-cartridge/">Filter Cartridge →</a></div>
    </div>
</div>${contactSection}`, activeNav: "industries" }));
write("about/index.html", layout({ url: `${BASE}/about/`, title: "About Us | Filter Fabric Manufacturer | Aurora Filtech", desc: "30+ years weaving filter fabrics across 3 factories. In-house chain from yarn to sewn cloth on German looms.", type: "website", body: `
<section class="p3-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <span>About</span></nav><h1>About Aurora Filtech</h1></div></section>
<div class="wrap article3">
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

    
    <div class="eq-step">
      <div class="rowtxt">
        <h3>1 · Multifilament yarn production</h3>
        <p class="app-tag">Where the fabric starts</p>
        <p>We produce our own multifilament yarns — the raw material of clarity-critical filter cloths — so yarn count, twist and tenacity are set by us, not by a supplier's shelf.</p>
      </div>
      <figure class="eq-strip">
        <img src="/qfy-content/uploads/eq/eq-yarn.jpg" alt="Multifilament yarn production line twisting polyester yarn for filter fabrics" width="1300" height="360" loading="lazy" decoding="async">
      </figure>
    </div>

    
    <div class="eq-step">
      <div class="rowtxt">
        <h3>2 · Beam warping</h3>
        <p class="app-tag">Thousands of ends, one beam</p>
        <p>Warping frames wind thousands of yarns onto the beam in a fixed, tension-controlled order. Even tension here is what keeps the finished fabric's density — and its permeability — uniform across the width.</p>
      </div>
      <figure class="eq-strip">
        <img src="/qfy-content/uploads/eq/eq-warping.jpg" alt="Beam warping frames winding thousands of warp yarns for filter fabric weaving" width="1300" height="360" loading="lazy" decoding="async">
      </figure>
    </div>

    
    <div class="eq-step">
      <div class="rowtxt">
        <h3>3 · Weaving — the climate-controlled loom hall</h3>
        <p class="app-tag">Constant temperature &amp; humidity</p>
        <p>Filter fabrics are woven in a constant-climate hall: stable temperature and humidity keep yarn moisture and tension consistent shift after shift, so the weave that ships in March matches the weave that shipped in September. German <b>Dornier looms</b> (below) are the weaving platform behind our PMC and filter fabric precision.</p>
      </div>
      <figure class="eq-strip">
        <img src="/qfy-content/uploads/eq/eq-weaving.jpg" alt="Climate-controlled weaving workshop with rows of filter fabric looms running" width="1300" height="360" loading="lazy" decoding="async">
      </figure>
    </div>

    <figure class="eq-strip">
      <img src="/qfy-content/uploads/eq/eq-dornier.jpg" alt="German Dornier weaving machine weaving filter fabric, close-up" width="1300" height="360" loading="lazy" decoding="async">
      <figcaption>German Dornier looms in the climate-controlled hall.</figcaption>
    </figure>

    
    <div class="eq-step">
      <div class="rowtxt">
        <h3>4 · Heat setting</h3>
        <p class="app-tag">Where the fabric gets its memory</p>
        <p>The woven fabric passes through the heat-setting line, where controlled temperature locks in the weave: aperture stays square, width stays stable, and permeability becomes a number you can rely on at working temperature.</p>
      </div>
      <figure class="eq-strip">
        <img src="/qfy-content/uploads/eq/eq-heatset.jpg" alt="Heat setting line stabilizing woven filter fabric under controlled temperature" width="1300" height="360" loading="lazy" decoding="async">
      </figure>
    </div>

    
    <div class="eq-step">
      <div class="rowtxt">
        <h3>5 · Laser cutting</h3>
        <p class="app-tag">Cloth shapes, cut clean</p>
        <p>Large-format laser beds cut the set cloth to shape — press cloths, cartridge media, belt blanks — with sealed edges and none of the fraying a blade leaves behind.</p>
      </div>
      <figure class="eq-strip half">
        <img src="/qfy-content/uploads/eq/eq-laser.jpg" alt="Large-format laser cutting bed cutting filter cloth to shape" width="1000" height="890" loading="lazy" decoding="async">
      </figure>
    </div>

    
    <div class="eq-step">
      <div class="rowtxt">
        <h3>6 · Sewing &amp; finishing</h3>
        <p class="app-tag">Ready to run</p>
        <p>The final step: multi-row sewn seams, eyelets, grommets and edge reinforcements fitted to your machine's drawing — the cloth arrives ready to run, not ready to adapt.</p>
      </div>
      <figure class="eq-strip half">
        <img src="/qfy-content/uploads/eq/eq-sewing.jpg" alt="Sewing workstations finishing press filter cloths with multi-row seams" width="1000" height="682" loading="lazy" decoding="async">
      </figure>
    </div>

    <div class="accounting"><span class="ico">Σ</span><p><b>Why the chain matters to you.</b> Every parameter you buy — CFM, micron rating, tensile, seam strength — was controlled at a step inside these walls. When something must be tuned for your machine, the people who spun, warped, wove, set, cut and sewed the fabric are the people who take your call.</p></div>
</div>${contactSection}`, activeNav: "industries" }));
write("blog/index.html", layout({ url: `${BASE}/blog/`, title: "Blog & Guides | Aurora Filtech", desc: "Selection guides and terminology explainers from Aurora Filtech engineers.", type: "website", body: `<section class="p3-head"><div class="wrap"><nav class="crumbs"><a href="/">Home</a> › <span>Blog</span></nav><h1>Blog &amp; Guides</h1></div></section><div class="wrap article3"><ul class="apps3"><li><a href="/blog/forming-fabric-guide/">What Is a Forming Fabric (Forming Wire)? A Practical Guide</a></li><li><a href="/blog/spiral-fabric-guide/">Spiral Fabric Guide: Dryer Fabric vs Press Belt, and Filler Yarns Explained</a></li><li><a href="/blog/ptfe-belt-joint-types/">PTFE / Teflon Belt Joint Types Compared: Bullnose, Scarfed, Pin & Endless</a></li></ul></div>${contactSection}` }));
write("blog/forming-fabric-guide/index.html", layout({ url: `${BASE}/blog/forming-fabric-guide/`, title: "What Is a Forming Fabric (Forming Wire)? A Practical Guide | Aurora Filtech", desc: "What a forming fabric (forming wire) is, layer constructions, mesh count and CFM explained, and how to choose — a practical guide from Aurora Filtech.", type: "website", body: `
<section class="p3-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog/">Blog</a> › <span>Forming Fabric Guide</span></nav><h1>What Is a Forming Fabric (Forming Wire)? A Practical Guide</h1></div></section>
<div class="wrap article3">

</div>${contactSection}`, activeNav: "industries" }));
write("blog/spiral-fabric-guide/index.html", layout({ url: `${BASE}/blog/spiral-fabric-guide/`, title: "Spiral Fabric Guide: Dryer Fabric vs Press Belt, and Filler Yarns Explained | Aurora Filtech", desc: "Spiral fabric explained: spiral links, filler yarns (round vs flat), spiral dryer fabric vs spiral press filter belt, and how to choose.", type: "website", body: `
<section class="p3-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog/">Blog</a> › <span>Spiral Fabric Guide</span></nav><h1>Spiral Fabric Guide: Dryer Fabric vs Press Belt, and Filler Yarns Explained</h1></div></section>
<div class="wrap article3">

</div>${contactSection}`, activeNav: "industries" }));
write("blog/ptfe-belt-joint-types/index.html", layout({ url: `${BASE}/blog/ptfe-belt-joint-types/`, title: "PTFE / Teflon Belt Joint Types Compared: Bullnose, Scarfed, Pin & Endless | Aurora Filtech", desc: "PTFE belt joint types compared: bullnose, scarfed, pin (alligator) and endless — strength, smoothness and when to use each joint.", type: "website", body: `
<section class="p3-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/blog/">Blog</a> › <span>Ptfe Belt Joint Types</span></nav><h1>PTFE / Teflon Belt Joint Types Compared: Bullnose, Scarfed, Pin & Endless</h1></div></section>
<div class="wrap article3">

</div>${contactSection}`, activeNav: "industries" }));
write("resources/glossary/index.html", layout({ url: `${BASE}/resources/glossary/`, title: "Filtration Glossary | Filter Fabric & PMC Terms | Aurora Filtech", desc: "Glossary of filtration and paper machine clothing terms.", type: "website", body: `
<section class="p3-head"><div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <span>Glossary</span></nav><h1>Filtration Glossary</h1></div></section>
<div class="wrap article3">
<p>Glossary.</p>
</div>${contactSection}`, activeNav: "industries" }));
write("404.html", layout({ url: `${BASE}/404.html`, title: "Page Not Found | Aurora Filtech", desc: "The page you requested does not exist.", type: "website", jsonld: "", body: `<section class="p3-head"><div class="wrap"><h1>Page not found</h1><p class="lede">That URL does not exist — it may have moved when we merged product families.</p></div></section><div class="wrap article3"><ul class="apps3"><li><a href="/">Home</a></li><li><a href="/dryer-fabric/">Dryer Fabric</a></li><li><a href="/forming-fabric/">Forming Fabric</a></li><li><a href="/spiral-belt/">Spiral Fabric</a></li><li><a href="/about/">About Us</a></li></ul></div>` }));
write("_redirects", "/teflon-belt/ /spiral-belt/ 301\n/spiral-dryer-fabric/ /spiral-belt/ 301\n/spiral-press-filter-belt/ /spiral-belt/ 301\n/products/paper-machine-clothing/ /forming-fabric/ 301\n/about-us/ /about/ 301\n/contact-us/ / 301\n/food-filtration-fabric/ /industries/food-and-pharma/ 301\n/mining-filter-fabric/ /industries/mining/ 301\n/nonwoven/ /industries/nonwovens/ 301\n/products/panel-board/ /industries/wood-based-panels/ 301\n/peek-fiber-pps-monofilament/ /spiral-belt/ 301\n/products/feed/ /blog/ 301\n");

// sitemap.xml
const urls = [`${BASE}/`, ...products.map(p => urlOf(p.slug))];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${BASE}/about/</loc><lastmod>2026-09-30</lastmod></url>
<url><loc>${BASE}/industries/</loc><lastmod>2026-09-30</lastmod></url>
<url><loc>${BASE}/blog/</loc><lastmod>2026-09-30</lastmod></url>
<url><loc>${BASE}/resources/glossary/</loc><lastmod>2026-09-30</lastmod></url>
${urls.map(u => `  <url><loc>${u}</loc><changefreq>monthly</changefreq></url>`).join("\n")}
</urlset>`);

// sitemap-image.xml (spec §9.2 — same URLs/captions as V1)
const esc = s => s.replace(/&/g, "&amp;");
function imgEntry(loc, title, caption) {
  return `    <image:image>
      <image:loc>${loc}</image:loc>
      <image:title>${esc(title)}</image:title>
      <image:caption>${esc(caption)}</image:caption>
    </image:image>`;
}
const imgSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${BASE}/</loc>
${[
  [`${BASE}${IMG.h1}`, "Filter fabric weaving workshop", "Aurora Filtech filter fabric weaving workshop."],
  [`${BASE}${IMG.h2}`, "Monofilament", "In-house monofilament production — quality under our control, and a high degree of customization."],
  ...homeCards.map(p => [`${BASE}${p.card.img}`, p.card.h2.charAt(0)+p.card.h2.slice(1).toLowerCase(), p.card.caption.replace(/—/g, "-")]),
].map(([l,t,c]) => imgEntry(l,t,c)).join("\n")}
  </url>
  <url><loc>${BASE}/forming-fabric/</loc>
${imgEntry(`${BASE}/qfy-content/uploads/2019/09/c77f027fd05a12043ba86232dbdbd87a.jpg`, "Forming fabric", "Forming fabric for paper machines and non-woven forming machines.")}
  </url>
  <url><loc>${BASE}/dryer-fabric/</loc>
${imgEntry(`${BASE}/qfy-content/uploads/2023/02/fe14b23c21fc9da13b521b792acf44ee.jpg`, "Dryer fabric", "Dryer fabric for board, paper and food drying.")}
${imgEntry(`${BASE}/qfy-content/uploads/2019/09/01208d8bdb0d682815afe19b9446d8c6.jpg`, "Anti-static dryer fabric", "Anti-static dryer fabric for wood panel forming.")}
  </url>
  <url><loc>${BASE}/vacuum-fabric/</loc>
${imgEntry(`${BASE}/qfy-content/uploads/2018/01/c758862f83257dc972f1e1934586c5f1.jpg`, "Vacuum filter fabric", "Vacuum filter fabric for vacuum belt filters and vacuum disc filters.")}
  </url>
  <url><loc>${BASE}/press-fabric/</loc>
${imgEntry(`${BASE}/qfy-content/uploads/2019/09/d4f377239978d23c7b1098681b945ba0.jpg`, "Press filter fabric", "Press filter fabric / filter cloth for frame and membrane filter presses.")}
  </url>
  <url><loc>${BASE}/press-belt/</loc>
${imgEntry(`${BASE}/qfy-content/uploads/2018/01/fe3317fefb27841fe260dfab9a83a362.jpg`, "Press filter belt", "Press filter belt (dewatering belt) for belt press filters.")}
  </url>
  <url><loc>${BASE}/teflon-belt/</loc>
${imgEntry(`${BASE}/qfy-content/uploads/2019/09/0016072e9e586e75a7b3560370c90d92.jpg`, "Teflon mesh belt", "Teflon mesh belt for dryers and conveyors.")}
  </url>
  <url><loc>${BASE}/products/filter-bag/</loc>
${imgEntry(`${BASE}/qfy-content/uploads/2023/02/filter-bag-banner.jpg`, "Dust filter bags", "Dust filter bags for bag filters and dust collectors - power plant and cement plant applications.")}
  </url>
  <url><loc>${BASE}/products/filter-cartridge/</loc>
${imgEntry(`${BASE}/qfy-content/uploads/2023/02/3aacdceeba645c1a58a832b60137c3b7.jpg`, "Filter cartridge", "Industrial filter cartridge for air, water and oil filtration.")}
  </url>
  <url><loc>${BASE}/spiral-belt/</loc><!-- 待补:该页图片稳定 URL(spec §9.2) -->
  </url>
</urlset>`;
write("sitemap-image.xml", imgSitemap);

write("sitemap-index.xml", `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${BASE}/sitemap.xml</loc></sitemap>
  <sitemap><loc>${BASE}/sitemap-image.xml</loc></sitemap>
</sitemapindex>`);

write("robots.txt", `# robots.txt — www.aurora-filtech.com
User-agent: *
Allow: /
Disallow: /wp-admin/
Disallow: /wp-login.php
Disallow: /qfy-admin/
Disallow: /qfy-includes/
Disallow: /qfy-content/plugins/
Disallow: /qfy-content/cache/
Disallow: /*?s=
Disallow: /*?iphorm_swfupload

Sitemap: ${BASE}/sitemap.xml
Sitemap: ${BASE}/sitemap-image.xml
`);

write("favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0FA89B"/><stop offset=".5" stop-color="#4F7CF7"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient></defs><rect width="64" height="64" rx="18" fill="url(#g)"/><path d="M12 44c8-2 10-24 20-24s10 22 20 24" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`);

write("_headers", `# Cloudflare Pages cache policy (harmless on other hosts)
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/qfy-content/*
  Cache-Control: public, max-age=31536000, immutable
/favicon.svg
  Cache-Control: public, max-age=604800
/*
  X-Content-Type-Options: nosniff
`);

console.log("DONE V3 — 10 pages + sitemaps + robots.txt");
