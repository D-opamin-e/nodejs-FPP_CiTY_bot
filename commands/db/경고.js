var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "dopamine2312@@",
  database: "sunam_test",
});
var date = new Date();
var give_month = (date.getMonth() + 1);
var give_date = (date.getMonth() + 1 + '/' + date.getDate());
var fin_date_month = (date.getMonth() + 4);
if (fin_date_month == '13') {
  var fin_date_month = "1"
} else if (fin_date_month == '14') {
  var fin_date_month = "2"
} else if (fin_date_month == '15') {
  var fin_date_month = "3"
}
var fin_date = (fin_date_month + '/' + date.getDate());

module.exports = {
  name: "경고",
  description: "Returns latency and API ping",
  run: async (client, message, args, Discord) => {
    message.delete();
    if (!message.member.roles.some(r => ["Manager ▲", "예비 매니저", "-"].includes(r.name)))
      return message.reply("[ 오류 ] 사유 > **권한이 부족합니다.**");
    let rUser = message.mentions.members.first()
    if (!rUser) return message.author.send({
      embed: {
        title: `[FPP CITY 경고 지급 실패]`,
        description: `지급 대상을 서버에서 찾을 수 없습니다.`,
        color: 0xff3c00
      }
    });
    if (rUser.roles.some(r => ["경고 2회"].includes(r.name))) {
      message.author.send({
        embed: {
          title: "[ FPP CITY ]",
          description: `<@${rUser.id}>님은 경고 2회를 보류하고 있어서, 경고 지급을 할 수 없습니다.\n 해당 유저에 대한 경고 1회, 2회 지급일을 확인하시고 처리를 해주세요!`,
          color: 0xff3c00,
          footer: {
            text: `지급 대상자 ID : ${rUser.id}`
          }
        }
      })
      return;
    }
    let rreason = args.join(" ").slice(22);
    if (!rreason) return message.channel.send(`${message.author}님 사유를 작성해주세요.`)
    if (message.content.includes('투명')) {
      client.users.get(`${rUser.id}`).send({
        embed: {
          title: `[ FPP CITY ]`,
          description: `<@${rUser.id}>님께서 투명 닉네임을 이용하셔서 경고를 지급 받으셨습니다.\n\n경고 지급일 기준으로 1주일 내에 별명 변경 혹은 닉네임 변경을 부탁드리며\n1주일 이후에도 미변경시 추가 경고 지급될 수 있는 점 확인 부탁드립니다.`,
          color: 0xff3c00,
          footer: {
            icon_url: client.user.avatarURL,
            text: `Copyright 2018~.Dopamine.All rights reserved.`
          }
        }
      });
    }
    if (rUser.roles.some(r => ["경고  1회"].includes(r.name))) {
      var log = "INSERT INTO discord_warning_2 (state, id, give_date, fin_date, warning2_month, warning2_day) VALUES ?"; //DB에 기록
      var values = [
        [`경고 2회`, `${rUser.id}`, `${give_date}`, `${fin_date}`, `${fin_date_month}`, `${date.getDate()}`]
      ];
      connection.query(log, [values], function (err, result) {
      })
      var log2 = "INSERT INTO discord_warning_all (state, id, give_day, give_month, give_date, fin_day, fin_month, fin_date, reason) VALUES ?";
      var values = [
        [`경고 2회`, `${rUser.id}`, `${give_date}`, `${give_month}`, `${date.getDate()}`, `${fin_date}`, `${fin_date_month}`, `${date.getDate()}`, `${rreason}`]
      ];
      connection.query(log2, [values], function (err, result) {
      })
      let role2 = message.guild.roles.find(r => r.name === "경고 2회");
      rUser.addRole(role2).catch(console.error);
      client.channels.get("441099080194588682") //FPP CITY 서버 내에 report 채널
        .send({
          embed: {
            title: "[ 경고 역할 지급 ]",
            description: `**지급 대상자**\n닉네임: ${rUser} | 아이디: ||${rUser.id}||\n\n**지급 역할 | 경고 만료일**\n경고 2회 | ${fin_date_month}월 ${date.getDate()}일\n\n**사유**: ${rreason}`,
            color: 0xb70000,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
            }
          }
        })
        client.channels.get("675920185487786004") //discord_log 서버 내에 경고 로그 채널
        .send({
          embed: {
            title: "[ 경고 역할 지급 ]",
            description: `**지급 대상자**\n닉네임: ${rUser} | 아이디: ||${rUser.id}||\n\n**지급 역할 | 경고 만료일**\n경고 2회 | ${fin_date_month}월 ${date.getDate()}일\n\n**사유**: ${rreason}`,
            color: 0xb70000,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
            }
          }
        })
      client.users.get(`${rUser.id}`).send({
        embed: {
          title: `[ FPP CITY ]`,
          description: `<@${rUser.id}>님께서 경고 2회를 지급 받으셨습니다.\n경고 삭감 기간(3개월) 내에 추가적인 규칙 위반 시, 영구추방되는 점 확인 부탁드립니다.\n\n경고 사유는 <#441099080194588682>내에서 확인 가능합니다.`,
          color: 0xff3c00,
          footer: {
            icon_url: client.user.avatarURL,
            text: `Copyright 2018~.Dopamine.All rights reserved.`
          }
        }
      });
      return;
    } else {
      var log = "INSERT INTO discord_warning (state, id, give_date, fin_date, fin_month, fin_day) VALUES ?";
      var values = [
        [`경고  1회`, `${rUser.id}`, `${give_date}`, `${fin_date}`, `${fin_date_month}`, `${date.getDate()}`]
      ];
      connection.query(log, [values], function (err, result) {
      })
      var log2 = "INSERT INTO discord_warning_all (state, id, give_day, give_month, give_date, fin_day, fin_month, fin_date, reason) VALUES ?";
      var values = [
        [`경고  1회`, `${rUser.id}`, `${give_date}`, `${give_month}`, `${date.getDate()}`, `${fin_date}`, `${fin_date_month}`, `${date.getDate()}`, `${rreason}`]
      ];
      connection.query(log2, [values], function (err, result) {
      })
      let role = message.guild.roles.find(r => r.name === "경고  1회");
      rUser.addRole(role).catch(console.error);
      client.channels.get("441099080194588682") //FPPCITY 서버 report 채널
        .send({
          embed: {
            title: "[ 경고 역할 지급 ]",
            description: `**지급 대상자**\n닉네임: ${rUser} | 아이디: ||${rUser.id}||\n\n**지급 역할 | 경고 만료일**\n경고 1회 | ${fin_date_month}월 ${date.getDate()}일\n\n**사유**: ${rreason}`,
            color: 0xb70000,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
            }
          }
        })
        client.channels.get("675920185487786004") //discord_log 서버 로그 채널
        .send({
          embed: {
            title: "[ 경고 역할 지급 ]",
            description: `**지급 대상자**\n닉네임: ${rUser} | 아이디: ||${rUser.id}||\n\n**지급 역할 | 경고 만료일**\n경고 1회 | ${fin_date_month}월 ${date.getDate()}일\n\n**사유**: ${rreason}`,
            color: 0xb70000,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
            }
          }
        })
    }
    client.users.get(`${rUser.id}`).send({
      embed: {
        title: `[ FPP CITY ]`,
        description: `<@${rUser.id}>님께서 경고 1회를 지급 받으셨습니다.\n경고 삭감 기간(3개월) 내에 추가적인 규칙 위반 시, 경고 2회 지급되는 점 확인 부탁드립니다.\n\n경고 사유는 <#441099080194588682>내에서 확인 가능합니다.`,
        color: 0xff3c00,
        footer: {
          icon_url: client.user.avatarURL,
          text: `Copyright 2018~.Dopamine.All rights reserved.`
        }
      }
    });
    return;
  }
}

