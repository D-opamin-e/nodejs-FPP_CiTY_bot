/*
Copyright 2018~.Dopamine.All rights reserved
 Ｃｏｐｙｒｉｇｈｔ  ２０１８~．Ｄｏｐａｍｉｎｅ．Ａｌｌ ｒｉｇｈｔｓ ｒｅｓｅｒｖｅｄ．
 Dopamine#6657에게 모든 저작권이 존재하며 아래 하단의 소스들을 무단으로 수정 및 이용, 공유를 할 경우
 법적 처벌을 받으실 수 있습니다.
*/
botconfig = require("./botconfig.json");
const Discord = require('discord.js');
const schedule = require('node-schedule');
const client = new Discord.Client();
const fs = require('fs');
const request = require('request');
const bot = new Discord.Client({disableEveryone: true});
require('date-utils');
const moment = require("moment");
  require("moment-duration-format");
  const duration = moment.duration(client.uptime).format(" D [일] H [시] m [분] s [초]");
const red = botconfig.red;
const green = botconfig.green;
const purple = botconfig.purple;
const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url)
      .pipe(fs.createWriteStream(path))
      .on('close', callback)
  })
}
var cheerio_http = require('cheerio-httpcli')
var mysql = require('mysql');
const usersMap = new Map();
/* 
'id' => {
  messageCount: 0,
  LastMessage: 'message',
  timer: fn()
}
*/
var connection = mysql.createConnection({
  host : "localhost",
  port : 3306,
  user : "root",
  password : "dopamine2312@@",
  database : "sunam_test",
});
var date = new Date();
function getFormatDate(date){
  var year = date.getFullYear();
  var month = (1 + date.getMonth());
  month = month >= 10 ? month : '0' + month;
  var day = date.getDate();
  day = day >= 10 ? day : '0' + day;
  var hour = date.getHours();
  var minutes = date.getMinutes();
  return  year + "년 " + month + "월 " + day + "일 " + hour + "시 " + minutes + "분";
};

client.on("guildMemberAdd", (member) => {
  let displayname = member.displayName;
  var log = "INSERT INTO discord_new_log (id,nname, day) VALUES ?";
  var values = [
    [`${member.id}`, `${displayname}`, `${date.getDate()}`]
  ];

  connection.query(log, [values], function (err, result) {
  })

  connection.query(`SELECT * FROM discord_new_log WHERE nname LIKE '%᲼%' ORDER BY idx`, function (err, result, fields) {
    if (err) throw err;
    for(var f = 0; f < result.length; f++) {
      let meember = `${result[f].id}`;
    client.users.get("633260404973371420")
       .send({ embed: {
        title : `[ 투명 닉네임 ]`,
        description: `닉네임 : <@${meember}>\nid : ${meember}`,
              color: 0xff3c00
      }}).then(function (message) {
        message.react('🆗')
        message.react('❌')});
  }
})
connection.query("DELETE FROM `sunam_test`.`discord_new_log`", function (err, result, fields) {
})

  connection.query(`SELECT * FROM discord_black_list WHERE ID=${member.id} ORDER BY idx`, function (err, result, fields) {
    if (err) throw err;
    for(var f = 0; f < result.length; f++) {
      let meember = `${result[f].id}`;
      var member = client.guilds.get("370594167770054663").members.get(`${meember}`);
      let role = client.guilds.get("370594167770054663").roles.find(r => r.name === "Muted");
      member.addRole(role).then((member) => {
        client.channels.get(`719927731076202597`)
        .send({ embed: {
          title : `[ 비매너 유저 재가입 | FPP CITY Muted 오토 지급 ]`,
          description: `지급 대상자 : <@${meember}>\n아이디 : ${meember}`,
                color: 0xff3c00
        }});
        client.channels.get(`441099080194588682`)
        .send({ embed: {
          title : `[ 비매너 유저 재가입 | FPP CITY Muted 오토 지급 ]`,
          description: `지급 대상자 : <@${meember}>\n아이디 : ${meember}`,
                color: 0xff3c00
        }});
          })
      }
    })  

    connection.query(`SELECT * FROM discord_warning WHERE ID=${member.id} ORDER BY idx`, function (err, result, fields) {
      if (err) throw err;
      for(var f = 0; f < result.length; f++) {
        let meember = `${result[f].id}`;
        let findate = `${result[f].fin_date}`;
        var member = client.guilds.get("370594167770054663").members.get(`${meember}`);
        let role = client.guilds.get("370594167770054663").roles.find(r => r.name === "경고  1회");
        member.addRole(role).then((member) => {
          client.channels.get(`719927731076202597`)
          .send({ embed: {
            title : `[ 경고 1회 유저 재가입 | 오토 지급 ]`,
            description: `지급 대상자 : <@${meember}>\n아이디 : ${meember}\n경고 만료일 : ${findate}`,
                  color: 0xff3c00
          }});
          client.channels.get(`441099080194588682`)
          .send({ embed: {
            title : `[ 경고 1회 유저 재가입 | 오토 지급 ]`,
            description: `지급 대상자 : <@${meember}>\n아이디 : ${meember}\n경고 만료일 : ${findate}`,
                  color: 0xff3c00
          }});
            })
        }
      })  

      connection.query(`SELECT * FROM discord_warning_2 WHERE ID=${member.id} ORDER BY idx`, function (err, result, fields) {
        if (err) throw err;
        for(var f = 0; f < result.length; f++) {
          let meember = `${result[f].id}`;
        let findate = `${result[f].fin_date}`;
          var member = client.guilds.get("370594167770054663").members.get(`${meember}`);
          let role = client.guilds.get("370594167770054663").roles.find(r => r.name === "경고 2회");
          member.addRole(role).then((member) => {
            client.channels.get(`719927731076202597`)
            .send({ embed: {
              title : `[ 경고 2회 유저 재가입 | 오토 지급 ]`,
              description: `지급 대상자 : <@${meember}>\n아이디 : ${meember}\n경고 만료일 : ${findate}`,
                    color: 0xff3c00
            }});
            client.channels.get(`441099080194588682`)
            .send({ embed: {
              title : `[ 경고 2회 유저 재가입 | 오토 지급 ]`,
              description: `지급 대상자 : <@${meember}>\n아이디 : ${meember}\n경고 만료일 : ${findate}`,
                    color: 0xff3c00
            }});
              })
          }
        }) 
});

client.on("guildMemberRemove", member => {
  connection.query(`DELETE FROM discord_warning_all WHERE id="${member.id}"`, function (err, result, fields) { //삭제 시작
    if (err) throw err;
});
})

client.on("guildMemberUpdate", function(oldMember, newMember){
  let newname = newMember.displayName;
  let oldname = oldMember.displayName;

  var log = "INSERT INTO discord_name_log (id,oldname,newname, day) VALUES ?";
  var values = [
    [`${oldMember.id}`, `${oldname}`, `${newname}`, `${date.getDate()}`]
  ];

  connection.query(log, [values], function (err, result) {
  })
  connection.query(`SELECT * FROM discord_name_log WHERE newname LIKE '%᲼%' ORDER BY idx`, function (err, result, fields) {
    if (err) throw err;
    for(var f = 0; f < result.length; f++) {
      let dbid = `${result[f].id}`;
      let dboldname = `${result[f].oldname}`;
      let dbnewname = `${result[f].newname}`;

    client.channels.get("633260404973371420")
       .send({ embed: {
        title : `[ 투명 닉네임 유저 ]`,
        description: `언급 : <@${dbid}>\nID : ${dbid}\n기존 닉네임 : ${dboldname}\n변경 닉네임 : ${dbnewname}`,
              color: 0xff3c00
      }}).then(function (message) {
        message.react('🆗')
        message.react('❌')});
  }
})
connection.query("DELETE FROM `sunam_test`.`discord_name_log`", function (err, result, fields) {
})

});

