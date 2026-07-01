function sendMail(to,subject,body){

  MailApp.sendEmail({

    to:to,

    subject:subject,

    htmlBody:body

  });

}