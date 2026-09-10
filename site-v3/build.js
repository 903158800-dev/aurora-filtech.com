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
    slug: "forming-fabric", name: "Forming Fabric", h1: "Forming Fabric (Forming Belt)",
    title: "Forming Fabric | Paper and Non-woven Forming | Aurora Filtech",
    desc: "1-layer, 2-layer and 3-layer forming fabrics for paper machines and non-woven forming machines. Anti-hydrolysis monofilament. OEM/ODM from Aurora Filtech.",
    card: { h2: "FORMING FABRIC", img: IMG.c1, w: 671, h: 386,
      alt: "Forming fabric running on a non-woven fabric forming machine",
      caption: "Forming fabrics for paper machines and non-woven fabric forming machines — paper forming, nonwoven forming and graphite flake forming.",
      first: "Our forming fabrics keep paper machines, belt conveyors and non-woven fabric forming machines running at full speed.",
      equipment: ["Paper mills", "Belt conveyor", "Non-woven fabric forming machine"],
      applications: ["Nonwoven fabric forming", "Paper forming", "Graphite flake forming"] },
    jsonldId: "forming-fabric", imageId: "image-forming-fabric",
    altNames: ["Forming belt", "Paper forming fabric", "Non-woven forming fabric", "Anti-hydrolysis forming fabric"],
    keywords: "forming fabric, paper forming fabric, non-woven forming fabric, paper machine clothing, graphite flake forming",
    category: "Industrial filter fabrics",
    pdesc: "Industrial forming fabrics for paper machines and non-woven fabric forming machines. Available in 1-layer, 1.5-layer, 2-layer and 3-layer constructions with anti-hydrolysis yarns.",
    banner: { url: IMG.c1, alt: "Close-up of a paper forming fabric with anti-hydrolysis monofilaments", caption: "Forming fabric for paper machines and non-woven forming machines.", w: 671, h: 386, maxW: 671 },
    intro: "Forming fabrics are precision-woven monofilament belts that form and dewater the fibre web on paper machines, belt conveyors and non-woven fabric forming machines. Aurora Filtech supplies 1-layer, 1.5-layer, 2-layer and 3-layer constructions with anti-hydrolysis yarns for long service life.",
    apps: ["Paper mills — paper forming and drying-section support", "Non-woven fabric forming machines — spunlace, needle-punch and airlaid lines", "Belt conveyors and graphite flake forming lines"],
    specs: ["Constructions: 1-layer, 1.5-layer, 2-layer, 3-layer", "Yarn: polyester (PET) monofilament, anti-hydrolysis option", "Seam: pin seam, clipper seam or endless on request", "Edges: sealed or reinforced", "Widths and lengths: custom", "OEM/ODM: available"],
    related: ["dryer-fabric", "spiral-belt"],
    faqs: [
      ["What is a forming fabric?", "A forming fabric is a woven monofilament belt used on paper machines and non-woven forming machines to form and dewater the fibre web at the wet end of the process."],
      ["Which layer construction should I choose?", "1-layer fabrics offer maximum drainage, 2-layer and 3-layer constructions provide a smoother surface and better stability for fine paper and nonwoven products. We recommend based on your machine and product."],
      ["Do you offer anti-hydrolysis forming fabrics?", "Yes. Anti-hydrolysis monofilament yarns extend fabric life in humid, hot forming sections. Tell us your operating conditions and we will recommend the right yarn."],
    ],
  },
  {
    slug: "dryer-fabric", name: "Dryer Fabric", h1: "Dryer Fabric (Dryer Belt)",
    title: "Dryer Fabric | Anti-static Dryer Belts | Aurora Filtech",
    desc: "Anti-static and anti-hydrolysis dryer fabrics for board forming, paper drying and food drying machines. Strong warp loop seams, custom widths.",
    card: { h2: "DRYER FABRIC", img: IMG.c2, w: 671, h: 386,
      alt: "Anti-static dryer fabric running on a board forming dryer",
      caption: "Anti-static dryer fabrics for board forming machines, food drying machines and belt drying machines — wood panel board forming, paper drying and food drying.",
      first: "Anti-static dryer fabrics eliminate static build-up on board forming machines, food drying machines and belt drying machines.",
      equipment: ["Board forming machine", "Food drying machine", "Belt drying machine"],
      applications: ["Wood panel board forming", "Paper drying", "Food drying"] },
    jsonldId: "dryer-fabric", imageId: "image-dryer-fabric",
    altNames: ["Dryer belt", "Anti-static dryer belt", "Dryer screen mesh", "Drying mesh", "Anti-hydrolysis dryer fabric"],
    keywords: "dryer fabric, dryer belt, anti-static dryer fabric, pre-press fabric, board forming machine, food drying machine, belt drying machine",
    category: "Industrial dryer fabrics",
    pdesc: "Anti-static dryer fabrics and dryer belts for board forming, paper drying and food drying machines. Anti-static, anti-hydrolysis and heat-resistant constructions with strong warp loop seams.",
    banner: { url: IMG.dryer1, alt: "Close-up of anti-static dryer fabric with anti-static monofilament yarns", caption: "Dryer fabric for board, paper and food drying.", w: 500, h: 350, maxW: 500 },
    gallery: [
      { url: IMG.c2, alt: "Anti-static dryer fabric running on a board forming dryer", caption: "Anti-static dryer fabric for wood panel forming." },
    ],
    intro: "Dryer fabrics carry board, paper and food products through heated drying zones. Aurora Filtech anti-static and anti-hydrolysis dryer fabrics eliminate static build-up and resist heat degradation on board forming machines, food drying machines and belt drying machines.",
    apps: ["Wood panel board forming and MDF/OSB production lines", "Paper machines — drying section dryer fabrics", "Food drying machines and belt drying machines"],
    specs: ["Constructions: anti-static, anti-hydrolysis, heat-resistant", "Seam: strong warp loop seam, pin seam or endless", "Custom widths for every dryer width", "Food-grade options available", "OEM/ODM: available"],
    related: ["forming-fabric", "teflon-belt"],
    faqs: [
      ["Why choose an anti-static dryer fabric?", "Anti-static monofilament yarns drain static charges that build up on high-speed dryers, preventing dust attraction, sheet wrap-ups and operator shocks — especially on board forming and food drying machines."],
      ["What seam options are available?", "We offer strong warp loop seams as standard, plus pin seams and endless seaming on request for smooth running at high speeds."],
      ["Can dryer fabrics be used for food drying?", "Yes. We supply food-grade anti-static dryer fabrics for food drying machines and belt drying machines."],
    ],
  },
  {
    slug: "vacuum-fabric", name: "Vacuum Filter Fabric", h1: "Vacuum Filter Fabric (Vacuum Filter Belt)",
    title: "Vacuum Filter Fabric | FGD and Mining Filtration | Aurora Filtech",
    desc: "Vacuum filter fabrics for vacuum belt filters and vacuum disc filters. Power plant FGD, phosphoric acid and mining filtration. Custom sizes.",
    card: { h2: "VACUUM FILTER FABRIC", img: IMG.c3, w: 671, h: 386,
      alt: "Vacuum belt filter with filter fabric for FGD gypsum dewatering",
      caption: "Vacuum filter fabrics for vacuum belt filters and vacuum disc filters — power plant FGD, phosphoric acid and mining filtration.",
      first: "Vacuum filter fabrics engineered for vacuum belt filters and vacuum disc filters in demanding dewatering duties.",
      equipment: ["Vacuum belt filter", "Vacuum disc filter"],
      applications: ["Power plant FGD filtration", "Phosphoric acid filtration", "Mining plant filtration"] },
    jsonldId: "vacuum-filter-fabric", imageId: "image-vacuum-filter-fabric",
    altNames: ["Vacuum filter belt", "Vacuum fabric", "FGD filter fabric", "Vacuum belt filter fabric"],
    keywords: "vacuum filter fabric, vacuum filter belt, vacuum belt filter, vacuum disc filter, FGD fabric, phosphoric acid filtration, mining filtration",
    category: "Industrial filter fabrics",
    pdesc: "Vacuum filter fabrics for vacuum belt filters and vacuum disc filters in power plant FGD, phosphoric acid and mining filtration.",
    banner: { url: IMG.vacuumBanner, alt: "Close-up of vacuum filter fabric for vacuum belt and disc filters", caption: "Vacuum filter fabric for vacuum belt filters and vacuum disc filters.", w: 960, h: 255, maxW: 960 },
    intro: "Vacuum filter fabrics are engineered for vacuum belt filters and vacuum disc filters in demanding dewatering duties — power plant FGD gypsum dewatering, phosphoric acid filtration and mining plant filtration.",
    apps: ["Power plant FGD gypsum dewatering on vacuum belt filters", "Phosphoric acid and chemical process filtration", "Mining plant filtration — concentrates and tailings on vacuum disc filters"],
    specs: ["Materials: polyester (PET), polypropylene (PP), PVDF options", "Custom sizes for every belt and disc filter", "Seam: pin seam or endless", "Edges: sealed, welded or reinforced", "OEM/ODM: available"],
    related: ["press-fabric", "press-belt"],
    faqs: [
      ["Which material is best for FGD gypsum dewatering?", "For power plant FGD duties we typically recommend anti-hydrolysis polyester or PVDF vacuum fabrics depending on temperature and pH. Send us your process data for a recommendation."],
      ["Do you supply fabrics for vacuum disc filters?", "Yes. We cut and seam vacuum filter fabrics to fit vacuum disc filter sectors, with custom sizes for every model."],
      ["Can vacuum filter belts be made endless?", "Yes. Vacuum belt filter fabrics can be supplied endless or with pin seams, with sealed or reinforced edges."],
    ],
  },
  {
    slug: "press-fabric", name: "Press Filter Fabric", h1: "Press Filter Fabric (Filter Cloth)",
    title: "Press Filter Fabric | Frame and Membrane Press | Aurora Filtech",
    desc: "Press filter fabrics for frame press filters, membrane presses, drum, disc and leaf filters. Oil, mining, lithium phosphate and sludge dewatering.",
    card: { h2: "PRESS FILTER FABRIC", img: IMG.c4, w: 671, h: 386,
      alt: "Frame press filter with press filter fabric for sludge dewatering",
      caption: "Press filter fabrics for frame press filters, membrane press filters, drum, disc and leaf filters — oil, mining, lithium phosphate filtration and sludge dewatering.",
      first: "Press filter fabrics for frame press filters, membrane press filters and drum, disc or leaf filters.",
      equipment: ["Frame press filter", "Membrane press filter", "Drum / Disc / Leaf filter"],
      applications: ["Oil filtration", "Mining filtration", "Lithium phosphate filtration", "Sludge dewatering"] },
    jsonldId: "press-filter-fabric", imageId: "image-press-filter-fabric",
    altNames: ["Press fabric", "Filter cloth", "Membrane filter fabric", "Frame press filter fabric", "Drum filter fabric"],
    keywords: "press filter fabric, press fabric, filter cloth, membrane filter fabric, frame press filter, drum filter, leaf filter, sludge dewatering",
    category: "Industrial filter fabrics",
    pdesc: "Press filter fabrics and filter cloths for frame press filters, membrane press filters, drum, disc and leaf filters, including oil, mining, lithium phosphate and sludge dewatering applications.",
    banner: { url: IMG.c4, alt: "Close-up of press filter fabric for frame and membrane filter presses", caption: "Press filter fabric / filter cloth for frame and membrane filter presses.", w: 671, h: 386, maxW: 671 },
    intro: "Press filter fabrics (filter cloths) are woven for frame press filters, membrane press filters and drum, disc or leaf filters. They deliver clear filtrate and easy cake release across oil filtration, mining filtration, lithium phosphate filtration and sludge dewatering.",
    apps: ["Frame and membrane filter presses — sludge dewatering and lithium phosphate filtration", "Drum, disc and leaf filters — mining and oil filtration", "Chemical and food process filtration"],
    specs: ["Materials: PET, PP, PA, PVDF", "Weaves: plain, twill, satin; mono-filament, multi-filament and staple yarn", "Filter ratings from 1 to 100 microns", "Custom cut and sewn to your plate size", "OEM/ODM: available"],
    related: ["press-belt", "vacuum-fabric"],
    faqs: [
      ["How do I choose a press filter fabric?", "The choice depends on your filter type, particle size, temperature and chemistry. As a guide, mono-filament fabrics give easy cake release, multi-filament fabrics give finer retention. We recommend per application."],
      ["Do you supply cloths for membrane filter presses?", "Yes. We weave and cut membrane filter fabrics for membrane plate presses, including centrate drainage and seal-edge designs."],
      ["Can the cloths be made seamless?", "Barrel-neck and seamless cloths are available for full-plate designs on request."],
    ],
  },
  {
    slug: "press-belt", name: "Press Filter Belt", h1: "Press Filter Belt (Dewatering Belt)",
    title: "Press Filter Belt | Dewatering Belts | Aurora Filtech",
    desc: "Press filter belts for belt press filters. Sludge dewatering, sand washing, juice and palm oil squeezing. Reinforced seams, custom lengths.",
    card: { h2: "PRESS FILTER BELT", img: IMG.c5, w: 671, h: 386,
      alt: "Belt press filter with press filter belt for sludge dewatering",
      caption: "Press filter belts (dewatering belts) for belt press filters — sludge dewatering, sand washing, juice squeezing and palm oil squeezing.",
      first: "Press filter belts built for belt press filters — designed for long service life under high squeeze pressure.",
      equipment: ["Belt press filter"],
      applications: ["Sludge dewatering", "Sand washing", "Juice squeezing", "Palm oil squeezing"] },
    jsonldId: "press-filter-belt", imageId: "image-press-filter-belt",
    altNames: ["Press belt", "Dewatering belt", "Belt press filter belt"],
    keywords: "press filter belt, press belt, dewatering belt, belt press filter, sludge dewatering, sand washing, juice squeezing, palm oil squeezing",
    category: "Industrial filter belts",
    pdesc: "Press filter belts (dewatering belts) for belt press filters in sludge dewatering, sand washing, juice squeezing and palm oil squeezing.",
    banner: { url: IMG.pressBeltBanner, alt: "Close-up of a press filter belt with reinforced seam", caption: "Press filter belt (dewatering belt) for belt press filters.", w: 960, h: 255, maxW: 960 },
    intro: "Press filter belts (dewatering belts) are built for belt press filters — designed for long service life under high squeeze pressure in sludge dewatering, sand washing, juice squeezing and palm oil squeezing.",
    apps: ["Municipal and industrial sludge dewatering belt presses", "Sand washing and aggregate plants", "Fruit juice squeezing and palm oil squeezing presses"],
    specs: ["Material: polyester (PET) monofilament", "Seam: reinforced pin seam (stainless steel clipper on request)", "Permeability range: wide selection by dewatering stage", "Edges: sealed, welded or reinforced", "Widths and lengths: custom", "OEM/ODM: available"],
    related: ["spiral-belt", "press-fabric"],
    faqs: [
      ["What is a dewatering belt?", "A dewatering belt is the press filter belt that runs on a belt press filter, draining water through its open weave while withstanding high squeeze pressure between the press rollers."],
      ["Which belt permeability do I need?", "Coarser, more permeable belts suit the gravity drainage zone; tighter weaves suit the high-pressure pressing zone. We select permeability per press zone and material."],
      ["Are reinforced seams available?", "Yes. Reinforced seams extend belt life under high squeeze pressure; stainless steel clipper seams are available on request."],
    ],
  },
  {
    slug: "teflon-belt", name: "Teflon Belt", h1: "Teflon Belt (PTFE Belt)",
    title: "Teflon Belt | PTFE Belts for Belt Dryers | Aurora Filtech",
    desc: "Non-stick teflon (PTFE) belts for vacuum belt dryers, tunnel belt dryers and belt dryers. Food, pharmaceutical, tobacco and electronics drying.",
    card: { h2: "TEFLON (PTFE) BELT", img: IMG.c6, w: 671, h: 386,
      alt: "Horizontal vacuum belt dryer with multi-layer teflon dryer belts",
      caption: "Teflon (PTFE) dryer belts for vacuum belt dryers, tunnel belt dryers and belt dryers — food, liquid medicine, tobacco and electrical parts drying.",
      first: "Non-stick teflon (PTFE) belts for vacuum belt dryers, tunnel belt dryers and belt dryers.",
      equipment: ["Vacuum belt dryer", "Tunnel belt dryer", "Belt dryer"],
      applications: ["Food drying", "Liquid medicine drying", "Tobacco drying", "Electrical parts drying"] },
    jsonldId: "teflon-belt", imageId: "image-teflon-belt",
    altNames: ["PTFE belt", "Teflon conveyor belt", "PTFE conveyor belt", "PTFE dryer belt", "Teflon mesh belt"],
    keywords: "teflon belt, PTFE belt, teflon conveyor belt, vacuum belt dryer, tunnel belt dryer, belt dryer, food drying, pharmaceutical drying, tobacco drying",
    category: "Industrial conveyor belts",
    pdesc: "Teflon (PTFE) belts for vacuum belt dryers, tunnel belt dryers and belt dryers. Non-stick, food-grade PTFE conveyor belts for food, pharmaceutical, tobacco and electronics drying.",
    banner: { url: IMG.teflonBanner, alt: "Close-up of a teflon (PTFE) dryer belt for vacuum belt dryers", caption: "Teflon mesh belt for dryers and conveyors.", w: 238, h: 176, maxW: 340 },
    intro: "Non-stick teflon (PTFE) belts for vacuum belt dryers, tunnel belt dryers and belt dryers. The non-stick PTFE surface releases sticky products cleanly — food, liquid medicine, tobacco and electrical parts — across multi-layer low-temperature drying.",
    apps: ["Vacuum belt dryers — multi-layer teflon dryer belts for low-temperature evaporation drying", "Tunnel belt dryers and belt dryers for food and tobacco", "Electronics and electrical parts drying and conveyor lines"],
    specs: ["Construction: PTFE-coated glass-fibre fabric, mesh or solid", "Non-stick, food-grade surface", "Seam: bull-nose overlap, pin seam or endless on request", "Working temperature: up to 260 °C", "Widths: custom", "OEM/ODM: available"],
    related: ["dryer-fabric", "spiral-belt"],
    faqs: [
      ["Why use a teflon belt in a vacuum belt dryer?", "PTFE is non-stick and heat-resistant, so sticky or wet products release cleanly from the multi-layer dryer belts during low-temperature evaporation drying."],
      ["Mesh or solid teflon belt — which do I need?", "Mesh belts allow air and vapour through for faster drying; solid belts suit liquid, paste and sticky products. We advise per product."],
      ["Are the belts food-grade?", "Yes. Our PTFE belts are food-grade and widely used for food and liquid medicine drying."],
    ],
  },
  {
    slug: "products/filter-bag", name: "Filter Bag", h1: "Filter Bag (Dust Collector Bag)",
    title: "Filter Bag | Dust Collector Bags | Aurora Filtech",
    desc: "Dust filter bags for bag filters and dust collectors in power plants and cement plants. PET, PPS, Nomex and PTFE options.",
    card: { h2: "FILTER BAG", img: IMG.c7, w: 671, h: 386,
      alt: "Dust filter bags inside a baghouse dust collector",
      caption: "Dust filter bags for bag filters and dust collectors — power plant and cement plant applications.",
      first: "Dust filter bags for bag filters and dust collectors in power plants and cement plants.",
      equipment: ["Bag filter", "Dust collector"],
      applications: ["Power plant", "Cement plant"] },
    jsonldId: "filter-bag", imageId: "image-filter-bag",
    altNames: ["Dust filter bag", "Dust collector bag", "Bag filter", "Filter bag for dust collector"],
    keywords: "filter bag, dust filter bag, dust collector bag, bag filter, dust collector, power plant, cement plant",
    category: "Industrial filter bags",
    pdesc: "Dust filter bags for bag filters and dust collectors in power plants and cement plants.",
    banner: { url: IMG.filterBagBanner, alt: "Dust filter bags inside a baghouse dust collector", caption: "Dust filter bags for bag filters and dust collectors.", w: 1200, h: 576, maxW: 960 },
    intro: "Dust filter bags for bag filters and dust collectors in power plants and cement plants. PET, PPS, Nomex and PTFE felt options are matched to your gas temperature, chemistry and dust load.",
    apps: ["Power plant baghouses — coal-fired and biomass FGD dust collection", "Cement plant bag filters — kiln, raw mill and cement mill dedusting", "Steel, chemical and general industrial dust collection"],
    specs: ["Materials: PET (polyester), PPS, Nomex (meta-ramid), PTFE, P84", "Weights: 350–800 g/m²", "Finish: singed, calendared, PTFE membrane, anti-static", "Sizes: custom to your tube sheet", "Sewing: triple-stitched, with snap-band, flange or ring tops", "OEM/ODM: available"],
    related: ["products/filter-cartridge", "press-fabric"],
    faqs: [
      ["Which filter bag material suits a coal-fired power plant?", "PPS felt bags are the standard choice for coal-fired baghouses, offering sulphur and heat resistance. PTFE membrane PPS bags are used where finer emissions limits apply."],
      ["Do you make custom bag sizes?", "Yes. Every dust filter bag is sewn to your tube sheet diameter and length, with snap-band, flange or ring tops."],
      ["Are anti-static filter bags available?", "Yes. Anti-static felt bags are available for explosive dust applications."],
    ],
  },
  {
    slug: "products/filter-cartridge", name: "Filter Cartridge", h1: "Filter Cartridge (Cartridge Filter)",
    title: "Filter Cartridge | Air, Water and Oil Cartridges | Aurora Filtech",
    desc: "Industrial filter cartridges for air, water and oil filtration. Anti-static, PTFE, PPS, cellulose and Nomex series.",
    card: { h2: "FILTER CARTRIDGE", img: IMG.c8, w: 442, h: 401,
      alt: "Industrial filter cartridge for air, water and oil filtration",
      caption: "Filter cartridges for air filtration, water filtration and oil filtration.",
      first: "Filter cartridges for air, water and oil filtration systems — anti-static, PTFE, PPS, cellulose and Nomex series available.",
      equipment: ["Air filter", "Water filter", "Oil filter"],
      applications: ["Air filtration", "Water filtration", "Oil filtration"] },
    jsonldId: "filter-cartridge", imageId: "image-filter-cartridge",
    altNames: ["Cartridge filter", "Air filter cartridge", "Oil filter cartridge", "Water filter cartridge"],
    keywords: "filter cartridge, cartridge filter, air filter cartridge, water filter cartridge, oil filter cartridge, PTFE cartridge, PPS cartridge",
    category: "Industrial filter cartridges",
    pdesc: "Industrial filter cartridges for air, water and oil filtration systems. Anti-static, PTFE, PPS, cellulose and Nomex series available.",
    banner: { url: IMG.c8, alt: "Industrial filter cartridge for air, water and oil filtration", caption: "Industrial filter cartridge for air, water and oil filtration.", w: 442, h: 401, maxW: 442 },
    intro: "Industrial filter cartridges for air, water and oil filtration systems. Anti-static, PTFE, PPS, cellulose and Nomex series cover dust collection, process water and oil purification duties.",
    apps: ["Air filtration — dust collector cartridge filters and intake air", "Water filtration — process and circulating water cartridges", "Oil filtration — hydraulic and lubrication oil cartridge filters"],
    specs: ["Media: cellulose, polyester, PTFE membrane, PPS, Nomex", "Series: anti-static, water-repellent, oil-repellent finishes", "Filter ratings from 0.5 to 100 microns", "Sizes: custom to your housing", "End caps: galvanised or stainless steel, gasket options", "OEM/ODM: available"],
    related: ["products/filter-bag", "press-fabric"],
    faqs: [
      ["Which cartridge media suits hot flue gas dust collection?", "PPS and Nomex cartridges handle higher temperatures; PTFE membrane media deliver the finest emissions control. We recommend per gas condition."],
      ["Do cartridges fit standard housings?", "Yes. Cartridges are made to standard and custom housing sizes, with matched end caps and gaskets."],
      ["Are anti-static cartridges available?", "Yes. Anti-static series cartridges prevent static discharge in explosive dust applications."],
    ],
  },
  {
    slug: "spiral-belt", name: "Spiral Fabric", h1: "Spiral Fabric (Spiral Belt)",
    title: "Spiral Fabric | Spiral Dryer and Filter Belts | Aurora Filtech",
    desc: "Spiral fabrics for belt press filter dewatering and dryer applications. PET and PPS monofilament spirals with pin seams, custom widths. OEM/ODM.",
    card: null, // deliberately not on homepage (spec §1)
    jsonldId: "spiral-fabric", imageId: "image-spiral-fabric",
    altNames: ["Spiral belt", "Spiral dryer fabric", "Spiral filter belt", "Spiral conveyor belt", "Dewatering belt"],
    keywords: "spiral fabric, spiral belt, spiral dryer fabric, spiral filter belt, dewatering belt, spiral conveyor belt, belt press filter, dryer belt",
    category: "Industrial filter belts",
    pdesc: "Spiral fabrics and spiral belts for belt press filter dewatering and dryer applications. PET and PPS monofilament spirals joined by hinge pins, with custom widths and edge treatments.",
    banner: null, // IMAGE_URL_SPIRAL_BANNER 待补 (spec §7) — placeholder figure used below
    custom: true,
    related: ["press-belt", "dryer-fabric"],
  },
];

