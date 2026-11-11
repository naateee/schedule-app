// ============================================================
//  课程日历「数据文件」(种子数据)
// ============================================================
//  这是与模板 index.html 完全隔离的数据层。
//  模板会读取这里的 SCHEDULE_SEED 作为「首次打开」时的默认数据；
//  之后你在页面上的所有修改(退课/调课/加事件/增删课程)都存在
//  浏览器 localStorage 里,不会写回这个文件。
//
//  复用给别人时:对方只需替换这个文件为自己的课程数据即可,
//  模板 index.html 一行都不用改。
//
//  字段说明:
//    semester: 学期起止与考试期
//    courses:  课程列表(day: 1=周一 ... 6=周六, 7=周日)
//      overrides: 按日期覆盖 —— {date, skip:true 停课}
//                  {date, start, end, room 临时改时间地点}
//                  {date, moveTo, start, end, room 调到另一天}
//    events:   自由日程(标题+日期+起止+地点)
//    assignments: 作业/Project 列表(课程、截止时间、状态与来源)
// ============================================================

// ============================================================
//  ⚠️ 双用途说明:本种子既是「首次打开默认数据」,
//  也是无网络 / 连不上 Firebase 时的离线兜底课表(如内地访问)。
//  退课/调课/加事件后,若希望离线访客也看到最新状态,
//  请在页面点 ⤓ 导出 JSON,把导出内容回填到 SCHEDULE_SEED。
//  实时多端同步仍以 Firestore 云端为准,本地与云端保持一致即可。
// ============================================================

