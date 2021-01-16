module.exports = {
    name: "답변",
    description: "Reboot FPP_CITY",
    run: async (client, message, args) => {
       
    message.delete();
    if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
    return message.channel.send({embed: {
      title: `[오류]`,
      description: `${message.author}님은 이용 권한이 없습니다.`,
     color: 0xff3c00
    }});
    let member = message.mentions.members.first() || message.member
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if(!rUser)
     return message.author.send({ 
      embed: {
      title : `[FPP CITY 전송 실패]`,
      description: `대상을 서버에서 찾을 수 없습니다.`,
              color: 0xff3c00
    }})
    let rreason = args.join(" ").slice(22);
    if(!rreason) return errors.noReason(message.channel);
    client.users.get(rUser.id).send({embed: {
      title: "[ FPP CITY 문의 답변 ]",
      description: `${rreason}`,
      color: 0xFFFF66,
      timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
    }
    }})
    }
}