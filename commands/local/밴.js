module.exports = {
    name: "영구추방",
    description: "Reboot FPP_CITY",
    run: async (client, message, args) => {
            message.delete();
            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!rUser) return message.author.send({ embed: {
              title : `[FPP CITY 밴 실패]`,
              description: `영구추방 대상을 서버에서 찾을 수 없습니다.`,
                      color: 0xff3c00
            }});
            if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
            return message.author.send({ embed: {
              title : `[FPP CITY 밴 실패]`,
              description: `명령어 이용자의 권한이 부족합니다.`,
                    color: 0xff3c00
            }});
                let member = message.mentions.members.first();
                if(!member)
                return message.author.send({ embed: {
                  title : `[FPP CITY 밴 실패]`,
                  description: `추방 대상자를 지정해주세요!`,
                        color: 0xff3c00
                }}); 
                if(!member.bannable)
                return message.author.send({ embed: {
                  title : `[FPP CITY 밴 실패]`,
                  description: `봇에 관리자 권한이 지급되어있는지 확인 부탁드립니다!`,
                        color: 0xff3c00
                }});   
                let reason = args.slice(1).join(' ');
                if(!reason)
                return message.author.send({ embed: {
                  title : `[FPP CITY 밴 실패]`,
                  description: `밴 대상자의 사유를 작성해주세요!`,
                        color: 0xff3c00
                }});
                  client.users.get(`${member.id}`).send({embed: {
                    title: "[ FPP CITY 밴 ]",
                    description: `<@${member.id}>님께서는 FPP CITY에서 밴을 당하셨습니다.\n추가 관련된 문의는 [https://dopamine.gq/FPP/SQ/index.php](https://dopamine.gq/FPP/SQ/index.php)에서 부탁드립니다.\n\n계정 ID : ${member.id}\n사유 : ${reason}`,
                    color: 0xff3c00,
                    timestamp: new Date(),  
                  footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                  }
                  }})
                  .then(message => member.ban(reason))
                   client.channels.get("441099080194588682")
                   .send({ embed: {
                    title : `[FPP CITY 밴 성공]`,
                    description: `닉네임 : ${rUser.displayName}\n밴 대상 : ${rUser}\n밴 대상 ID : ${rUser.id}\n\n사유 : ${reason}`,
                          color: 0xff3c00
                  }});
                client.channels.get("675920528006971403")
                .send({embed: {
                  title: "영구추방 명령어 로그",
                  description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}\n\n밴 대상자 : ${rUser}\n밴 대상자 ID  : ${rUser.id}\n\n사유 : ${reason}`,
                  color: 0xff3c00,
                  timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                }
                }})
    }
}