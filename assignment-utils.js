(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.AssignmentUtils = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const VALID_TYPES = ['assignment', 'project', 'quiz', 'report', 'presentation', 'other'];
  const VALID_STATUSES = ['todo', 'doing', 'done'];
  const VALID_SOURCES = ['canvas', 'course-website', 'manual'];

  function migrateData(input) {
    const data = input && typeof input === 'object' ? { ...input } : {};
    if (!Array.isArray(data.courses)) data.courses = [];
    if (!Array.isArray(data.events)) data.events = [];
    if (!Array.isArray(data.assignments)) data.assignments = [];
    return data;
  }

  function normalizeAssignment(item) {
    const now = new Date().toISOString();
    const a = item && typeof item === 'object' ? item : {};
    return {
      id: String(a.id || ''),
      courseId: String(a.courseId || ''),
      title: String(a.title || '').trim(),
      type: VALID_TYPES.includes(a.type) ? a.type : 'assignment',
      dueAt: a.dueAt ? String(a.dueAt) : '',
      status: VALID_STATUSES.includes(a.status) ? a.status : 'todo',
      description: String(a.description || '').trim(),
      sourceType: VALID_SOURCES.includes(a.sourceType) ? a.sourceType : 'manual',
      sourceUrl: String(a.sourceUrl || '').trim(),
      lastCheckedAt: a.lastCheckedAt ? String(a.lastCheckedAt) : '',
      createdAt: a.createdAt ? String(a.createdAt) : now,
      updatedAt: a.updatedAt ? String(a.updatedAt) : now,
    };
  }

  function validateAssignment(item, courses) {
    const a = normalizeAssignment(item);
    const errors = [];
    if (!a.title) errors.push('请填写标题');
    if (!a.courseId || !(courses || []).some(c => c.id === a.courseId)) errors.push('请选择课程');
    if (!a.dueAt) errors.push('请填写截止时间');
    else if (Number.isNaN(new Date(a.dueAt).getTime())) errors.push('截止时间格式不正确');
    if (a.sourceUrl) {
      try {
        const u = new URL(a.sourceUrl);
        if (!['http:', 'https:'].includes(u.protocol)) errors.push('来源链接必须是 HTTP(S) 地址');
      } catch (_) { errors.push('来源链接格式不正确'); }
    }
    return { value: a, errors };
  }

  function urgency(item, now) {
    if (item.status === 'done') return 4;
    if (!item.dueAt) return 1;
    const due = new Date(item.dueAt).getTime();
    const current = (now instanceof Date ? now : new Date(now || Date.now())).getTime();
    return due < current ? 2 : 0;
  }

  function sortAssignments(items, now) {
    return [...(items || [])].sort((a, b) => {
      const bucket = urgency(a, now) - urgency(b, now);
      if (bucket) return bucket;
      const at = a.dueAt ? new Date(a.dueAt).getTime() : Number.MAX_SAFE_INTEGER;
      const bt = b.dueAt ? new Date(b.dueAt).getTime() : Number.MAX_SAFE_INTEGER;
      if (at !== bt) return at - bt;
      return String(a.title).localeCompare(String(b.title), 'zh-CN');
    });
  }

  function filterAssignments(items, filters, now) {
    const f = filters || {};
    const current = (now instanceof Date ? now : new Date(now || Date.now())).getTime();
    return (items || []).filter(a => {
      if (f.courseId && f.courseId !== 'all' && a.courseId !== f.courseId) return false;
      if (f.type && f.type !== 'all' && a.type !== f.type) return false;
      if (f.status === 'done' && a.status !== 'done') return false;
      if (f.status === 'open' && a.status === 'done') return false;
      if (f.status === 'overdue' && (a.status === 'done' || !a.dueAt || new Date(a.dueAt).getTime() >= current)) return false;
      return true;
    });
  }

  function dueLabel(dueAt, status, now) {
    if (status === 'done') return '已完成';
    if (!dueAt) return '未设置截止时间';
    const due = new Date(dueAt);
    const current = now instanceof Date ? now : new Date(now || Date.now());
    const diff = due.getTime() - current.getTime();
    const days = Math.ceil(Math.abs(diff) / 86400000);
    if (diff < 0) return `已逾期 ${Math.max(1, days)} 天`;
    if (diff <= 86400000) return '24 小时内截止';
    return `剩 ${days} 天`;
  }

  return {
    VALID_TYPES, VALID_STATUSES, VALID_SOURCES,
    migrateData, normalizeAssignment, validateAssignment,
    sortAssignments, filterAssignments, dueLabel,
  };
});
