// Aurora Filtech static site generator — output: site/ (this directory)
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

// ---------- shared CSS ----------
const CSS = `
:root{
  --bg:#FAF7F2; --bg-soft:#F2EDE4; --surface:#FFFFFF; --ink:#1C2B33; --ink-soft:#4A5B64;
  --teal:#0F6E66; --teal-deep:#0B4F4A; --gold:#C4A265; --gold-soft:#E7D9BC; --line:#E3DCCC;
  --shadow:0 10px 40px rgba(28,43,51,.08); --radius:14px;
  --serif:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,"Times New Roman",serif;
  --sans:"Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,"Helvetica Neue",Arial,sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--sans);background:var(--bg);color:var(--ink);line-height:1.7;font-size:16.5px}
a{color:var(--teal);text-decoration:none}
a:hover{text-decoration:underline}
img{max-width:100%;height:auto;display:block}
.wrap{max-width:1180px;margin:0 auto;padding:0 24px}

/* header */
.site-header{position:sticky;top:0;z-index:50;background:rgba(250,247,242,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;gap:28px;padding:14px 0}
.nav-logo{display:flex;align-items:center;gap:10px;font-family:var(--serif);font-size:1.35rem;font-weight:700;color:var(--ink);letter-spacing:.02em}
.nav-logo img{height:44px;width:auto}
.nav-menu{display:flex;gap:6px;margin-left:auto;align-items:center;flex-wrap:wrap}
.nav-menu>a,.nav-menu .has-sub>a{display:inline-block;padding:8px 14px;border-radius:999px;color:var(--ink-soft);font-size:.92rem;font-weight:600;letter-spacing:.04em}
.nav-menu>a:hover,.nav-menu .has-sub>a:hover{background:var(--bg-soft);color:var(--teal-deep);text-decoration:none}
.has-sub{position:relative}
.has-sub>.sub{display:none;position:absolute;top:100%;left:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:var(--shadow);padding:10px;min-width:250px}
.has-sub:hover>.sub{display:block}
.has-sub>.sub a{display:block;padding:8px 12px;border-radius:8px;color:var(--ink);font-size:.9rem}
.has-sub>.sub a:hover{background:var(--bg-soft);text-decoration:none}
.nav-cta{background:var(--teal);color:#fff !important}
.nav-cta:hover{background:var(--teal-deep) !important}
.nav-burger{display:none}

/* hero */
.hero{padding:72px 0 64px;background:
  radial-gradient(1200px 500px at 85% -10%,rgba(196,162,101,.16),transparent 60%),
  radial-gradient(900px 420px at -10% 110%,rgba(15,110,102,.10),transparent 60%),var(--bg)}
.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}
.kicker{display:inline-flex;align-items:center;gap:10px;font-size:.78rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
.kicker::before{content:"";width:34px;height:1px;background:var(--gold)}
.hero h1{font-family:var(--serif);font-size:clamp(2.2rem,4.4vw,3.4rem);line-height:1.12;margin:18px 0 20px;color:var(--ink)}
.hero h1 em{font-style:normal;color:var(--teal)}
.hero .lede{font-size:1.1rem;color:var(--ink-soft);max-width:34em}
.hero-stats{display:flex;gap:0;margin-top:36px;border-top:1px solid var(--line);padding-top:22px}
.hero-stats div{padding:0 28px;border-left:1px solid var(--line)}
.hero-stats div:first-child{padding-left:0;border-left:none}
.hero-stats b{display:block;font-family:var(--serif);font-size:1.5rem;color:var(--teal-deep)}
.hero-stats span{font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft)}
.hero-photo{border-radius:var(--radius);overflow:hidden;box-shadow:var(--shadow);border:1px solid var(--line)}
.hero-photo figcaption{font-size:.85rem;color:var(--ink-soft);padding:12px 16px;background:var(--surface)}
.hero-cta{margin-top:32px;display:flex;gap:14px;flex-wrap:wrap}
.btn{display:inline-block;padding:13px 28px;border-radius:999px;font-weight:700;font-size:.95rem;letter-spacing:.03em}
.btn-primary{background:var(--teal);color:#fff}
.btn-primary:hover{background:var(--teal-deep);text-decoration:none}
.btn-ghost{border:1.5px solid var(--ink);color:var(--ink)}
.btn-ghost:hover{background:var(--ink);color:var(--surface);text-decoration:none}

/* sections */
section{padding:78px 0}
.sec-head{max-width:760px;margin-bottom:48px}
.sec-head .kicker{margin-bottom:10px}
h2.sec-title{font-family:var(--serif);font-size:clamp(1.7rem,3vw,2.3rem);line-height:1.2}
.sec-head p{margin-top:14px;color:var(--ink-soft)}

.why{background:var(--surface);border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.why-grid{display:grid;grid-template-columns:.95fr 1.05fr;gap:56px;align-items:center}
.why-photo{border-radius:var(--radius);overflow:hidden;border:1px solid var(--line);box-shadow:var(--shadow)}
.why-photo img{width:100%;height:auto;object-fit:cover}
.why-photo figcaption{font-size:.85rem;color:var(--ink-soft);padding:12px 16px;background:var(--bg)}
.why h2{font-family:var(--serif);font-size:2rem;margin-bottom:18px}
.why p{color:var(--ink-soft);margin-bottom:14px}
.feature-list{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:26px}
.feature{background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:18px 20px}
.feature b{display:block;font-family:var(--serif);font-size:1.02rem;margin-bottom:4px}
.feature span{font-size:.88rem;color:var(--ink-soft)}

/* solutions grid */
.solutions{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}
.solution-card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column;transition:transform .25s,box-shadow .25s}
.solution-card:hover{transform:translateY(-4px);box-shadow:var(--shadow)}
.solution-card figure{position:relative;overflow:hidden;aspect-ratio:671/386;background:var(--bg-soft)}
.solution-card figure img{width:100%;height:100%;object-fit:cover}
.solution-card figcaption{position:absolute;inset:auto 0 0 0;background:linear-gradient(transparent,rgba(11,79,74,.88));color:#fff;font-size:.8rem;line-height:1.45;padding:34px 16px 12px}
.card-body{padding:22px 24px 26px;display:flex;flex-direction:column;gap:12px;flex:1}
.card-body h2{font-family:var(--serif);font-size:1.25rem;letter-spacing:.03em}
.card-body h2 a{color:var(--ink)}
.card-body h2 a::after{content:" →";color:var(--gold)}
.card-body>p{font-size:.93rem;color:var(--ink-soft)}
.card-cols{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:auto;padding-top:14px;border-top:1px dashed var(--line)}
.card-cols h3{font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:6px}
.card-cols ul{list-style:none}
.card-cols li{font-size:.85rem;color:var(--ink-soft);padding:2px 0}
.card-cols li+li{margin-top:2px}
.grid-extra{display:flex;align-items:center;justify-content:center;padding:26px;background:var(--bg-soft);border:1px dashed var(--gold);border-radius:var(--radius);color:var(--ink-soft);font-size:.95rem}

/* contact */
.contact{background:var(--surface);border-top:1px solid var(--line)}
.contact-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:56px}
.contact h2{font-family:var(--serif);font-size:2rem;margin-bottom:16px}
.contact p{color:var(--ink-soft)}
.contact-info{margin-top:26px;display:grid;gap:12px;font-size:.95rem;color:var(--ink-soft)}
.contact-info b{color:var(--ink)}
form .row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
label{display:block;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft);margin:0 0 6px}
input,textarea{width:100%;padding:13px 16px;border:1px solid var(--line);border-radius:10px;background:var(--bg);font:inherit;color:var(--ink)}
input:focus,textarea:focus{outline:2px solid var(--gold-soft);border-color:var(--gold)}
.field{margin-bottom:18px}
form .btn{border:none;cursor:pointer}

/* product page */
.page-hero{background:linear-gradient(180deg,var(--bg-soft),var(--bg));border-bottom:1px solid var(--line);padding:56px 0}
.crumbs{font-size:.83rem;color:var(--ink-soft);margin-bottom:16px}
.crumbs a{color:var(--ink-soft)}
.page-hero h1{font-family:var(--serif);font-size:clamp(1.9rem,3.6vw,2.7rem);max-width:20em}
.page-hero .lede{margin-top:16px;color:var(--ink-soft);max-width:44em;font-size:1.05rem}
.page-banner{margin:48px auto 0;max-width:1180px;padding:0 24px}
.page-banner figure{border-radius:var(--radius);overflow:hidden;border:1px solid var(--line);box-shadow:var(--shadow)}
.page-banner img{width:100%;height:auto;display:block}
.page-banner figcaption{font-size:.85rem;color:var(--ink-soft);padding:12px 16px;background:var(--surface);border:1px solid var(--line);border-top:none;border-radius:0 0 var(--radius) var(--radius)}
.article{max-width:840px}
.article h2{font-family:var(--serif);font-size:1.6rem;margin:42px 0 14px}
.article h3{font-size:1.05rem;margin:26px 0 8px;color:var(--teal-deep)}
.article p{color:var(--ink-soft);margin-bottom:14px}
.gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;margin:32px 0}
.gallery figure{border-radius:12px;overflow:hidden;border:1px solid var(--line);background:var(--surface)}
.gallery img{width:100%;height:auto}
.gallery figcaption{font-size:.83rem;color:var(--ink-soft);padding:10px 14px}
.spec-list{list-style:none;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:8px 24px;margin:18px 0}
.spec-list li{padding:11px 0;border-bottom:1px dashed var(--line);font-size:.95rem;color:var(--ink-soft)}
.spec-list li:last-child{border-bottom:none}
.app-list{list-style:none;display:grid;gap:12px;margin:18px 0}
.app-list li{background:var(--surface);border:1px solid var(--line);border-left:3px solid var(--gold);border-radius:10px;padding:14px 18px;font-size:.95rem;color:var(--ink-soft)}
.faq{margin-top:16px}
.faq details{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:18px 22px;margin-bottom:12px}
.faq summary{cursor:pointer;font-weight:700;font-family:var(--serif);font-size:1.05rem}
.faq details p{margin-top:10px;color:var(--ink-soft)}
.cta-band{margin-top:56px;background:linear-gradient(120deg,var(--teal-deep),var(--teal));color:#fff;border-radius:var(--radius);padding:36px 40px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap}
.cta-band h2{font-family:var(--serif);font-size:1.5rem;color:#fff;margin:0}
.cta-band p{color:rgba(255,255,255,.85);margin:6px 0 0}
.cta-band .btn{background:#fff;color:var(--teal-deep)}
.cta-band .btn:hover{background:var(--gold-soft)}
.related{margin-top:48px}
.related h2{font-family:var(--serif);font-size:1.4rem;margin-bottom:18px}
.related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px}
.related-grid a{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:18px 20px;font-weight:700;color:var(--ink)}
.related-grid a:hover{border-color:var(--gold);text-decoration:none}

/* footer */
.site-footer{background:var(--ink);color:#B9C6CC;margin-top:0}
.footer-grid{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:40px;padding:64px 0 40px}
.site-footer h3{color:#fff;font-family:var(--serif);font-size:1.02rem;margin-bottom:16px;letter-spacing:.04em}
.site-footer a{color:#B9C6CC;font-size:.9rem;display:block;padding:3px 0}
.site-footer a:hover{color:var(--gold)}
.site-footer ul{list-style:none}
.footer-note{font-size:.85rem;line-height:1.8}
.footer-bottom{border-top:1px solid rgba(255,255,255,.12);padding:20px 0;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:.82rem}

@media(max-width:960px){
  .hero-grid,.why-grid,.contact-grid{grid-template-columns:1fr}
  .solutions{grid-template-columns:1fr 1fr}
  .footer-grid{grid-template-columns:1fr 1fr}
  .nav-menu{display:none}
  .nav-burger{display:block;margin-left:auto;background:none;border:1px solid var(--line);border-radius:8px;padding:8px 12px;font:inherit;color:var(--ink)}
  .nav.open .nav-menu{display:flex;position:absolute;top:100%;left:0;right:0;background:var(--surface);flex-direction:column;padding:14px 24px;border-bottom:1px solid var(--line)}
}
@media(max-width:640px){.solutions{grid-template-columns:1fr}.hero-stats{flex-wrap:wrap;gap:14px}form .row{grid-template-columns:1fr}}
`;