const SCHEDULE_SEED = {
  "events": [
    {
      "id": "exam-5203-midterm-2026-11-02",
      "title": "ARIN 5203 期中考试",
      "date": "2026-11-02",
      "start": "19:00",
      "end": "20:30",
      "location": "Rm 4619 · 开卷 · 带学生证",
      "color": "#4f8ef7"
    },
    {
      "id": "quiz-5101-2026-11-24",
      "title": "ARIN 5101 随堂 Quiz",
      "date": "2026-11-24",
      "start": "19:10",
      "end": "20:40",
      "location": "LT-C（平时教室）· 19:10 开始，约 1.5 小时 · 闭卷，可带 1 张 A4 双面 cheat sheet + 简单计算器",
      "color": "#34c38f"
    },
    {
      "id": "exam-5102-final-2026-12-12",
      "title": "ARIN 5102 期末考试",
      "date": "2026-12-12",
      "start": "14:30",
      "end": "17:30",
      "location": "Lecture Theater J · 官方期末考表",
      "color": "#22b8cf"
    },
    {
      "id": "present-5201-final-2026-11-27",
      "title": "ARIN 5201 Final Presentation (Team 9)",
      "date": "2026-11-27",
      "start": "19:00",
      "end": "21:50",
      "location": "课室待定 · 本队 11-27 场第 5 个出场（约 19:40 起，10 分钟）",
      "color": "#f7a34f"
    }
  ],
  "assignments": [
    {
      "id": "canvas-73253-455819",
      "courseId": "c3",
      "title": "Assignment 01",
      "type": "assignment",
      "dueAt": "2026-10-14T23:59:00+08:00",
      "status": "done",
      "description": "Canvas：20 分，已于 2026-10-11 提交（Not Yet Graded）。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/73253/assignments/455819",
      "lastCheckedAt": "2026-10-12T14:53:13+08:00",
      "createdAt": "2026-09-25T13:50:00+08:00",
      "updatedAt": "2026-10-12T14:53:13+08:00"
    },
    {
      "id": "canvas-73258-455423",
      "courseId": "c5",
      "title": "Proposal for the final project",
      "type": "project",
      "dueAt": "2026-10-17T23:59:00+08:00",
      "status": "done",
      "description": "Canvas：Final Project Proposal，10 分。需按所附 Course Project Guidelines 组队 5–6 人（People → Groups → Teams for the final project 自助组队），组内 1 人提交并在报告中注明成员。用户已在 App 标记完成（2026-10-16）。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/73258/assignments/455423",
      "lastCheckedAt": "2026-10-12T14:53:13+08:00",
      "createdAt": "2026-09-25T13:50:00+08:00",
      "updatedAt": "2026-10-17T16:40:00+08:00"
    },
    {
      "id": "canvas-73258-456261",
      "courseId": "c5",
      "title": "Assignment 1",
      "type": "assignment",
      "dueAt": "2026-10-18T23:30:00+08:00",
      "status": "done",
      "description": "Canvas：10 分，个人作业（须独立完成）；将答案整理为单个 PDF 上传，建议使用 LaTeX。2026-09-27 00:00 开放。用户已在 App 标记完成（2026-10-16）。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/73258/assignments/456261",
      "lastCheckedAt": "2026-10-12T14:53:13+08:00",
      "createdAt": "2026-09-27T18:17:35+08:00",
      "updatedAt": "2026-10-17T16:40:00+08:00"
    },
    {
      "id": "canvas-71899-454598",
      "courseId": "c6",
      "title": "Assignment 1",
      "type": "assignment",
      "dueAt": "2026-09-28T23:59:00+08:00",
      "status": "done",
      "description": "Canvas：100 分，已得 100/100。附作业纸 assign1.pdf、数据 gp-training-set.csv 与参考解答 assign1-sol.pdf。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/71899/assignments/454598",
      "lastCheckedAt": "2026-10-12T14:53:13+08:00",
      "createdAt": "2026-09-25T13:50:00+08:00",
      "updatedAt": "2026-10-12T14:53:13+08:00"
    },
    {
      "id": "arin5203-assignment-1",
      "courseId": "c1",
      "title": "Assignment 1",
      "type": "assignment",
      "dueAt": "2026-10-05T23:59:00+08:00",
      "status": "done",
      "description": "课程官网：2026-09-21 发布；提交包含结果的 Jupyter Notebook 至 Canvas。Canvas 显示已于 2026-09-29 提交。",
      "sourceType": "course-website",
      "sourceUrl": "https://cqf.io/ARIN5203/programs/",
      "lastCheckedAt": "2026-10-12T14:53:13+08:00",
      "createdAt": "2026-09-25T13:50:00+08:00",
      "updatedAt": "2026-10-12T14:53:13+08:00"
    },
    {
      "id": "arin5203-project-1",
      "courseId": "c1",
      "title": "Project Proposal",
      "type": "project",
      "dueAt": "2026-10-05T23:59:00+08:00",
      "status": "done",
      "description": "课程官网：项目提案 1 段（200-400 词），需说明问题与意义、背景阅读、数据来源、拟用方法、评估方式。可组队（≤3 人），组内仅需 1 人提交并在报告中注明成员姓名。项目组另有 8 个 late days（每个 deadline 最多用 4 个）。Canvas 显示已于 2026-09-29 提交。",
      "sourceType": "course-website",
      "sourceUrl": "https://cqf.io/ARIN5203/project.html",
      "lastCheckedAt": "2026-10-12T14:53:13+08:00",
      "createdAt": "2026-09-28T01:33:28+08:00",
      "updatedAt": "2026-10-12T14:53:13+08:00"
    },
    {
      "id": "arin5203-project-2",
      "courseId": "c1",
      "title": "Project Milestone",
      "type": "project",
      "dueAt": "2026-11-06T23:59:00+08:00",
      "status": "done",
      "description": "课程官网：里程碑报告 2-3 页，使用提供的 CVPR 2022 LaTeX 模板；含标题/作者、引言、问题陈述、技术方案、中期结果。组内仅需 1 人提交并在报告中注明成员姓名。",
      "sourceType": "course-website",
      "sourceUrl": "https://cqf.io/ARIN5203/project.html",
      "lastCheckedAt": "2026-10-12T14:53:13+08:00",
      "createdAt": "2026-09-28T01:33:28+08:00",
      "updatedAt": "2026-09-28T01:33:28+08:00"
    },
    {
      "id": "arin5203-project-3",
      "courseId": "c1",
      "title": "Final Report",
      "type": "project",
      "dueAt": "2026-12-05T23:59:00+08:00",
      "status": "todo",
      "description": "课程官网：期末报告 6-8 页（CVPR 2022 模板，建议 LaTeX/Overleaf），另交独立文件的补充材料（代码/演示，不计入页数）。提交 PDF；组内仅需 1 人提交并注明成员姓名。",
      "sourceType": "course-website",
      "sourceUrl": "https://cqf.io/ARIN5203/project.html",
      "lastCheckedAt": "2026-10-12T14:53:13+08:00",
      "createdAt": "2026-09-28T01:33:28+08:00",
      "updatedAt": "2026-09-28T01:33:28+08:00"
    },
    {
      "id": "canvas-71892-452640",
      "courseId": "c2",
      "title": "Programming Assignment 1",
      "type": "assignment",
      "dueAt": "2026-10-18T23:59:59+08:00",
      "status": "done",
      "description": "Canvas：100 分，个人作业。在课程主页提供的 Jupyter Notebook 中直接完成全部任务，提交文件名用 arin5101_pa1_YourName.ipynb，DDL 2026-10-18 23:59。该课 Assignments 页被禁用，本条由课程模块（Week 6 - 6 Oct 2026）核对。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/71892/assignments/452640",
      "lastCheckedAt": "2026-11-02T21:00:50+08:00",
      "createdAt": "2026-10-12T14:53:13+08:00",
      "updatedAt": "2026-11-02T21:00:50+08:00"
    },
    {
      "id": "canvas-71892-452641",
      "courseId": "c2",
      "title": "Programming Assignment 2",
      "type": "assignment",
      "dueAt": "2026-11-08T23:59:59+08:00",
      "status": "done",
      "description": "Canvas：100 分，个人作业，只收 .ipynb，文件名 arin5101_pa2_YourName.ipynb，DDL 2026-11-08 23:59。题面即 notebook arin5101_pa2.ipynb（Week 9 模块附件，Canvas 作业说明为空），7 题：Q1 批量 GD/mini-batch/SGD、Q2 loss 报告、Q3 early stopping、Q4 Adaptive Diagonal Newton、Q5 Pokémon(Pikachu vs Charizard) 数据准备、Q6 三种 batch 的 loss 曲线、Q7 GridSearchCV。评分按 Virtual Barn 的 Anaconda 环境跑；不得修改给定的 Perceptron / LogisticRegression 类。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/71892/assignments/452641",
      "lastCheckedAt": "2026-11-02T21:00:50+08:00",
      "createdAt": "2026-11-02T21:00:50+08:00",
      "updatedAt": "2026-11-02T21:00:50+08:00"
    },
    {
      "id": "exam-5203-midterm-2026-11-02",
      "courseId": "c1",
      "title": "期中考试 Midterm",
      "type": "exam",
      "dueAt": "2026-11-02T19:00:00+08:00",
      "status": "done",
      "description": "官方邮件通知（Qifeng Chen，2026-10-21）：11-02 周一 19:00–20:30，Rm 4619，开卷，占 35%。可带任何纸质资料；可用笔记本/平板浏览课程网站上的材料（含指向外部网站的超链接），但考试中禁止 Google、AI 工具与任何外部网站（外部材料须提前下载好），同学之间不得交流。范围：截至 10-26 的讲义 = 全部 14 讲 L1–L14（每节 2 讲 × 7 节；L13 Post-training 与 L14 推理期技术都在范围内，去年期中在这一带命中 4 道多选；NeRF/3DGS 今年撤讲不考）。需带学生证；违反荣誉守则即本课 Fail。样卷：https://cqf.io/ARIN5203/lectures/index.html",
      "sourceType": "manual",
      "sourceUrl": "https://cqf.io/ARIN5203/lectures/index.html",
      "lastCheckedAt": "2026-10-21T11:10:00+08:00",
      "createdAt": "2026-10-17T16:47:54+08:00",
      "updatedAt": "2026-10-21T11:10:00+08:00"
    },
    {
      "id": "quiz-5101-2026-11-24",
      "courseId": "c2",
      "title": "随堂 Quiz 20%（11-24 19:10）",
      "type": "quiz",
      "dueAt": "2026-11-24T19:10:00+08:00",
      "status": "todo",
      "description": "Canvas 模块页「In-Class Quiz」已公布全部细节：11-24（周二）19:10 开始，约 1.5 小时，地点 LT-C（平时教室，考前公布座位表，提前 10 分钟到场），闭卷；可带 1 张 A4 双面 cheat sheet + 简单计算器，其它电子设备禁止；约 20–25 题（选择/简答/填空）；范围截至 11-17 那节课。占课程 20%。样题（25 页 / 19 题 / 100 分）与官方答案已在本地知识库 quiz/ 目录。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/71892",
      "lastCheckedAt": "2026-11-12T02:15:00+08:00",
      "createdAt": "2026-10-17T16:47:54+08:00",
      "updatedAt": "2026-11-12T02:15:00+08:00"
    },
    {
      "id": "exam-5102-final-2026-12-12",
      "courseId": "c6",
      "title": "期末考试 Final Exam",
      "type": "exam",
      "dueAt": "2026-12-12T14:30:00+08:00",
      "status": "todo",
      "description": "官方期末考时间表（Academic Registry，2026-10-16 公告）：12-Dec-2026 14:30–17:30 · Lecture Theater J。占 50%。",
      "sourceType": "course-website",
      "sourceUrl": "https://w5.ab.ust.hk/wex/cgi-bin/2610/subject/ARIN",
      "lastCheckedAt": "2026-10-17T16:47:54+08:00",
      "createdAt": "2026-10-17T16:47:54+08:00",
      "updatedAt": "2026-10-17T16:47:54+08:00"
    },
    {
      "id": "canvas-71916-459651",
      "courseId": "c1",
      "title": "Assignment 2",
      "type": "assignment",
      "dueAt": "2026-10-28T23:59:59+08:00",
      "status": "done",
      "description": "Canvas + 课程官网：100 分，2026-10-12 发布（10-20 00:00 起可提交，Lock 11-01）。提交含运行结果的 Jupyter Notebook（官网提供 Assignment2.pdf 与 Assignment2_code.zip，建议用 Colab）。官网作业表写 Date Due 28 Oct 2026，与 Canvas 的 28 Oct 23:59 一致。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/71916/assignments/459651",
      "lastCheckedAt": "2026-10-20T16:40:00+08:00",
      "createdAt": "2026-10-20T16:40:00+08:00",
      "updatedAt": "2026-10-20T16:40:00+08:00"
    },
    {
      "id": "canvas-71899-458834",
      "courseId": "c6",
      "title": "Assignment 2",
      "type": "assignment",
      "dueAt": "2026-10-28T23:59:59+08:00",
      "status": "done",
      "description": "Canvas：100 分；作业纸 assign2.pdf 已发布，页内写明 Due: Oct 28, 2026（Lock 12-07）。提交入口为 Assignments → Assignment 2。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/71899/assignments/458834",
      "lastCheckedAt": "2026-10-20T16:40:00+08:00",
      "createdAt": "2026-10-20T16:40:00+08:00",
      "updatedAt": "2026-10-20T16:40:00+08:00"
    },
    {
      "id": "canvas-73258-459611",
      "courseId": "c5",
      "title": "Assignment 2",
      "type": "assignment",
      "dueAt": "2026-11-09T23:59:59+08:00",
      "status": "done",
      "description": "Canvas：10 分，2026-10-19 发布公告并附 Assignment2.zip（题目文档 + starter notebooks + 数据集），提交完成的 notebook/代码文件到 Assignments → Assignment 2；DDL 2026-11-09，通常不接受迟交。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/73258/assignments/459611",
      "lastCheckedAt": "2026-10-20T16:40:00+08:00",
      "createdAt": "2026-10-20T16:40:00+08:00",
      "updatedAt": "2026-10-20T16:40:00+08:00"
    },
    {
      "id": "arin5202-project-final",
      "courseId": "c3",
      "title": "Final Project 展示 + 提交 (待确认)",
      "type": "project",
      "dueAt": "2026-11-25T19:00:00+08:00",
      "status": "todo",
      "description": "Canvas 公告 2026-10-14《Final Project Specification: Evolutionary Multi-Agent Collaboration System》：做多智能体协作平台，2–4 人组队（公告说本周内定员）；第 13 周现场展示，最终提交在第 13 周之后（具体日期未公布，最终测试集提前 3 周发放）。硬性约束：禁用 OpenAI/Anthropic，统一用 DeepSeek 或 HKGAI API（密钥后续发放）；只允许 md/txt 输出，禁做 PDF/DOCX/PPT 解析；交付 GitHub 仓库（附每人 commit 记录截图，禁最后一次性上传）+ 架构文档 + 性能报告（任务完成率/执行时间），评分看后端编排而非前端。本条 dueAt 取第 13 周上课日 11-25 19:00（按周次+周三课推定，老师未公布确切时间）→ 待确认。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/73253/announcements/648693",
      "lastCheckedAt": "2026-10-20T17:00:00+08:00",
      "createdAt": "2026-10-20T17:00:00+08:00",
      "updatedAt": "2026-10-20T17:00:00+08:00"
    },
    {
      "id": "arin5101-project-dataset-2026-11-10",
      "courseId": "c2",
      "title": "项目数据集确认（邮件报备 TA）",
      "type": "project",
      "dueAt": "2026-11-10T23:59:00+08:00",
      "status": "done",
      "description": "把小组要用的数据集（FashionMNIST / CIFAR-10 / CIFAR-100 子集 / OxfordIIITPet / Kaggle）写一段说明邮件给 Muhammad usman@ust.hk；逾期不报备会扣分。来源：Canvas 公告「Important Dates and Deadlines」(2026-11-04)。",
      "sourceType": "manual",
      "sourceUrl": "https://canvas.ust.hk/courses/71892/announcements",
      "lastCheckedAt": "2026-11-07T20:20:00+08:00",
      "createdAt": "2026-11-07T20:20:00+08:00",
      "updatedAt": "2026-11-07T20:20:00+08:00"
    },
    {
      "id": "canvas-73253-460875",
      "courseId": "c3",
      "title": "Assignment 02",
      "type": "assignment",
      "dueAt": "2026-11-15T23:59:00+08:00",
      "status": "done",
      "description": "Canvas：20 分，online_upload，附件 assignment_02_NLP.ipynb；作业与最新讲义同条发布（2026-10-25）。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/73253/assignments/460875",
      "lastCheckedAt": "2026-11-07T20:20:00+08:00",
      "createdAt": "2026-11-07T20:20:00+08:00",
      "updatedAt": "2026-11-07T20:20:00+08:00"
    },
    {
      "id": "present-5201-final-2026-11-27",
      "courseId": "c5",
      "title": "Final Project 展示（Team 9，第 5 个出场）",
      "type": "presentation",
      "dueAt": "2026-11-27T19:00:00+08:00",
      "status": "todo",
      "description": "2026-11-04 公告：展示分两场 —— 11-20（16 队）与 11-27（15 队），每队约 10 分钟，不交 slides。本队 Team 9 在 11-27 场第 5 个出场（队友 CHEN Shenyao / MEI Zhongxuan / MOU Haoyan / TONG Lanyue / ZHOU Yuxuan）。换组申请截止 11-11 23:59（邮件 TA，主题 Presentation swap: Team X and Team Y）。具体钟点待 TA 定稿。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/73258",
      "lastCheckedAt": "2026-11-07T20:20:00+08:00",
      "createdAt": "2026-11-07T20:20:00+08:00",
      "updatedAt": "2026-11-07T20:20:00+08:00"
    },
    {
      "id": "canvas-71892-452638",
      "courseId": "c2",
      "title": "Course Project（小组 · 30%）",
      "type": "project",
      "dueAt": "2026-11-30T23:59:00+08:00",
      "status": "todo",
      "description": "Canvas：100 分 → 课程 30%。3 人小组；交付 1 个 notebook（report+code+图，须在 Virtual Barn 上从头跑通，无 GPU）+ 3–5 分钟视频（全员出镜，禁 AI 数字人/合成语音），每组 1 人提交。基线 CNN（2 卷积+128 隐层）→ 从 Dropout/BatchNorm/DataAug 任选两项做 4 组对比 + 少量调参；评分：数据 15/模型 20/评估 20/代码 10/报告 10/视频 15。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/71892/assignments/452638",
      "lastCheckedAt": "2026-11-07T20:20:00+08:00",
      "createdAt": "2026-11-07T20:20:00+08:00",
      "updatedAt": "2026-11-07T20:20:00+08:00"
    },
    {
      "id": "canvas-71899-460871",
      "courseId": "c6",
      "title": "Project（个人期末项目）",
      "type": "project",
      "dueAt": "2026-11-30T23:59:00+08:00",
      "status": "todo",
      "description": "Canvas：100 分。用开放模型（DeepSeek/HKGAI）搭多智能体协作系统，在 τ²-Airline / MCPMark / DeepPlanning-Shopping 上评测（40 公开 + 40 隐藏 case）。① 10-31 公告要求 11-07 前完成环境搭建 + smoke test（GitHub: meizi-l/2026-Fall-Agent-Course-Project）；② 11-06 教师邮件允许在 student_tools/ 写确定性 Python helper（覆盖 MCPMark 三类任务的 no-Python 限制），提交前须跑 submission builder。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/71899/assignments/460871",
      "lastCheckedAt": "2026-11-07T20:20:00+08:00",
      "createdAt": "2026-11-07T20:20:00+08:00",
      "updatedAt": "2026-11-07T20:20:00+08:00"
    },
    {
      "id": "canvas-73258-462792",
      "courseId": "c5",
      "title": "Assignment 3",
      "type": "assignment",
      "dueAt": "2026-11-29T23:59:59+08:00",
      "status": "todo",
      "description": "Canvas：10 分，线上文本提交（本课最后一次作业）。11-08 公告：交 Part 1 完成版 notebook + Part 2 三个代码文件 + 实验报告 PDF（最多 3 页）；提交前删除 MNIST 数据集与 checkpoint。逾期一律不收，除非提前联系 TA 说明。",
      "sourceType": "canvas",
      "sourceUrl": "https://canvas.ust.hk/courses/73258/assignments/462792",
      "lastCheckedAt": "2026-11-10T18:49:29+08:00",
      "createdAt": "2026-11-10T18:55:00+08:00",
      "updatedAt": "2026-11-10T18:55:00+08:00"
    }
  ],
  "semester": {
    "start": "2026-09-01",
    "end": "2026-12-19",
    "examStart": "2026-12-07",
    "examEnd": "2026-12-19"
  },
  "courses": [
    {
      "core": false,
      "overrides": [
        {
          "skip": true,
          "date": "2026-10-19"
        },
        {
          "start": "10:00",
          "room": "4620",
          "end": "12:50",
          "date": "2026-09-07",
          "moveTo": "2026-09-05"
        }
      ],
      "bg": "#eaf1fe",
      "end": "21:50",
      "name": "Foundation Models & Generative AI",
      "active": true,
      "instructor": "Qifeng CHEN 陈启峰",
      "room": "4619",
      "id": "c1",
      "start": "19:00",
      "short": "基础模型与生成式AI",
      "campus": "Clear Water Bay",
      "description": "覆盖大语言模型、扩散模型等基础模型与生成式人工智能的核心原理与前沿。",
      "day": 1,
      "color": "#4f8ef7",
      "code": "ARIN 5203"
    },
    {
      "name": "Advanced Python Programming for AI",
      "day": 2,
      "overrides": [],
      "start": "19:00",
      "short": "高级 Python",
      "core": true,
      "color": "#34c38f",
      "room": "Lecture Theater C (LT-C)",
      "description": "面向 AI 的高级 Python 编程：数据科学栈、面向对象、并发与性能优化。核心必修。",
      "campus": "Clear Water Bay",
      "bg": "#e6f7f1",
      "instructor": "Gibson LAM",
      "code": "ARIN 5101",
      "id": "c2",
      "end": "21:50",
      "active": true
    },
    {
      "code": "ARIN 5202",
      "start": "19:00",
      "short": "自然语言处理",
      "bg": "#efeafd",
      "id": "c3",
      "campus": "Clear Water Bay",
      "color": "#8b6cf5",
      "end": "21:50",
      "instructor": "Wei XUE 薛玮",
      "room": "CYTG010",
      "day": 3,
      "overrides": [],
      "name": "Machine Learning for NLP",
      "active": true,
      "description": "自然语言处理的机器学习方法：词向量、序列模型、Transformer 与预训练。",
      "core": false
    },
    {
      "name": "AI in Software Engineering",
      "core": false,
      "day": 4,
      "room": "CYTG002",
      "campus": "Clear Water Bay",
      "overrides": [
        {
          "skip": true,
          "date": "2026-10-01"
        }
      ],
      "id": "c4",
      "start": "19:00",
      "short": "AI 软件工程",
      "color": "#f5a623",
      "end": "21:50",
      "bg": "#fdf0e0",
      "description": "AI 与软件工程交叉：测试、缺陷定位、符号执行、自动程序修复等。",
      "code": "ARIN 5305",
      "instructor": "Shing-Chi CHEUNG 张成志",
      "active": false
    },
    {
      "overrides": [],
      "id": "c5",
      "code": "ARIN 5201",
      "description": "计算机视觉的机器学习方法：图像分类、检测、分割与生成模型。",
      "end": "21:50",
      "campus": "Clear Water Bay",
      "instructor": "Wenhan LUO 罗文汉",
      "bg": "#fdeaf1",
      "short": "计算机视觉",
      "start": "19:00",
      "room": "LSKG012",
      "day": 5,
      "name": "Machine Learning for Computer Vision",
      "color": "#f26d9a",
      "active": true,
      "core": false
    },
    {
      "color": "#22b8cf",
      "campus": "Clear Water Bay",
      "end": "17:20",
      "code": "ARIN 5102",
      "short": "AI 基础",
      "start": "14:30",
      "name": "AI Fundamentals: Concepts and Methods",
      "active": true,
      "overrides": [
        {
          "skip": true,
          "date": "2026-09-26"
        }
      ],
      "core": true,
      "instructor": "Fangzhen LIN 林方真",
      "id": "c6",
      "day": 6,
      "room": "2502",
      "bg": "#e0f5f8",
      "description": "AI 核心概念与方法：搜索、逻辑、知识表示、规划与学习。核心必修。"
    }
  ]
};
