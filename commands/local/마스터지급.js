var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dopamine2312@@",
    database: "sunam_test",
});
module.exports = {
    name: "마스터지급",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        message.delete();
        let member = message.mentions.members.first()
        if (!member) return message.author.send({
            embed: {
                title: `[FPP CITY 마스터 지급 실패]`,
                description: `지급 대상을 서버에서 찾을 수 없습니다.`,
                color: 0xff3c00
            }
        });
        if (!message.member.roles.some(r => ["Manager ▲", "예비 매니저", "-"].includes(r.name)))
            return message.channel.send("[ 오류 ] 사유 > **권한이 부족합니다.**");
        let rreason = args.join(" ").slice(22);
        if (!rreason) return message.author.send(`[ FPP CITY ] | 마스터 지급 실패 \n${message.author}님 링크를 입력해주세요.\n양식 : "?마스터지급 @대상 링크"`)
        let role = message.guild.roles.find(r => r.name === "Master");
        member.addRole(role).catch(console.error);
        client.users.get(`${member.id}`).send({ //마스터승인 DM 전송
            embed: {
                title: "[ FPP CITY ]",
                description: `마스터 지급이 완료되었습니다.\n마스터 달성을 진심으로 축하드리며, 좋은 하루 보내세요!`,
                color: 0xFFFF66,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                }
            }
        })
        client.channels.get("447330180361486336") //인벤토리
            .send({
                embed: {
                    title: "[ 마스터지급 ]",
                    description: `삭감 대상자\n닉네임: ${member} | 아이디: ||${member.id}||\n\n링크 : ${rreason}`,
                    color: 0xFFFF66,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                    }
                }
            })
        client.channels.get("764841420296028191") //discord_log 기록
            .send({
                embed: {
                    title: "마스터 지급 명령어 로그",
                    description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}\n\n지급 대상자 : ${member}\n지급 대상자 ID  : ${member.id}\n\n링크 : ${rreason}`,
                    color: 0xFFFF66,
                    timestamp: new Date(),
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                    }
                }
            })
    }
}