// ---------- shared layout ----------
const navLinks = products.map(p =>
  `<a href="/${p.slug}/">${p.name}</a>`).join("");

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
<header class="site-header">
  <div class="wrap nav">
    <a class="nav-logo" href="/"><svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="#0F6E66"/><path d="M12 44c8-2 10-24 20-24s10 22 20 24" stroke="#C4A265" stroke-width="5" fill="none" stroke-linecap="round"/></svg>Aurora Filtech</a>
    <button class="nav-burger" aria-label="Open menu" onclick="document.querySelector('.nav').classList.toggle('open');this.closest('.site-header').querySelector('.nav').classList.toggle('open')">☰ Menu</button>
    <nav class="nav-menu" aria-label="Main navigation">
      <a href="/"${activeNav === "home" ? ' aria-current="page"' : ""}>HOME</a>
      <div class="has-sub">
        <a href="#solutions"${activeNav === "products" ? ' aria-current="page"' : ""}>PRODUCTS ▾</a>
        <div class="sub">${navLinks}</div>
      </div>
      <a href="/#contact"${activeNav === "contact" ? ' aria-current="page"' : ""}>CONTACT</a>
      <a href="/#why-us">ABOUT US</a>
      <a class="nav-cta" href="/#contact">Get a Quote</a>
    </nav>
  </div>
