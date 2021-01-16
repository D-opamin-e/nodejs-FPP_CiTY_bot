var cheerio_http = require('cheerio-httpcli')
var date = new Date();
module.exports = {
    name: "매크로시작",
    description: "Reboot FPP_CITY",
    run: async (client, message, args) => {
            if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
            return message.channel.send("[ 오류 ] 사유 > **권한이 부족합니다.**");
            var cmmd = require('node-cmd')
            message.channel.send({embed: {
              title: `[FPP CITY 매크로 기능]`,
              description:`${message.author}님의 명령으로 매크로 기능을 시작하겠습니다!\n매크로를 등록하려면 ?등록 내용을 입력해주세요!`,
              color: 0xff3c00
            }})
            .then(() => {  cmmd.get(
              'macro_start.exe',
            );
            })
    }
}