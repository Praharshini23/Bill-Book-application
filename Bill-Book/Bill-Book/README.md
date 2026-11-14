# Bill Book

An installable, offline-first billing app for a small shop. Built with HTML, CSS and vanilla JavaScript; it uses browser storage, Canvas and a locally bundled QR generator. No account, backend, paid API or external runtime library is required.

## Run it

### Laptop
1. Extract the `Bill-Book` folder.
2. Open `index.html` in a modern browser. Core billing, catalogue, receipt image and local storage work directly.
3. For install/offline service-worker support, serve the folder from localhost (for example `python -m http.server 8000` in this folder) and open `http://localhost:8000`.

### Android phone
1. Copy the folder to a static HTTPS host or run it from a local development server on the phone. Service workers/PWA installation require HTTPS or localhost; opening a file directly is not installable.
2. Open the URL in Chrome, wait for the page to load once, then use **Install app** / **Add to Home screen** from the browser menu.
3. Open it once while online, then turn on Airplane mode and reopen it. The app shell and locally stored data should remain available.

## First-time setup
- Open **Shop settings** and enter your shop name, contact details and your correct UPI ID (VPA), such as `name@bank`.
- Review the sample catalogue and edit/delete sample items or add your own.
- Create a bill. Each item has its own GST rate; the additional tax field is applied after the discount. The discount can be a percentage or flat rupee amount.
- Save the bill to create a UPI QR. The QR encodes a `upi://pay` link with the configured VPA and exact bill amount. Scan it with a UPI app to verify the payee and amount. Do not make a payment during testing.

## Features
- Shop profile and editable item catalogue.
- Quantity-based bills, per-item GST, bill-level percentage/flat discount, and additional tax.
- UPI QR generation on-device using a bundled QR generator; QR is only shown when a valid VPA is configured.
- Bill receipt rendered as a PNG image; share via the device share sheet when supported, or download and attach in WhatsApp. WhatsApp text sharing is also available.
- Searchable bill history, daily sales total and dashboard.
- Local persistence, JSON backup/restore, PWA manifest and service worker for offline use.

## Calculation rules
For each line: `line base = unit price × quantity`; `item tax = line base × item GST rate`. Subtotal and item tax are summed. Discount is either a percentage of subtotal or a flat amount, capped at subtotal + item tax. Additional tax is applied to the post-discount amount. Final total is rounded to two decimal places.

## Privacy and limitations
- Data is stored in this browser's local storage on this device. It is not synced to another device. Export a JSON backup regularly.
- UPI payment hand-off requires a compatible UPI app and a real, verified VPA. This app never processes or confirms a payment.
- The app creates a PNG receipt. Native file sharing depends on browser/device support; otherwise it downloads the image so it can be attached manually in WhatsApp.
- For production use, confirm local tax/invoice rules with a qualified professional. This demo does not issue a legally certified tax invoice.

## Files
- `index.html` — application structure
- `styles.css` — responsive visual design
- `app.js` — billing, catalogue, history, storage, sharing and QR rendering
- `billing-core.js` — pure calculation logic shared with automated tests
- `qr-generator.js` — bundled QR Code generator (MIT-licensed implementation)
- `manifest.webmanifest`, `sw.js`, `assets/icon.svg`, `assets/icon-192.png`, `assets/icon-512.png` — install and offline support
- `prompts.md` — ordered build prompts
- `REQUIREMENTS-CHECKLIST.md` — requirements and acceptance-test status
- `tests/` — automated calculation tests and manual test plans