</header>
<main>
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <h3>Aurora Filtech Co., Ltd</h3>
      <p class="footer-note">Professional manufacturer of filter fabrics and industrial belts for paper, mining, power, food and pharmaceutical industries. 30+ years of expertise, 3 factories, OEM/ODM service.</p>
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
      <a href="mailto:aaron@aurora-filtech.com">aaron@aurora-filtech.com</a>
      <p class="footer-note">London: 8 Standard Road, NY10 6EU, UK<br>Changzhou: Room 1103, Guanhe East Rd, Tianning District, China<br>Tel: +86 152 0611 9266</p>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span>© ${new Date().getFullYear()} Aurora Filtech Co., Ltd. All rights reserved.</span>
    <span>Industrial filter fabrics &amp; filter belts manufacturer</span>
  </div>
</footer>
<script>
document.querySelector('.nav-burger').addEventListener('click',function(){this.closest('.nav').classList.toggle('open')});
</script>
</body>
</html>`;
}

const contactSection = `
<section id="contact" class="contact">
  <div class="wrap contact-grid">
    <div>
      <span class="kicker">Contact Us</span>
      <h2 style="font-family:var(--serif);font-size:2rem;margin:12px 0 14px">Tell us about your filtration duty</h2>
      <p>Send your machine model, product and operating conditions — our engineers will recommend the right filter fabric or belt and quote within 24 hours.</p>
      <div class="contact-info">
        <div><b>Email:</b> <a href="mailto:johnson@aurora-filtech.com">johnson@aurora-filtech.com</a></div>
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
      <button class="btn btn-primary" type="submit">Send Request</button>
    </form>
  </div>