client.on('ready', () => {

  console.log(`FPP City 활성화 되었습니다.` + new Date());
  console.log(`※ Copyright 2018~.Dopamine.All rights reserved. ※`);
  client.user.setActivity('24시간 로그 감시중(?도움말)');

  setInterval(() => {
    client.user.setActivity('문의 >> #bot-order');
    setTimeout(function() {
      client.user.setActivity('신고 >> #bot-order');
    }, 5000)
    setTimeout(function() {
      client.user.setActivity('마스터신청 >> #bot-order');
    }, 10000)
    }, 15000);

  
  var reboot = schedule.scheduleJob('01 00 00 * * *', function(){
    console.log(`봇 자동 재시작`)
      client.user.setActivity('자동 재시작');
     process.exit(1);
    })
    
  var warning = schedule.scheduleJob('50 00 00 * * *', function(){  // 50 00 00 
    var tooday = (1 + date.getMonth() + '/' + date.getDate());
    connection.query(`SELECT * FROM discord_warning_all WHERE fin_day="${tooday}"`, function (err, result, fields) {
      if (err) throw err;
      for(var f = 0; f < result.length; f++) {
        let rname = `${result[f].state}`
        let meember = `${result[f].id}`;
        var membeer = client.guilds.get("370594167770054663").members.get(`${meember}`); 
        let role = client.guilds.get("370594167770054663").roles.find(r => r.name === `${rname}`);
        membeer.removeRole(role).then(() => {
          client.channels.get(`441099080194588682`)
          .send({ embed: {
            title : `[ 경고 역할 자동 삭감 ]`,
            description: `삭감 대상자 : <@${meember}>\n아이디 : ||${meember}||\n삭감 역할 : ${rname}`,
                  color: 0x48FF00
          }});
            })
       }
    })
    connection.query(`DELETE FROM discord_warning_all WHERE fin_day="${tooday}"`, function (err, result, fields) { //삭제 시작
      if (err) throw err;
  });
});
  
});
client.on('voiceStateUpdate', (oldMember, newMember) => {

  let VCID = newMember.voiceChannelID;
  let newname = oldMember.displayName;
  let oldVCID = oldMember.voiceChannelID;
  let oldname = oldMember.displayName;
  let oldChannelName = (oldVCID != null && typeof oldVCID != undefined) ? client.channels.get(oldVCID).name : null;
  let inputchannel = (VCID != null && typeof VCID != undefined) ? client.channels.get(VCID).name : null;
  
  if(oldMember.voiceChannel === undefined && newMember.voiceChannel != undefined) {
    client.channels.get("741636935818149909")
      .send({embed: {
        title: "보이스 채널 접속",
        description: `접속자 : <@${oldMember.id}>\n접속자 ID : ${oldMember.id}\n보이스 채널 명 : ${inputchannel}`,
        color: 0xFFFF66,
        timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
      }
      }})

      var log = "INSERT INTO discord_voice_log (state, id, room, name, day) VALUES ?";
      var values = [
        [`입장`,`${oldMember.id}`, `${inputchannel}`, `${oldname}`, `${date.getDate()}`]
      ];
      connection.query(log, [values], function (err, result) {
        })

        if(oldMember.id === "234395307759108106"){
          connection.query(`SELECT * FROM discord_voice_log WHERE id="234395307759108106" AND room LIKE '%RANK%'`, function (err, result, fields) {
            if (err) throw err;
            for(var i = 0; i < result.length; i++) {
                client.channels.get("633260404973371420")
                .send({embed: {
                  title: "Groovy 게임 채널 접속 로그",  
                  description: `보이스 채널 명 : ${result[i].room}`,
                  color: 0xFFFF66,
                  timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                }
                }})
            }
          })
        }

} else if(newMember.voiceChannel === undefined && oldMember.voiceChannel != undefined){
  client.channels.get("741636935818149909")
  .send({embed: {
    title: "보이스 채널 퇴장",
    description: `퇴장자 : <@${newMember.id}>\n접속자 ID : ${oldMember.id}\n보이스 채널 명 : ${oldChannelName}`,
    color: 0xFFFF66,
    timestamp: new Date(),
  footer: {
    icon_url: client.user.avatarURL,
    text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
  }
  }})
  var log = "INSERT INTO discord_voice_log (state, id, room, name, day) VALUES ?";
  var values = [
    [`퇴장`,`${newMember.id}`, `${oldChannelName}`, `${newname}`, `${date.getDate()}`]
  ];

  connection.query(log, [values], function (err, result) {
    })
    connection.query(`DELETE FROM discord_voice_log WHERE id="234395307759108106"`, function (err, result, fields) { //삭제 시작
      if (err) throw err;
  });
}
});

