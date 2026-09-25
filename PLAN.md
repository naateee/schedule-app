# 课程日历 / 日程工程 — 实施计划

## Goal
做一个「单文件 HTML 网页 App」作为吴承开 HKUST MSc(AI) Fall 2026 的全部日程工程:
6 门课 + 自由事件,可退课/临时改时间/按周切换,手机可方便查看,并托管到 GitHub Pages。

## 架构决策(已与用户确认)
- 单文件 `index.html`,纯 HTML + CSS + 原生 JS,零依赖、零构建、零服务器
- 数据 JSON 驱动 + localStorage 持久化 + 导出/导入 JSON 备份
- 托管 GitHub Pages(免费),手机浏览器访问 + PWA meta(可"添加到主屏幕")
- 不做 .ics(用户明确不要)

## 数据模型
```js
{
  "semester": { "start": "2026-09-01", "end": "2026-12-19", "holidays":[...] },
  "courses": [{
    id, code, name, shortName, instructor, day(1=Mon..0=Sun),
    start, end, room, campus, core, color, description, active, overrides[]
  }],
  "events": [{ id, title, date, start, end, location, note, color }]
}
```
- override 形如 `{date, skip:true}` 或 `{date, start, end, room}`(某周临时改时间/停课/换地点)
- 退课 = `active:false`(隐藏不删);临时改时间 = 加 override;加日程 = 加 event

## 课程默认数据(来自 Important Notes PDF)
| day | code | name | instructor | time | room | core |
|---|---|---|---|---|---|---|
| Mon | ARIN 5203 | Foundation Models & Gen AI | Qifeng CHEN | 19:00-21:50 | 4619 | |
| Tue | ARIN 5101 | Advanced Python for AI | Gibson LAM | 19:00-21:50 | LT-C | ✓ |
| Wed | ARIN 5202 | ML for NLP | Wei XUE | 19:00-21:50 | CYTG010 | |
| Thu | ~~ARIN 5305~~ | AI in Software Eng ⛔已退课(2026-09-11) | Shing-Chi CHEUNG | 19:00-21:50 | CYTG002 | |
| Fri | ARIN 5201 | ML for Computer Vision | Wenhan LUO | 19:00-21:50 | LSKG012 | |
| Sat | ARIN 5102 | AI Fundamentals | Fangzhen LIN | 14:30-17:20 | 2502 | ✓ |

内置停课日:2026-09-26(Sat)、2026-10-01(Thu 国庆)、2026-10-19(Mon)

## 功能清单
1. 周视图(默认):时间轴网格,左右切周 + 日期跳转
2. 课程色块卡片,颜色区分 6 门课
3. **点击课程卡片 → 弹出课程详情弹窗**(全称/代号/教师/时间地点/核心标记/描述/编辑/退课)
4. 自由事件:点空白处添加,可编辑删除
5. 每周 override:对某周单独改时间/地点/停课
6. localStorage 持久化 + 导出/导入 JSON + 重置默认
7. 移动端响应式 + PWA meta
8. **作业与 Project 列表**:与课表切换,支持课程/类型/状态筛选、截止倒计时、来源链接、CRUD 与完成状态
9. 作业数据采用人工维护:用户通知后查 Canvas / ARIN 5203 官网并添加,不做自动抓取

## 作业数据模型(2026-09-25 增补)
- `assignments[]`: `{id, courseId, title, type, dueAt, status, description, sourceType, sourceUrl, lastCheckedAt, createdAt, updatedAt}`
- 旧版 localStorage / Firestore / JSON 没有 `assignments` 时自动迁移并装入当前种子任务;明确存在空数组时尊重用户删除结果
- 初始真实数据:Canvas 3 条(其中 1 条已完成)+ ARIN 5203 官网 1 条
- 作业数据与现有课程、事件一起保存在 Firestore `schedules/main` 文档,并参与 JSON 导入导出

## 目录与文件
- `D:\hkust_center\schedule-app\index.html` — 全部内容(单文件)
- `D:\hkust_center\schedule-app\README.md` — 使用说明

## 实施步骤
1. 写 index.html 骨架 + 数据模型 + 默认数据
2. 渲染周视图(时间轴 + 卡片 + 详情弹窗)
3. 交互(周导航/课程详情/事件编辑/override/退课)
4. 持久化 + 导入导出
5. 移动端响应式 + PWA
6. 本地浏览器验证渲染
7. 托管 GitHub Pages(gh CLI 未装,需安装或用户手动建仓)

## 风险/待办
- gh CLI 未安装:托管步骤需安装 gh 或改用网页建仓
- 移动端时间轴网格过宽 → 移动端改用按天分组列表布局
