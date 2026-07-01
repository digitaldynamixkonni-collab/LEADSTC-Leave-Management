/*******************************************************
 * Utils.gs
 *******************************************************/

function getSpreadsheet(){

  return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);

}


function getSheet(name){

  return getSpreadsheet().getSheetByName(name);

}


function formatDate(date){

  if(date=="") return "";

  return Utilities.formatDate(

      new Date(date),

      Session.getScriptTimeZone(),

      "dd MMM yyyy"

  );

}


function currentDate(){

  return Utilities.formatDate(

      new Date(),

      Session.getScriptTimeZone(),

      "dd/MM/yyyy HH:mm:ss"

  );

}


/**************************************************
Generate Teacher ID

T0001
**************************************************/

function generateTeacherID(){

  const sheet=getSheet(CONFIG.SHEETS.TEACHERS);

  const last=sheet.getLastRow();

  if(last==1){

    return "T0001";

  }

  return "T"+Utilities.formatString("%04d",last);

}



/**************************************************
Generate Leave ID

LV000001
**************************************************/

function generateLeaveID(){

  const sheet=getSheet(CONFIG.SHEETS.LEAVE);

  const last=sheet.getLastRow();

  if(last==1){

    return "LV000001";

  }

  return "LV"+Utilities.formatString("%06d",last);

}