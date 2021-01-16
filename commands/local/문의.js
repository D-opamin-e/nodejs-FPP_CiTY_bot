module.exports = {
    name: "문의",
    description: "Reboot FPP_CITY",
    run: async (client, message, args) => {
        message.delete();
        let rreason = args.join(' ');
        if(!rreason) return message.author.send(`[ FPP CITY ] | 문의 \n${message.author}님 내용을 작성해주세요.`)
        client.channels.get("585760946526486530")
        .send({embed: {
          title: "[ FPP CITY 문의 ]",
          description: `닉네임: ${message.author}\n아이디: ${message.author.id}\n\n문의 내용: ${rreason}`,
          color: 0x00ff26,
          timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "?답변 @대상 내용 을 입력하셔서 답변을 해주세요!"
        }
        }})
        .then(function (message) {
          message.react('🆗')
          message.react('❌')}); 
        client.channels.get("675920205616119875")
        .send({embed: {
          title: "문의 명령어 로그",
          description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}`,
          color: 0x00ff26,
          timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
        }
        }})
    }
}