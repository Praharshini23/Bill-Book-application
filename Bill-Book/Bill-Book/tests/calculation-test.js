const fs=require('fs'),vm=require('vm'),assert=require('assert');
const context={window:{}};vm.createContext(context);vm.runInContext(fs.readFileSync(__dirname+'/../billing-core.js','utf8'),context);
const calc=context.window.BillBookCore.calculateTotals;
const cases=[
  {name:'rice quantity',lines:[{price:60,qty:2,tax:0}],discountType:'percent',discountValue:0,extraRate:0,expected:120},
  {name:'oil item GST',lines:[{price:165,qty:1,tax:5}],discountType:'percent',discountValue:0,extraRate:0,expected:173.25},
  {name:'two items and percentage discount',lines:[{price:60,qty:2,tax:0},{price:165,qty:1,tax:0}],discountType:'percent',discountValue:10,extraRate:0,expected:256.5},
  {name:'flat discount and additional tax',lines:[{price:165,qty:1,tax:5}],discountType:'amount',discountValue:10,extraRate:2,expected:166.52},
  {name:'multiple items, GST, discount and tax',lines:[{price:48,qty:2,tax:5},{price:32,qty:3,tax:0}],discountType:'percent',discountValue:5,extraRate:5,expected:196.56}
];
for(const t of cases){const r=calc(t.lines,t.discountType,t.discountValue,t.extraRate);assert.strictEqual(r.total,t.expected,`${t.name}: expected ${t.expected}, got ${r.total}`);console.log(`PASS ${t.name}: ₹${r.total.toFixed(2)}`);}
console.log(`${cases.length}/${cases.length} calculation cases passed.`);
