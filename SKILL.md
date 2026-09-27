---
name: schedule-app-assignment-update
description: "Use when updating assignments/projects in the HKUST schedule app. Audit Canvas and ARIN5203, preserve user state, update seed + Firestore, test, deploy, and verify."
version: 1.0.0
---

# Schedule App 作业更新

用于维护 `D:\hkust_center\schedule-app` 的“作业与 Project”列表。它是人工触发流程：用户通知后才检查，不设置自动抓取。

## 数据源与课程映射

| 课程 | App `courseId` | Canvas course id | 主要来源 |
|---|---:|---:|---|
| ARIN 5203 | `c1` | `71916` | `https://cqf.io/ARIN5203/programs/` 优先；Canvas 辅助 |
| ARIN 5101 | `c2` | `71892` | Canvas |
| ARIN 5202 | `c3` | `73253` | Canvas |
| ARIN 5201 | `c5` | `73258` | Canvas |
| ARIN 5102 | `c6` | `71899` | Canvas |

`c4`（ARIN 5305）已退课，不把其任务加入列表。Canvas 仍可能显示已退课或社区课程，必须按 `schedule-data.js` 中 `active:true` 的课程过滤。

## 开工前检查

1. 在项目目录执行 `git status --short`、`git log -3 --oneline --decorate`，不得覆盖未提交修改。
2. 读取 `schedule-data.js` 的 `assignments` 和 `courses`，先建立当前任务 ID 集合。
3. 备份将修改的文件；若要写线上数据，先等待 App 显示“已同步”。
4. Canvas 登录态在 `C:\Users\27116\.hermes_browser_profile`。会话过期时运行：
   `python D:/hkust_center/canvas_fetch.py login`
   用户亲手完成 HKUST SSO/MFA；禁止索取、保存或自动填写密码和验证码。

## 信息核对

### Canvas

1. 用持久化 Playwright 页面打开每个在读课程的 `/courses/<course_id>/assignments`；不要依赖 Canvas API Token（本账户不提供个人 API）。
2. 从作业列表读取：assignment id、标题、Due、分值、提交/评分状态和 URL。
3. 对每个新增或发生变化的任务打开详情页，读取：
   - 是否个人/小组任务；
   - 提交格式；
   - 开放时间；
   - 说明及附件入口。
4. 截止时间按香港时区 `+08:00` 写成 ISO 8601，例如 `2026-10-18T23:30:00+08:00`。
5. “Not Yet Graded”不等于未完成；`status` 是用户自己的进度。抓取结果不得把用户已标记的 `done` 改回 `todo`。

### ARIN 5203 官网

1. 使用：
   `curl -L --compressed --http1.1 -A 'Mozilla/5.0' https://cqf.io/ARIN5203/programs/`
2. 只采信 Fall 2026 页面中未被 HTML 注释包裹的行。隐藏行可能是 2025 旧模板，不能作为本学期任务。
3. 官网与 Canvas 冲突时，以 5203 官网较新的信息为准，并在 `description` 写明来源。

## 差异与稳定 ID

- Canvas：`id = canvas-<course_id>-<assignment_id>`。
- 5203 官网：`id = arin5203-assignment-<N>`。
- 先按稳定 ID 去重，再比较 `title`、`dueAt`、`description`、`sourceUrl`。
- 新任务默认 `status:"todo"`；只有用户明确说已完成时才写 `done`。
- 已存在任务更新来源字段和 `lastCheckedAt`，但保留用户的 `status`、个人备注及 `createdAt`。
- 来源暂时消失时不要自动删除；报告异常并等待确认。

## 写入两个数据层

本 App 有两层数据，必须都更新：

1. `schedule-data.js`：离线/首次打开种子数据，也是 Git 历史中的可审计记录。
2. Firestore `schedules/main`：线上多设备实时数据。

仅修改种子不会更新已经有 Firestore 数据的设备；仅修改 Firestore 会让离线种子过期。

推荐顺序：

1. 修改 `schedule-data.js`。
2. 打开正式线上 App（不要带 `?test=1`），等待“已同步”。
3. 通过 App 表单新增/编辑任务，使现有 `saveData()` 写入 Firestore；这会保留云端已有课程、事件和用户状态。
4. 写入后刷新正式页面，确认任务数量、标题、DDL 和状态。

禁止用种子整份覆盖 Firestore：用户可能已在手机端修改完成状态或添加日程。

## 字段模板

```js
{
  id: "canvas-73258-456261",
  courseId: "c5",
  title: "Assignment 1",
  type: "assignment", // assignment|project|quiz|report|presentation|other
  dueAt: "2026-10-18T23:30:00+08:00",
  status: "todo",     // todo|doing|done
  description: "Canvas：10 分，个人作业；提交单个 PDF。",
  sourceType: "canvas", // canvas|course-website|manual
  sourceUrl: "https://canvas.ust.hk/courses/73258/assignments/456261",
  lastCheckedAt: "<本次核对时间 ISO>",
  createdAt: "<首次加入时间 ISO>",
  updatedAt: "<内容最后变化时间 ISO>"
}
```

## 测试与发布

1. `node --test assignment-utils.test.js`
2. 启动临时服务器：`python -m http.server 8765`
3. `python e2e_test.py`
4. 关闭临时服务器，确认端口不再占用。
5. `git diff --check`，检查 `git diff` 中没有 Firebase 密钥、Cookie、Canvas 会话或临时抓取文件。
6. 提交并推送 `main`。
7. 等待 GitHub Pages 更新；正式地址：`https://naateee.github.io/schedule-app/`。
8. 用正式页面读回并验证：新增任务可见、数量正确、完成状态未被重置、同步徽标正常。

## 完成报告

逐条报告：

- 新增、变化、未变化的任务；
- 每条任务的课程、标题、DDL、状态、来源；
- Canvas/5203 核对时间；
- 单元测试、E2E、线上读回结果；
- Git commit 和线上 URL。

若无新任务，也必须报告查过哪些课程/来源以及“未变化”，不能只说“没有更新”。
