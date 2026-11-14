# Five hand-calculation test cases

Use the default sample catalogue unless noted. All amounts are INR. Reset the discount and additional tax fields between cases.

| Case | Lines | Discount | Additional tax | Expected total |
|---|---|---:|---:|---:|
| 1 | Rice 2 kg @ ₹60, GST 0% | 0% | 0% | ₹120.00 |
| 2 | Cooking oil 1 L @ ₹165, GST 5% | 0% | 0% | ₹173.25 |
| 3 | Rice 2 kg @ ₹60 (₹120) + Oil 1 L @ ₹165 (₹165) | 10% | 0% | ₹256.50 |
| 4 | Oil 1 L @ ₹165, GST 5% | ₹10 flat | 2% | ₹166.52 |
| 5 | Sugar 2 kg @ ₹48, GST 5% + Milk 3 L @ ₹32, GST 0% | 5% | 5% | ₹196.56 |

Independent calculations:
- Case 1: ₹120.00.
- Case 2: ₹165 + ₹8.25 GST = ₹173.25.
- Case 3: ₹285 + ₹0 item GST − ₹28.50 discount = ₹256.50.
- Case 4: ₹165 + ₹8.25 GST − ₹10 = ₹163.25; 2% additional tax = ₹3.265; rounded total = ₹166.52.
- Case 5: subtotal ₹192; item GST ₹4.80; discount ₹9.60; post-discount ₹187.20; additional tax ₹9.36; total ₹196.56.

These cases exercise quantity, item tax, percentage/flat discounts and additional tax.

Run the exact shared calculation logic with:

```bash
node tests/calculation-test.js
```