</section>`;

// ---------- home ----------
function card(p, i) {
  const c = p.card;
  return `<div class="solution-card">
  <figure>
    <a href="/${p.slug}/"><img src="${c.img}" alt="${c.alt}" width="${c.w}" height="${c.h}" loading="${i < 3 ? "eager" : "lazy"}" decoding="async"></a>
    <figcaption>${c.caption}</figcaption>
  </figure>
  <div class="card-body">
    <h2><a href="/${p.slug}/">${c.h2}</a></h2>
    <p>${c.first}</p>
    <div class="card-cols">
      <div><h3>Equipment</h3><ul class="card-equipment">${c.equipment.map(e => `<li><strong>${e}</strong></li>`).join("")}</ul></div>
      <div><h3>Applications</h3><ul class="card-applications">${c.applications.map(a => `<li>${a}</li>`).join("")}</ul></div>
    </div>
  </div>
</div>`;
}

const homeCards = products.filter(p => p.card);
const solutionsGrid = homeCards.map(card).join("\n") +
  `\n<div class="grid-extra">Also available: <a href="/spiral-belt/">spiral fabrics for belt press filters and dryers</a></div>`;

const homeJsonld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE}/#organization`,
      name: "Aurora Filtech Co., Ltd",
      alternateName: "Aurora Filtech",
      url: `${BASE}/`,
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
      { "@type": "ImageObject", "@id": `${BASE}/#${p.imageId}`, contentUrl: BASE + p.card.img, encodingFormat: "image/jpeg", width: String(p.card.w), height: String(p.card.h), name: p.card.h2.charAt(0) + p.card.h2.slice(1).toLowerCase(), caption: p.card.caption.split(" — ")[0], description: `${p.card.alt}, supplied by Aurora Filtech.`, inLanguage: "en" },
      { "@type": "Product", "@id": `${BASE}/#product-${p.jsonldId}`, name: p.name, alternateName: p.altNames, description: p.pdesc, url: urlOf(p.slug), image: { "@id": `${BASE}/#${p.imageId}` }, brand: { "@id": `${BASE}/#organization` }, manufacturer: { "@id": `${BASE}/#organization` }, category: p.category, keywords: p.keywords }
    ])
  ]
};

