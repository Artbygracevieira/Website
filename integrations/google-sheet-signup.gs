// Email signups from artbygracevieira.com land in this Google Sheet.
//
// Lives in script.google.com as the project "ABGV email signups" (support@artbygracevieira.com).
// Deployed as a web app (Execute as: Me, Who has access: Anyone). Its URL is in lib/site.ts.
//
// To change it: paste this whole file in, Save, then Deploy > Manage deployments >
// Edit (pencil) > Version: New version > Deploy. The URL stays the same.
//
// Optional: set SECRET below to any random phrase and add the same phrase in Vercel
// as SIGNUP_SHEET_SECRET, so only the website can add rows.

const SHEET_ID = "15b0Vdnw_4oyUxVty0uNbxUyJaTb23zLQNBoDy4jQpuk"; // the "Email Sign ups" sheet
const SECRET = ""; // same value as SIGNUP_SHEET_SECRET in Vercel, or leave both empty

const HEADERS = ["Signed up", "First name", "Last name", "Email", "Page"];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    if (SECRET && body.secret !== SECRET) return reply({ ok: false, error: "not allowed" });

    const email = String(body.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return reply({ ok: false, error: "bad email" });
    const first = String(body.firstName || "").trim().slice(0, 60);
    const last = String(body.lastName || "").trim().slice(0, 60);

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheets()[0]; // first tab of the sheet

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      // Keep the header row in place.
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight("bold");
      // Skip people who are already on the list.
      const lastRow = sheet.getLastRow();
      const existing = lastRow > 1 ? sheet.getRange(2, 4, lastRow - 1, 1).getValues().flat() : [];
      if (!existing.includes(email)) sheet.appendRow([new Date(), first, last, email, String(body.source || "")]);
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
