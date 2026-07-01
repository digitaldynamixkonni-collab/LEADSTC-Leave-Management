/*********************************************************
 * LEAD STC Leave Management System
 * Code.js
 *********************************************************/

/**
 * Main Entry Point
 */
function doGet(e) {

  let page = "index";

  if (e && e.parameter.page) {
    page = e.parameter.page;
  }

  return HtmlService
    .createTemplateFromFile(page)
    .evaluate()
    .setTitle("LEAD STC Leave Management")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}


/**
 * Include HTML Files
 */
function include(filename) {

  return HtmlService
    .createHtmlOutputFromFile(filename)
    .getContent();

}


/**
 * Application Information
 */
function getApplicationInfo() {

  const settings = getSettings();

  return {

    collegeName: settings["College Name"] || "LEAD STC",

    version: "1.0",

    year: new Date().getFullYear()

  };

}


/**
 * Health Check
 */
function ping() {

  return {

    success: true,

    serverTime: new Date(),

    message: "Server Connected"

  };

}