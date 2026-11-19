# Aurora Filtech V1.1 — 构建、预览与询盘配置

本次修改保存在 `v1-optimization-20261119` 分支。修改前的版本为
`11b9dd6f727ff4fbb8bfaa2491b0a8c3ed92ca4c`，标签为 `v1-before-optimization-20261119`。
不要把此分支强制覆盖到 main；先验收分支预览，再按正常 Git 流程合并。

## 当前线上询盘故障（2026-11-19 实测）

V1 的 Cloudflare Pages 项目名为 `scheme1`，实际域名为
`https://aurora-filtech.pages.dev`，并绑定 `aurora-filtech.com` 和 `www.aurora-filtech.com`。
旧对比页写的 `aurora-scheme1.pages.dev` 已不是该项目的可用地址。

线上 `/api/rfq` 的 GET 返回 `configured:false`，测试 POST 返回 HTTP 503：
`Email relay not configured yet: add RESEND_API_KEY in Cloudflare Pages Environment Variables.`
从 Cloudflare API 核对，生产与预览环境的环境变量列表均为空。
故障发生在调用邮件供应商之前，不能归因为垃圾邮箱或客户邮箱错误。
浏览器实际提交测试与直接接口测试得到了相同结果。

## 本地构建

要求 Node.js 22 或更高版本。在仓库根目录执行：

```sh
npm ci
npm run build
npm test
npm run dev
```

预览地址：`http://127.0.0.1:8712`。
`npm run dev` 使用 Cloudflare 本地运行时，能够运行 `/api/rfq`。
普通静态 HTTP 服务器和双击 HTML 只能检查页面，不能发邮件。

- `shared/rfq-function.js`：询盘接口的唯一编辑源；构建时同步到 Functions 入口。
- `site-v1/client.js`：V1 浏览器交互源；不要修改生成的 `assets/app.js`。
- `site-v1/design.js`：样式、公共导航和询盘表单。
- `site-v1/data-*.js`、`pages-*.js`：产品与页面内容。
- `site-v1/content-dates.json`：内容实际更新日期；按具体 URL 维护 `pages` 映射。
- `dist/v1`：只包含静态部署文件，不包含构建源码、测试或本地配置。
- `site-v1/assets/versioned`：带内容哈希的样式、脚本与图片，可缓存一年。

源图片继续保留在 `qfy-content/uploads`。构建按页面实际引用生成多个 WebP 尺寸，
不会修改源图片。每次修改后运行完整构建，确认 `npm test` 通过再提交生成文件。

## 配置真实邮件发送

1. 在 Resend 中添加并验证一个你拥有的发件域名。可以使用独立发信子域名，按
   Resend 提供的 DNS 记录配置 SPF/DKIM；不要改动现有阿里云企业邮箱的收信 MX。
2. 使用具有该域名发信权限的 Resend API Key。不要把密钥放进 HTML、JS、Git 或聊天。
3. Cloudflare → Workers & Pages → `scheme1` → Settings → Variables and Secrets，
   分别配置需要使用的 **Preview** 和 **Production** 环境：
   - `RESEND_API_KEY`：Secret。
   - `RFQ_FROM_EMAIL`：已验证域名下的发件地址，例如 `Aurora Filtech RFQ <rfq@aurora-filtech.com>`。
   - `RFQ_TO_EMAIL`：`johnson@aurora-filtech.com`，或明确指定的测试收件邮箱。
4. 修改变量后重新部署目标环境。仅更新项目变量不能证明正在运行的旧部署已获得绑定。
5. 本地测试时将 `.dev.vars.example` 复制为 `.dev.vars` 后自行填入；该文件已被 Git 忽略。

不要用 `onboarding@resend.dev` 作为正式站的兜底发件地址。Resend 测试域名有收件限制，
不能代替已验证的业务发件域名。新版遇到配置/供应商错误会明确报失败并保留替代联系入口。

## 邮件验收与排障

1. GET `/api/rfq` 应返回 HTTP 200 且 `configured:true`。这只说明配置存在，不等于域名验证通过。
2. 在浏览器底部询盘组件填写一条明确标记为测试的询盘。
3. POST 应返回 HTTP 200、`status:"accepted"`、供应商邮件 `id` 和诊断 `reference`。
4. 在 Resend 的邮件日志按 `id` 核对状态，确认 `delivered`，再检查目标收件箱/垃圾邮件。
   `accepted` 表示供应商接受请求，不代表邮件已经进入收件箱。
5. 若返回 `MAIL_PROVIDER_REJECTED`，根据 Cloudflare 日志中的 `reference`、供应商错误类型
   排查密钥权限、域名验证、发件人和配额。日志不记录询盘正文、邮箱或密钥。
6. 超时后可重试同一份表单；同一提交的供应商请求体和幂等键保持一致，避免重复发送。

## 防刷与输入限制

后端校验同源 Origin、字段类型、长度和最大 32KiB 请求体；邮件 HTML 转义。
可配置 `TURNSTILE_SITE_KEY` 与 `TURNSTILE_SECRET_KEY`，前端自动加载验证控件，后端
通过 Siteverify 验证成功及 hostname 后才发送。两项必须同时配置。

生产域名还应为 POST `/api/rfq` 设置 Cloudflare 边缘频率限制，例如每 IP 每分钟 5 次。
边缘规则属于 Cloudflare 账户配置，不会由 Git 文件自动启用。本次未变更线上防护规则。
接口支持注入 `RFQ_RATE_LIMIT.limit()` 平台绑定，但 Pages 并非支持所有 Workers 绑定；
优先使用域名上的边缘规则，不要仅添加一个同名字符串环境变量。

## 分支预览与部署

现有 Git 集成使用 `main` 作为生产分支。推送新分支会创建预览部署，保留生产版本。
既有项目的根目录为 `site-v1`，因此该目录保留已生成网页和 Functions 入口，兼容当前配置。
也可以在仓库根目录执行 `npm run build` 后使用：

```sh
npm run deploy:preview
```

这条命令固定部署到 `v1-optimization-20261119` 预览分支，不替换生产环境。
使用 Wrangler 部署时从仓库根目录运行，确保根目录 `functions/` 被编译。
不要使用控制台拖拽上传来部署包含 `functions/` 的版本。

长期建议在 Cloudflare 将构建根目录设为仓库根目录、构建命令设为 `npm ci && npm run build`、
静态输出目录设为 `dist/v1`。修改现有生产项目构建设置前应先验证分支预览。

## 参考

- https://developers.cloudflare.com/pages/get-started/direct-upload/#functions
- https://developers.cloudflare.com/pages/functions/bindings/
- https://resend.com/docs/dashboard/emails/idempotency-keys
- https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
