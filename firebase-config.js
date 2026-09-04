// ============================================================
//  Firebase 配置(公开信息,Web App 的 config 本就设计为公开,
//  安全性由 Firestore 安全规则保证,不靠隐藏这些字段)
// ============================================================
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBDS8ZGNZObNU0XJLK1RJ3kiUQYidCmrMY",
  authDomain: "schedule-calendar-e9756.firebaseapp.com",
  projectId: "schedule-calendar-e9756",
  storageBucket: "schedule-calendar-e9756.firebasestorage.app",
  messagingSenderId: "595366158821",
  appId: "1:595366158821:web:a85ac033f5dc7b0beecf0c"
};

// 云端同步配置:数据存在 Firestore 的 schedules 集合下这个固定文档里。
// 手机和电脑都读写同一个文档,即可实现实时同步。
const FIREBASE_COLLECTION = 'schedules';
const FIREBASE_DOC_ID = 'main';