const bySlug = Object.fromEntries(products.map(p => [p.slug, p]));
const nameOf = s => bySlug[s].name;
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
<meta property="og:image" content="${IMG.og}">
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
      <a href="/teflon-belt/">Teflon Belt</a>
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
  <p>Also available: <a href="/spiral-belt/">spiral fabrics for belt press filters and dryers</a>.</p>
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
          <p>Aurora Filtech combine 30+ years of expertise with advanced German technology to deliver filtration media that lasts longer and performs better. From proprietary monofilament production to automated joint, we control every step of the process. Our also provide OEM/ODM service to help you to develop your local business.</p>
          <div class="feat3">
            <div class="f"><i>01</i><b>In-house monofilament</b><span>Proprietary yarn production for consistent quality.</span></div>
            <div class="f"><i>02</i><b>German weaving technology</b><span>Advanced looms and finishing.</span></div>
            <div class="f"><i>03</i><b>Automated joints</b><span>Precision seams, ready to run.</span></div>
            <div class="f"><i>04</i><b>OEM / ODM</b><span>Custom fabrics for your local business.</span></div>
          </div>
        </div>
        <figure class="shot">
          <img src="${IMG.h2}" alt="Proprietary monofilament yarns produced in-house for filter fabrics" width="716" height="298" loading="lazy" decoding="async">
          <figcaption>Proprietary monofilament production for filter fabrics and industrial belts.</figcaption>
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

