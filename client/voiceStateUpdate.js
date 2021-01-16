var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "dopamine2312@@",
  database: "sunam_test",
});
var date = new Date();
module.exports = async (client, oldMember, newMember) => {
  let username = oldMember.displayName;
  let oldVCID = oldMember.voiceChannelID;
  let newVCID = newMember.voiceChannelID;

  let oldChannelName = (oldVCID != null && typeof oldVCID != undefined) ? client.channels.get(oldVCID).name : null;
  let newChannelName = (newVCID != null && typeof newVCID != undefined) ? client.channels.get(newVCID).name : null;

  if (oldChannelName === null) {
    client.channels.get("741636935818149909")
      .send({
        embed: {
          title: "보이스 채널 접속",
          description: `접속자 : <@${oldMember.id}>\n접속자 ID : ${oldMember.id}\n보이스 채널명 : ${newChannelName}`,
          color: 0x00ff26,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
          }
        }
      })
    var log = "INSERT INTO discord_voice_log (state, id, room, name, day) VALUES ?";
    var values = [
      [`입장`, `${oldMember.id}`, `${newChannelName}`, `${username}`, `${date.getDate()}`]
    ];
    connection.query(log, [values], function (err, result) {
    });
    if (oldMember.id === "234395307759108106") {
      connection.query(`SELECT * FROM discord_voice_log WHERE id="234395307759108106" AND room LIKE '%RANK%'`, function (err, result, fields) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          client.channels.get("633260404973371420")
            .send({
              embed: {
                title: "Groovy 게임 채널 접속 로그",
                description: `보이스 채널 명 : ${result[i].room}`,
                color: 0xb70000,
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                }
              }
            })
        }
      })
    }
  }
  else if (newChannelName === null) {
    client.channels.get("741636935818149909")
      .send({
        embed: {
          title: "보이스 채널 퇴장",
          description: `퇴장자 : <@${oldMember.id}>\n퇴장자 ID : ${oldMember.id}\n보이스 채널명 : ${oldChannelName}`,
          color: 0xb70000,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
          }
        }
      })
    var log = "INSERT INTO discord_voice_log (state, id, room, name, day) VALUES ?";
    var values = [
      [`퇴장`, `${oldMember.id}`, `${oldChannelName}`, `${username}`, `${date.getDate()}`]
    ];
    connection.query(log, [values], function (err, result) {
    })
    connection.query(`DELETE FROM discord_voice_log WHERE id="234395307759108106"`, function (err, result, fields) { //삭제 시작
      if (err) throw err;
    });
  }
  else {
    client.channels.get("741636935818149909")
      .send({
        embed: {
          title: "보이스 채널 이동",
          description: `이동자 : <@${oldMember.id}>\n이동자 ID : ${oldMember.id}\n기존 보이스 채널명 : ${oldChannelName}\n이동 보이스 채널명 : ${newChannelName}`,
          color: 0x87ceeb,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
          }
        }
      })
    var log = "INSERT INTO discord_voice_log (state, id, room, name, day, moveroom) VALUES ?";
    var values = [
      [`이동`, `${oldMember.id}`, `${oldChannelName}`, `${username}`, `${date.getDate()}`, `${newChannelName}`]
    ];
    connection.query(log, [values], function (err, result) {
    })
  }
}
