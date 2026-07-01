/*********************************************************
 * LEAD STC Leave Management System
 * Config.js
 *********************************************************/

const CONFIG = {

  // Spreadsheet
  SPREADSHEET_ID: "1bBZV9je9Tol-EsnitgVnX_WsXv3SXbSwooA4bYK9aWc",

  // Sheet Names
  SHEETS: {
    TEACHERS: "Teachers",
    LEAVE: "Leave Register",
    SETTINGS: "Settings",
    AUDIT: "Audit Log"
  },

  // Status
  STATUS: {
    ACTIVE: "Active",

    PENDING_COO: "Pending with COO",
    PENDING_PRINCIPAL: "Pending with Principal",

    APPROVED: "Approved",

    REJECTED_COO: "Rejected by COO",
    REJECTED_PRINCIPAL: "Rejected by Principal"
  },

  // Roles
  ROLE: {
    TEACHER: "Teacher",
    COO: "COO",
    PRINCIPAL: "Principal"
  }

};


/************************************************
 Open Spreadsheet
*************************************************/

function getSpreadsheet() {
  return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
}


/************************************************
 Get Sheet
*************************************************/

function getSheet(sheetName) {
  return getSpreadsheet().getSheetByName(sheetName);
}


/************************************************
 Read Settings Sheet
*************************************************/

function getSettings() {

  const sheet = getSheet(CONFIG.SHEETS.SETTINGS);

  const values = sheet.getDataRange().getValues();

  let obj = {};

  for (let i = 1; i < values.length; i++) {

    obj[values[i][0]] = values[i][1];

  }

  return obj;

}