client.on('message', message => {
  var p = "?";
  var daay = `${moment(message.createdAt).lang("ko").format('YYYY년 MMMM Do dddd HH시mm분ss초')}` //파일 저장 관련
  var path = `C:\\Users\\Administrator\\Desktop\\FPP\\file\\Master\\`
  var dpath = `D:\\inetpub\\dopamine.gq\\FPP\\file\\Master\\`
  var spath = `C:\\Users\\Administrator\\Desktop\\FPP\\file\\streamer\\`
  var sdpath = `D:\\inetpub\\dopamine.gq\\FPP\\file\\streamer\\`
  var rpath = `C:\\Users\\Administrator\\Desktop\\FPP\\file\\report\\`
  var drpath = `D:\\inetpub\\dopamine.gq\\FPP\\file\\report\\` //파일 저장 끝
  const args = message.content.slice(p.length).trim().split(/ +/gi);
  const command = args.shift().toLowerCase();
  var give_month = (date.getMonth() + 1);
  var give_date = (date.getMonth() + 1 + '/' + date.getDate());
  var fin_date_month = (date.getMonth() + 4);
  if(fin_date_month=='13'){
    var fin_date_month = "1"
  }else if(fin_date_month=='14'){
      var fin_date_month = "2"
    }else if(fin_date_month=='15'){
      var fin_date_month = "3"
    }
  var fin_date = (fin_date_month + '/' + date.getDate());
  var fs = require('fs');
  if(message.author.bot) return;
  if(message.channel.type === "dm"){
   message.author.send({ embed: {
        title : `[ FPP CITY ]`,
        description: `개인 DM으로는 이용이 불가합니다.\n<#585760084416659466> 채널에서 양식에 맞게 명령어 이용 부탁드립니다.`,
                color: 0xff3c00,
                footer: {
                  icon_url: client.user.avatarURL,
                  text: `Copyright 2018~.Dopamine.All rights reserved.`
                }
             }}); return;
    }

    if (message.content) { // 욕설 필터링 시작
      let messege = message.content.toString();
      var abuse = fs.readFileSync(__dirname+"/abuse.json");
      abuse = JSON.parse(abuse);
      var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"1234567890]/gi
      if(regExp.test(messege)){ //필터링 시작
       var t = messege.replace(regExp, "")
       for (i of abuse) {
        if (t.indexOf(i) != -1) {  
          if (message.channel.id == "424791216736174081")     return; //team-hunting 채널
          if (message.channel.id == "585760084416659466")     return; //bot-order 채널
          if (message.channel.id == "399642680810012672")     return; //music-bot 채널
          if (message.channel.id == "447330180361486336")     return; //inventory 채널
          if (message.author.id == "370542993457020940")      return; //ExyV
          if (message.author.id == "629595118399389696")      return; //울브
          if (message.author.id == "610826604960022569")      return; //울브님 본계
          if (message.author.id == "382786660301012992")      return; //DK
          if (message.author.id == "365422093443137537")      return; //에이치지니       
            message.delete();
            client.channels.get("617739758780809283")
            .send({embed: {
              title: "[ 욕설 필터링 ]",
              description: `욕설자 : ${message.author}\n욕설 단어 : [||${i}||]\n문장  : [||${messege}||]\n\n채널 : ${message.channel}`,
              color: 0xff3c00,
              timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                    }
                  }})
                message.author.send({ embed: {
                  title : `[ FPP CITY ]`,
                  description: `욕설이 감지되어 필터링이 작동하였습니다!\n\n필터링 단어 : [||${i}||]\n문장  : [||${messege}||]`,
                          color: 0xff3c00,
                          footer: {
                            icon_url: client.user.avatarURL,
                            text: `Copyright 2018~.Dopamine.All rights reserved.`
                          }
                       }});
                  client.channels.get("683863232540442650")
                  .send({embed: {
                    title: "욕설 로그",
                    description: `욕설자 : ${message.author}\n욕설 단어 : [||${i}||]\n문장  : [||${messege}}||]\n\n채널 : ${message.channel}`,
                    color: 0xff3c00,
                    timestamp: new Date(),
                  footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                     }
                  }})
              }
          }
      if(usersMap.has(message.author.id)) {   //Muted 지급 코드
        const userData = usersMap.get(message.author.id);
        let messageCount = userData.messageCount;
        ++messageCount;
        if(parseInt(messageCount) === 2) {
      for (i of abuse) {
          if (t.indexOf(i) != -1) {     
            if (message.channel.id == "424791216736174081")     return; //team-hunting 채널
            if (message.channel.id == "585760084416659466")     return; //bot-order 채널
            if (message.channel.id == "399642680810012672")     return; //music-bot 채널
            if (message.channel.id == "447330180361486336")     return; //inventory 채널
            if (message.author.id == "370542993457020940")      return; //ExyV
            if (message.author.id == "629595118399389696")      return; //울브
            if (message.author.id == "610826604960022569")      return; //울브님 본계
            if (message.author.id == "382786660301012992")      return; //DK
            if (message.author.id == "365422093443137537")      return; //에이치지니
              let role = message.guild.roles.find(r => r.name === "Muted");
              message.member.addRole(role);
              message.channel.send({ embed: {
                title : `[ FPP CITY ]`,
                description: `<@${message.author.id}>님께서 지속적인 욕설이 감지되어 자동으로 뮤트처리 되었습니다.`,
                        color: 0xff3c00,
                        footer: {
                          icon_url: client.user.avatarURL,
                          text: `Copyright 2018~.Dopamine.All rights reserved.`
                        }
                     }});
                     var log = "INSERT INTO discord_black_list (id) VALUES ?";
                     var values = [
                       [`${message.author.id}`]
                     ];
                     connection.query(log, [values], function (err, result) {
                       })
              setTimeout(function() {
                message.author.send({ embed: {
                  title : `[ FPP CITY ]`,
                  description: `지속적인 욕설이 감지되어 자동으로 뮤트처리 되었습니다.\n채팅 차단 해제 문의는 <#585760084416659466> 채널에서 "?문의 내용" 명령어를 이용해주세요.\n확인 후, 처리 도와드리겠습니다.`,
                          color: 0xff3c00,
                          footer: {
                            icon_url: client.user.avatarURL,
                            text: `Copyright 2018~.Dopamine.All rights reserved.`
                          }
                       }});
              }, 1500)
                }
            }
          } else {
            userData.messageCount = messageCount;
            usersMap.set(message.author.id, userData);
          }
        }
        else {
          usersMap.set(message.author.id, {
            messageCount: 1,
            lastMessage: message,
            timer: null
          });
          setTimeout(() => {
            usersMap.delete(message.author.id);
          }, 2000);
        }
         }else{ //또는 특수문자가 없으면
          for (i of abuse) {
            if (message.content.indexOf(i) != -1) {   
              if (message.channel.id == "424791216736174081")     return; //team-hunting 채널
              if (message.channel.id == "585760084416659466")     return; //bot-order 채널
              if (message.channel.id == "399642680810012672")     return; //music-bot 채널
              if (message.channel.id == "447330180361486336")     return; //inventory 채널
              if (message.author.id == "370542993457020940")      return; //ExyV
              if (message.author.id == "629595118399389696")      return; //울브
              if (message.author.id == "610826604960022569")      return; //울브님 본계
              if (message.author.id == "382786660301012992")      return; //DK
              if (message.author.id == "365422093443137537")      return; //에이치지니      
                message.delete();
                client.channels.get("617739758780809283")
                .send({embed: {
                  title: "[ 욕설 필터링 ]",
                  description: `욕설자 : ${message.author}\n욕설 단어 : [||${i}||]\n문장  : [||${messege}||]\n\n채널 : ${message.channel}`,
                  color: 0xff3c00,
                  timestamp: new Date(),
                footer: {
                  icon_url: client.user.avatarURL,
                  text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                        }
                      }})
                    message.author.send({ embed: {
                      title : `[ FPP CITY ]`,
                      description: `욕설이 감지되어 필터링이 작동하였습니다!\n\n필터링 단어 : [||${i}||]\n문장  : [||${messege}||]`,
                              color: 0xff3c00,
                              footer: {
                                icon_url: client.user.avatarURL,
                                text: `Copyright 2018~.Dopamine.All rights reserved.`
                              }
                           }});
                      client.channels.get("683863232540442650")
                      .send({embed: {
                        title: "욕설 로그",
                        description: `욕설자 : ${message.author}\n욕설 단어 : [||${i}||]\n문장  : [||${messege}||]\n\n채널 : ${message.channel}`,
                        color: 0xff3c00,
                        timestamp: new Date(),
                      footer: {
                        icon_url: client.user.avatarURL,
                        text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                         }
                      }})
                  }
              }
          if(usersMap.has(message.author.id)) {   //Muted 지급 코드
            const userData = usersMap.get(message.author.id);
            let messageCount = userData.messageCount;
            ++messageCount;
            if(parseInt(messageCount) === 2) {
          for (i of abuse) {
              if (message.content.indexOf(i) != -1) {
                if (message.channel.id == "424791216736174081")     return; //team-hunting 채널
                if (message.channel.id == "585760084416659466")     return; //bot-order 채널
                if (message.channel.id == "399642680810012672")     return; //music-bot 채널
                if (message.channel.id == "447330180361486336")     return; //inventory 채널
                if (message.author.id == "370542993457020940")      return; //ExyV
                if (message.author.id == "629595118399389696")      return; //울브
                if (message.author.id == "610826604960022569")      return; //울브님 본계
                if (message.author.id == "382786660301012992")      return; //DK
                if (message.author.id == "365422093443137537")      return; //에이치지니     
                  message.delete();
                  let role = message.guild.roles.find(r => r.name === "Muted");
                  message.member.addRole(role);
                  message.channel.send({ embed: {
                    title : `[ FPP CITY ]`,
                    description: `<@${message.author.id}>님께서 지속적인 욕설이 감지되어 자동으로 뮤트처리 되었습니다.`,
                            color: 0xff3c00,
                            footer: {
                              icon_url: client.user.avatarURL,
                              text: `Copyright 2018~.Dopamine.All rights reserved.`
                            }
                         }});
                         var log = "INSERT INTO discord_black_list (id) VALUES ?";
                         var values = [
                           [`${message.author.id}`]
                         ];
                         connection.query(log, [values], function (err, result) {
                           })
                  setTimeout(function() {
                    message.author.send({ embed: {
                      title : `[ FPP CITY ]`,
                      description: `지속적인 욕설이 감지되어 자동으로 뮤트처리 되었습니다.\n채팅 차단 해제 문의는 <#585760084416659466> 채널에서 "?문의 내용" 명령어를 이용해주세요.\n확인 후, 처리 도와드리겠습니다.`,
                              color: 0xff3c00,
                              footer: {
                                icon_url: client.user.avatarURL,
                                text: `Copyright 2018~.Dopamine.All rights reserved.`
                              }
                           }});
                  }, 1500)
                    }
                }
              } else {
                userData.messageCount = messageCount;
                usersMap.set(message.author.id, userData);
              }
            }
            else {
              usersMap.set(message.author.id, {
                messageCount: 1,
                lastMessage: message,
                timer: null
              });
              setTimeout(() => {
                usersMap.delete(message.author.id);
              }, 2000);
            }
         }
      } 

if(message.channel.id === `520152509504028682`){  //free-chat내에 링크 제거
  let messege = message.content.toString();
    if (message.content.includes('discord.gg/') || message.content.includes('discordapp.com/invite/')) { 
      message.delete()
      message.author.send({ embed: {
        title : `[ FPP CITY ]`,
        description: `<#520152509504028682> 채널 내에 디스코드 초대 링크를 보내실 수 없습니다.`,
                color: 0xff3c00,
                footer: {
                  icon_url: client.user.avatarURL,
                  text: `Copyright 2018~.Dopamine.All rights reserved.`
                }
      }});
      client.channels.get("759315495475478548")
      .send({embed: {
        title: "프리챗 링크 제거 로그",
        description: `기재자 : ${message.author}\n아이디 : ${message.author.id}\n내용  : ${messege}`,
        color: 0xff3c00,
        timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
      }
      }}).then(function (message) {
        message.react('🆗')
        message.react('❌')});
    }
}

if(message.channel.id === `424791216736174081`){  //team-hunting내에 링크 제거
  let messege = message.content.toString();
    if (message.content.includes('discord.gg/') || message.content.includes('discordapp.com/invite/')) { 
      message.delete()
      message.author.send({ embed: {
        title : `[ FPP CITY ]`,
        description: `<#424791216736174081> 채널 내에 디스코드 초대 링크를 보내실 수 없습니다.`,
                color: 0xff3c00,
                footer: {
                  icon_url: client.user.avatarURL,
                  text: `Copyright 2018~.Dopamine.All rights reserved.`
                }
      }});
      client.channels.get("759315495475478548")
      .send({embed: {
        title: "팀헌팅 링크 제거 로그",
        description: `기재자 : ${message.author}\n아이디 : ${message.author.id}\n내용  : ${messege}`,
        color: 0xff3c00,
        timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
      }
      }}).then(function (message) {
        message.react('🆗')
        message.react('❌')});
    }
}

if(message.channel.id === `417898454937763841`){ 
  let messege = message.content.toString();
    if (message.content.includes('youtube.com/watch?')) { 
      message.delete()
      message.author.send({ embed: {
        title : `[ FPP CITY ]`,
        description: `<#417898454937763841> 채널 내에 영상을 기재하실 수 없습니다.`,
                color: 0xff3c00,
                footer: {
                  icon_url: client.user.avatarURL,
                  text: `Copyright 2018~.Dopamine.All rights reserved.`
                }
      }});
      client.channels.get("759315495475478548")
      .send({embed: {
        title: "스트리머 영상 제거 로그",
        description: `기재자 : ${message.author}\n아이디 : ${message.author.id}\n내용  : ${messege}`,
        color: 0xff3c00,
        timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
      }
      }}).then(function (message) {
        message.react('🆗')
        message.react('❌')});
    }
}

