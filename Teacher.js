/*******************************************************
 * LEAD STC Leave Management System
 * Teacher.js
 * Module: Teacher Authentication
 *******************************************************/

/**
 * Register teacher on first login
 */
function registerTeacher(data) {

  const sheet = getSheet(CONFIG.SHEETS.TEACHERS);

  const rows = sheet.getDataRange().getValues();

  // Check if teacher already exists
  for (let i = 1; i < rows.length; i++) {

    if (
      String(rows[i][2]).toLowerCase() === String(data.email).toLowerCase()
    ) {

      return {
        success: true,
        existing: true,
        teacherId: rows[i][0],
        name: rows[i][1]
      };

    }

  }

  const teacherId = generateTeacherID();

  sheet.appendRow([
    teacherId,
    data.name,
    data.email,
    data.mobile,
    data.department,
    data.designation,
    CONFIG.STATUS.ACTIVE,
    new Date()
  ]);

  return {
    success: true,
    existing: false,
    teacherId: teacherId,
    name: data.name
  };

}


/**
 * Login Teacher
 */
function loginTeacher(email, mobile) {

  const sheet = getSheet(CONFIG.SHEETS.TEACHERS);

  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {

    if (
      String(rows[i][2]).toLowerCase() === String(email).toLowerCase() &&
      String(rows[i][3]) === String(mobile)
    ) {

      return {
        success: true,
        teacher: {
          teacherId: rows[i][0],
          name: rows[i][1],
          email: rows[i][2],
          mobile: rows[i][3],
          department: rows[i][4],
          designation: rows[i][5],
          status: rows[i][6]
        }
      };

    }

  }

  return {
    success: false,
    message: "Teacher not registered."
  };

}