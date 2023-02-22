var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "비번",
    database: "sunam_test",
});
const fs = require('fs');
const request = require('request');
const moment = require("moment");
  require("moment-duration-format");
  const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
      request(url)
        .pipe(fs.createWriteStream(path))
        .on('close', callback)
    })
  }
  var sdpath = `D:\\inetpub\\dopamine.gq\\FPP\\file\\streamer\\`
module.exports = {
    name: "스트리머",
    description: "Reboot FPP_CITY",
    run: async (client, message, args) => {
        var daay = `${moment(message.createdAt).lang("ko").format('YYYY년 MMMM Do dddd HH시mm분ss초')}` //파일 저장 관련
              if(!fs.existsSync(`${sdpath}./${message.author.id}`)) {
                fs.mkdir(`${sdpath}./${message.author.id}`, 0666, function(err){
                    if(err) throw err;
                    console.log(`D드라이브 생성 완료`);
                  }) 
                }
            var Attachment = (message.attachments).array();
            const url = `${Attachment[0].url}`
            const savefile = `${daay} - ${Attachment[0].filename}`
            const randoom = `${Math.random().toString(36).substr(2,11)}`
            var ddpath = `D:\\inetpub\\dopamine.gq\\FPP\\file\\streamer\\${message.author.id}\\${randoom}${Attachment[0].filename}`
            download(url, ddpath, () => {
              console.log('D 드라이브 저장 완료')
            })
            setTimeout(function() {
              message.delete();
            }, 500)
            var log = "INSERT INTO discord_file_data (state, id, filename, time, fullname) VALUES ?";
            var values = [
              [`[ 스트리머 신청 ]`,`${message.author.id}`, `${Attachment[0].filename}`, `${daay}`, `${randoom}${Attachment[0].filename}`]
            ];
            connection.query(log, [values], function (err, result) {
              })

              client.channels.get(`585760946526486530`)
              .send({embed: {
                title: "[ FPP CITY 스트리머 신청 ]",
                description: `닉네임: ${message.author}\n아이디: ${message.author.id}\n신청일: ${daay}\n자료: https://dopamine.gq/FPP/file/streamer/${message.author.id}/${randoom}${Attachment[0].filename} `,
                color: 0xd604cf,
                timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                         }
                      }})
              .then(function (message) {
                message.react('🆗')
                message.react('❌')});
              message.author.send({embed: {
                title: "[FPP CITY 스트리머 신청]",
                description: `스트리머 역할 신청을 정상적으로 마쳤습니다\n확인 후, 지급까지 시간이 다소 걸릴 수 있는점 양해 부탁드립니다.\n\n※ 스트리머 역할 지급이 늦더라도 기다려주시고, 명령어 중복 이용 자재 부탁드립니다.\n\n첨부하신 파일 : https://dopamine.gq/FPP/file/streamer/${message.author.id}/${randoom}${Attachment[0].filename}`,
                color: 0xd604cf,
                timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
              }
              }})     
    }
}