const homeBody = `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <span class="kicker">Industrial Filter Media Since 1990s</span>
      <h1>Precision Engineered <em>Filtration.</em></h1>
      <p class="lede">Experience the next generation of industrial filter media. Designed for extreme durability, maximum efficiency, and zero compromise.</p>
      <div class="hero-stats">
        <div><b>30+</b><span>Years Exp</span></div>
        <div><b>3</b><span>Factories</span></div>
        <div><b>Global</b><span>Standards</span></div>
      </div>
      <div class="hero-cta">
        <a class="btn btn-primary" href="#solutions">Explore Solutions</a>
        <a class="btn btn-ghost" href="#contact">Get a Quote</a>
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
    <figure class="why-photo">
      <img src="${IMG.h2}" alt="Proprietary monofilament yarns produced in-house for filter fabrics" width="716" height="298" loading="lazy" decoding="async">
      <figcaption>Proprietary monofilament production for filter fabrics and industrial belts.</figcaption>
    </figure>
    <div>
      <span class="kicker">Why Choose Us</span>
      <h2 style="margin-top:12px">Why Choose Us</h2>
      <p>Aurora Filtech combine 30+ years of expertise with advanced German technology to deliver filtration media that lasts longer and performs better. From proprietary monofilament production to automated joint, we control every step of the process. Our also provide OEM/ODM service to help you to develop your local business.</p>
      <div class="feature-list">
        <div class="feature"><b>In-house monofilament</b><span>Proprietary yarn production for consistent fabric quality.</span></div>
        <div class="feature"><b>German weaving technology</b><span>Advanced looms and finishing for extreme durability.</span></div>
        <div class="feature"><b>Automated joints</b><span>Precision seams and endless belts, ready to run.</span></div>
        <div class="feature"><b>OEM / ODM</b><span>Custom fabrics and belts to grow your local business.</span></div>
      </div>
    </div>
  </div>
</section>

<section id="solutions">
  <div class="wrap">
    <div class="sec-head">
      <span class="kicker">Our Solutions</span>
      <h2 class="sec-title" style="margin-top:10px">OUR SOLUTIONS</h2>
      <p>Filter fabrics, filter belts, bags and cartridges — engineered for the machines they run on.</p>
    </div>
    <div class="solutions">
${solutionsGrid}
    </div>
  </div>
</section>
${contactSection}`;

// ---------- product pages ----------
function productJsonld(p, faqs) {
  const graph = [
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
      { "@type": "ListItem", position: 2, name: p.name, item: urlOf(p.slug) }
    ] }
  ];
  // detail pages carry their own @ids; homepage card nodes keep #image-*/#product-* (spec §11.3: @id unique per node)
  if (p.banner) {
    graph.push({ "@type": "ImageObject", "@id": urlOf(p.slug) + `#${p.imageId}-page`, contentUrl: BASE + p.banner.url, encodingFormat: "image/jpeg", name: p.name, caption: p.banner.caption, description: `${p.banner.alt}, supplied by Aurora Filtech.`, inLanguage: "en" });
  }
  const prod = { "@type": "Product", "@id": urlOf(p.slug) + `#product-${p.jsonldId}-page`, name: p.name, alternateName: p.altNames, description: p.pdesc, url: urlOf(p.slug), brand: { "@id": `${BASE}/#organization` }, manufacturer: { "@id": `${BASE}/#organization` }, category: p.category, keywords: p.keywords };
  if (p.banner) prod.image = { "@id": urlOf(p.slug) + `#${p.imageId}-page` };
  graph.push(prod);
  if (faqs && faqs.length) {
    graph.push({ "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });
  }
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);
}

