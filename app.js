const dialogflow = require('@google-cloud/dialogflow').v2;
const uuid = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('C:\\Users\\PC\\Desktop\\chat ui\\node_modules\\firebase-admin');
var strftime = require('strftime');

var serviceAccount = require("C:\\Users\\PC\\Desktop\\chat ui\\tdtd-project-28cc9-firebase-adminsdk-4tazv-1571e1cf8a.json")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tdtd-project-28cc9.firebaseio.com"
});

const db = admin.database();
const app = express();
const port = 3000;

const sessionId = uuid.v4();

app.use(bodyParser.urlencoded({
  extended:false
}))
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});
var data='';



var result = 0
var type = '';

var first_cause = '';
var second_cause = '';
var third_cause = '';
var forth_cause = '';
var fifth_cause = '';
var sixth_cause = '';


app.post('/send-msg1', (req, res)=>{
      runSample(req.body.MSG).then(data=>{
      res.send({Reply:data});
      const newContact = {
        request: req.body.MSG,
        response: data
      };

      var d = new Date();
      db.ref('chatting information').child(strftime('%Y%m%d%H%M%S', d)).set(newContact);
  //===================================================================

    if(req.body.MSG.includes('1'))
    {
      result = result + 1;
    }
    else if(req.body.MSG.includes('2')) {
      result = result+2;

    }
    else if(req.body.MSG.includes('3')) {
      result = result +3;

    }
    else if(req.body.MSG.includes('4')) {
      result = result + 4;
    }
    console.log('result: ', result);

  //===================================================================
  //===================================================================

  if(result < 52 ) {
    type = '상태 불안이 정상인 편';
  }
  else if (result >= 52 && result <= 56 ) {
    type = '불안 수준이 약간 높은 편';
  }
  else if (result >= 57 && result <= 61 ) {
    type = '불안 수준이 상당히 높은 편';
  }
  else if (result >=62) {
    type = '불안 수준이 매우 높은 편';
  }

  if(data.includes('드디어 끝났어! 많은 문항에 대답하느라 수고 많았어 ㅜㅜ 이제 다음으로 넘어가면 결과를 확인할 수 있을거야')) {
    const anxiety_info = {
      anxiety : result,
      type : type
    };
    db.ref('anxiety info').child(strftime('%Y%m%d%H%M%S', d)).set(anxiety_info);
  }

  });

});


