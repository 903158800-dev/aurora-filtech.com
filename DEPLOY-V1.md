# Aurora Filtech V1.2 — 企业邮箱 SMTP 发送网站询价通知

本版分支：`v1-smtp-20261119`。它基于 V1.1 提交 `fc7db78`，上一版仍保留在
`v1-optimization-20261119`。原生产分支 `main` 未覆盖；原始版本的备份标签为
`v1-before-optimization-20261119`。

## 当前状态

- 客户填写公司名、联系邮箱、需求后，网站后台将全部已填信息发送到
  `johnson@aurora-filtech.com`；客户邮箱仅用作邮件正文和 Reply-To 回复地址。
- `903158800@qq.com` 是用户模拟客户时填写的联系邮箱，不是网站发信账号。
  已移除之前误设的 QQ 发件账号，不需要客户提供 QQ SMTP 授权码。
- 新版使用企业邮箱 SMTP，不依赖 Resend；SMTP 主机预设为阿里企业邮箱，端口 465。
  用户已确认发件账号为 `aaron@aurora-filtech.com`，收件人为 Johnson。
- 两份 Wrangler 配置及 Cloudflare Preview 的非秘密配置均已修正并回读确认。
- 发件账号已配置为 Aaron；客户端安全密码由用户直接填写到 Cloudflare Secret。
  未配置密码时不会尝试登录邮箱或发送邮件。
  2026-11-19 已完成真实表单提交；用户确认 Johnson 收到邮件、中文和字段完整、回复地址正确。
- 旧生产站 `https://aurora-filtech.pages.dev` 的询盘失败原因，已通过实际提交确认为
  `RESEND_API_KEY` 缺失、HTTP 503。这说明旧实现的发送服务没有配置好，不代表必须使用 Resend。
- 新分支已成功推送 GitHub；原版备份标签也已上传。生产分支仍为 `main`。
- 新版预览已部署成功：https://v1-smtp-20261119.aurora-filtech.pages.dev/
  已在 Edge 中查看 1440×1000 电脑布局、390×844 手机布局及询价提交区域，无横向溢出。
  Preview 与 Production 均已保存 `SMTP_PASSWORD` Secret；已部署预览接口返回 `provider:"smtp"`、`configured:true`。
- 阿里邮箱 `smtp.qiye.aliyun.com:465` 已通过 Node.js 和 Cloudflare 本地运行器的
  TLS 证书校验及 SMTP 问候探测。连接探测没有执行 AUTH、MAIL FROM 或 DATA；另行完成的真实询价已确认收件。
- 修正打包时收集依赖目录中静态文件的问题，根目录构建和子目录发布均排除依赖及本地状态。

## 邮箱配置

阿里企业邮箱 SMTP 使用 `smtp.qiye.aliyun.com`、SSL/TLS 端口 **465**。
此版始终校验 TLS 证书，不改动企业邮箱现有 MX 收信设置。

1. 使用 `aaron@aurora-filtech.com` 登录 https://qiye.aliyun.com/。进入
   设置 → 查看更多设置 → 账户与安全 → 账户安全 → 三方客户端登录安全管理。
2. 开启三方客户端安全密码，点击生成新密码，完成手机验证码验证。
   复制仅显示一次的 16 位安全密码，设备用途填 `Aurora 网站询价`。
   开启后，原普通登录密码在第三方客户端中不再生效；Aaron 已有客户端也需各自的安全密码。
   若管理员限制访问，应仅为 Aaron 账号开放第三方客户端和 SMTP 权限。
3. 在两份 Wrangler 配置中填写同一个非秘密发件账号，并保持两份配置一致：
   - `SMTP_HOST`：`smtp.qiye.aliyun.com`
   - `SMTP_PORT`：`465`
   - `SMTP_USER`：`aaron@aurora-filtech.com`
   - `RFQ_FROM_EMAIL`：`aaron@aurora-filtech.com`
   - `RFQ_TO_EMAIL`：`johnson@aurora-filtech.com`
4. 在 Cloudflare → Workers & Pages → **scheme1** → Settings → Variables and Secrets，
   为 **Preview** 环境配置 `SMTP_PASSWORD`，类型为 **Secret**，
   值为 Aaron 的三方客户端安全密码，选择 Secret／Encrypt 后保存。
   不要填写模拟客户的 QQ 邮箱授权码。
5. 部署 SMTP 分支并完成下方验收。非秘密变量由 Wrangler 配置维护；Secret 仅存在于后台。
6. 预览验收通过后，再为 Production 配置并按正常 Git 流程合并，勿强制覆盖旧版本。

密码只填写在 Cloudflare Secret，或本机已被 Git 忽略的 `.dev.vars`；不写入源码或聊天。
客户只需要填表和提交，不能通过表单指定 SMTP 主机、账号、发件人、收件人、抄送或密送。

## 验收顺序

1. GET `/api/rfq` 应返回 HTTP 200、`provider:"smtp"`、`configured:true`。
   这只表示配置格式完整，**不会尝试登录邮箱，也不证明密码正确**。
2. 浏览器底部表单提交一条明确标记为测试的询价。
3. 接口只有在 SMTP 服务器返回最终 `250`、固定收件人被接受且生成 Message-ID 时，
   才返回 `status:"accepted"`。这表示服务器接受邮件，不等于收件箱已收到。
4. 在 Johnson 的收件箱、垃圾邮件及企业邮箱管理员投递日志中核对该邮件。
   按邮件头 `Message-ID` 或 `X-Aurora-Inquiry-Reference` 对应接口中的 `id`／`reference`。
   本实现没有执行 IMAP 保存“已发送”副本，不能只以该文件夹判断是否发送成功。