function productBody(p) {
  let faqs, content;
  if (p.slug === "spiral-belt") {
    faqs = [
      ["What is the difference between a spiral fabric and a woven dryer fabric?", "A spiral fabric is assembled from monofilament spirals joined by hinge pins, giving it an open, non-tracking structure with high drainage. A woven dryer fabric is woven from warp and weft yarns and provides a smoother surface. Spiral fabrics are easier to repair on the machine, while woven fabrics usually offer higher stability at high speeds."],
      ["Can spiral fabric be used on belt press filters?", "Yes. On belt press filters, spiral fabrics work as filter belts for sludge dewatering, sand washing, juice squeezing and palm oil squeezing. Their open structure drains quickly and releases the filter cake easily."],
      ["Do you offer PPS spiral fabrics for higher temperatures?", "Yes. PPS monofilament spiral fabrics are available for higher-temperature drying applications. Tell us your working temperature and we will recommend the right material."],
    ];
    content = `
<p>${/* intro verbatim */""}Spiral fabrics are endless industrial belts built from polyester (PET) or PPS monofilament spirals joined by hinge pins. Their open mesh structure, high drainage and easy cleaning make them equally at home as filter belts on belt press filters and as dryer belts in drying equipment.</p>
<!-- IMAGE_URL_SPIRAL_BANNER 待补(spec §7):上线前从后台上传并替换此占位图 -->
<figure style="margin:32px 0"><div style="aspect-ratio:3/1;border:1px dashed var(--gold);border-radius:12px;background:var(--bg-soft);display:flex;align-items:center;justify-content:center;color:var(--ink-soft);min-height:180px">Spiral fabric banner image — to be uploaded before launch</div></figure>
<h2>Spiral fabric as a filter belt</h2>
<p>On belt press filters, spiral fabrics dewater sludge, sand, juice and palm oil. The open spiral structure drains quickly, releases the filter cake cleanly and withstands repeated high-pressure squeezing. See our <a href="/press-belt/">press filter belts</a>.</p>
<h2>Spiral fabric as a dryer belt</h2>
<p>In dryers, spiral fabrics carry board, paper and food products through heated zones. Anti-static and heat-resistant versions are available for board forming machines, food drying machines and belt drying machines. See our <a href="/dryer-fabric/">dryer fabrics</a>.</p>
<h2>Also used as a conveyor belt</h2>
<p>Thanks to their stable, non-tracking spiral structure, spiral fabrics also serve as general conveyor belts for washing, cooling and transporting.</p>
<h2>Specifications</h2>
<ul class="spec-list">
<li>Material: PET (polyester) monofilament / PPS monofilament</li>
<li>Spiral loop sizes: wide range</li>
<li>Seam: spiral pin seam (hinge pin), endless seaming on request</li>
<li>Edges: sealed, welded or reinforced</li>
<li>Widths and lengths: custom</li>
<li>OEM/ODM: available</li>
</ul>`;
  } else {
    faqs = p.faqs;
    content = `
<p>${p.intro}</p>
${p.banner ? `<div class="page-banner" style="margin:36px auto 0;max-width:${p.banner.maxW || 1180}px;padding:0"><figure><img src="${p.banner.url}" alt="${p.banner.alt}" width="${p.banner.w}" height="${p.banner.h}" loading="eager" decoding="async"><figcaption>${p.banner.caption}</figcaption></figure></div>` : ""}
${p.gallery ? `<div class="gallery">${p.gallery.map(g => `<figure><img src="${g.url}" alt="${g.alt}" loading="lazy" decoding="async"><figcaption>${g.caption}</figcaption></figure>`).join("")}</div>` : ""}
<h2>Applications</h2>
<ul class="app-list">${p.apps.map(a => `<li>${a}</li>`).join("")}</ul>
<p>Related products: ${p.related.map(r => `<a href="/${r}/">${nameOf(r)}</a>`).join(" · ")}.</p>
<h2>Specifications</h2>
<ul class="spec-list">${p.specs.map(s => `<li>${s}</li>`).join("")}</ul>`;
  }

  return `
<section class="page-hero">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> › <span>${p.name}</span></nav>
    <h1>${p.h1}</h1>
    <p class="lede">${p.pdesc}</p>
  </div>
</section>
<section>
  <div class="wrap article">
    ${content}
    <h2>Frequently Asked Questions</h2>
    <div class="faq">
      ${faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("\n      ")}
    </div>
    <div class="related">
      <h2>Related Products</h2>
      <div class="related-grid">${p.related.map(r => `<a href="/${r}/">${nameOf(r)} →</a>`).join("")}</div>
    </div>
    <div class="cta-band">
      <div><h2>Request a quote for ${p.name.toLowerCase()}</h2><p>Custom sizes, seams and materials — OEM/ODM available.</p></div>
      <a class="btn" href="/#contact">Contact Us</a>
    </div>
  </div>
</section>
${contactSection}`;
}

