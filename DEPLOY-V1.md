# Aurora Filtech V1.2 — 企业邮箱 SMTP 接入

本版分支：`v1-smtp-20261119`。它基于 V1.1 提交 `fc7db78`，上一版仍保留在
`v1-optimization-20261119`。原生产分支 `main` 未覆盖；原始版本的备份标签为
`v1-before-optimization-20261119`。

## 当前状态

- 用户已确认：使用现有企业邮箱 SMTP，收件人为 `johnson@aurora-filtech.com`。
- DNS MX 记录和项目资料均指向阿里云企业邮箱。
- 新版使用 SMTP，不再需要 Resend 账号、密钥或新发件域名。
- 旧生产站 `https://aurora-filtech.pages.dev` 的询盘失败原因，已通过实际提交确认为
  `RESEND_API_KEY` 缺失、HTTP 503。新版代码尚不能替代旧部署中正在运行的接口。
- 本机 Node.js 已完成 `smtp.qiye.aliyun.com:465` 的证书校验、TLS 握手和 SMTP 问候。
  这次探测没有执行 AUTH 或发送邮件。
- 已修复运行器连接兼容问题：默认预解析 IP 的连接路径返回 `ESOCKET / proxy request failed`；
  改为保留官方主机名建立 TLS socket 后，Cloudflare 本地运行器的握手／问候探测也通过。
  远端预览上传仍超时，尚未完成真实 Cloudflare 云环境的鉴权和发信验收。
- 尚未提供或配置邮箱客户端授权码，未进行真实邮箱登录、邮件发送或收件验收。

## 邮箱配置

阿里云当前官方通用配置是 `smtp.qiye.aliyun.com`、SSL/TLS 端口 **465**。
本版只允许此类从连接开始就加密的 465 端口；不会回退到明文 SMTP，始终校验证书。
不改动现有 MX、SPF、DKIM 或企业邮箱收信设置。

1. 在企业邮箱管理中确认发件账号已允许 SMTP／三方客户端访问。
2. 若已启用“三方客户端安全密码”，使用专用客户端密码，不能用普通网页登录密码替代。
3. 在 Cloudflare → Workers & Pages → **scheme1** → Settings → Variables and Secrets，
   为需要测试的 **Preview** 环境配置：
   - `SMTP_HOST`：`smtp.qiye.aliyun.com`
   - `SMTP_PORT`：`465`
   - `SMTP_USER`：实际发件账号，例如 `johnson@aurora-filtech.com`
   - `SMTP_PASSWORD`：**Secret**，填该账号的客户端授权码／安全密码
   - `RFQ_FROM_EMAIL`：与 `SMTP_USER` 相同的完整邮箱地址，不带显示名称
   - `RFQ_TO_EMAIL`：`johnson@aurora-filtech.com`
4. 也可以使用同域名的专用询价账号发件，此时同时修改 `SMTP_USER` 和 `RFQ_FROM_EMAIL`。
   程序要求两者相同，防止被邮箱服务拒绝或错误冒用发件地址。
5. 配置后重新部署 SMTP 分支。环境变量只存在于后台，不会通过 Git 文件自动设置。
6. 预览验收通过后，再为 Production 配置并按正常 Git 流程合并，勿强制覆盖旧版本。

密码只填写在 Cloudflare Secret，或本机已被 Git 忽略的 `.dev.vars`；不写入源码或聊天。
客户端永远不能选择 SMTP 主机、账号、发件人、收件人、抄送或密送。
客户填写的邮箱仅成为邮件的 **Reply-To**，便于 Johnson 直接回复。

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
  和现有 Cloudflare Git 集成的 `site-v1` 构建根目录。
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

- https://help.aliyun.com/zh/document_detail/36576.html
- https://help.aliyun.com/document_detail/36687.html
- https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/
- https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/
- https://nodemailer.com/smtp
- https://nodemailer.com/message
