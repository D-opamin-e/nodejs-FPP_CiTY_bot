const botconfig = require("./botconfig.json");
const Discord = require('discord.js');
const schedule = require('node-schedule');
const client = new Discord.Client();
const fs = require('fs');
const bot = new Discord.Client({disableEveryone: true});
const screenshot = require('screenshot-desktop');
const captureWebsite = require('capture-website');
require('date-utils');
const moment = require("moment");
  require("moment-duration-format");
  const duration = moment.duration(client.uptime).format(" D [일] H [시] m [분] s [초]");
const red = botconfig.red;
const green = botconfig.green;
const orange = botconfig.orange;
const cyan = botconfig.cyan;
var os = require(`os-utils`);
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : "localhost",
  port : 3306,
  user : "root",
  password : "dopamine2312@@",
  database : "sunam_test",
});

client.on('ready', () => {

  client.user.setActivity('24시간 로그 감시중(?도움말)');
  console.log(`FPP City 매크로가 활성화 되었습니다.` + new Date());
    
    // var nightreboot = schedule.scheduleJob('00 00 08 * * *', function(){
    //   console.log(`매크로 작동 변경 시간`)
    //     client.user.setActivity('밤 매크로 -> 낮 매크로');
    //    process.exit(1);
    //   })

    //   var day = schedule.scheduleJob('10 00 08 * * *', function(){   // 10 00 08
    //   var interval = setInterval (function () {
    //     connection.query("SELECT * FROM discord_macro ORDER BY idx DESC", function (err, result, fields) {
    //       if (err) throw err;
    //       for(var f = 0; f < result.length; f++) {
    //     console.log(`매크로 |||` + new Date());
    //     client.channels.get("520152509504028682")
    //     .send({embed: {
    //     title : `[FPP CITY x Jayworks] `,
    //     description: `${result[f].macroo}`,
    //       color: 0xff3c00
    //     }})
    //   }
    // })
    //   }, (60 * 60 * 1) * 1000);
    //     })

    //     var dayreboot = schedule.scheduleJob('00 00 20 * * *', function(){
    //       console.log(`매크로 작동 변경시간`)
    //         client.user.setActivity('낮 매크로 -> 밤 매크로');
    //        process.exit(1);
    //       })

    //     var night = schedule.scheduleJob('10 00 20 * * *', function(){
    //       var interval = setInterval (function () {
    //         connection.query("SELECT * FROM discord_macro ORDER BY idx DESC", function (err, result, fields) {
    //           if (err) throw err;
    //           for(var f = 0; f < result.length; f++) {
    //         console.log(`매크로 |||` + new Date());
    //         client.channels.get("520152509504028682")
    //         .send({embed: {
    //         title : `[FPP CITY x Jayworks] `,
    //         description: `${result[f].macroo}`,
    //           color: 0xff3c00
    //         }})
    //       }
    //     })
    //       }, (60 * 60 * 2) * 1000);
    //         })

    //2시간 간격
          var interval = setInterval (function () {
            connection.query("SELECT * FROM discord_macro ORDER BY idx DESC", function (err, result, fields) {
              if (err) throw err;
              for(var f = 0; f < result.length; f++) {
            console.log(`매크로 |||` + new Date());
            client.channels.get("520152509504028682")
            .send({embed: {
            title : `[FPP CITY x Jayworks] `,
            description: `${result[f].macroo}`,
              color: 0xff3c00
            }})
          }
        })
          }, (60 * 60 * 2) * 1000);
});

client.on('message', message => {
  var p = "!";
  const args = message.content.slice(p.length).trim().split(/ +/gi);
  const command = args.shift().toLowerCase();
  var msg = message.channel;
  var aut = message.author;
  var fs = require('fs');
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];


  if (!message.content.startsWith(p)) return;
  if (command === "재시작") {
    if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
    return message.channel.send("[ 오류 ] 사유 > **권한이 부족합니다.**");
    client.user.setActivity('매크로 기능 재시작  ');
    const embed = new Discord.RichEmbed()
    .setDescription(`[ FPP CITY 매크로 ]\n\n${message.author}님의 명령으로 봇을 재시작하겠습니다!`)
    message.channel.send(embed)
    .then(() => { process.exit(1);
  })
  // client.channels.get("520152509504028682")
  // .send({embed: {
  // title : `[FPP CITY x Jayworks] `,
  // description: "FPP CITY 6월 이벤트\n-ROCCAT KONE PURE ULTRA i 게이밍 마우스 찜하기 이벤트-\n이벤트 기간 : 6월 19일 ~ 6월 30일\n자세한 정보는 <#588698124558794772>  에서 확인해주세요",
  //   color: 0xff3c00
  // }})
  }

  if (command === "불러오기"){
    message.delete();
    console.log('test')
    connection.query("SELECT * FROM discord_macro ORDER BY idx DESC", function (err, result, fields) {
      if (err) throw err;
      for(var f = 0; f < result.length; f++) {
        message.channel.send({embed: {
          title: `[FPP CITY x Jayworks]`,
          description:`${result[f].macroo}`,
          color: 0xff3c00
        }})
      }
    })
  }

  if(command === "업타임"){ 
    const moment = require("moment");
    require("moment-duration-format");
    const duration = moment.duration(client.uptime).format(" D [일] H [시] m [분] s [초]");
    os.cpuUsage(function(v){
        message.channel.send({embed: {
          title: `FPP_macro.js의 CPU 사용률과 업타임을 불러오는 중입니다..`,
          color: 0x27D2EB
        }})
      .then((msg) => { 
        msg.edit({embed: {
          title: `실시간 서버 모니터링`,
          description : `FPP_macro.js 업타임 : ${duration}\n[Windows Admin Center](https://119.195.87.53:2266)`,
          color: 0x35D6BB
        }})
      })
  })
  }

  if (command === "재시작") {
    if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
    return message.channel.send("[ 오류 ] 사유 > **권한이 부족합니다.**");
    message.delete();
    client.user.setActivity('봇 재시작  ');
    const embed = new Discord.RichEmbed()
    .setDescription(`${message.author}님의 명령으로 봇을 재시작하겠습니다!`)
    message.channel.send(embed)
    .then(() => { process.exit(1);
  })
  }
  
  if (command === "매크로종료") {
    if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
    return message.channel.send("[ 오류 ] 사유 > **권한이 부족합니다.**");
    client.user.setActivity('24시간 로그 감시중(?도움말)');
    const embed = new Discord.RichEmbed()
    .setDescription(`[ FPP CITY 매크로 ]\n\n${message.author}님의 명령으로 매크로 기능을 종료하였습니다!`)
    message.channel.send(embed)
    .then(() => {         require('child_process').exec("macro_stop.exe", function (err, stdout, stderr) {
      if (err) {
          return console.log(err);
      }
      console.log(stdout);
  });
  })
  }

})

client.login("NzI2NDA5MTAxMTcyNTM5NDMz.Xvc3MQ.0oZO81SQQSevLFkeRd9OZaZ4Hyk");



  