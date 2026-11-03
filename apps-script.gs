/**
 * Pipedrive Class of 2026 — sign-up receiver.
 * Paste this into Extensions → Apps Script in your Google Sheet, then deploy as a Web app.
 * Each sign-up becomes a row. If the same email signs up again, its row is updated instead of duplicated.
 */
const SHEET_NAME = 'Sign-ups';
const HEADERS = ['Signed up at', 'Name', 'Email', 'Graduation year'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = e.parameter;
    const name = String(p.name || '').trim().slice(0, 200);
    const email = String(p.email || '').trim().toLowerCase().slice(0, 200);
    const year = String(p.year || '').trim().slice(0, 4);
    if (!name || !email) return json({ ok: false, error: 'missing fields' });

    const sheet = getSheet();
    const row = [new Date(), name, email, year];

    const emails = sheet.getRange(2, 3, Math.max(sheet.getLastRow() - 1, 1), 1).getValues().flat();
    const existing = emails.indexOf(email);
    if (existing >= 0) {
      sheet.getRange(existing + 2, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }
    return json({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