5. `SMTP_REJECTED` 表示收到明确拒绝，例如鉴权错误 535 或收件人拒绝 550。
   后台日志只记录诊断编号和 SMTP 状态码，不输出密码、客户正文或原始服务端回复。
6. `SMTP_RESULT_UNKNOWN` 表示连接在无法确定投递结果时中断。邮件可能已被接受，
   **先核对投递记录再补发**，不能直接连续点击重试。

SMTP 没有 Resend 式的幂等键保证。本版不自动重试 SMTP，稳定 Message-ID 只用于追踪，
不能承诺跨浏览器、跨请求绝对不重复。浏览器会在结果未知时保留草稿、锁定相同询盘的再次提交，
刷新当前标签页后仍保留该状态；明确拒绝时允许修正后重试。

## 构建与测试

Node.js 22 或以上，在仓库根目录运行：

```sh
npm ci
npm run build
npm test
npm run dev
```

网站本机预览：`http://127.0.0.1:8712`。普通静态服务器不能执行发信函数。

- `shared/rfq-function.js`：SMTP 发送、参数验证、错误分类的唯一编辑源。
- `site-v1/client.js`：表单、草稿、未知发送结果的交互保护。
- `site-v1/design.js`：导航、表单和样式；页面视觉优化沿用 V1.1。
- `site-v1/content-dates.json`：实际内容更新日期，构建不会自动刷新这些日期。
- `functions/api/rfq.js`、`site-v1/functions/api/rfq.js`：构建同步的部署入口。
- `dist/v1`：只含静态部署产物，不含源码、测试和秘密。
- 根目录与 `site-v1` 的 `wrangler.jsonc`：启用 Node.js 兼容，分别支持根目录 CLI 部署
  和现有 Cloudflare Git 集成的 `site-v1` 构建根目录。两份配置中的非秘密邮件变量应保持一致。
- `site-v1/package.json` 和锁文件：确保现有 Git 构建根目录能安装邮件依赖。

测试覆盖：配置缺失、输入/邮件头注入、固定收发地址、HTML 转义、证书校验配置、SMTP 拒绝、
发送结果未知、资源引用，以及真实 Nodemailer 与本机模拟 SMTP 服务的协议/MIME 交互。
测试服务只监听本机并使用假凭据，不向外发送邮件。
共 13 项测试；新增 TLS socket 适配器保留主机名、证书验证及错误关闭行为的检查。

手动运行不鉴权、不发邮件的 Cloudflare 运行器连接探测：

```sh
npx wrangler dev --config tests/smtp-probe.wrangler.jsonc --port 8714
```

打开 `http://127.0.0.1:8714/`。此探测文件不在网站的静态输出和 Functions 路由中，勿作为生产服务部署。

## Cloudflare Git 构建配置

项目 `scheme1` 的构建根目录为 `site-v1`。必须安装其邮件依赖；原来的空构建命令
会跳过依赖安装，导致 Functions 构建报错 `Could not resolve "nodemailer"`。
已将项目构建命令设为：

```sh
if [ -f package-lock.json ]; then npm ci --omit=dev; fi
```

新分支会安装锁定的 Nodemailer 依赖；旧版没有锁文件时跳过，保留对旧分支的构建兼容性。
此设置不会自行更换当前生产部署。

Pages Git 构建内部仍使用 Wrangler 3.114.17。实测该版本会把 `node:tls` 替换成旧 unenv
占位实现，`connect()` 只创建一个空 TLSSocket，导致 SMTP 无法完成。相同代码通过
Wrangler 4.153.0 部署后真实发信成功。两份配置现保留 `nodejs_compat`，并显式添加
`no_nodejs_compat_v2`，阻止旧构建器注入此占位实现；原生 Node API 和 TLS 证书校验仍启用。
本机使用 3.114.17 对比构建，已确认修正产物保留三处原生 `node:tls` 导入。
不要单独移除这一兼容设置，或只在本机升级 Wrangler 后就假定 Git 构建也已升级。

真实收件验证：`https://2803abef.aurora-filtech.pages.dev`（提交 `b10c077`，Wrangler 4 部署），
主题 `[RFQ] Spiral Fabric — AURORA WEBSITE TEST 20261119-BUILD4`，编号 `e7f1bc3d5275`。
用户已确认 Johnson 收到，内容完整，Reply-To 为 `903158800@qq.com`。
第一次旧构建部署测试编号 `8d1cf079df69` 返回结果未知，用户确认收件箱及垃圾邮件均未收到。

## 分支预览

```sh
npm run build
npm run deploy:preview
```

该命令固定部署到 **v1-smtp-20261119** 预览分支，生产分支仍是 `main`。
现有 Pages 项目名为 `scheme1`，实际默认域名为 `aurora-filtech.pages.dev`。
包含 Functions 的网站应使用 Git 集成或 Wrangler，不使用仅上传静态文件的拖拽方式。

开启真实发信前，应为生产域名 POST `/api/rfq` 设置边缘频率限制；也可同时配置
`TURNSTILE_SITE_KEY` 与 `TURNSTILE_SECRET_KEY`。两项必须成对配置。
应用的请求体上限为 32KiB，单字段有长度限制，表单有蜜罐校验。
这些应用检查不代替账户侧频率限制；当前没有自动变更线上防护规则。

## 官方参考

- https://help.aliyun.com/zh/document_detail/444269.html
- https://developers.cloudflare.com/pages/functions/bindings/#secrets

- https://help.aliyun.com/zh/document_detail/36576.html
- https://help.aliyun.com/zh/document_detail/36687.html
- https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/
- https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/
- https://nodemailer.com/smtp
- https://nodemailer.com/message
