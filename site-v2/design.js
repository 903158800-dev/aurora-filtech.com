// site-seo 设计层 —— 沿用方案一(编辑风·轻奢暖调)设计系统,按新内容架构扩展组件
const { industries, applications, posts, glossary } = require("./data-site");
const { products } = require("./data-products");

const CSS = `
:root{
  --bg:#F6F7F4; --bg-soft:#EDF0EA; --surface:#FFFFFF; --ink:#121B24; --ink-soft:#5A6470;
  --teal:#1E4FD8; --teal-deep:#123AA0; --gold:#3D66D8; --gold-soft:#EAF0FE; --line:#DCE0D7;
  --shadow:0 4px 18px rgba(18,27,36,.06); --radius:2px;
  --serif:"Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,Arial,sans-serif;
  --sans:"Segoe UI",-apple-system,BlinkMacSystemFont,Roboto,Arial,sans-serif;
  --mono:Consolas,"Cascadia Mono","SF Mono",Menlo,monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--sans);background:var(--bg);color:var(--ink);line-height:1.7;font-size:16.5px}
a{color:var(--teal);text-decoration:none}
a:hover{text-decoration:underline}
img{max-width:100%;height:auto;display:block}
.wrap{max-width:1180px;margin:0 auto;padding:0 24px}

.site-header{position:sticky;top:0;z-index:50;background:rgba(250,247,242,.92);backdrop-filter:blur(10px);border-bottom:1px solid var(--line)}
.nav{display:flex;align-items:center;gap:28px;padding:14px 0}
.nav-logo{display:flex;align-items:center;gap:10px;font-family:var(--serif);font-size:1.35rem;font-weight:700;color:var(--ink);letter-spacing:.02em}
.nav-logo svg{flex:none}
.nav-menu{display:flex;gap:6px;margin-left:auto;align-items:center;flex-wrap:wrap}
.nav-menu>a,.nav-menu .has-sub>a{display:inline-block;padding:8px 14px;border-radius:999px;color:var(--ink-soft);font-size:.92rem;font-weight:600;letter-spacing:.04em}
.nav-menu>a:hover,.nav-menu .has-sub>a:hover{background:var(--bg-soft);color:var(--teal-deep);text-decoration:none}
.nav-menu .has-sub{position:relative}
.nav-menu .has-sub>.sub{display:none;position:absolute;top:100%;left:0;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:var(--shadow);padding:10px;min-width:250px;z-index:60}
.nav-menu .has-sub:hover>.sub{display:block}
.nav-menu .has-sub>.sub a{display:block;padding:8px 12px;border-radius:8px;color:var(--ink);font-size:.9rem}
.nav-menu .has-sub>.sub a:hover{background:var(--bg-soft);text-decoration:none}
.nav-menu .sub h4{font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);padding:8px 12px 4px}
.nav-cta{background:var(--teal);color:#fff !important}
.nav-cta:hover{background:var(--teal-deep) !important}
.nav-burger{display:none}

/* hero(沿用方案一) */
.hero{padding:72px 0 64px;background:radial-gradient(1200px 500px at 85% -10%,rgba(196,162,101,.16),transparent 60%),radial-gradient(900px 420px at -10% 110%,rgba(15,110,102,.10),transparent 60%),var(--bg)}
.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center}
.kicker{display:inline-flex;align-items:center;gap:10px;font-size:.78rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
.kicker::before{content:"";width:34px;height:1px;background:var(--gold)}
.hero h1{font-family:var(--serif);font-size:clamp(2.2rem,4.4vw,3.4rem);line-height:1.12;margin:18px 0 20px}
.hero h1 em{font-style:normal;color:var(--teal)}
.hero .lede{font-size:1.1rem;color:var(--ink-soft);max-width:34em}
.hero-stats{display:flex;margin-top:36px;border-top:1px solid var(--line);padding-top:22px}
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
.why-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:34px;align-items:center}


.why-photo figcaption{font-size:.72rem;padding:6px 10px}
.why-photo{border-radius:var(--radius);overflow:hidden;border:1px solid var(--line);box-shadow:var(--shadow);max-width:640px;justify-self:end}
.why-photo img{width:100%;height:auto;object-fit:cover}
.why h2{font-family:var(--serif);font-size:1.65rem;margin-bottom:10px}
.why p{color:var(--ink-soft);margin-bottom:10px;font-size:.9rem;line-height:1.55}
.feature-list{display:grid;grid-template-columns:repeat(5,1fr);gap:8px 14px;margin-top:18px}
.feature{background:var(--bg);border:1px solid var(--line);border-radius:12px;padding:18px 20px}
.feature b{display:block;font-family:var(--serif);font-size:.88rem;margin-bottom:1px}
.feature span{font-size:.76rem;color:var(--ink-soft);line-height:1.1}

/* home cards(沿用) */
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

/* industry strip on home */
.ind-strip{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-top:34px}
.ind-strip a{background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:10px 8px;text-align:center;font-size:.82rem;font-weight:700;color:var(--ink)}
.ind-strip a:hover{border-color:var(--gold);text-decoration:none;color:var(--teal-deep)}

/* ===== 产品页 ===== */
.page-hero{background:linear-gradient(180deg,var(--bg-soft),var(--bg));border-bottom:1px solid var(--line);padding:54px 0 46px}
.crumbs{font-size:.83rem;color:var(--ink-soft);margin-bottom:16px}
.crumbs a{color:var(--ink-soft)}
.page-hero h1{font-family:var(--serif);font-size:clamp(1.9rem,3.6vw,2.7rem);max-width:20em}
.series-chip{display:inline-flex;gap:8px;align-items:center;background:var(--surface);border:1px solid var(--gold);color:var(--teal-deep);border-radius:999px;padding:6px 16px;font-size:.8rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:14px}
.page-hero .lede{margin-top:16px;color:var(--ink-soft);max-width:46em;font-size:1.05rem}
.article{max-width:860px}
.article h2{font-family:var(--serif);font-size:1.6rem;margin:42px 0 14px;scroll-margin-top:96px}
.article p{color:var(--ink-soft);margin-bottom:14px;max-width:56em}
.article p a{font-weight:600}
.page-banner{margin:48px auto 0;max-width:1180px;padding:0 24px}
.page-banner figure{border-radius:var(--radius);overflow:hidden;border:1px solid var(--line);box-shadow:var(--shadow);margin:0 auto}
.page-banner img{width:100%;height:auto;display:block}
.page-banner figure img{aspect-ratio:4/3;object-fit:cover}
.page-banner figcaption{font-size:.85rem;color:var(--ink-soft);padding:12px 16px;background:var(--surface);border:1px solid var(--line);border-top:none}
/* 规格表(新) */
.spec-table{width:100%;border-collapse:collapse;margin:18px 0;background:var(--surface);font-size:.92rem}
.spec-table caption{text-align:left;font-family:var(--serif);font-size:1.1rem;font-weight:700;padding-bottom:10px;color:var(--ink)}
.spec-table th{background:var(--teal-deep);color:#fff;text-align:left;padding:10px 14px;font-size:.8rem;letter-spacing:.06em;text-transform:uppercase}
.spec-table td{border:1px solid var(--line);padding:10px 14px;color:var(--ink-soft)}
.spec-table td:first-child{font-weight:700;color:var(--ink);white-space:nowrap}
/* 成本算账卡(新) */
.accounting{display:flex;gap:16px;background:var(--bg-soft);border-left:4px solid var(--gold);border-radius:12px;padding:20px 24px;margin:26px 0;align-items:flex-start}
.accounting .ico{flex:none;font-family:var(--serif);font-size:1.6rem;color:var(--gold);line-height:1}
.accounting p{margin:0;font-size:.97rem;color:var(--ink-soft)}
.accounting p b{color:var(--ink)}
/* OEM 列表(新) */
.oem-box{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:18px 22px;margin:20px 0}
.oem-box h3{font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:var(--teal-deep);margin-bottom:10px}
.oem-box p{font-size:.9rem;color:var(--ink-soft);margin:0}
.apps-list{list-style:none;display:grid;gap:12px;margin:18px 0}
.apps-list li{background:var(--surface);border:1px solid var(--line);border-left:3px solid var(--gold);border-radius:10px;padding:14px 18px;font-size:.95rem;color:var(--ink-soft)}
.gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;margin:32px 0}
.gallery figure{border-radius:12px;overflow:hidden;border:1px solid var(--line);background:var(--surface);margin:0 auto}
.gallery figure img{width:100%;height:auto;aspect-ratio:4/3;object-fit:cover}
.gallery figcaption{font-size:.83rem;color:var(--ink-soft);padding:10px 14px}
.spec-list{list-style:none;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:8px 24px;margin:18px 0}
.spec-list li{padding:11px 0;border-bottom:1px dashed var(--line);font-size:.95rem;color:var(--ink-soft)}
.spec-list li:last-child{border-bottom:none}
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

/* ===== 行业页/应用页 ===== */
.ind-hero{background:linear-gradient(180deg,var(--bg-soft),var(--bg));border-bottom:1px solid var(--line);padding:54px 0 44px}
.ind-hero h1{font-family:var(--serif);font-size:clamp(1.8rem,3.4vw,2.5rem)}
.ind-hero .lede{margin-top:14px;color:var(--ink-soft);max-width:46em;font-size:1.03rem}
.proc-list{display:grid;gap:16px;margin:34px 0}
.proc-item{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:20px 24px}
.proc-item h3{font-family:var(--serif);font-size:1.15rem;margin-bottom:6px}
.proc-item h3 a{color:var(--teal-deep)}
.proc-item p{font-size:.93rem;color:var(--ink-soft);margin:0}
.oem-note{background:var(--bg-soft);border-left:4px solid var(--teal);border-radius:12px;padding:18px 22px;font-size:.93rem;color:var(--ink-soft);margin:24px 0}

/* ===== 博客 ===== */
.post-meta{display:flex;gap:14px;align-items:center;font-size:.85rem;color:var(--ink-soft);margin-bottom:8px}
.post-meta .tag{background:var(--bg-soft);border:1px solid var(--line);color:var(--teal-deep);border-radius:999px;padding:3px 12px;font-weight:700;font-size:.75rem;letter-spacing:.06em;text-transform:uppercase}
.post-body h2{font-family:var(--serif);font-size:1.45rem;margin:36px 0 12px}
.post-body p{color:var(--ink-soft);margin-bottom:14px;max-width:58em}
.post-body ul{margin:0 0 16px 4px;list-style:none;display:grid;gap:8px}
.post-body ul li{padding-left:20px;position:relative;color:var(--ink-soft)}
.post-body ul li::before{content:"—";position:absolute;left:0;color:var(--gold)}
.blog-index{display:grid;gap:18px}
.blog-index a{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:22px 24px;display:block}
.blog-index a:hover{border-color:var(--gold);text-decoration:none}
.blog-index h2{font-family:var(--serif);font-size:1.2rem;margin-bottom:6px}
.blog-index p{font-size:.9rem;color:var(--ink-soft);margin:0}

/* ===== 术语表 ===== */
.gloss{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.gloss dt{font-family:var(--serif);font-weight:700;font-size:1rem;color:var(--teal-deep)}
.gloss dd{font-size:.9rem;color:var(--ink-soft);margin:4px 0 0}
.gloss>div{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px 20px}

/* ===== RFQ 询价表单(新) ===== */
.rfq{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:36px}
.rfq h3{font-family:var(--serif);font-size:1.3rem;margin-bottom:6px}
.rfq .hint{font-size:.88rem;color:var(--ink-soft);margin-bottom:22px}
.rfq .row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.rfq .row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px}
label{display:block;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft);margin:0 0 6px}
input,select,textarea{width:100%;padding:13px 16px;border:1px solid var(--line);border-radius:10px;background:var(--bg);font:inherit;color:var(--ink)}
input:focus,select:focus,textarea:focus{outline:2px solid var(--gold-soft);border-color:var(--gold)}
.field{margin-bottom:18px}
.rfq .btn{border:none;cursor:pointer}

/* footer(沿用) */
.site-footer{background:var(--ink);color:#B9C6CC}
.footer-grid{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;gap:40px;padding:64px 0 40px}
.site-footer h3{color:#fff;font-family:var(--serif);font-size:1.02rem;margin-bottom:16px;letter-spacing:.04em}
.site-footer a{color:#B9C6CC;font-size:.9rem;display:block;padding:3px 0}
.site-footer a:hover{color:var(--gold)}
.site-footer ul{list-style:none}
.footer-note{font-size:.85rem;line-height:1.8}
.footer-bottom{border-top:1px solid rgba(255,255,255,.12);padding:20px 0;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:.82rem}

@media(max-width:960px){
  .hero-grid,.why-grid{grid-template-columns:1fr}
  .feature-list{grid-template-columns:repeat(2,1fr)}
  .solutions{grid-template-columns:1fr 1fr}
  .footer-grid{grid-template-columns:1fr 1fr}
  .nav-menu{display:none}
  .nav-menu.open{display:flex;position:absolute;top:100%;left:0;right:0;background:var(--surface);flex-direction:column;padding:14px 24px;border-bottom:1px solid var(--line);align-items:stretch}
  .nav-menu .has-sub>.sub{display:block;position:static;box-shadow:none;border:none;min-width:0;padding:0 0 0 16px}
  .nav-burger{display:block;margin-left:auto;background:none;border:1px solid var(--line);border-radius:8px;padding:8px 12px;font:inherit;color:var(--ink)}
  .ind-strip{grid-template-columns:1fr 1fr 1fr}
  .gloss{grid-template-columns:1fr}
  .rfq .row,.rfq .row3{grid-template-columns:1fr}
}
/* 规格表响应式: 窄屏时表格自身横向滚动, 不撑破页面 */
@media(max-width:1000px){
  .spec-table{display:block;overflow-x:auto;-webkit-overflow-scrolling:touch;white-space:nowrap}
  .spec-table td,.spec-table th{white-space:nowrap}
}
@media(max-width:640px){
  .card-cols{grid-template-columns:1fr}.solutions{grid-template-columns:1fr}.hero-stats{flex-wrap:wrap;gap:14px}.ind-strip{grid-template-columns:1fr 1fr}.spec-table{font-size:.8rem}.spec-table td,.spec-table th{padding:8px 8px}}

/* ===== 旗舰产品页版式: 干燥网带 / 真空滤布 ===== */
.pp-hero{max-width:1180px;margin:48px auto 0;padding:0 24px}
.pp-hero figure,.pp-hero img{width:100%}
.pp-hero figure{border-radius:var(--radius);overflow:hidden;border:1px solid var(--line);box-shadow:var(--shadow)}
.pp-hero figcaption{font-size:.85rem;color:var(--ink-soft);padding:12px 16px;background:var(--surface);border:1px solid var(--line);border-top:none;border-radius:0 0 var(--radius) var(--radius)}
/* 首屏家族跳转按钮 */
.hero-flex{display:flex;gap:28px;align-items:flex-end;justify-content:space-between;flex-wrap:wrap}
.hero-main{flex:1;min-width:0}
.hero-jumps{display:flex;flex-direction:column;gap:8px;padding:8px 0 4px;min-width:190px}
.hj-label{font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-soft)}
.hero-jumps a{display:block;font-size:.85rem;font-weight:700;color:var(--teal-deep);background:var(--surface);border:1px solid var(--gold);border-radius:999px;padding:7px 16px;text-align:center;text-decoration:none}
.hero-jumps a:hover{background:var(--teal);border-color:var(--teal);color:#fff}
/* 抗静电三构造: 三等宽同比例(10:7) */
.as-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin:24px 0}
.as-card{background:var(--surface);border:1px solid var(--line);border-radius:12px;overflow:hidden;display:flex;flex-direction:column}
.as-card img{width:100%;height:auto;object-fit:cover;aspect-ratio:10/7}
.as-card figcaption{padding:14px 16px;display:flex;flex-direction:column;gap:4px}
.as-card figcaption b{font-family:var(--serif);font-size:1rem}
.as-card figcaption span{font-size:.85rem;color:var(--ink-soft)}
/* 洗毛案例双图 */
.duo-imgs{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.duo-imgs img{width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;border:1px solid var(--line);border-radius:10px}
.vid-h{margin-top:34px}
/* 视频双卡 */
.vid-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:20px;margin:24px 0}
.vid-card{background:var(--surface);border:1px solid var(--line);border-radius:12px;overflow:hidden}
.vid-card video{width:100%;display:block;background:#0d1517;aspect-ratio:4/3;object-fit:cover}
.vid-card figcaption{padding:14px 16px;display:flex;flex-direction:column;gap:4px}
.vid-card figcaption b{font-family:var(--serif);font-size:1rem}
.vid-card figcaption span{font-size:.85rem;color:var(--ink-soft)}
/* 工序行: 主/次 + 左右交替 */
.app-row{display:grid;grid-template-columns:1.05fr .95fr;gap:32px;align-items:center;padding:26px 0;border-top:1px dashed var(--line)}
.app-row.rev{grid-template-columns:.95fr 1.05fr}
.app-row.rev .app-img{order:2}
.app-major .app-img{position:relative}
.app-major .app-img img{border:2px solid var(--gold);border-radius:12px}
.app-minor .app-img img{border:1px solid var(--line);border-radius:12px}
.app-img img{width:100%;height:auto}
.app-img.sm img{max-width:64%;}
/* 滤芯页紧凑排版: 字号降两号, 字距微收, 手机端再降一档 */
/* 生产链条幅: 全宽全景条 + 小尺寸两档 */
.eq-step{margin:30px 0;padding-top:22px;border-top:1px dashed var(--line)}
.eq-step .app-txt{max-width:62em}
.eq-strip{max-width:1080px;margin:12px auto 0;border-radius:12px;overflow:hidden;border:1px solid var(--line)}
.eq-strip img{width:100%;display:block}
.eq-strip.half{max-width:640px}
.eq-strip figcaption{font-size:.82rem;color:var(--ink-soft);padding:8px 12px;background:var(--surface);border-top:1px solid var(--line)}

/* 行业页 banner: 紧凑尺寸, 不放大 */
.ind-banner{max-width:920px;width:fit-content;margin:30px auto 0}
.ind-banner img{width:auto;max-width:100%;height:auto;display:block;margin:0 auto}
.fc-compact{font-size:15px;letter-spacing:-0.01em}
.fc-compact p,.fc-compact li{font-size:0.95em;letter-spacing:-0.01em}
.fc-compact ul.li-list{line-height:1.55}
.fc-compact .app-txt h3{font-size:1.18rem}
.fc-compact .app-tag{margin-bottom:6px}
@media(max-width:480px){
  .fc-compact{font-size:14px}
  .fc-compact p,.fc-compact li{font-size:14px}
  .fc-compact .app-txt h3{font-size:1.08rem}
  .fc-compact .app-img.sm img{max-width:80%}
}
.app-img.sm{justify-items:center}
.app-img video{width:100%;display:block;background:#0d1517;aspect-ratio:4/3;object-fit:cover;border:1px solid var(--line);border-radius:12px}
.app-img figcaption{font-size:.82rem;color:var(--ink-soft);padding-top:8px}
.app-txt h3{font-family:var(--serif);font-size:1.3rem;margin-bottom:6px}
.app-tag{display:inline-block;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:10px}
.app-txt p{font-size:.95rem;color:var(--ink-soft)}
.app-links a{font-weight:700;font-size:.9rem}
/* 小图库: 四联 */
.mini-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin:26px 0}
.mini-gallery figure{border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--surface)}
.mini-gallery img{width:100%;height:auto;aspect-ratio:4/3;object-fit:cover}
.mini-gallery figcaption{font-size:.78rem;color:var(--ink-soft);padding:7px 10px}
.mini-gallery.two{grid-template-columns:1fr 1fr;max-width:640px}
.mini-gallery.three{grid-template-columns:repeat(3,1fr);margin:18px 0 14px}
.mini-gallery.compact{max-width:620px;margin:18px auto}
/* 接头: 一大四小 */
.seam-grid{display:grid;grid-template-columns:1.35fr 1fr 1fr;grid-template-rows:auto auto;gap:14px;margin:24px 0}
.seam-feature{grid-row:1/3;border:2px solid var(--gold);border-radius:12px;overflow:hidden;background:var(--surface);display:flex;flex-direction:column}
.seam-feature img{width:100%;height:100%;object-fit:cover;flex:1}
.seam-feature figcaption{padding:12px 14px;display:flex;flex-direction:column;gap:3px}
.seam-feature figcaption b{font-family:var(--serif)}
.seam-feature figcaption span{font-size:.83rem;color:var(--ink-soft)}
.seam-item{border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--surface)}
.seam-item img{width:100%;aspect-ratio:4/3;object-fit:cover}
.seam-item figcaption{font-size:.8rem;color:var(--ink-soft);padding:7px 10px}
.seam-note{font-size:.88rem;color:var(--ink-soft)}
/* 真空: 型号行 */
.model-list{display:flex;flex-direction:column;gap:0;margin:24px 0}
.model-row{display:grid;grid-template-columns:.8fr 1.2fr;gap:28px;align-items:center;padding:24px 0;border-top:1px dashed var(--line)}
.model-row:first-child{border-top:none;padding-top:8px}
.model-row.rev .model-img{order:2}
.model-img img{width:100%;border-radius:12px;border:1px solid var(--line)}
.model-row:first-child .model-img img{border:2px solid var(--gold)}
.model-img figcaption{font-size:.82rem;color:var(--ink-soft);padding-top:8px}
.model-txt h3{font-family:var(--serif);font-size:1.35rem;margin-bottom:8px;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
.model-txt p{font-size:.95rem;color:var(--ink-soft);max-width:38em}
.chip{font-family:var(--sans);font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#fff;background:var(--teal);border-radius:999px;padding:4px 12px;white-space:nowrap}
.m-tags{font-size:.8rem;color:var(--teal-deep);font-weight:600;letter-spacing:.02em}
/* FGD 对比卡 */
.duo-compare{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin:20px 0}
.duo{background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:20px 24px}
.duo:last-child{border:2px solid var(--gold)}
.duo h4{font-family:var(--serif);font-size:1.05rem;margin-bottom:10px}
.duo ul{list-style:none}
.duo li{font-size:.9rem;color:var(--ink-soft);padding:5px 0 5px 20px;position:relative}
.duo li::before{content:"—";position:absolute;left:0;color:var(--gold)}
.table-note{font-size:.85rem;color:var(--ink-soft)}
@media(max-width:860px){
  .hero-jumps{flex-direction:row;flex-wrap:wrap;justify-content:center;min-width:0}
  .hj-label{width:100%;text-align:center}
  .as-grid{grid-template-columns:1fr 1fr}.as-card:last-child{grid-column:1/3}
  .vid-grid{grid-template-columns:1fr}
  .app-row,.app-row.rev{grid-template-columns:1fr}.app-row.rev .app-img{order:0}
  .mini-gallery{grid-template-columns:1fr 1fr}
  .seam-grid{grid-template-columns:1fr 1fr}.seam-feature{grid-row:auto;grid-column:1/3}
  .model-row,.model-row.rev{grid-template-columns:1fr}.model-row.rev .model-img{order:0}
  .duo-compare{grid-template-columns:1fr}
}
/* ===== 移动端紧凑排版:缩字号、收行距、减留白 ===== */
@media(max-width:860px){
  html{font-size:15.5px}
  body{font-size:15.5px;line-height:1.6}
  section{padding:50px 0}
  .hero{padding:48px 0 44px}
  .wrap{padding:0 18px}
  .page-hero,.ind-hero{padding:36px 0 30px}
  .page-hero .lede,.ind-hero .lede{margin-top:10px;font-size:.97rem}
  .article{max-width:100%}
  .article h2{font-size:1.35rem;margin:28px 0 10px}
  .article p{margin-bottom:10px}
  .proc-list{gap:12px;margin:22px 0}
  .proc-item{padding:16px 18px}
  .proc-item p{font-size:.9rem}
  .app-row,.app-row.rev{gap:18px;padding:18px 0}
  .as-grid,.vid-grid,.seam-grid,.model-list{margin:18px 0}
  .as-grid{gap:12px}
  .vid-grid{gap:12px}
  .mini-gallery{gap:10px;margin:18px 0}
  .faq details{padding:14px 16px;margin-bottom:10px}
  .faq summary{font-size:1rem}
  .cta-band{margin-top:34px;padding:24px 22px;gap:14px}
  .related{margin-top:32px}
  .related-grid a{padding:14px 16px;font-size:.92rem}
  .oem-note{padding:14px 16px;margin:18px 0;font-size:.88rem}
  .rfq{padding:26px 20px}
  .accounting{margin:18px 0}
  .duo-compare{gap:12px}
  .duo{padding:16px 18px}
}
@media(max-width:480px){
  html{font-size:15px}
  body{font-size:15px;line-height:1.58}
  section{padding:40px 0}
  .hero{padding:38px 0 34px}
  .wrap{padding:0 14px}
  .page-hero,.ind-hero{padding:28px 0 24px}
  .crumbs{margin-bottom:10px;font-size:.78rem}
  .series-chip{font-size:.7rem;padding:5px 12px;margin-bottom:10px}
  .article h2{font-size:1.24rem;margin:22px 0 8px}
  .app-txt h3{font-size:1.14rem}
  .proc-item h3{font-size:1.04rem}
  .as-grid{grid-template-columns:1fr}.as-card:last-child{grid-column:auto}
  .mini-gallery{grid-template-columns:1fr 1fr}
  .mini-gallery.three{grid-template-columns:1fr 1fr 1fr;gap:6px}
  .mini-gallery.three figcaption{font-size:.7rem;padding:5px 7px}
  .duo-imgs{gap:6px}
  .btn{padding:11px 22px;font-size:.9rem}
  .hero-jumps a{font-size:.8rem;padding:6px 12px}
  .nav-logo{font-size:1.15rem}
  .card-body{padding:16px 16px 20px}
  .cta-band{padding:20px 18px}
  .cta-band h2{font-size:1.25rem}
}

/* ===== V2 工程档案风皮肤层 ===== */
.kicker,.hj-label,.app-tag,.chip,.m-tags{font-family:var(--mono);letter-spacing:.16em;text-transform:uppercase}
.app-tag,.hj-label,.m-tags{color:#123AA0!important}
.series-chip{border-radius:0;border:1px solid #121B24}
.btn{border-radius:0!important;box-shadow:none!important}
.btn-primary,.nav-cta{background:#121B24!important}
.nav-cta:hover{background:#1E4FD8!important}
.page-hero,.ind-hero{background:linear-gradient(180deg,#EDF0EA,#F6F7F4)!important}
.cta-band{background:#121B24!important;border-radius:0!important}
.cta-band .btn{background:#EAF0FE!important;color:#123AA0!important}
.accounting{border-left:4px solid #1E4FD8;background:#F6F7F4}
.spec-table th{font-family:var(--mono);font-size:.78rem;letter-spacing:.05em;text-transform:uppercase;background:#121B24!important;color:#fff!important}
.spec-table caption{text-align:left;font-family:var(--mono);font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;color:#5A6470}
.oem-box{border:1px solid #121B24;border-radius:0;background:#fff!important}
.app-major .app-img img{border:2px solid #1E4FD8!important;border-radius:0!important}
.hero-jumps a{border-radius:0;border:1px solid #DCE0D7;background:#fff}
.hero-jumps a:hover{background:#121B24;border-color:#121B24;color:#fff}
.duo:last-child{border:2px solid #1E4FD8}
figure.pp-hero{border-radius:0;box-shadow:0 1px 0 #DCE0D7}
.solution-card{border-radius:0}
.solution-card:hover{transform:none;box-shadow:0 8px 24px rgba(18,27,36,.10)}

`