if(message.channel.id === `585760084416659466`){  //마스터 신청 양식 미준수시 
  let messege = message.content.toString();
    if (message.content.includes('마스터 신청')) { 
      message.delete()
      message.author.send({ embed: {
        title : `[ FPP CITY ]`,
        description: `마스터 신청 양식이 올바르지 않아, 정상적으로 접수되지 않았습니다.\n<#585760084416659466> 채널에 기재되어 있는 양식에 맞추어 재신청 부탁드립니다.`,
                color: 0xff3c00,
                footer: {
                  icon_url: client.user.avatarURL,
                  text: `Copyright 2018~.Dopamine.All rights reserved.`
                }
      }});
    }
}

if (message.content) {    //bot-order 채널 올바르지않은 명령어 자동 삭제
  if (message.channel.id === `585760084416659466`){
    var coomand = fs.readFileSync(__dirname+"/command.json");
    coomand = JSON.parse(coomand);
    for (c of coomand) {
        if (message.content.indexOf(c) != -1) { 
  } 
  else if(message.content){
    message.delete();
    let messege = message.content.toString();
    message.author.send({embed: {
      title: "[FPP CITY]",
      description: `명령어 양식이 올바르지 않아 접수되지 않았습니다.\n<#585760084416659466>의 상단에 있는 양식들 혹은 https://dopamine.gq/FPP/howuse.php 를 참고하셔서 재신고 부탁드립니다.`,
      color: 0xff3c00,
      timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
    }
    }})
    message.author.send({embed: {
      title: "[명령어 내용]",
      description: `${messege}`,
      color: 0xff3c00,
      timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
    }
    }})
    client.channels.get(`675920116776697911`)
    .send({embed: {
      title: "신고 실패 로그",
      description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}\n신고 내용 :${messege}`,
      color: 0xff3c00,
      timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
               }
            }})
          }   
        }
      }
    }

  if (!message.content.startsWith(p)) return;

  //DB 관련 명령어 시작
      if(command === "보이스삭제"){
        if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
        return message.channel.send("[ 오류 ] 사유 > **권한이 부족합니다.**");
        let uday = args.join(" ")
        if(!uday) return errors.noReason(message.channel);
        connection.query(`DELETE FROM discord_voice_log WHERE day >= 1 AND day <= ${uday}`, function (err, result, fields) { //삭제 시작
            if (err) throw err;
          message.channel.send({embed: {
            title : `[discord_voice_log 데이터 삭제]`,
            description : `삭제 대상 : 1일 ~ ${uday}일`,
            color: 0xA32600
          }})
        })
       connection.query(`SELECT COUNT(if(DAY >= 1 AND DAY<=${uday},DAY,NULL)) as coount FROM discord_voice_log`, function (err, result) {
         if (err) throw err;
         var yourCount = result[0].coount;
          console.log(yourCount);
        }) //삭제된 개수 카운트
      }

      if(command === "보이스"){
        if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
        return message.channel.send("[ 오류 ] 사유 > **권한이 부족합니다.**");
        let member = message.mentions.members.first()
        if(!member) return message.author.send({ embed: {
          title : `[FPP CITY 조회 실패]`,
          description: `대상을 서버에서 찾을 수 없습니다.`,
                  color: 0xff3c00
        }});
        connection.query(`SELECT * FROM discord_voice_log where id=${member.id}`, function (err, result, fields) {
          if (err) throw err;
          for(var i = 0; i < result.length; i++) {
            message.channel.send({embed: {
              title : `[${result[i].state} 기록]`,
              description : `조회 대상 : <@${result[i].id}>\n조회 대상 ID : ${result[i].id}\n보이스 채널 : ${result[i].room}`,
              color: 0xA32600,
              footer: {
                icon_url: client.user.avatarURL,
                text:`채널 접속 날짜 : ${result[i].date} | idx 값 : ${result[i].idx}`
               }
            }})
          }
          message.channel.send({embed: {
            title : `보이스 채널 접속 기록 출력을 마쳤습니다!`,
            description : `조회 신청자 : ${message.author}`,
            color: 0xA32600
          }})
        })
      }
                        if(command === "등록") {
                          if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
                          return message.channel.send("[ 오류 ] 사유 > **권한이 부족합니다.**");
                          connection.query("DELETE FROM `sunam_test`.`discord_macro`", function (err, result, fields) {
                          })
                          var log = "INSERT INTO discord_macro (macroo) VALUES ?";
                          var values = [
                            [`${args.join(" ")}`]
                          ];
                        
                          connection.query(log, [values], function (err, result) {
                            message.channel.send({embed: {
                              title: "매크로 등록에 성공했습니다!",
                              description: "기존의 매크로 내용들을 삭제하고, 신규 매크로 내용을 등록에 성공했습니다.\n매크로 기능을 시작하려면 `?매크로시작`을 입력해주세요!",
                              color: 0xff3c00,
                            }})
                          })
                        }


  //DB관련 명령어 끝

  //운영 명령어 시작
  if (command === "도움말") {
    message.delete();
    const embed = new Discord.RichEmbed()
    .addField("▷ 유저 명령어\n\n", "?신고 @대상 사유\n?신고 @대상 사유 + 파일첨부\n?문의 내용\n", true)
    .addField("▷ 관리자 명령어", "?공지 내용\n?규칙 내용\n?영구추방 @대상 사유\n", true)
    .addField("▷ 경고 지급 명령어", "?경고 @대상 사유\n?경고2 @대상 사유\n?경고삭감 @대상 사유", true)
    .addField("※ 중요 ※", "신고시에 신고자에게 봇이 DM으로 알려드립니다.\n미DM시 양식 확인 후 재신고 부탁드립니다.", true)
    .setFooter("© Copyright 2018~2020.Dopamine#6657.All rights reserved.")
    .setColor("#15f153");
    message.author.send(embed);
  }


  if(command === "경고") {
    message.delete();
    if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
    return message.reply("[ 오류 ] 사유 > **권한이 부족합니다.**");
    let rUser = message.mentions.members.first()
    if(!rUser) return message.author.send({ embed: {
      title : `[FPP CITY 경고 지급 실패]`,
      description: `지급 대상을 서버에서 찾을 수 없습니다.`,
              color: 0xff3c00
    }});
    if(rUser.roles.some(r=>["경고 2회"].includes(r.name)) ){
      message.author.send({embed: {
        title: "[ FPP CITY ]",
        description: `<@${rUser.id}>님은 경고 2회를 보류하고 있어서, 경고 지급을 할 수 없습니다.\n 해당 유저에 대한 경고 1회, 2회 지급일을 확인하시고 처리를 해주세요!`,
        color: 0xff3c00,
        footer: {
          text: `지급 대상자 ID : ${rUser.id}`
        }
      }})
      return;
     }
    let rreason = args.join(" ").slice(22);
    if(!rreason) return message.channel.send(`${message.author}님 사유를 작성해주세요.`)
        if (message.content.includes('투명')) { 
          client.users.get(`${rUser.id}`).send({ embed: {
            title : `[ FPP CITY ]`,
            description: `<@${rUser.id}>님께서 투명 닉네임을 이용하셔서 경고를 지급 받으셨습니다.\n\n경고 지급일 기준으로 1주일 내에 별명 변경 혹은 닉네임 변경을 부탁드리며\n1주일 이후에도 미변경시 추가 경고 지급될 수 있는 점 확인 부탁드립니다.`,
                    color: 0xff3c00,
                    footer: {
                      icon_url: client.user.avatarURL,
                      text: `Copyright 2018~.Dopamine.All rights reserved.`
                    }
          }});
        }
            if(rUser.roles.some(r=>["경고  1회"].includes(r.name)) ){
                var log = "INSERT INTO discord_warning_2 (state, id, give_date, fin_date, warning2_month, warning2_day) VALUES ?"; //DB에 기록
                var values = [
                  [`경고 2회`,`${rUser.id}`, `${give_date}`, `${fin_date}`, `${fin_date_month}`, `${date.getDate()}`]
                ];
                connection.query(log, [values], function (err, result) {
                  })
                  var log2 = "INSERT INTO discord_warning_all (state, id, give_day, give_month, give_date, fin_day, fin_month, fin_date, reason) VALUES ?";
                  var values = [
                    [`경고 2회`,`${rUser.id}`, `${give_date}`,`${give_month}`, `${date.getDate()}`, `${fin_date}`, `${fin_date_month}`, `${date.getDate()}`, `${rreason}`]
                  ];
                  connection.query(log2, [values], function (err, result) {
                    })
                let role2 = message.guild.roles.find(r => r.name === "경고 2회");
                rUser.addRole(role2).catch(console.error);
            let rolesEmbed = new Discord.RichEmbed()
            .setDescription("[ 경고 역할 지급 ]")
            .setColor(red)
            .addField("지급 대상자", `닉네임: ${rUser} | 아이디: ||${rUser.id}||`)
            .addField("지급 역할 | 경고 만료일", `**경고 2회** | ${fin_date_month}월 ${date.getDate()}일`)
            .addField("사유", rreason);
            // .setFooter(`디스플레이 닉네임 : ${rUser.username}`);
            let roleschannel = message.guild.channels.find(`name`, "report");
            if(!roleschannel) return message.channel.send("경고 역할 로그를 저장하는 채널을 찾지 못하거나, 권한이 없습니다.\n**report** 텍스트 채널을 생성하고 다시 시도하세요.");
            roleschannel.send(rolesEmbed);
            client.users.get(`${rUser.id}`).send({ embed: {
              title : `[ FPP CITY ]`,
              description: `<@${rUser.id}>님께서 경고 2회를 지급 받으셨습니다.\n경고 삭감 기간(3개월) 내에 추가적인 규칙 위반 시, 영구추방되는 점 확인 부탁드립니다.\n\n경고 사유는 <#441099080194588682>내에서 확인 가능합니다.`,
                      color: 0xff3c00,
                      footer: {
                        icon_url: client.user.avatarURL,
                        text: `Copyright 2018~.Dopamine.All rights reserved.`
                      }
            }});
            return;
            } else {
                var log = "INSERT INTO discord_warning (state, id, give_date, fin_date, fin_month, fin_day) VALUES ?";
                var values = [
                  [`경고  1회`,`${rUser.id}`, `${give_date}`, `${fin_date}`, `${fin_date_month}`, `${date.getDate()}`]
                ];
                connection.query(log, [values], function (err, result) {
                  })
                  var log2 = "INSERT INTO discord_warning_all (state, id, give_day, give_month, give_date, fin_day, fin_month, fin_date, reason) VALUES ?";
                  var values = [
                    [`경고  1회`,`${rUser.id}`, `${give_date}`,`${give_month}`, `${date.getDate()}`, `${fin_date}`, `${fin_date_month}`, `${date.getDate()}`, `${rreason}`]
                  ];
                  connection.query(log2, [values], function (err, result) {
                    })
                let role = message.guild.roles.find(r => r.name === "경고  1회");
                rUser.addRole(role).catch(console.error);
                    let rolesEmbed = new Discord.RichEmbed()
                    .setDescription("[ 경고 역할 지급 ]")
                    .setColor(red)
                    .addField("지급 대상자", `닉네임: ${rUser} | 아이디: ||${rUser.id}||`)
                    .addField("지급 역할 | 경고 만료일", `**경고 1회** | ${fin_date_month}월 ${date.getDate()}일`)
                    .addField("사유", rreason);
                    let roleschannel = message.guild.channels.find(`name`, "report");
                    if(!roleschannel) return message.channel.send("경고 역할 로그를 저장하는 채널을 찾지 못하거나, 권한이 없습니다.\n**report** 텍스트 채널을 생성하고 다시 시도하세요.");
                    roleschannel.send(rolesEmbed);
                    }
                    client.users.get(`${rUser.id}`).send({ embed: {
                      title : `[ FPP CITY ]`,
                      description: `<@${rUser.id}>님께서 경고 1회를 지급 받으셨습니다.\n경고 삭감 기간(3개월) 내에 추가적인 규칙 위반 시, 경고 2회 지급되는 점 확인 부탁드립니다.\n\n경고 사유는 <#441099080194588682>내에서 확인 가능합니다.`,
                              color: 0xff3c00,
                              footer: {
                                icon_url: client.user.avatarURL,
                                text: `Copyright 2018~.Dopamine.All rights reserved.`
                              }
                    }});
                    return;
                  }

                  if(command === "경고삭감"){
                    message.delete();
                    if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
                    return message.reply("[ 오류 ] 사유 > **권한이 부족합니다.**");
                    let rUser = message.mentions.members.first()
                    if(!rUser) return message.author.send({ embed: {
                      title : `[FPP CITY 경고 삭감 실패]`,
                      description: `삭감 대상을 서버에서 찾을 수 없습니다.`,
                              color: 0xff3c00
                    }});
                    let rreason = args.join(" ").slice(22);
                    if(!rreason) return message.channel.send(`${message.author}님 사유를 작성해주세요.`)
                        if(rUser.roles.some(r=>["경고 2회"].includes(r.name)) ){
                          var role1 = (message.guild.roles.find(role => role.name === "경고  1회"));
                          var role2 = (message.guild.roles.find(role => role.name === "경고 2회"));
                          rUser.addRole(role1).catch(console.error);
                          rUser.removeRole(role2).catch(console.error);
                          let rolesEmbed = new Discord.RichEmbed()
                            .setDescription("[ 경고2 역할 삭감 ]")
                            .setColor(green)
                            .addField("삭감 대상자", `닉네임: ${rUser} | 아이디: ||${rUser.id}||`)
                            .addField("삭감 역할", `**경고 2회 -> 경고 1회**`)
                            .addField("사유", rreason);
                            let roleschannel = message.guild.channels.find(`name`, "report");
                            if(!roleschannel) return message.channel.send("경고 삭감 로그를 저장하는 채널을 찾지 못하거나, 권한이 없습니다.\n**report** 텍스트 채널을 생성하고 다시 시도하세요.");
                            roleschannel.send(rolesEmbed);
                            client.channels.get("675920185487786004")
                            .send({embed: {
                              title: "경고삭감2 명령어 로그",
                              description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}`,
                              color: 0x00FF26,
                              timestamp: new Date(),
                            footer: {
                              icon_url: client.user.avatarURL,
                              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                            }
                            }})
                            connection.query(`DELETE FROM discord_warning_2 WHERE id="${rUser.id}"`, function (err, result, fields) { //삭제 시작
                              if (err) throw err;
                          })
                          connection.query(`DELETE FROM discord_warning_all WHERE id="${rUser.id}"`, function (err, result, fields) { //삭제 시작
                            if (err) throw err;
                        })
                        } else { 
                           var role = (message.guild.roles.find(role => role.name === "경고  1회"));
                          rUser.removeRole(role).catch(console.error);
                          let rolesEmbed = new Discord.RichEmbed()
                          .setDescription("[ 경고 역할 삭감 ]")
                          .setColor(green)
                          .addField("삭감 대상자", `닉네임: ${rUser} | 아이디: ||${rUser.id}||`)
                          .addField("삭감 역할", `**경고 1회**`)
                          .addField("사유", rreason);
                          let roleschannel = message.guild.channels.find(`name`, "report");
                          if(!roleschannel) return message.channel.send("경고 삭감 로그를 저장하는 채널을 찾지 못하거나, 권한이 없습니다.\n**report** 텍스트 채널을 생성하고 다시 시도하세요.");
                          roleschannel.send(rolesEmbed);
                          client.channels.get("675920185487786004")
                          .send({embed: {
                            title: "경고삭감 명령어 로그",
                            description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}`,
                            color: 0x00FF26,
                            timestamp: new Date(),
                          footer: {
                            icon_url: client.user.avatarURL,
                            text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                          }
                          }})
                          connection.query(`DELETE FROM discord_warning WHERE id="${rUser.id}"`, function (err, result, fields) { //삭제 시작
                            if (err) throw err;
                        })
                        connection.query(`DELETE FROM discord_warning_all WHERE id="${rUser.id}"`, function (err, result, fields) { //삭제 시작
                          if (err) throw err;
                      })
                        }
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

    if(command === "마스터지급") {
      message.delete();
      let member = message.mentions.members.first()
      if(!member) return message.author.send({ embed: {
        title : `[FPP CITY 마스터 지급 실패]`,
        description: `지급 대상을 서버에서 찾을 수 없습니다.`,
                color: 0xff3c00
      }});
          if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
          return message.channel.send("[ 오류 ] 사유 > **권한이 부족합니다.**");
          let rreason = args.join(" ").slice(22);
          if(!rreason) return message.author.send(`[ FPP CITY ] | 마스터 지급 실패 \n${message.author}님 링크를 입력해주세요.\n양식 : "?마스터지급 @대상 링크"`)
          let role = message.guild.roles.find(r => r.name === "Master");
          member.addRole(role).catch(console.error);
          client.users.get(`${member.id}`).send({embed: {
              title: "[ FPP CITY ]",
              description: `마스터 지급이 완료되었습니다.\n마스터 달성을 진심으로 축하드리며, 좋은 하루 보내세요!`,
              color: 0xFFFF66,
              timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
            }
            }})
          let rolesEmbed = new Discord.RichEmbed()
          .setDescription("[ 마스터 역할 지급 ]")
          .setColor(green)
          .addField("지급 대상자", `닉네임: ${member} | 아이디: ||${member.id}||`)
          .addField("지급 역할", `**마스터**`)
          .addField("사진", rreason);
          let roleschannel = message.guild.channels.find(`name`, "💡inventory");
          if(!roleschannel) return message.channel.send("경고 로그를 저장하는 채널을 찾지 못하거나, 권한이 없습니다.\n**💡inventory** 텍스트 채널을 생성하고 다시 시도하세요.");
          roleschannel.send(rolesEmbed);
          client.channels.get("764841420296028191")
          .send({embed: {
            title: "마스터 지급 명령어 로그",
            description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}\n\n지급 대상자 : ${member}\n지급 대상자 ID  : ${member.id}\n\n링크 : ${rreason}`,
            color: 0xFFFF66,
            timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
          }
          }})
          }

          if (command === "마스터신청") {
            if(!fs.existsSync(`${path}./${message.author.id}`)) {
              fs.mkdir(`${path}./${message.author.id}`, 0666, function(err){
                  if(err) throw err;
                  console.log(`C드라이브 생성 완료`);
                }) 
              }
              if(!fs.existsSync(`${dpath}./${message.author.id}`)) {
                fs.mkdir(`${dpath}./${message.author.id}`, 0666, function(err){
                    if(err) throw err;
                    console.log(`D드라이브 생성 완료`);
                  }) 
                }
            var Attachment = (message.attachments).array();
            const url = `${Attachment[0].url}`
            const savefile = `${daay} - ${Attachment[0].filename}`
            const randoom = `${Math.random().toString(36).substr(2,11)}`
            var cpath = `C:\\Users\\Administrator\\Desktop\\FPP\\file\\Master\\${message.author.id}\\${savefile}`
            var ddpath = `D:\\inetpub\\dopamine.gq\\FPP\\file\\Master\\${message.author.id}\\${randoom}${Attachment[0].filename}`
            download(url, cpath, () => {
              console.log(`C 드라이브 저장 완료`)
            })
              download(url, ddpath, () => {
                console.log('D 드라이브 저장 완료')
              })
            setTimeout(function() {
              message.delete();
            }, 500)
            var log = "INSERT INTO discord_file_data (state, id, filename, time, fullname) VALUES ?";
            var values = [
              [`[ 마스터 신청 ]`,`${message.author.id}`, `${Attachment[0].filename}`, `${daay}`, `${randoom}${Attachment[0].filename}`]
            ];
            connection.query(log, [values], function (err, result) {
              })
              let reportEmbed = new Discord.RichEmbed()
              .setDescription("[ FPP CITY 마스터 신청 ]")
              .setColor(green)
              .addField("신청자", `닉네임: ${message.author}\n아이디: ${message.author.id}`)
              .addField("신청일", `${daay}`)
              .addField(`첨부파일`,`링크 : https://dopamine.gq/FPP/file/Master/${message.author.id}/${randoom}${Attachment[0].filename}`)
              let warningchannel = message.guild.channels.find(`name`, "서버문의");
              if(!warningchannel) return message.channel.send("로그를 저장하는 채널을 찾지 못하거나, 권한이 없습니다.");
              warningchannel.send(reportEmbed)
              .then(function (message) {
                message.react('🆗')
                message.react('❌')});
              message.author.send({embed: {
                title: "[FPP CITY 마스터 신청]",
                description: `마스터 역할 신청을 정상적으로 마쳤습니다\n확인 후, 지급까지 시간이 다소 걸릴 수 있는점 양해 부탁드립니다.\n\n※ 마스터 지급이 늦더라도 기다려주시고, 명령어 중복 이용 자재 부탁드립니다.\n\n첨부하신 파일 : https://dopamine.gq/FPP/file/Master/${message.author.id}/${randoom}${Attachment[0].filename}`,
                color: 0x00ff26,
                timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
              }
              }})     
          }
          
            if (command === "신고") {
              if (message.attachments.size > 0) {
                if(!fs.existsSync(`${rpath}./${message.author.id}`)) {
                  fs.mkdir(`${rpath}./${message.author.id}`, 0666, function(err){
                      if(err) throw err;
                      console.log(`C드라이브 report 폴더 생성 완료`);
                    }) 
                  }
                if(!fs.existsSync(`${drpath}./${message.author.id}`)) {
                    fs.mkdir(`${drpath}./${message.author.id}`, 0666, function(err){
                        if(err) throw err;
                        console.log(`D드라이브 report 폴더생성 완료`);
                      }) 
                    }
                var Attachment = (message.attachments).array();
                const url = `${Attachment[0].url}`
                const savefile = `${daay} - ${Attachment[0].filename}`
                const randoom = `${Math.random().toString(36).substr(2,11)}`
                var cpath = `C:\\Users\\Administrator\\Desktop\\FPP\\file\\report\\${message.author.id}\\${savefile}`
                var ddpath = `D:\\inetpub\\dopamine.gq\\FPP\\file\\report\\${message.author.id}\\${randoom}${Attachment[0].filename}`
                download(url, cpath, () => {
                  console.log(`C 드라이브 저장 완료`)
                })
                  download(url, ddpath, () => {
                    console.log('D 드라이브 저장 완료')
                  })
                setTimeout(function() {
                  message.delete();
                }, 500)
                    let member = message.mentions.members.first() || message.member
                    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
                    if(rUser.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) ){
                      message.author.send({ 
                        embed: {
                        title : `[FPP CITY 신고 실패]`,
                        description: `매니저들을 신고 대상으로 지목하는 경우가 종종 발생하여, 매니저들을 신고 대상으로 지목 할 수 없게 개발되었습니다.\n혹여나 매니저들 중, 신고 대상이 존재한다면 ?문의 명령어로 말씀 해주신다면 확인 후 처리 도와드리겠습니다\n\n명령어 사용법 : https://dopamine.gq/FPP/howuse.php`,
                                color: 0xff3c00
                        }
                      })
                      return;
                    }
                    if(!rUser) return message.author.send({ 
                                embed: {
                                title : `[FPP CITY 신고 실패]`,
                                description: `신고 대상을 서버에서 찾을 수 없습니다.\n신고 대상의 닉네임과 사유를 매니저분에게 DM 부탁드립니다.`,
                                        color: 0xff3c00 }})
                    let rreason = args.join(" ").slice(22);
                    if(!rreason)  return message.author.send({ 
                                embed: {
                                title : `[FPP CITY 신고 실패]`,
                                description: `신고 사유를 작성해주세요.`,
                                        color: 0xff3c00
                              }}) 
                    var log = "INSERT INTO discord_file_data (state, id, filename, time, fullname, rUser, reason) VALUES ?";
                    var values = [
                      [`[ 신고 ]`,`${message.author.id}`, `${Attachment[0].filename}`, `${daay}`, `${randoom}${Attachment[0].filename}`, `${rUser.id}`, `${rreason}`]
                    ];
                    connection.query(log, [values], function (err, result) {
                      })
                    let reportEmbed = new Discord.RichEmbed()
                    .setDescription("[ FPP CITY 신고 ]")
                    .setColor(red)
                    .addField("신고자", `닉네임: ${message.author}\n아이디: ${message.author.id}`)
                    .addField("대상자", `닉네임: ${rUser}\n아이디: ${rUser.id}\n지급된 역할: ${member.roles.map(r => `${r}`).join(' | ')}`)
                    .addField("신고일", `${daay}`)
                    .addField("사유", rreason)
                    .addField(`첨부파일`,`링크 : https://dopamine.gq/FPP/file/report/${message.author.id}/${randoom}${Attachment[0].filename}`)
                    let warningchannel = message.guild.channels.find(`name`, "warning");
                    if(!warningchannel) return message.channel.send("신고 로그를 저장하는 채널을 찾지 못하거나, 권한이 없습니다.\n**warning** 텍스트 채널을 생성하고 다시 시도하세요.");
                    warningchannel.send(reportEmbed)
                    .then(function (message) {
                      message.react('🆗')
                      message.react('❌')}); 
                    message.author.send({embed: {
                      title: "[ FPP CITY 파일 첨부 신고 ]",
                      description: `${message.author}님께서 전해주신 ${rUser}님에 대한 신고가\n정상적으로 접수되었습니다!\n\n첨부하신 파일 : https://dopamine.gq/FPP/file/report/${message.author.id}/${randoom}${Attachment[0].filename}`,
                      color: 0xff3c00,
                      timestamp: new Date(),
                    footer: {
                      icon_url: client.user.avatarURL,
                      text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                    }
                    }})
                    client.channels.get("675920116776697911")
                    .send({embed: {
                      title: "파일 신고 명령어 로그",
                      description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}\n링크 :${url}`,
                      color: 0x81c147,
                      timestamp: new Date(),
                    footer: {
                      icon_url: client.user.avatarURL,
                      text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                    }
                    }})
              } else {
                  message.delete();
                  let member = message.mentions.members.first() || message.member
                  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
                  if(rUser.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) ){
                    message.author.send({ 
                      embed: {
                      title : `[FPP CITY 신고 실패]`,
                      description: `매니저들을 신고 대상으로 지목하는 경우가 지속적으로 발생하여, 매니저들을 신고 대상으로 지목하실 수 없습니다.\n혹여나 매니저 중, 신고 대상이 존재한다면 ?문의 명령어로 말씀 해주신다면 확인 후 처리 도와드리겠습니다\n\n명령어 사용법 : https://dopamine.gq/FPP/howuse.php`,
                              color: 0xff3c00
                      }
                    })
                    return;
                  }
                  if(!rUser)
                   return message.author.send({ 
                    embed: {
                    title : `[FPP CITY 신고 실패]`,
                    description: `신고 대상을 서버에서 찾을 수 없습니다.\n신고 대상의 닉네임과 사유를 매니저분에게 DM 부탁드립니다.`,
                            color: 0xff3c00
                  }})
                  let rreason = args.join(" ").slice(22);
                  if(!rreason)  return message.author.send({ 
                    embed: {
                    title : `[FPP CITY 신고 실패]`,
                    description: `신고 사유를 작성해주세요.`,
                            color: 0xff3c00
                  }})
                  let reportEmbed = new Discord.RichEmbed()
                  .setDescription("[ FPP CITY 신고 ]")
                  .setColor(red)
                  .addField("신고자", `닉네임: ${message.author}\n아이디: ${message.author.id}`)
                  .addField("대상자", `닉네임: ${rUser}\n아이디: ${rUser.id}\n지급된 역할: ${member.roles.map(r => `${r}`).join(' | ')}`)
                  .addField("신고일", `${daay}`)
                  .addField("사유", rreason)
                  let warningchannel = message.guild.channels.find(`name`, "warning");
                  if(!warningchannel) return message.channel.send("신고 로그를 저장하는 채널을 찾지 못하거나, 권한이 없습니다.\n**warning** 텍스트 채널을 생성하고 다시 시도하세요.");
                  warningchannel.send(reportEmbed)
                  .then(function (message) {
                    message.react('👍')
                    message.react('👎')}); 
                    message.author.send({embed: {
                      title: "[ FPP CITY 일반 신고 ]",
                      description: `${message.author}님께서 전해주신 ${rUser}님에 대한 신고가 정상적으로 접수되었습니다!`,
                      color: 0xff3c00,
                      timestamp: new Date(),
                    footer: {
                      icon_url: client.user.avatarURL,
                      text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                    }
                    }})
                  client.channels.get("675920116776697911")
                  .send({embed: {
                    title: "신고 명령어 로그",
                    description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}`,
                    color: 0x81c147,
                    timestamp: new Date(),
                  footer: {
                    icon_url: client.user.avatarURL,
                    text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                  }
                  }})
              }
          }

    if (command === "영구추방") {
      message.delete();
      let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!rUser) return message.author.send({ embed: {
        title : `[FPP CITY 영구추방 실패]`,
        description: `영구추방 대상을 서버에서 찾을 수 없습니다.`,
                color: 0xff3c00
      }});
      if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
      return message.author.send({ embed: {
        title : `[FPP CITY 영구 추방 실패]`,
        description: `명령어 이용자의 권한이 부족합니다.`,
              color: 0xff3c00
      }});
          let member = message.mentions.members.first();
          if(!member)
          return message.author.send({ embed: {
            title : `[FPP CITY 영구 추방 실패]`,
            description: `추방 대상자를 지정해주세요!`,
                  color: 0xff3c00
          }}); 
          if(!member.bannable)
          return message.author.send({ embed: {
            title : `[FPP CITY 영구 추방 실패]`,
            description: `봇에 관리자 권한이 지급되어있는지 확인 부탁드립니다!`,
                  color: 0xff3c00
          }});   
          let reason = args.slice(1).join(' ');
          if(!reason)
          return message.author.send({ embed: {
            title : `[FPP CITY 영구 추방 실패]`,
            description: `영구 추방 대상자의 사유를 작성해주세요!`,
                  color: 0xff3c00
          }});
            client.users.get(`${member.id}`).send({embed: {
              title: "[ FPP CITY 영구추방 ]",
              description: `<@${member.id}>님께서는 FPP CITY에서 밴을 당하셨습니다.\n추가 관련된 문의는 [https://dopamine.gq/FPP/SQ/index.php](https://dopamine.gq/FPP/SQ/index.php)에서 부탁드립니다.\n\n사유 : ${reason}`,
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
              title : `[FPP CITY 영구 추방 성공]`,
              description: `영구 추방 대상 : ${rUser}\n영구 추방 대상 ID : ${rUser.id}\n\n사유 : ${reason}`,
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

      if (command === "문의") {
          message.delete();
            let rreason = args.join(' ');
            if(!rreason) return message.author.send(`[ FPP CITY ] | 문의 \n${message.author}님 내용을 작성해주세요.`)
            let reportEmbed = new Discord.RichEmbed()
            .setDescription("[ FPP CITY 문의 ]")
            .setColor(green)
            .addField("문의자", `닉네임: ${message.author}\n아이디: ${message.author.id}`)
            .addField("문의 내용", rreason)
            .addField("날짜", message.createdAt)
            .addField("?답변 @대상 내용 을 입력하셔서 답변을 해주세요!");
            let reportschannel = message.guild.channels.find(`name`, "서버문의");
            if(!reportschannel) return message.channel.send("문의 로그를 저장하는 채널을 찾지 못하거나, 권한이 없습니다.\n**서버문의** 텍스트 채널을 생성하고 다시 시도하세요.");
            reportschannel.send(reportEmbed)
            .then(function (message) {
              message.react('🆗')
              message.react('❌')}); 
            client.channels.get("675920205616119875")
            .send({embed: {
              title: "문의 명령어 로그",
              description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}`,
              color: 0xFFFF66,
              timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
            }
            }})
        }
      
        if (command === "답변") {
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

      
      if (command === "스트리머") {
        if(!fs.existsSync(`${spath}./${message.author.id}`)) {
          fs.mkdir(`${spath}./${message.author.id}`, 0666, function(err){
              if(err) throw err;
              console.log(`C드라이브 생성 완료`);
            }) 
          }
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
        var cpath = `C:\\Users\\Administrator\\Desktop\\FPP\\file\\streamer\\${message.author.id}\\${savefile}`
        var ddpath = `D:\\inetpub\\dopamine.gq\\FPP\\file\\streamer\\${message.author.id}\\${randoom}${Attachment[0].filename}`
        setTimeout(function() {
          message.delete();
          download(url, cpath, () => {
            console.log(`C 드라이브 저장 완료`)
          })
            download(url, ddpath, () => {
              console.log('D 드라이브 저장 완료')
            })
        }, 250)
        var log = "INSERT INTO discord_file_data (state, id, filename, time, fullname) VALUES ?";
        var values = [
          [`[ 스트리머 신청 ]`,`${message.author.id}`, `${Attachment[0].filename}`, `${daay}`, `${randoom}${Attachment[0].filename}`]
        ];
        connection.query(log, [values], function (err, result) {
          })
          let reportEmbed = new Discord.RichEmbed()
          .setDescription("[ FPP CITY 스트리머 신청 ]")
          .setColor(purple)
          .addField("신청자", `닉네임: ${message.author}\n아이디: ${message.author.id}`)
          .addField("신청일", `${daay}`)
          .addField(`자료`,`주소 : https://dopamine.gq/FPP/file/streamer/${message.author.id}/${randoom}${Attachment[0].filename}`)
          let warningchannel = message.guild.channels.find(`name`, "서버문의");
          if(!warningchannel) return message.channel.send("신고 로그를 저장하는 채널을 찾지 못하거나, 권한이 없습니다.\n**서버문의** 텍스트 채널을 생성하고 다시 시도하세요.");
          warningchannel.send(reportEmbed)
          .then(function (message) {
            message.react('🆗')
            message.react('❌')});
          message.author.send({embed: {
            title: "[FPP CITY 스트리머 신청]",
            description: `스트리머 역할 신청을 정상적으로 마쳤습니다\n확인 후, 지급까지 시간이 다소 걸릴 수 있는점 양해 부탁드립니다.\n\n※ 스트리머 역할 지급이 늦더라도 기다려주시고, 명령어 중복 이용 자재 부탁드립니다.\n\n첨부하신 파일 : https://dopamine.gq/FPP/file/streamer/${message.author.id}/${randoom}${Attachment[0].filename}`,
            color: 0x00ff26,
            timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
          }
          }})     
      }
      

    
      if (command === "규칙") {
        message.delete();
        if(!message.member.roles.some(r=>["Manager ▲"].includes(r.name)) ) 
        return die;
        let rreason = args.join(" ")
        if(!rreason) return errors.noReason(message.channel);
        let reportEmbed = new Discord.RichEmbed()
        .setDescription(" ")
        .setColor(green)
        .addField("[ FPP CITY 규칙 ] \n", rreason);
          let ruleschannel = message.guild.channels.find(`name`, "rules");
          if(!ruleschannel) return message.channel.send("규칙 로그를 저장하는 채널을 찾지 못하거나, 권한이 없습니다.\n**rules** 텍스트 채널을 생성하고 다시 시도하세요.");
          ruleschannel.send(reportEmbed);
          client.channels.get("675920688665591808")
          .send({embed: {
            title: "규칙 명령어 로그",
            description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}`,
            color: 0xFFFF66,
            timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
          }
          }})
      }


        if (command === "공지") {
          message.delete();
          if(!message.member.roles.some(r=>["Manager ▲"].includes(r.name)) )  
          return die;
          let rreason = args.join(" ")
          if(!rreason) return errors.noReason(message.channel);
          let reportEmbed = new Discord.RichEmbed()
          .setDescription(" ")
          .setColor(green)
          .addField("[ FPP CITY 공지 ] \n", rreason);
            let noticechannel = message.guild.channels.find(`name`, "notice");
            if(!noticechannel) return message.channel.send("공지 로그를 저장하는 채널을 찾지 못하거나, 권한이 없습니다.\n**notice** 텍스트 채널을 생성하고 다시 시도하세요.");
            noticechannel.send(reportEmbed);
            client.channels.get("675920688665591808")
            .send({embed: {
              title: "공지 명령어 로그",
              description: `명령어 이용자 : ${message.author}\n이용자 ID : ${message.author.id}`,
              color: 0xFFFF66,
              timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
            }
            }})
          };
          
          if(command === "급식"){
            let url = 'http://ghsunam-h.gne.go.kr/ghsunam-h/main.do'; 
            var param = {};
            
            cheerio_http.fetch(url, param, function(err, $, res){
               if(err){ 
                 console.log(err); 
                 return; 
                } 
              $(".meal_list").each(function(post) {
                 console.log($(this).text())
                 message.channel.send({embed: {
                  title: `${date.getDate()}일 수남고등학교 급식`,
                  description: $(this).text(),
                  color: 0xFFFF66,
                  timestamp: new Date(),
                }});

                });
          })
        }


      if(command === "매크로시작"){
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

      if(command === "매크로종료"){
        if(!message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) )
        return message.channel.send("[ 오류 ] 사유 > **권한이 부족합니다.**");
        var cmmd = require('node-cmd')
        message.channel.send({embed: {
          title: `[FPP CITY 매크로 기능]`,
          description:`${message.author}님의 명령으로 매크로 기능을 종료하겠습니다!`,
          color: 0xff3c00
        }})
        .then(() => {  cmmd.get(
          'macro_stop.exe',
        );
        })
      }


      if(command === "조회"){
        message.delete();
        if(message.member.roles.some(r=>["Manager ▲", "예비 매니저", "-"].includes(r.name)) ){
          const userMention = message.mentions.users.first() || message.author;
          let userinfo = {};
          userinfo.createdat = userMention.createdAt;
          userinfo.id = userMention.id;
          userinfo.avatar = userMention.avatarURL;
          let createdate = `${moment.utc(userinfo.createdat).lang("ko").format('YYYY년 MMMM Do dddd HH시mm분ss초')}`
          const userMention2 = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
          if(!userMention2)
          return message.author.send({ 
            embed: {
            title : `[FPP CITY 조회 실패]`,
            description: `조회 대상을 서버에서 찾을 수 없습니다.`,
                    color: 0xff3c00
          }
        });
        let userinfo2 = {};
        userinfo2.joinedat = userMention2.joinedAt;
        let joinedate = `${moment.utc(userinfo2.joinedat).lang("ko").format('YYYY년 MMMM Do dddd HH시mm분ss초')}`
        let member = message.mentions.members.first() || message.member  
        message.channel.send({embed: {
                        title: `[ FPP CITY 유저 조회 ]`,
                        description:`조회 대상 : ${userMention}\n계정 ID : ${userinfo.id}\n계정 생성일 : ${createdate}\n서버 가입일 : ${joinedate}\n부여된 역할 : ${member.roles.map(r => `${r}`).join(' | ')}`,
                        color: 0x00ff26,
                        footer: {
                          icon_url: userinfo.avatar,
                          text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                        }
                      }})
                      connection.query(`SELECT * FROM discord_warning_all where id = ${userinfo.id} AND state = '경고 1회'`, function (err, result, fields) {
                        if (err) throw err;
                        for(var i = 0; i < result.length; i++) {
                          message.channel.send({embed: {
                            description:`경고 1회 지급일 : ${result[i].give_month}월 ${result[i].give_date}일\n경고 1회 만료일 : ${result[i].fin_month}월 ${result[i].fin_date}일\n사유 : ${result[i].reason}`,
                            color: 0xff3c00,
                            footer: {
                              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                            }
                          }})
                        }
                      })
                      connection.query(`SELECT * FROM discord_warning_all where id = ${userinfo.id} AND state = '경고 2회'`, function (err, result, fields) {
                        if (err) throw err;
                        for(var i = 0; i < result.length; i++) {
                          message.channel.send({embed: {
                            description:`경고 2회 지급일 : ${result[i].give_month}월 ${result[i].give_date}일\n경고 2회 만료일 : ${result[i].fin_month}월 ${result[i].fin_date}일\n사유 : ${result[i].reason}`,
                            color: 0xff3c00,
                            footer: {
                              text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                            }
                          }})
                        }
                      })
                      connection.query(`SELECT * FROM discord_file_data where id = ${userinfo.id} AND state = '[ 마스터 신청 ]'`, function (err, result, fields) {
                        if (err) throw err;
                        for(var i = 0; i < result.length; i++) {
                          message.channel.send({embed: {
                            title : `DB 마스터신청 자료`,
                            description:`신청자 : <@${result[i].id}>\n아이디 : ${result[i].id}\n자료 : https://dopamine.gq/FPP/file/Master/${userinfo.id}/${result[i].fullname}`,
                            color: 0x00ff26,
                            footer: {
                              text: `신청일 : ${result[i].time}`
                            }
                          }})
                        }
                      })
                      connection.query(`SELECT * FROM discord_file_data where id = ${userinfo.id} AND state = '[ 신고 ]'`, function (err, result, fields) {
                        if (err) throw err;
                        for(var i = 0; i < result.length; i++) {
                          message.channel.send({embed: {
                            title : `DB 신고 자료`,
                            description:`신고자 : <@${result[i].id}>\n아이디 : ${result[i].id}\n대상자 : <@${result[i].rUser}>\n아이디 : ${result[i].rUser}\n사유 : ${result[i].reason}\n자료 : https://dopamine.gq/FPP/file/report/${userinfo.id}/${result[i].fullname}`,
                            color: 0xff3c00,
                            footer: {
                              text: `신고일 : ${result[i].time}`
                            }
                          }})
                        }
                      })
        } else {
          message.delete();
          message.author.send({embed: {
            title: `[ FPP CITY 경고 내역 조회 ]`,
            description:`조회 요청자 : ${message.author}\n계정 ID : ${message.author.id}`,
            color: 0x00ff26
          }})
          connection.query(`SELECT * FROM discord_warning_all where id = ${message.author.id} AND state = '경고 1회'`, function (err, result, fields) {
            if (err) throw err;
            for(var i = 0; i < result.length; i++) {
              message.author.send({embed: {
                description:`경고 1회 지급일 : ${result[i].give_month}월 ${result[i].give_date}일\n경고 1회 만료일 : ${result[i].fin_month}월 ${result[i].fin_date}일\n사유 : ${result[i].reason}`,
                color: 0xff3c00,
                footer: {
                  text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                }
              }})
            }
          })
          connection.query(`SELECT * FROM discord_warning_all where id = ${message.author.id} AND state = '경고 2회'`, function (err, result, fields) {
            if (err) throw err;
            for(var i = 0; i < result.length; i++) {
              message.author.send({embed: {
                description:`경고 2회 지급일 : ${result[i].give_month}월 ${result[i].give_date}일\n경고 2회 만료일 : ${result[i].fin_month}월 ${result[i].fin_date}일\n사유 : ${result[i].reason}`,
                color: 0xff3c00,
                footer: {
                  text: "© Copyright 2018~2020.Dopamine#6657.All rights reserved."
                }
              }})
            }
          })
          client.channels.get(`777353746425446463`)     
             .send({ embed: {
            title : `[ 조회 명령어 이용 ]`,
            description: `명령어 이용자 : <@${message.author.id}>\n아이디 : ${message.author.id}`,
                  color: 0xff3c00
          }});
        }
        }

        if (command === "테스트") {
          const Hangul = require('hangul-js')
          let rreason = args.join(" ")
          const dis = Hangul.disassemble(`${rreason}`)
          console.log(`${dis}`)
          client.channels.get(`677748396752109579`)     
          .send({ embed: {
         title : `[ 특수문자 제거 전 ]`,
         description: `${dis}`,
               color: 0xff3c00
       }});
       var regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi
       if(regExp.test(rreason)){
        var t = rreason.replace(regExp, "")
               console.log(t)
          }else{
              console.log(rreason)
          }
      } 

    })  
    client.login("NzI2NDA5MTAxMTcyNTM5NDMz.Xvc3MQ.0oZO81SQQSevLFkeRd9OZaZ4Hyk");