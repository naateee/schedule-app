const assert = require('node:assert/strict');
const test = require('node:test');
const U = require('./assignment-utils.js');

const courses = [{id:'c1'}, {id:'c3'}];

test('migrateData adds assignments without mutating the source object', () => {
  const coursesRef = [{id:'c1'}];
  const source = {courses:coursesRef, events:[{id:'e1'}]};
  const data = U.migrateData(source);
  assert.deepEqual(data.assignments, []);
  assert.equal(data.courses, coursesRef);
  assert.equal(data.events.length, 1);
  assert.equal(Object.prototype.hasOwnProperty.call(source, 'assignments'), false);
});

test('migration helper distinguishes a missing assignments field from an intentional empty list', () => {
  const oldData = {courses:[{id:'c1'}], events:[]};
  const explicitEmpty = {courses:[{id:'c1'}], events:[], assignments:[]};
  assert.equal(Object.prototype.hasOwnProperty.call(oldData, 'assignments'), false);
  assert.equal(Object.prototype.hasOwnProperty.call(explicitEmpty, 'assignments'), true);
});

test('validateAssignment accepts valid records and rejects unsafe URLs', () => {
  const ok = U.validateAssignment({courseId:'c1', title:'A1', dueAt:'2026-10-05T23:59', sourceUrl:'https://example.com'}, courses);
  assert.deepEqual(ok.errors, []);
  const bad = U.validateAssignment({courseId:'c1', title:'A1', dueAt:'2026-10-05T23:59', sourceUrl:'javascript:alert(1)'}, courses);
  assert.ok(bad.errors.includes('来源链接必须是 HTTP(S) 地址'));
});

test('sortAssignments orders upcoming, undated, overdue, then done', () => {
  const now = new Date('2026-09-25T12:00:00+08:00');
  const input = [
    {title:'done', status:'done', dueAt:'2026-09-20T12:00:00+08:00'},
    {title:'late', status:'todo', dueAt:'2026-09-20T12:00:00+08:00'},
    {title:'none', status:'todo', dueAt:''},
    {title:'soon', status:'doing', dueAt:'2026-09-26T12:00:00+08:00'},
  ];
  assert.deepEqual(U.sortAssignments(input, now).map(x=>x.title), ['soon','none','late','done']);
});

test('filterAssignments combines status, course and type filters', () => {
  const now = new Date('2026-09-25T12:00:00+08:00');
  const input = [
    {courseId:'c1', type:'assignment', status:'todo', dueAt:'2026-09-20T12:00:00+08:00'},
    {courseId:'c1', type:'project', status:'done', dueAt:'2026-10-20T12:00:00+08:00'},
    {courseId:'c3', type:'assignment', status:'doing', dueAt:'2026-10-20T12:00:00+08:00'},
  ];
  assert.equal(U.filterAssignments(input, {status:'overdue', courseId:'c1', type:'assignment'}, now).length, 1);
  assert.equal(U.filterAssignments(input, {status:'open', courseId:'c3', type:'all'}, now).length, 1);
});

test('dueLabel distinguishes completed, overdue and upcoming', () => {
  const now = new Date('2026-09-25T12:00:00+08:00');
  assert.equal(U.dueLabel('2026-09-24T12:00:00+08:00', 'todo', now), '已逾期 1 天');
  assert.equal(U.dueLabel('2026-09-27T12:00:00+08:00', 'todo', now), '剩 2 天');
  assert.equal(U.dueLabel('2026-09-20T12:00:00+08:00', 'done', now), '已完成');
});
