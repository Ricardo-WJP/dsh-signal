# DSH Signal

为 DeepSeek Harness 添加水面折射品牌动效、真实余额与剩余额度、模型工作说明，以及本地 Token 用量统计。

Signal 是独立的视觉与只读用量插件，不是登录插件，不修改模型路由，不自动切换模型。与 DeepSeek 或其他供应商无官方隶属关系。

## 安装

需要 Node.js 22+ 与 DeepSeek Harness。当前版本为 **0.6.12**；已在 Windows Desktop / DSH 0.1.2-rc.1 验证，其他宿主版本尚需验证。

推荐从 [npm](https://www.npmjs.com/package/dsh-signal) 安装：

```sh
npx @deepseek-ai/dsh plugin --profile web add dsh-signal@0.6.12
```

也可以从 GitHub 安装已构建版本：

```sh
npx @deepseek-ai/dsh plugin --profile web add github:Ricardo-WJP/dsh-signal#v0.6.12
```

也可下载 GitHub Release 中的 `.tgz`，通过宿主支持的本地包安装流程安装。使用其他 profile 时，请替换 `web`。npm 与 GitHub Release 的 0.6.12 安装包校验值一致。

## 功能

- **品牌区**：点阵水流、随指针响应的蓝色折射，保留 Logo 和 slogan 的固定布局；支持浅深主题与减少动态。
- **资源条**：显示品牌/订阅身份与可信资源数据。额度条越长代表剩余越多；普通钱包仅显示金额，不伪造百分比。
- **真实额度**：DeepSeek、OpenCode Go、OpenRouter、Moonshot/Kimi、SiliconFlow 使用允许列表中的官方端点。Codex 额度读取独立 Codex Connect 的脱敏状态接口；需要另行安装并登录 Codex Connect。
- **工作说明**：把当前工具类别翻译为通俗动作，不展示工具参数或敏感内容。宽屏为聊天预留空间，窄屏允许覆盖；不会压住设置弹窗。
- **Signal 用量**：本地 Token 日历、筛选、周视图和累计统计；没有记录不等于零消耗，不根据 Token 猜测费用。
- **Signal 外观**：本地品牌、订阅名称及图标映射，只影响显示，不创建账户或额度。
- **卡片动效**：不透明面板、极细蓝色流动轮廓与指针高光。额度详情点击外部关闭；工作说明保留切换展开行为。

## 数据与隐私

余额凭据由 DSH Host 读取，仅向固定或严格允许列表内的官方 HTTPS 端点发送。浏览器不会得到原始凭据。Signal 不包含登录、Grok/Antigravity 连接、遥测或自动模型切换。

用量统计读取本地会话的结构化 Token 记录，不读取聊天正文用于统计，不上传统计数据。显示身份保存在浏览器本地。

额度使用前台轮询与事件触发读取：正常前台调度间隔 45 秒，展开、返回页面、切换模型和任务完成会请求刷新；请求合并、节流和失败退避可能延后读取。后台暂停非必要刷新。供应商缓存仍可能导致延迟，这不是实时推送。刷新失败保留最后成功值并标记状态，不伪造零余额。

## 开发

```sh
npm ci
npm run build:client
npm run check
npm pack --dry-run
```

`src/client` 的八个模块生成 `lib/client.js`。Host 实现在 `lib/index.js`，远程接口在 `lib/typert.host.js`。仓库保留构建产物，便于直接安装。

公开仓库包含纯逻辑/刷新调度回归测试；发布前还做了本机宿主合同测试、四组宽窄屏/浅深色组件检查和桌面实测。这些结果不代表所有供应商账户、宿主版本或系统均已验证。原开发机专用脚本和账户环境不公开。

## 视觉参考与许可

细边框和局部高光参考 [Magic UI Border Beam](https://magicui.design/docs/components/border-beam) 与 [Aceternity Glowing Effect](https://ui.aceternity.com/components/glowing-effect) 的交互思路，以原生 CSS 实现，未引入这些组件库。

代码采用 MIT 许可；第三方代码来源及许可见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。供应商品牌图形用于识别服务，不代表官方背书。