app.post('/send-msg2', (req,res) => {
  runSample(req.body.MSG).then(data => {
    res.send({Reply:data});
    const newContact = {
      request: req.body.MSG,
      response: data
    };

    var d = new Date();
    db.ref('chatting information').child(strftime('%Y%m%d%H%M%S', d)).set(newContact);


    // family - father
    // =======================================

        if(req.body.MSG == '아빠' || req.body.MSG == '아버지' || req.body.MSG == '아빠요' || req.body.MSG == '아빠입니다'
              || req.body.MSG == '아버지요' || req.body.MSG == '아버지입니다') {
            first_cause = '가족';
            second_cause = '아버지';
        }

        if(data.includes('라고 한게 눈에 들어오네 그러면 아버지와 너는 어떤 관계지? (아버지와 나는 ~  식으로 작성해줘)')) {
            third_cause = req.body.MSG;
        }

        if(data.includes('그렇구나 그렇다면 대개 아버지들이란 어떤 존재일까? (대개 아버지들이란 ~ 존재다 라고 작성해줘)')) {
          forth_cause = req.body.MSG;
        }

        if(data.includes("뭔 말인지 알겠다. 그렇다면  '나는 아버지를 좋아했지만 ~ ' 이라는 문장을 완성해줄래?")) {
          fifth_cause = req.body.MSG;
        }

        if(data.includes('아버지에 대해 말하기 힘들었을텐데 말해줘서 고마워~ 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
          sixth_cause = req.body.MSG;
          const newContact2 = {
            first: first_cause,
            second: second_cause,
            third: third_cause,
            forth: forth_cause,
            fifth: fifth_cause,
            sixth: sixth_cause
          };
          db.ref('sentence').child(strftime('%Y%m%d%H%M%S', d)).set(newContact2);
        }


    // family - mother
    // =======================================

      if(req.body.MSG == '엄마' || req.body.MSG == '어머니입니다' || req.body.MSG == '엄마요'
            || req.body.MSG == '어머니요' || req.body.MSG == '마더입니다') {
              first_cause = '가족';
              second_cause = '어머니';
            }
            if(data.includes('라고 한게 눈에 들어오네 그러면 어머니와 나는 어떤 관계지? (어머니와 나는 ~  식으로 작성해줘)')) {
                third_cause = req.body.MSG;
            }

            if(data.includes('그렇구나 그렇다면 대개 어머니들이란 어떤 존재일까? (대개 어머니들이란 ~ 존재다 라고 작성해줘)')) {
              forth_cause = req.body.MSG;
            }

            if(data.includes("뭔 말인지 알겠다. 그렇다면  '너는 어머니를 좋아했지만 ~ ' 이라는 문장을 완성해줄래?")) {
              fifth_cause = req.body.MSG;
            }

            if(data.includes('어머니에 대해 이야기하기 힘들었을텐데 말해줘서 고마워~ 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
              sixth_cause = req.body.MSG;
              const newContact2 = {
                first: first_cause,
                second: second_cause,
                third: third_cause,
                forth: forth_cause,
                fifth: fifth_cause,
                sixth: sixth_cause
              };
              db.ref('sentence').child(strftime('%Y%m%d%H%M%S', d)).set(newContact2);
            }

    // brother,sister
    //=================================================
          if(req.body.MSG == '형제자매' || req.body.MSG == '형제자매요') {
            first_cause = '가족';
            second_cause = '형제 자매';
          }
          if(data.includes('라고 한게 눈에 들어오네 그러면 형제자매와 너는 어떤 관계지? (형제자매와 나는 ~  식으로 작성해줘)')) {
              third_cause = req.body.MSG;
          }

          if(data.includes('그렇구나 그렇다면 대개 형제자매들이란 어떤 존재일까? (대개 형제자매들이란 ~ 존재다 라고 작성해줘)')) {
            forth_cause = req.body.MSG;
          }

          if(data.includes("뭔 말인지 알겠다. 그렇다면  '나는 형제자매를 좋아했지만 ~ ' 이라는 문장을 완성해줄래?")) {
            fifth_cause = req.body.MSG;
          }

          if(data.includes('문장 완성형 검사는 여기까지야 말하기 힘들었을텐데 말해줘서 고마워~ 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
            sixth_cause = req.body.MSG;
            const newContact2 = {
              first: first_cause,
              second: second_cause,
              third: third_cause,
              forth: forth_cause,
              fifth: fifth_cause,
              sixth: sixth_cause
            };
            db.ref('sentence').child(strftime('%Y%m%d%H%M%S', d)).set(newContact2);
          }

      // family - family
      //=================================================

      if(req.body.MSG == '가족 자체' || req.body.MSG == '가족 자체요') {
        first_cause = '가족';
        second_cause = '가족 구성원 자체';
      }
      if(data.includes('라고 한게 눈에 들어오네 그러면 형제자매와 너는 어떤 관계지? (형제자매와 나는 ~  식으로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('그렇구나 그렇다면 대개 형제자매들이란 어떤 존재일까? (대개 형제자매들이란 ~ 존재다 라고 작성해줘)')) {
        forth_cause = req.body.MSG;
      }

      if(data.includes("뭔 말인지 알겠다. 그렇다면  '나는 형제자매를 좋아했지만 ~ ' 이라는 문장을 완성해줄래?")) {
        fifth_cause = req.body.MSG;
      }

      if(data.includes('문장 완성형 검사는 여기까지야 말하기 힘들었을텐데 말해줘서 고마워~ 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        sixth_cause = req.body.MSG;
        const newContact2 = {
          first: first_cause,
          second: second_cause,
          third: third_cause,
          forth: forth_cause,
          fifth: fifth_cause,
          sixth: sixth_cause
        };
        db.ref('sentence').child(strftime('%Y%m%d%H%M%S', d)).set(newContact2);
      }

      // sex - male
      //=================================================

      if(req.body.MSG == '남자' || req.body.MSG == '남성' || req.body.MSG == '남성이요') {
        first_cause = '성';
        second_cause = '남성';
      }
      if(data.includes('음.. 그렇군.. 그렇다면 너의 생각에 남자들이란 어떤 존재야? (내 생각에 남자들이란 ~ 이다 형태로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('엄청 심오한 이야기일텐데 이야기해줘서 고마워~ 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        forth_cause = req.body.MSG;
        const newContact2 = {
          first: first_cause,
          second: second_cause,
          third: third_cause,
          forth: forth_cause,
        };
        db.ref('sentence').child(strftime('%Y%m%d%H%M%S', d)).set(newContact2);
      }

      // sex - female
      //=================================================

      if(req.body.MSG == '여자' || req.body.MSG == '여자요' || req.body.MSG == '여성이요') {
        first_cause = '성';
        second_cause = '여성';
      }
      if(data.includes('그러면 너가 생각에 여자들이란 어떤 것 같아? (내 생각에 여자들이란 ~ 이다 형태로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('네 이야기 잘 들었어! 말하기 힘들었을텐데 말해줘서 고마워~ 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        forth_cause = req.body.MSG;
        const newContact2 = {
          first: first_cause,
          second: second_cause,
          third: third_cause,
          forth: forth_cause,
        };
        db.ref('sentence').child(strftime('%Y%m%d%H%M%S', d)).set(newContact2);
      }

      // sex - 이성관게 및 결혼생활
      //=================================================

      if(req.body.MSG == '이성 관계 및 결혼 생활입니다' || req.body.MSG == '이성 관계 및 결혼 생활이요' || req.body.MSG == '이성 관계 및 결혼 생활') {
        first_cause = '성';
        second_cause = '이성 관계 및 결혼 생활';
      }
      if(data.includes('흠... 그렇구나.. 그러면 좀 더 나아가서 결혼 생활에 대해 너의 생각은 어떤데? (결혼 생활에 대한 나의 생각은 ~ 이다 형태로 작성해줘))')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('그렇다면 너가 성교를 했다면 너는 어떨 것 같아? (내가 성교를 했다면 ~ 할 것 같다 형태로 작성해줘)')) {
        forth_cause = req.body.MSG;
      }

      if(data.includes('그럼 너의 성생활은 현재 어떻다고 생각해? (나의 성생활은 ~ 한 것 같아 라고 작성해줘)')) {
        fifth_cause = req.body.MSG;
      }

      if(data.includes('대답하기 힘들었을텐데 이야기해줘서 고마워!! 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        sixth_cause = req.body.MSG;
        const newContact2 = {
          first: first_cause,
          second: second_cause,
          third: third_cause,
          forth: forth_cause,
          fifth: fifth_cause,
          sixth: sixth_cause
        };
        db.ref('sentence').child(strftime('%Y%m%d%H%M%S', d)).set(newContact2);
      }

      // other - 친구 및 대인 관계
      //=================================================

      if(req.body.MSG == '친구나 지인입니다' || req.body.MSG == '친구나 지인이요' || req.body.MSG == '친구나 지인') {
        first_cause = '대인 관계';
        second_cause = '친구 및 지인';
      }
      if(data.includes('그럼 너가 싫어하는 사람은 어떤 사람이야? (내가 싫어하는 사람은 ~한 사람이다 형태로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('그럼 너가 제일 좋아하는 사람은 어떤 사람이니? (내가 제일 좋아하는 사람은 ~한 사람이다 형식으로 작성해줘)')) {
        forth_cause = req.body.MSG;
      }

      if(data.includes('그럼 너가 없을 때 너의 친구들은 너에 대해  어떤 것을 할 것 같아? (내가 없을 때 친구들은 ~ 할 것 같다 형식으로 작성해줘)')) {
        fifth_cause = req.body.MSG;
      }

      if(data.includes('흠.. 친구나 지인에 대해 이야기하기 많이 힘들었을텐데 이야기해줘서 고마워!! 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        sixth_cause = req.body.MSG;
        const newContact2 = {
          first: first_cause,
          second: second_cause,
          third: third_cause,
          forth: forth_cause,
          fifth: fifth_cause,
          sixth: sixth_cause
        };
        db.ref('sentence').child(strftime('%Y%m%d%H%M%S', d)).set(newContact2);
      }

      // other - 친구 및 대인 관계
      //=================================================

      if(req.body.MSG == '친구나 지인입니다' || req.body.MSG == '친구나 지인이요' || req.body.MSG == '친구나 지인') {
        first_cause = '대인 관계';
        second_cause = '친구 및 지인';
      }
      if(data.includes('그럼 너가 싫어하는 사람은 어떤 사람이야? (내가 싫어하는 사람은 ~한 사람이다 형태로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('그럼 너가 제일 좋아하는 사람은 어떤 사람이니? (내가 제일 좋아하는 사람은 ~한 사람이다 형식으로 작성해줘)')) {
        forth_cause = req.body.MSG;
      }

      if(data.includes('그럼 너가 없을 때 너의 친구들은 너에 대해  어떤 것을 할 것 같아? (내가 없을 때 친구들은 ~ 할 것 같다 형식으로 작성해줘)')) {
        fifth_cause = req.body.MSG;
      }

      if(data.includes('흠.. 친구나 지인에 대해 이야기하기 많이 힘들었을텐데 이야기해줘서 고마워!! 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        sixth_cause = req.body.MSG;
        const newContact2 = {
          first: first_cause,
          second: second_cause,
          third: third_cause,
          forth: forth_cause,
          fifth: fifth_cause,
          sixth: sixth_cause
        };
        db.ref('sentence').child(strftime('%Y%m%d%H%M%S', d)).set(newContact2);
      }

      // other - 권위자
      //=================================================

      if(req.body.MSG == '권위자' || req.body.MSG == '권위자요' || req.body.MSG == '권위자입니다') {
        first_cause = '대인 관계';
        second_cause = '권위자';
      }
      if(data.includes('그렇구나.. 그러면 만약에 윗사람이 너에게 오는 것을 보면 너는 어떤 생각이 들어? (윗사람이 오는 것을 보면 나는 ~ 한 생각이 든다 형태로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('그렇구나...  권위자에 대해 말하기 힘들었을텐데 말해줘서 너무 고마워~ 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        forth_cause = req.body.MSG;
        const newContact2 = {
          first: first_cause,
          second: second_cause,
          third: third_cause,
          forth: forth_cause,
        };
        db.ref('sentence').child(strftime('%Y%m%d%H%M%S', d)).set(newContact2);
      }

      // myself - guilt
      //=================================================
      if(req.body.MSG == '죄책감' || req.body.MSG == '죄책감이요' || req.body.MSG == '죄책감입니다') {
        first_cause = '자기 개념';
        second_cause = '죄책감';
      }
      if(data.includes('그렇구나... 그러면 그 일에서 너가 가장 큰 잘못을 했다고 생각하는 것은 무엇이니? (내가 저지른 가장 큰 잘못은 ~ 이다 형태로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('그러면 죄책감이 너를 휩싸일 때 무슨 기분이 들어? (죄책감이 나를 휩싸일 때 나는 ~ 한다 형태로 작성해줘)')) {
        forth_cause = req.body.MSG;
      }

      if(data.includes('너의 죄책감에 대해 이야기하기 힘들었을텐데 이야기해줘서 고마워~ 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        fifth_cause = req.body.MSG;
        const newContact2 = {
          first: first_cause,
          second: second_cause,
          third: third_cause,
          forth: forth_cause,
          fifth: fifth_cause
        };
        db.ref('sentence').child(strftime('%Y%m%d%H%M%S', d)).set(newContact2);
      }

      // myself - before
      //=================================================
      if(req.body.MSG == '자신의 과거' || req.body.MSG == '내 과거' || req.body.MSG == '나의 과거'|| req.body.MSG == '과거') {
        first_cause = '자기 개념';
        second_cause = '자신의 과거';
      }
      if(data.includes('그런 일이 있었구나.. .그러면 과거의 일이 너에게 불안감을 줄 때 어떤 생각이 들어? (과거의 일로 인해 불안감에 휩싸일 때 ~ 기분이 든다 형태로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('너의 과거에 대해 이야기해줘서 고마워~ 좋아 그러면 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
      forth_cause = req.body.MSG;
        const newContact2 = {
          first: first_cause,
          second: second_cause,
          third: third_cause,
          forth: forth_cause,
        };
        db.ref('sentence').child(strftime('%Y%m%d%H%M%S', d)).set(newContact2);
      }

      // myself - afraid
      //=================================================
      if(req.body.MSG == '두려움이다' || req.body.MSG == '두려움이요' || req.body.MSG == '두려움이 가장 큰 것 같아'|| req.body.MSG == '두려움') {
        first_cause = '자기 개념';
        second_cause = '두려움';
      }
      if(data.includes('그렇다면 두려운 생각이 너를 휩싸일 때 너는 어떤 기분이 들어? (두려운 생각이 나를 휩싸일 때 ~ 한다 형태로 작성해줘)')) {
          third_cause = req.body.MSG;
      }

      if(data.includes('너 안에 있는 두려움에 대해 말해줘서 고마워~ 그러면 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
      forth_cause = req.body.MSG;
        const newContact2 = {
          first: first_cause,
          second: second_cause,
          third: third_cause,
          forth: forth_cause,
        };
        db.ref('sentence').child(strftime('%Y%m%d%H%M%S', d)).set(newContact2);
      }

        // myself - ability
        //=================================================
        if(req.body.MSG == '자신의 능력' || req.body.MSG == '내 능력') {
          first_cause = '자기 개념';
          second_cause = '자신의 능력';
        }
        if(data.includes('그러면 너의 결점으로 인해서 불안감이 들었을 때 어떤 기분이 들어? (결점으로부터 불안감에 휩싸일 때 ~ 기분이 든다 형태로 말해줘)')) {
            third_cause = req.body.MSG;
        }

        if(data.includes('너의 능력에 대해 이야기하기 힘들었을텐데 이야기해줘서 고마워~ 좋아 그러면 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        forth_cause = req.body.MSG;
          const newContact2 = {
            first: first_cause,
            second: second_cause,
            third: third_cause,
            forth: forth_cause,
          };
          db.ref('sentence').child(strftime('%Y%m%d%H%M%S', d)).set(newContact2);
        }

        // myself - ability
        //=================================================
        if(req.body.MSG == '나의 미래' || req.body.MSG == '내 미래') {
          first_cause = '자기 개념';
          second_cause = '자신의 미래';
        }
        if(data.includes('그런 미래를 꿈꾸는 구나~ 그러면 너가 꿈꾸는 미래에 대해 자신감, 걱정 등에 대한 불안감이 들 때 어떤 기분이 들어 (내 미래에 대한 불안감에 휩싸일 때 ~ 한 기분이 든다 형태로 작성해줘)')) {
            third_cause = req.body.MSG;
        }

        if(data.includes('너의 미래에 대해 이야기하기 힘들었을텐데 이야기해줘서 고마워~ 좋아 그러면 다음 페이지에서 너와 같은 집단 지성의 이야기를 보거나 내 친구 상담 담당 후니베어가 상담해줄거야~ 수고했어~')) {
        forth_cause = req.body.MSG;
          const newContact2 = {
            first: first_cause,
            second: second_cause,
            third: third_cause,
            forth: forth_cause,
          };
          db.ref('sentence').child(strftime('%Y%m%d%H%M%S', d)).set(newContact2);
        }



    //=============================================
    //=============================================



  });
});




var msg2='';
var msg1='';
app.post('/send-msg3', (req, res)=>{
    msg=req.body.MSG;
    console.log("python1: " + msg);
      app.post('/', (req2, res2)=>{
        res2.send({'user':msg});
            msg2=req2.body.msg;

    });
    setTimeout(function() {
      res.send({Reply:msg2});
    },5000);
});
/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(msg, projectId = 'tdtd-project-28cc9') {

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename:"C:\\Users\\PC\\Desktop\\chat ui\\TDTD-Project-862e80f2a4f4.json"
  });
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }

  return result.fulfillmentText;
}

app.listen(port, ()=>{
  console.log("running on port " + port)
})
