// Email signups from artbygracevieira.com land in this Google Sheet.
//
// One-time setup (about 3 minutes):
// 1. Go to script.google.com and make a new project (already done: "ABGV email signups").
// 2. Paste this whole file in and click Save.
// 3. Optional but recommended: change SECRET below to any random phrase,
//    and put the same phrase in Vercel as SIGNUP_SHEET_SECRET.
// 4. Click Deploy > New deployment. Gear icon > Web app.
//    Execute as: Me. Who has access: Anyone. Click Deploy and allow access.
// 5. Copy the Web app URL (ends in /exec). In Vercel, add it as SIGNUP_SHEET_URL.
//
// If you ever edit this script, use Deploy > Manage deployments > Edit > New version,
// so the URL stays the same.

const SHEET_ID = "15b0Vdnw_4oyUxVty0uNbxUyJaTb23zLQNBoDy4jQpuk"; // the "Email Sign ups" sheet
const SECRET = ""; // same value as SIGNUP_SHEET_SECRET in Vercel, or leave both empty

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    if (SECRET && body.secret !== SECRET) return reply({ ok: false, error: "not allowed" });

    const email = String(body.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return reply({ ok: false, error: "bad email" });

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheets()[0]; // first tab of the sheet
    if (sheet.getLastRow() === 0) sheet.appendRow(["Signed up", "Email", "Page"]);

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      // Skip people who are already on the list.
      const last = sheet.getLastRow();
      const existing = last > 1 ? sheet.getRange(2, 2, last - 1, 1).getValues().flat() : [];
      if (!existing.includes(email)) sheet.appendRow([new Date(), email, String(body.source || "")]);
    } finally {
      lock.releaseLock();
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
