module.exports = {
    name: "재시작",
    description: "Reboot FPP_CITY",
    run: async (client, message, args) => {
        if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
        return message.channel.send("[ 오류 ] 사유 > **권한이 부족합니다.**");
        message.delete();
        client.user.setActivity('봇 재시작  ');
        message.channel.send({embed: {
          title: "[ FPP CITY 재시작 ]",
          description: `${message.author}님의 명령으로 재시작하겠습니다!`,
          color: 0x00ff26
        }})
        .then(() => { process.exit(1);
      })
    }
}