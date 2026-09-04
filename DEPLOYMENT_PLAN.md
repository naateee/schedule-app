# 课程日历 — 托管与同步方案决策文档

> 记录时间:2026-09-04(最后更新:Firebase 同步已落地)
> 状态:托管已完成(GitHub Pages);同步已采用 Firebase 方案,代码已实现,待完成控制台配置。

---

## 〇、已落地的方案(2026-09-04 更新)

### 托管
- GitHub Pages:https://naateee.github.io/schedule-app/
- 仓库:https://github.com/naateee/schedule-app

### 同步(采用 Firebase)
- 项目:schedule-calendar-e9756
- 数据存 Firestore `schedules/main` 单一文档,onSnapshot 实时监听
- 匿名登录(signInAnonymously)+ 安全规则 `allow read, write: if request.auth != null`
- 本地 localStorage 作为离线兜底缓存
- 文件结构:
  - `index.html` —— 模板 + 逻辑(已含 Firebase 接入)
  - `schedule-data.js` —— 课程种子数据
  - `firebase-config.js` —— Firebase 配置(公开信息)

### 同步机制要点
- 打开页面 → 匿名登录 → onSnapshot 监听云端文档
- 任意端改动 → saveData() 写本地 + 推送云端 → 云端 onSnapshot 推给其它端 → 即时 render
- 离线时改动标记 localDirty,恢复在线后补推
- 云端为空时,用本地种子初始化并推上去

---

## 一、背景与当前状态

课程日历 App 位于 `D:\hkust_center\schedule-app\`,当前为纯静态结构:

- `index.html` —— 纯模板(样式 + 逻辑,不含课程数据)
- `schedule-data.js` —— 纯数据(6 门课种子数据)

数据存于各浏览器 localStorage,通过「⤓导出 / ⤒导入 JSON」手动迁移。
此结构「托管」与「同步」是两件独立的事:托管解决访问,同步解决多端数据一致。

---

## 二、托管方案(部署层)

| 方案 | 成本 | 难度 | 特点 |
|---|---|---|---|
| **GitHub Pages** | 免费 | 极低 | git push 即部署,与仓库天然一体,代码已在本地 |
| Cloudflare Pages | 免费 | 低 | 全球 CDN,香港访问延迟最低 |
| Vercel / Netlify | 免费 | 低 | 体验好,纯静态页无额外优势 |

结论:托管层几乎无争议。**首选 GitHub Pages**(代码已在本地,建仓 push 即上线);
若想香港访问更快可换 Cloudflare Pages。两者零成本零维护。

---

## 三、同步方案(数据层)

| 方案 | 同步效果 | 难度 | 成本 | 备注 |
|---|---|---|---|---|
| A. 纯静态 + 导出导入(现状) | 无自动同步 | 零 | 免费 | 手动、易忘、多端覆盖丢数据 |
| B. GitHub Gist 当云数据库 | 真同步(非实时,拉取/推送式) | 中等 | 免费 | 需 GitHub PAT,gist 权限,令牌存 localStorage |
| C. Firebase (Firestore/Realtime) | 最佳,真·实时 + 离线缓存 | 中偏高 | 免费 Spark 额度够用 | 需 Google 账号,香港访问无障碍 |
| D. Supabase | 好,接近实时 | 中等 | 免费(7 天不活跃会暂停) | 免费档休眠策略对低频个人用户不省心 |
| E. Cloudflare Workers + KV | 真同步(单点写) | 中偏高 | 免费额度慷慨 | 需一点后端思维,最工程化 |

### 关键难点:多端并发写冲突

同步的真正难点是「写」而非「读」。冲突解法从简到繁:

1. 整份覆盖(Gist 默认)——最简单,靠「打开先拉最新再改」降低冲突概率
2. 乐观锁 / 版本号——保存带版本号,版本不符则拒绝并提示刷新
3. 数据库级合并(Firebase/Supabase)——每条记录独立,天然不互相覆盖

对单人、双设备低频并发场景,「Gist + 版本号」已足够。

---

## 四、首选与次选方案(决策结论)

### 首选:GitHub Pages 托管 + GitHub Gist 同步(方案 B)

- 数据仍在自己 GitHub 名下,与「模板/数据分离」的工程洁癖一脉相承
- 零成本、零第三方服务、实现难度适中
- 缺点(手动拉取/推送、令牌存浏览器)对单人可接受

### 次选:GitHub Pages + Firebase(方案 C)

- 打开即最新、改完即同步,体验最好
- 代价:多一个 Google 服务依赖 + 实现稍复杂

### 不推荐

- Supabase(免费档休眠不省心)
- 自建 Worker(当前需求过重)

---

## 五、后续实施路径(待用户指示再开展)

1. 第一步(零风险,先落地「能用」):托管到 GitHub Pages,同步暂用「导出/导入」顶着
2. 第二步(功能确认后):上 Gist 或 Firebase 做真同步

### 待用户确认的前置项

- 是否有 GitHub 账号、是否愿意新建仓库(公开或私有)
- 本机 git 已就绪,gh CLI 未装(托管可走 git 原生流程,装不装 gh 皆可)
