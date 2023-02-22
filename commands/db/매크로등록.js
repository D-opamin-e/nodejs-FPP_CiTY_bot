var mysql = require('mysql');
var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "비번",
    database : "sunam_test",
  });
module.exports = {
    name: "등록",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
        return message.channel.send("[ 오류 ] 사유 > **권한이 부족합니다.**");
        connection.query("DELETE FROM `sunam_test`.`discord_macro`", function (err, result, fields) {
        })
        var log = "INSERT INTO discord_macro (macroo) VALUES ?";
        var values = [
          [`${args.join(" ")}`]
        ];
      
        connection.query(log, [values], function (err, result) {
          message.channel.send({embed: {
            title: "매크로 등록에 성공했습니다!",
            description: "기존의 매크로 내용들을 삭제하고, 신규 매크로 내용을 등록에 성공했습니다.\n매크로 기능을 시작하려면 `?매크로시작`을 입력해주세요!",
            color: 0xff3c00,
          }})
        })
    }
}

