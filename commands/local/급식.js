var cheerio_http = require('cheerio-httpcli')
var date = new Date();
module.exports = {
    name: "급식",
    description: "Reboot FPP_CITY",
    run: async (client, message, args) => {
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
}