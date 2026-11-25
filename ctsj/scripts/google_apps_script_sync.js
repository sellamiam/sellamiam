/**
 * ==============================================================================
 * Civic Tech Saint John (CTSJ) - Projects Google Sheet Sync Script
 * ==============================================================================
 *
 * PURPOSE:
 * Automatically synchronizes changes made in the "CTSJ Active Projects" Google Sheet
 * to the CTSJ Google Cloud Firestore database via Cloud Function webhook.
 *
 * HOW TO INSTALL IN GOOGLE SHEETS:
 * 1. In your Google Sheet, click Extensions > Apps Script.
 * 2. Delete any code in the editor and paste this entire script.
 * 3. Go to Project Settings (gear icon) > Script Properties and add:
 *    - CTSJ_WEBHOOK_URL: https://<region>-<project>.cloudfunctions.net/syncProjectWebhook
 *    - CTSJ_API_SECRET: <your-secure-pre-shared-secret-token>
 * 4. Save and return to the sheet. Any edit in columns B through H will sync!
 */

function onEdit(e) {
  if (!e || !e.range) return;

  const sheet = e.source.getActiveSheet();
  const sheetName = sheet.getName();
  
  // Only monitor the 'Active Projects' tab
  if (sheetName !== "Active Projects") return;

  const row = e.range.getRow();
  const col = e.range.getColumn();

  // Skip header row and sync status column (Col 9) to prevent infinite loops
  if (row <= 1 || col === 9) return;

  const scriptProperties = PropertiesService.getScriptProperties();
  const webhookUrl = scriptProperties.getProperty("CTSJ_WEBHOOK_URL");
  const apiSecret = scriptProperties.getProperty("CTSJ_API_SECRET");

  if (!webhookUrl || !apiSecret) {
    Logger.log("Missing CTSJ_WEBHOOK_URL or CTSJ_API_SECRET script properties.");
    return;
  }

  // Read full row:
  // Col 1: Project ID (e.g. PRJ-001)
  // Col 2: Project Name
  // Col 3: Status (Ideation, Planning, Active, On Hold, Completed, Archived)
  // Col 4: Project Lead Name
  // Col 5: Project Lead Email
  // Col 6: Needed Skills (comma-separated: Python, React, GIS, UX)
  // Col 7: GitHub Repo / Documentation URL
  // Col 8: Communication Channel (e.g. #project-housing on Slack/Discord)
  // Col 9: Sync Status (Timestamp feedback written by this script)
  const rowData = sheet.getRange(row, 1, 1, 9).getValues()[0];

  const projectId = rowData[0] ? rowData[0].toString().trim() : null;
  if (!projectId) {
    sheet.getRange(row, 9).setValue("⚠️ Missing Project ID");
    return;
  }

  const payload = {
    projectId: projectId,
    name: rowData[1] || "Untitled Project",
    status: (rowData[2] || "ideation").toString().toLowerCase().trim(),
    leadName: rowData[3] || "",
    leadEmail: rowData[4] || "",
    neededSkills: rowData[5] 
      ? rowData[5].toString().split(",").map(function(s) { return s.trim(); }).filter(Boolean)
      : [],
    repoUrl: rowData[6] || "",
    communicationChannel: rowData[7] || "",
    updatedBy: "google_sheet_editor",
    syncTimestamp: new Date().toISOString()
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "x-ctsj-secret-key": apiSecret
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(webhookUrl, options);
    const responseCode = response.getResponseCode();

    if (responseCode === 200) {
      const now = Utilities.formatDate(new Date(), "America/Moncton", "yyyy-MM-dd HH:mm:ss");
      sheet.getRange(row, 9).setValue("✅ Synced: " + now);
    } else {
      sheet.getRange(row, 9).setValue("❌ Error " + responseCode + ": " + response.getContentText().substring(0, 40));
    }
  } catch (err) {
    sheet.getRange(row, 9).setValue("❌ Network Fail: " + err.message.substring(0, 40));
  }
}

/**
 * Utility to run an initial batch sync of all projects to the DB.
 * Can be triggered manually from the Apps Script menu.
 */
function syncAllProjects() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Active Projects");
  if (!sheet) return;

  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return;

  for (let r = 2; r <= lastRow; r++) {
    const fakeEvent = {
      source: SpreadsheetApp.getActiveSpreadsheet(),
      range: sheet.getRange(r, 3)
    };
    onEdit(fakeEvent);
    Utilities.sleep(400); // Throttling
  }
}
