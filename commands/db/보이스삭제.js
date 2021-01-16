var mysql = require('mysql');
var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "dopamine2312@@",
    database : "sunam_test",
  });
module.exports = {
    name: "보이스삭제",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
        return message.channel.send("[ 오류 ] 사유 > **권한이 부족합니다.**");
        let uday = args.join(" ")
        if(!uday) return errors.noReason(message.channel);
        connection.query(`DELETE FROM discord_voice_log WHERE day >= 1 AND day <= ${uday}`, function (err, result, fields) { //삭제 시작
            if (err) throw err;
          message.channel.send({embed: {
            title : `[discord_voice_log 데이터 삭제]`,
            description : `삭제 대상 : 1일 ~ ${uday}일`,
            color: 0xA32600
          }})
        })
       connection.query(`SELECT COUNT(if(DAY >= 1 AND DAY<=${uday},DAY,NULL)) as coount FROM discord_voice_log`, function (err, result) {
         if (err) throw err;
         var yourCount = result[0].coount;
          console.log(yourCount);
        }) //삭제된 개수 카운트
    }
}

