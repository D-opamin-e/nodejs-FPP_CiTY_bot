var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dopamine2312@@",
    database: "sunam_test",
});
var date = new Date();
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
    name: "경고삭감",
    description: "Returns latency and API ping",
    run: async (client, message, args, Discord) => {
        message.delete();
        if (!message.member.roles.some(r => ["Manager ▲", "예비 매니저", "-"].includes(r.name)))
            return message.reply("[ 오류 ] 사유 > **권한이 부족합니다.**");
        let rUser = message.mentions.members.first()
        if (!rUser) return message.author.send({
            embed: {
                title: `[FPP CITY 경고 삭감 실패]`,
                description: `삭감 대상을 서버에서 찾을 수 없습니다.`,
                color: 0xff3c00
            }
        });
        let rreason = args.join(" ").slice(22);
        if (!rreason) return message.channel.send(`${message.author}님 사유를 작성해주세요.`)
        if (rUser.roles.some(r => ["경고 2회"].includes(r.name))) {
            var role1 = (message.guild.roles.find(role => role.name === "경고  1회"));
            var role2 = (message.guild.roles.find(role => role.name === "경고 2회"));
            rUser.addRole(role1).catch(console.error);
            rUser.removeRole(role2).catch(console.error);
            client.channels.get("441099080194588682")
            .send({
              embed: {
                title: "[ 경고 역할 삭감 ]",
                description: `**삭감 대상자**\n닉네임: ${rUser} | 아이디: ||${rUser.id}||\n\n**삭감 역할**: 경고 2회 -> 경고 1회\n\n**사유** : ${rreason}`,
                color: 0x00FF26,
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                }
              }
            })
            client.channels.get("675920185487786004")
                .send({
                    embed: {
                        title: "경고삭감2 명령어 로그",
                        description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}`,
                        color: 0x00FF26,
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                        }
                    }
                })
            connection.query(`DELETE FROM discord_warning_2 WHERE id="${rUser.id}"`, function (err, result, fields) { //삭제 시작
                if (err) throw err;
            })
            connection.query(`DELETE FROM discord_warning_all WHERE id="${rUser.id}"`, function (err, result, fields) { //삭제 시작
                if (err) throw err;
            })
        } else {
            var role = (message.guild.roles.find(role => role.name === "경고  1회"));
            rUser.removeRole(role).catch(console.error);
            client.channels.get("441099080194588682")
            .send({
              embed: {
                title: "[ 경고 역할 삭감 ]",
                description: `**삭감 대상자**\n닉네임: ${rUser} | 아이디: ||${rUser.id}||\n\n**삭감 역할**: 경고 1회\n\n**사유** : ${rreason}`,
                color: 0x00FF26,
                timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                }
              }
            })
            client.channels.get("675920185487786004")
                .send({
                    embed: {
                        title: "경고삭감 명령어 로그",
                        description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}`,
                        color: 0x00FF26,
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                        }
                    }
                })
            connection.query(`DELETE FROM discord_warning WHERE id="${rUser.id}"`, function (err, result, fields) { //삭제 시작
                if (err) throw err;
            })
            connection.query(`DELETE FROM discord_warning_all WHERE id="${rUser.id}"`, function (err, result, fields) { //삭제 시작
                if (err) throw err;
            })
        }
    }
}

