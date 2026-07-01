/**
 * =====================================================
 * LEAD STC Leave Management System v1.0
 * Teacher Service
 * =====================================================
 */

const TEACHER_SHEET = "Teachers";

/**
 * Return Teacher Sheet
 */
function getTeacherSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(TEACHER_SHEET);
}

/**
 * Get all teachers
 */
function getTeachers() {

  const sheet = getTeacherSheet();

  const values = sheet.getDataRange().getValues();

  if (values.length <= 1) {
    return [];
  }

  const headers = values.shift();

  return values.map(row => {

    let obj = {};

    headers.forEach((header, index) => {
      obj[header] = row[index];
    });

    return obj;

  });

}

/**
 * Get Teacher by Employee ID
 */
function getTeacherByEmployeeId(employeeId) {

  const teachers = getTeachers();

  return teachers.find(t => String(t["Employee ID"]) === String(employeeId));

}

/**
 * Generate Teacher ID
 * Example:
 * TCH0001
 */
function generateTeacherId() {

  const sheet = getTeacherSheet();

  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    return "TCH0001";
  }

  const lastId = sheet
    .getRange(lastRow, 1)
    .getValue();

  const number = parseInt(
    String(lastId).replace("TCH", "")
  );

  return "TCH" + Utilities.formatString("%04d", number + 1);

}

/**
 * Check duplicate Employee ID
 */
function employeeExists(employeeId) {

  return getTeachers().some(t =>
    String(t["Employee ID"]) === String(employeeId)
  );

}

/**
 * Add Teacher
 */
function addTeacher(data) {

  if (employeeExists(data.employeeId)) {
    throw new Error("Employee ID already exists.");
  }

  const sheet = getTeacherSheet();

  const teacherId = generateTeacherId();

  const now = new Date();

  sheet.appendRow([
    teacherId,
    data.employeeId,
    data.name,
    data.department,
    data.designation,
    data.email,
    data.phone,
    data.cl,
    data.sl,
    data.el,
    data.status,
    now,
    now
  ]);

  logAudit(
    "Teacher",
    "ADD",
    teacherId + " - " + data.name
  );

  return {
    success: true,
    message: "Teacher added successfully."
  };

}

/**
 * Update Teacher
 */
function updateTeacher(data) {

  const sheet = getTeacherSheet();

  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (values[i][0] == data.teacherId) {

      sheet.getRange(i + 1, 2).setValue(data.employeeId);
      sheet.getRange(i + 1, 3).setValue(data.name);
      sheet.getRange(i + 1, 4).setValue(data.department);
      sheet.getRange(i + 1, 5).setValue(data.designation);
      sheet.getRange(i + 1, 6).setValue(data.email);
      sheet.getRange(i + 1, 7).setValue(data.phone);
      sheet.getRange(i + 1, 8).setValue(data.cl);
      sheet.getRange(i + 1, 9).setValue(data.sl);
      sheet.getRange(i + 1,10).setValue(data.el);
      sheet.getRange(i + 1,11).setValue(data.status);
      sheet.getRange(i + 1,13).setValue(new Date());

      logAudit(
        "Teacher",
        "UPDATE",
        data.teacherId
      );

      return {
        success: true,
        message: "Teacher updated."
      };

    }

  }

  throw new Error("Teacher not found.");

}

/**
 * Delete Teacher
 */
function deleteTeacher(teacherId) {

  const sheet = getTeacherSheet();

  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (values[i][0] == teacherId) {

      sheet.deleteRow(i + 1);

      logAudit(
        "Teacher",
        "DELETE",
        teacherId
      );

      return {
        success: true
      };

    }

  }

  throw new Error("Teacher not found.");

}

/**
 * Toggle Active / Inactive
 */
function toggleTeacherStatus(teacherId) {

  const sheet = getTeacherSheet();

  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (values[i][0] == teacherId) {

      const current = values[i][10];

      const updated =
        current == "Active"
        ? "Inactive"
        : "Active";

      sheet
        .getRange(i + 1,11)
        .setValue(updated);

      sheet
        .getRange(i + 1,13)
        .setValue(new Date());

      logAudit(
        "Teacher",
        "STATUS",
        teacherId + " → " + updated
      );

      return updated;

    }

  }

}

/**
 * Search
 */
function searchTeachers(keyword) {

  keyword = keyword.toLowerCase();

  return getTeachers().filter(t =>

    String(t["Name"]).toLowerCase().includes(keyword) ||

    String(t["Employee ID"]).toLowerCase().includes(keyword) ||

    String(t["Department"]).toLowerCase().includes(keyword) ||

    String(t["Designation"]).toLowerCase().includes(keyword)

  );

}