function productBody(p) {
  let faqs, main;
  if (p.slug === "spiral-belt") {
    faqs = [
      ["What is the difference between a spiral fabric and a woven dryer fabric?", "A spiral fabric is assembled from monofilament spirals joined by hinge pins, giving it an open, non-tracking structure with high drainage. A woven dryer fabric is woven from warp and weft yarns and provides a smoother surface. Spiral fabrics are easier to repair on the machine, while woven fabrics usually offer higher stability at high speeds."],
      ["Can spiral fabric be used on belt press filters?", "Yes. On belt press filters, spiral fabrics work as filter belts for sludge dewatering, sand washing, juice squeezing and palm oil squeezing. Their open structure drains quickly and releases the filter cake easily."],
      ["Do you offer PPS spiral fabrics for higher temperatures?", "Yes. PPS monofilament spiral fabrics are available for higher-temperature drying applications. Tell us your working temperature and we will recommend the right material."],
    ];
    main = `
<p>Spiral fabrics are endless industrial belts built from polyester (PET) or PPS monofilament spirals joined by hinge pins. Their open mesh structure, high drainage and easy cleaning make them equally at home as filter belts on belt press filters and as dryer belts in drying equipment.</p>
<!-- IMAGE_URL_SPIRAL_BANNER 待补(spec §7):上线前从后台上传并替换此占位图 -->
<div class="ph-placeholder3">Spiral fabric banner image — to be uploaded before launch</div>
<h2>Spiral fabric as a filter belt</h2>
<p>On belt press filters, spiral fabrics dewater sludge, sand, juice and palm oil. The open spiral structure drains quickly, releases the filter cake cleanly and withstands repeated high-pressure squeezing. See our <a href="/press-belt/">press filter belts</a>.</p>
<h2>Spiral fabric as a dryer belt</h2>
<p>In dryers, spiral fabrics carry board, paper and food products through heated zones. Anti-static and heat-resistant versions are available for board forming machines, food drying machines and belt drying machines. See our <a href="/dryer-fabric/">dryer fabrics</a>.</p>
<h2>Also used as a conveyor belt</h2>
<p>Thanks to their stable, non-tracking spiral structure, spiral fabrics also serve as general conveyor belts for washing, cooling and transporting.</p>
<h2>Specifications</h2>
${chipList(["Material: PET (polyester) monofilament / PPS monofilament", "Spiral loop sizes: wide range", "Seam: spiral pin seam (hinge pin), endless on request", "Edges: sealed, welded or reinforced", "Widths and lengths: custom", "OEM/ODM: available"])}`;
  } else {
    faqs = p.faqs;
    main = `
<p>${p.intro}</p>
${p.banner ? `<div class="shot3" style="max-width:${p.banner.maxW || 1180}px;margin-left:auto;margin-right:auto"><figure><img src="${p.banner.url}" alt="${p.banner.alt}" width="${p.banner.w}" height="${p.banner.h}" loading="eager" decoding="async"><figcaption>${p.banner.caption}</figcaption></figure></div>` : ""}
${p.gallery ? `<div class="gal3">${p.gallery.map(g => `<figure><img src="${g.url}" alt="${g.alt}" loading="lazy" decoding="async"><figcaption>${g.caption}</figcaption></figure>`).join("")}</div>` : ""}
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

// sitemap.xml
const urls = [`${BASE}/`, ...products.map(p => urlOf(p.slug))];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
  [`${BASE}${IMG.h2}`, "Monofilament", "Proprietary monofilament production for filter fabrics and industrial belts."],
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