const slugTitle = s => s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
const P = Object.keys(products);
const prodLink = { "forming-fabric": "Forming Fabric", "dryer-fabric": "Dryer Fabric", "vacuum-fabric": "Vacuum Filter Fabric", "press-fabric": "Press Filter Fabric", "press-belt": "Press Filter Belt", "products/filter-bag": "Filter Bag", "products/filter-cartridge": "Filter Cartridge", "spiral-belt": "Spiral Fabric", "products/square-mesh": "Polyester Square Mesh" };

const navProducts = `<a href="/forming-fabric/">Forming Fabric</a>
<a href="/dryer-fabric/">Dryer Fabric</a>
<a href="/spiral-belt/">Spiral Fabric</a>
<a href="/products/square-mesh/">Polyester Square Mesh</a>
<a href="/vacuum-fabric/">Vacuum Filter Fabric</a>
<a href="/press-fabric/">Press Filter Fabric</a>
<a href="/press-belt/">Press Filter Belt</a>
<a href="/products/filter-bag/">Filter Bag</a>
<a href="/products/filter-cartridge/">Filter Cartridge</a>`;
const navIndustries = Object.values(industries).map(i => `<a href="${i.url}">${i.name}</a>`).join("\n");

function layout({ url, title, desc, type = "website", jsonld = "", body, activeNav = "", og = "" }) {
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
<meta property="og:image" content="${og ? (og.startsWith("http") ? og : "https://www.aurora-filtech.com" + og) : "https://www.aurora-filtech.com/qfy-content/uploads/2019/12/711b4e3ef611d676aa22b38c17cf53e4.jpg"}">
<meta property="og:locale" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/style.css">
${jsonld ? `<script type="application/ld+json">\n${jsonld}\n</script>` : ""}
</head>
<body>
<header class="site-header">
  <div class="wrap nav">
    <a class="nav-logo" href="/"><svg width="34" height="34" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="#0F6E66"/><path d="M12 44c8-2 10-24 20-24s10 22 20 24" stroke="#C4A265" stroke-width="5" fill="none" stroke-linecap="round"/></svg>Aurora Filtech</a>
    <button class="nav-burger" aria-label="Toggle menu">☰ Menu</button>
    <nav class="nav-menu" aria-label="Main navigation">
      <a href="/"${activeNav === "home" ? ' aria-current="page"' : ""}>HOME</a>
      <div class="has-sub">
        <a href="/#solutions">PRODUCTS ▾</a>
        <div class="sub">${navProducts}</div>
      </div>
      <div class="has-sub">
        <a href="/industries/wood-based-panels/"${activeNav === "industries" ? ' aria-current="page"' : ""}>INDUSTRIES ▾</a>
        <div class="sub">${navIndustries}</div>
      </div>
      <div class="has-sub">
        <a href="/resources/glossary/">RESOURCES ▾</a>
        <div class="sub"><a href="/resources/glossary/">Filtration Glossary</a><a href="/blog/">Blog & Guides</a></div>
      </div>
      <a href="/about/"${activeNav === "about" ? ' aria-current="page"' : ""}>ABOUT</a>
      <a href="/#rfq"${activeNav === "contact" ? ' aria-current="page"' : ""}>CONTACT</a>
      <a class="nav-cta" href="/#rfq">Get a Quote</a>
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
      <p class="footer-note">Manufacturer of paper machine clothing, filter fabrics, spiral fabrics and mesh belts for paper, wood-based panel, mining, power, food and pharmaceutical industries. 30+ years of expertise, 3 factories, OEM/ODM service.</p>
    </div>
    <div>
      <h3>Products</h3>
      <a href="/forming-fabric/">Forming Fabric</a>
      <a href="/dryer-fabric/">Dryer Fabric</a>
      <a href="/spiral-belt/">Spiral Fabric</a>
      <a href="/products/square-mesh/">Square Mesh</a>
      <a href="/vacuum-fabric/">Vacuum Filter Fabric</a>
      <a href="/press-fabric/">Press Filter Fabric</a>
    </div>
    <div>
      <h3>Industries & Resources</h3>
      <a href="/about/">About Us & Production</a>
      <a href="/industries/wood-based-panels/">Wood-based Panels</a>
      <a href="/industries/paper-and-pulp/">Paper & Pulp</a>
      <a href="/industries/mining/">Mining</a>
      <a href="/industries/power-generation-fgd/">Power & FGD</a>
      <a href="/resources/glossary/">Filtration Glossary</a>
      <a href="/blog/">Blog & Guides</a>
    </div>
    <div>
      <h3>Contact</h3>
      <p class="footer-note">Email: <a href="mailto:aaron@aurora-filtech.com" style="display:inline">aaron@aurora-filtech.com</a><br>London: 8 Standard Road, NY10 6EU, UK<br>Changzhou: Room 1103, Guanhe East Rd, Tianning District, China<br>Tel: +86 152 0611 9266</p>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span>© ${new Date().getFullYear()} Aurora Filtech Co., Ltd. All rights reserved.</span>
    <span>Industrial filter fabrics & filter belts manufacturer</span>
  </div>
</footer>
<script>
document.querySelector('.nav-burger').addEventListener('click',function(){document.querySelector('.nav-menu').classList.toggle('open')});
</script>
</body>
</html>`;
}

// RFQ 表单(全站统一,含客户类型与选型字段 —— 调研 1.2 模块4)
const rfqSection = `
<section id="rfq" class="sec" style="background:var(--surface);border-top:1px solid var(--line)">
  <div class="wrap" style="max-width:860px">
    <div class="rfq">
      <span class="kicker">Request for Quotation</span>
      <h3 style="margin-top:10px">Tell us about your machine — we reply within 24 hours</h3>
      <p class="hint">Our engineers match weave, material, seam and edge to your duty. A photo of the old belt's data tag helps.</p>
      <form action="mailto:johnson@aurora-filtech.com" method="post" enctype="text/plain">
        <div class="row3">
          <div class="field"><label for="f-type">You are a *</label>
            <select id="f-type" name="customer_type" required><option value="">Select…</option><option>End user (mill / plant)</option><option>Distributor / trader</option><option>OEM / machine builder</option><option>Other</option></select></div>
          <div class="field"><label for="f-company">Company *</label><input id="f-company" name="company" required></div>
          <div class="field"><label for="f-email">Email *</label><input id="f-email" name="email" type="email" required></div>
        </div>
        <div class="row3">
          <div class="field"><label for="f-product">Product</label>
            <select id="f-product" name="product">${Object.entries(prodLink).map(([s, n]) => `<option>${n}</option>`).join("")}<option>Other / not sure</option></select></div>
          <div class="field"><label for="f-machine">Machine / filter type</label><input id="f-machine" name="machine" placeholder="e.g. horizontal belt filter, MDF dryer…"></div>
          <div class="field"><label for="f-size">Belt / cloth size</label><input id="f-size" name="size" placeholder="Length × width / Ø"></div>
        </div>
        <div class="row3">
          <div class="field"><label for="f-material">Material / slurry</label><input id="f-material" name="material" placeholder="What do you filter / dry?"></div>
          <div class="field"><label for="f-temp">Temperature (°C)</label><input id="f-temp" name="temperature"></div>
          <div class="field"><label for="f-ph">pH / chemistry</label><input id="f-ph" name="ph" placeholder="Acid / alkaline, Cl⁻…"></div>
        </div>
        <div class="field"><label for="f-name">Your Name</label><input id="f-name" name="name"></div>
        <div class="field"><label for="f-request">Notes</label><textarea id="f-request" name="notes" rows="4" placeholder="Target air permeability, seam type, monthly quantity…"></textarea></div>
        <button class="btn btn-primary" type="submit">Send RFQ</button>
      </form>
    </div>
  </div>
</section>`;

module.exports = { CSS, layout, rfqSection, industries, applications, posts, glossary, products, prodLink, slugTitle };
