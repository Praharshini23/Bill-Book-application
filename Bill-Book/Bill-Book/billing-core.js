/* Pure billing calculations shared by the app and its automated tests. */
(function (root) {
  'use strict';
  function calculateTotals(lines, discountType='percent', discountValue=0, extraRate=0) {
    let subtotal=0,itemTax=0;
    for(const line of lines){const base=Number(line.price)*Number(line.qty);subtotal+=base;itemTax+=base*(Number(line.tax)||0)/100;}
    const raw=Math.max(0,Number(discountValue)||0);
    let discount=discountType==='percent'?subtotal*raw/100:raw;
    discount=Math.min(discount,subtotal+itemTax);
    const rate=Math.min(100,Math.max(0,Number(extraRate)||0));
    const taxable=Math.max(0,subtotal+itemTax-discount);
    const extraTax=taxable*rate/100;
    const total=Math.round((taxable+extraTax+Number.EPSILON)*100)/100;
    return {subtotal,itemTax,discount,extraTax,total,extraRate:rate,discountType,discountValue:raw};
  }
  root.BillBookCore={calculateTotals};
})(window);
