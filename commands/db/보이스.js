var mysql = require('mysql');
var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "dopamine2312@@",
    database : "sunam_test",
  });
module.exports = {
    name: "보이스",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
            if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
            return message.channel.send("[ 오류 ] 사유 > **권한이 부족합니다.**");
            let member = message.mentions.members.first()
            if(!member) return message.author.send({ embed: {
              title : `[FPP CITY 조회 실패]`,
              description: `대상을 서버에서 찾을 수 없습니다.`,
                      color: 0xff3c00
            }});
            connection.query(`SELECT * FROM discord_voice_log where id=${member.id}`, function (err, result, fields) {
              if (err) throw err;
              for(var i = 0; i < result.length; i++) {
                message.channel.send({embed: {
                  title : `[${result[i].state} 기록]`,
                  description : `조회 대상 : <@${result[i].id}>\n조회 대상 ID : ${result[i].id}\n보이스 채널 : ${result[i].room}`,
                  color: 0xA32600,
                  footer: {
                    icon_url: client.user.avatarURL,
                    text:`채널 접속 날짜 : ${result[i].date} | idx 값 : ${result[i].idx}`
                   }
                }})
              }
              message.channel.send({embed: {
                title : `보이스 채널 접속 기록 출력을 마쳤습니다!`,
                description : `조회 신청자 : ${message.author}`,
                color: 0xA32600
              }})
            })
    }
}

