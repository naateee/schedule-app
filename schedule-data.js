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
// ============================================================

// ============================================================
//  ⚠️ 双用途说明:本种子既是「首次打开默认数据」,
//  也是无网络 / 连不上 Firebase 时的离线兜底课表(如内地访问)。
//  退课/调课/加事件后,若希望离线访客也看到最新状态,
//  请在页面点 ⤓ 导出 JSON,把导出内容回填到 SCHEDULE_SEED。
//  实时多端同步仍以 Firestore 云端为准,本地与云端保持一致即可。
// ============================================================

const SCHEDULE_SEED = {
  "events": [],
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
