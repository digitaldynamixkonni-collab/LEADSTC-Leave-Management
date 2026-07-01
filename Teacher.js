function teacherLogin(email,mobile){

  const data=getAllData();

  const result=[];

  data.forEach(function(r){

    if(r[1]==email && r[5]==mobile){

      result.push({

        timestamp:r[0],
        email:r[1],
        name:r[2],
        department:r[3],
        designation:r[4],
        mobile:r[5],
        leave:r[6],
        from:r[7],
        to:r[8],
        reason:r[9],
        coo:r[10],
        principal:r[12],
        final:r[14],
        remarks:r[15]

      });

    }

  });

  return result;

}