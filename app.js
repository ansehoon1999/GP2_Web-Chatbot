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

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});


var result = 0
var type = '';

var first_cause = '';
var second_cause = '';
var third_cause = '';
var forth_cause = '';
var fifth_cause = '';
var sixth_cause = '';

app.post('/send-msg', (req, res)=>{
  runSample(req.body.MSG).then(data=>{
    res.send({Reply:data})
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
    }

  //===================================================================













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


  });
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