// ---------- write files ----------
function write(rel, content) {
  const fp = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(fp), { recursive: true });
  fs.writeFileSync(fp, content);
  console.log("wrote", rel);
}

write("assets/style.css", `/* Aurora Filtech — light premium theme */${CSS}`);
write("index.html", layout({
  url: `${BASE}/`,
  title: "Aurora Filtech | Industrial Filter Fabrics and Filter Belts",
  desc: "Manufacturer of forming fabrics, dryer fabrics, press filter fabrics, vacuum filter fabrics, filter bags and cartridges. 30+ years, 3 factories, OEM/ODM.",
  type: "website",
  jsonld: JSON.stringify(homeJsonld, null, 2),
  body: homeBody, activeNav: "home"
}));

for (const p of products) {
  if (!p.custom && p.card) { /* normal */ }
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

// sitemap-image.xml (spec §9.2)
const esc = s => s.replace(/&/g, "&amp;");
function imgEntry(loc, title, caption) {
  if (loc.startsWith("/")) loc = BASE + loc;
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
  [IMG.h1, "Filter fabric weaving workshop", "Aurora Filtech filter fabric weaving workshop."],
  [IMG.h2, "Monofilament", "Proprietary monofilament production for filter fabrics and industrial belts."],
  ...homeCards.map(p => [p.card.img, p.card.h2.charAt(0)+p.card.h2.slice(1).toLowerCase(), p.card.caption.replace(/—/g, "-")]),
].map(([l,t,c]) => imgEntry(l,t,c)).join("\n")}
  </url>
  <url><loc>${BASE}/forming-fabric/</loc>
${imgEntry(IMG.c1, "Forming fabric", "Forming fabric for paper machines and non-woven forming machines.")}
  </url>
  <url><loc>${BASE}/dryer-fabric/</loc>
${imgEntry(IMG.dryer1, "Dryer fabric", "Dryer fabric for board, paper and food drying.")}
${imgEntry(IMG.c2, "Anti-static dryer fabric", "Anti-static dryer fabric for wood panel forming.")}

  </url>
  <url><loc>${BASE}/vacuum-fabric/</loc>
${imgEntry(IMG.vacuumBanner, "Vacuum filter fabric", "Vacuum filter fabric for vacuum belt filters and vacuum disc filters.")}
  </url>
  <url><loc>${BASE}/press-fabric/</loc>
${imgEntry(IMG.c4, "Press filter fabric", "Press filter fabric / filter cloth for frame and membrane filter presses.")}
  </url>
  <url><loc>${BASE}/press-belt/</loc>
${imgEntry(IMG.pressBeltBanner, "Press filter belt", "Press filter belt (dewatering belt) for belt press filters.")}
  </url>
  <url><loc>${BASE}/teflon-belt/</loc>
${imgEntry(IMG.teflonBanner, "Teflon mesh belt", "Teflon mesh belt for dryers and conveyors.")}
  </url>
  <url><loc>${BASE}/products/filter-bag/</loc>
${imgEntry(IMG.filterBagBanner, "Dust filter bags", "Dust filter bags for bag filters and dust collectors - power plant and cement plant applications.")}
  </url>
  <url><loc>${BASE}/products/filter-cartridge/</loc>
${imgEntry(IMG.c8, "Filter cartridge", "Industrial filter cartridge for air, water and oil filtration.")}
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

write("favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0F6E66"/><path d="M12 44c8-2 10-24 20-24s10 22 20 24" stroke="#C4A265" stroke-width="5" fill="none" stroke-linecap="round"/></svg>`);

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

console.log("DONE — 10 pages + sitemaps + robots.txt");
