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

const SCHEDULE_SEED = {
  semester: {
    start: '2026-09-01',
    end: '2026-12-19',
    examStart: '2026-12-07',
    examEnd: '2026-12-19',
  },
  courses: [
    { id:'c1', code:'ARIN 5203', name:'Foundation Models & Generative AI', short:'基础模型与生成式AI',
      instructor:'Qifeng CHEN 陈启峰', day:1, start:'19:00', end:'21:50', room:'4619', campus:'Clear Water Bay',
      core:false, color:'#4f8ef7', bg:'#eaf1fe',
      description:'覆盖大语言模型、扩散模型等基础模型与生成式人工智能的核心原理与前沿。',
      active:true, overrides:[{date:'2026-10-19', skip:true}] },
    { id:'c2', code:'ARIN 5101', name:'Advanced Python Programming for AI', short:'高级 Python',
      instructor:'Gibson LAM', day:2, start:'19:00', end:'21:50', room:'Lecture Theater C (LT-C)', campus:'Clear Water Bay',
      core:true, color:'#34c38f', bg:'#e6f7f1',
      description:'面向 AI 的高级 Python 编程：数据科学栈、面向对象、并发与性能优化。核心必修。',
      active:true, overrides:[] },
    { id:'c3', code:'ARIN 5202', name:'Machine Learning for NLP', short:'自然语言处理',
      instructor:'Wei XUE 薛玮', day:3, start:'19:00', end:'21:50', room:'CYTG010', campus:'Clear Water Bay',
      core:false, color:'#8b6cf5', bg:'#efeafd',
      description:'自然语言处理的机器学习方法：词向量、序列模型、Transformer 与预训练。',
      active:true, overrides:[] },
    { id:'c4', code:'ARIN 5305', name:'AI in Software Engineering', short:'AI 软件工程',
      instructor:'Shing-Chi CHEUNG 张成志', day:4, start:'19:00', end:'21:50', room:'CYTG002', campus:'Clear Water Bay',
      core:false, color:'#f5a623', bg:'#fdf0e0',
      description:'AI 与软件工程交叉：测试、缺陷定位、符号执行、自动程序修复等。',
      active:true, overrides:[{date:'2026-10-01', skip:true}] },
    { id:'c5', code:'ARIN 5201', name:'Machine Learning for Computer Vision', short:'计算机视觉',
      instructor:'Wenhan LUO 罗文汉', day:5, start:'19:00', end:'21:50', room:'LSKG012', campus:'Clear Water Bay',
      core:false, color:'#f26d9a', bg:'#fdeaf1',
      description:'计算机视觉的机器学习方法：图像分类、检测、分割与生成模型。',
      active:true, overrides:[] },
    { id:'c6', code:'ARIN 5102', name:'AI Fundamentals: Concepts and Methods', short:'AI 基础',
      instructor:'Fangzhen LIN 林方真', day:6, start:'14:30', end:'17:20', room:'2502', campus:'Clear Water Bay',
      core:true, color:'#22b8cf', bg:'#e0f5f8',
      description:'AI 核心概念与方法：搜索、逻辑、知识表示、规划与学习。核心必修。',
      active:true, overrides:[{date:'2026-09-26', skip:true}] },
  ],
  events: [],
};
