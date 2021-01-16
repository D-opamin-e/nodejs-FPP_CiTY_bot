var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "dopamine2312@@",
  database: "sunam_test",
});
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  name: "조회",
  description: "Reboot FPP_CITY",
  run: async (client, message, args) => {
    message.delete();
    if (message.member.roles.some(r => ["Manager ▲", "예비 매니저", "-"].includes(r.name))) {
      const userMention = message.mentions.users.first() || message.author;
      let userinfo = {};
      userinfo.createdat = userMention.createdAt;
      userinfo.id = userMention.id;
      userinfo.avatar = userMention.avatarURL;
      let createdate = `${moment.utc(userinfo.createdat).lang("ko").format('YYYY년 MMMM Do dddd HH시mm분ss초')}`
      const userMention2 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
      if (!userMention2)
        return message.author.send({
          embed: {
            title: `[FPP CITY 조회 실패]`,
            description: `조회 대상을 서버에서 찾을 수 없습니다.`,
            color: 0xff3c00
          }
        });
      let userinfo2 = {};
      userinfo2.joinedat = userMention2.joinedAt;
      let joinedate = `${moment.utc(userinfo2.joinedat).lang("ko").format('YYYY년 MMMM Do dddd HH시mm분ss초')}`
      let member = message.mentions.members.first() || message.member
      message.channel.send({
        embed: {
          title: `[ FPP CITY 유저 조회 ]`,
          description: `조회 대상 : ${userMention}\n계정 ID : ${userinfo.id}\n계정 생성일 : ${createdate}\n서버 가입일 : ${joinedate}\n부여된 역할 : ${member.roles.map(r => `${r}`).join(' | ')}`,
          color: 0x00ff26,
          footer: {
            icon_url: userinfo.avatar,
            text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
          }
        }
      })
      connection.query(`SELECT * FROM discord_warning_all where id = ${userinfo.id} AND state = '경고  1회'`, function (err, result, fields) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          message.channel.send({
            embed: {
              description: `경고 1회 지급일 : ${result[i].give_month}월 ${result[i].give_date}일\n경고 1회 만료일 : ${result[i].fin_month}월 ${result[i].fin_date}일\n사유 : ${result[i].reason}`,
              color: 0xff3c00,
              footer: {
                text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
              }
            }
          })
        }
      })
      connection.query(`SELECT * FROM discord_warning_all where id = ${userinfo.id} AND state = '경고 2회'`, function (err, result, fields) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          message.channel.send({
            embed: {
              description: `경고 2회 지급일 : ${result[i].give_month}월 ${result[i].give_date}일\n경고 2회 만료일 : ${result[i].fin_month}월 ${result[i].fin_date}일\n사유 : ${result[i].reason}`,
              color: 0xff3c00,
              footer: {
                text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
              }
            }
          })
        }
      })
      connection.query(`SELECT * FROM discord_file_data where id = ${userinfo.id} AND state = '[ 마스터 신청 ]'`, function (err, result, fields) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          message.channel.send({
            embed: {
              title: `DB 마스터신청 자료`,
              description: `신청자 : <@${result[i].id}>\n아이디 : ${result[i].id}\n자료 : https://dopamine.gq/FPP/file/Master/${userinfo.id}/${result[i].fullname}`,
              color: 0x00ff26,
              footer: {
                text: `신청일 : ${result[i].time}`
              }
            }
          })
        }
      })
      connection.query(`SELECT * FROM discord_file_data where id = ${userinfo.id} AND state = '[ 신고 ]'`, function (err, result, fields) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          message.channel.send({
            embed: {
              title: `DB 신고 자료`,
              description: `신고자 : <@${result[i].id}>\n아이디 : ${result[i].id}\n대상자 : <@${result[i].rUser}>\n아이디 : ${result[i].rUser}\n사유 : ${result[i].reason}\n자료 : https://dopamine.gq/FPP/file/report/${userinfo.id}/${result[i].fullname}`,
              color: 0xff3c00,
              footer: {
                text: `신고일 : ${result[i].time}`
              }
            }
          })
        }
      })
    } else {
      message.delete();
      message.author.send({
        embed: {
          title: `[ FPP CITY 경고 내역 조회 ]`,
          description: `조회 요청자 : ${message.author}\n계정 ID : ${message.author.id}`,
          color: 0x00ff26
        }
      })
      connection.query(`SELECT * FROM discord_warning_all where id = ${message.author.id} AND state = '경고  1회'`, function (err, result, fields) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          message.author.send({
            embed: {
              description: `경고 1회 지급일 : ${result[i].give_month}월 ${result[i].give_date}일\n경고 1회 만료일 : ${result[i].fin_month}월 ${result[i].fin_date}일\n사유 : ${result[i].reason}`,
              color: 0xff3c00,
              footer: {
                text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
              }
            }
          })
        }
      })
      connection.query(`SELECT * FROM discord_warning_all where id = ${message.author.id} AND state = '경고 2회'`, function (err, result, fields) {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          message.author.send({
            embed: {
              description: `경고 2회 지급일 : ${result[i].give_month}월 ${result[i].give_date}일\n경고 2회 만료일 : ${result[i].fin_month}월 ${result[i].fin_date}일\n사유 : ${result[i].reason}`,
              color: 0xff3c00,
              footer: {
                text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
              }
            }
          })
        }
      })
      client.channels.get(`777353746425446463`)
        .send({
          embed: {
            title: `[ 조회 명령어 이용 ]`,
            description: `명령어 이용자 : <@${message.author.id}>\n아이디 : ${message.author.id}`,
            color: 0xff3c00
          }
        });
    }
  }
}