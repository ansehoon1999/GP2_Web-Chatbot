# 토닥토닥 프로젝트 (Web Ver.)

<img src="https://img.shields.io/badge/platform-firebase-blue">  <img src="https://img.shields.io/badge/platform-nodejs-green"> 

## Summary

![final](https://user-images.githubusercontent.com/63048392/115654781-cf9e8500-a36c-11eb-96b6-550dc4d99f2e.png)

이 안드로이드 어플리케이션은 불안 장애를 막고 집단 지성을 통해 치유하기 위해 개발된 어플입니다. 
안드로이드와 웹의 유기적인 연결을 통해서 자신의 불안 정도를 확인하고 해결 방안에 대해 제시할 수 있는 커뮤니티입니다.
얼굴 감정 인식, 챗봇 상담을 통해서 자신의 감정 정도를 파악하고 컬러테라피, 집단지성을 통해서 힘든 감정을 치유할 수 있습니다. 


## Requirements
- Node.js
- Firebase Key
- Dialogflow

※API 관련 내용 링크 참조
https://github.com/ansehoon1999/WebChatbotAPI

## Description
- First Counsel

   Dialogflow 챗봇을 통한 STAI 불안 척도 구현으로 불안 정도에 대해서 판단 가능
   
   여러 항목의 점수를 바탕으로 컬러테라피 구현 및 안드로이드 어플과 연동
   
- Second Counsel

  Dialogflow 챗봇을 통한 문장 완성형 검사 구현으로 불안 원인에 대해서 판단 가능
  
  내용을 바탕으로 나중에 집단 지성 커뮤니티에 사용됨
  
- Third Counsel

  딥러닝 기반 챗봇인 KoGPT-2와 node.js 연동으로 자유로운 내용에 대해 상담 가능
  
## Demo App

[![Demo](https://user-images.githubusercontent.com/47246760/114664133-3e109100-9d36-11eb-82fb-34da68113968.png)
](https://user-images.githubusercontent.com/47246760/114663524-72d01880-9d35-11eb-9c89-e765c3a004d1.mp4 "Demo")


## Firebase Query

- anxiety information: about_anxiety, cause1, cause2, result_color, result_explain, uid
- anxiety information for report: about_anxiety, cause1, cause2, result_color, result_explain, uid
- community: Cause1, date, recommendCount, uid, writing
- face recognition: myuid, percent, sentiment
- recommend: (destinationuid: true)

## Migration Guide

### app.js
- 아래는 3가지 counsel 실행 코드입니다.
```c
 app.post('/send-msg1', (req, res)=>{

      runSample(req.body.MSG).then(data=>{
      res.send({Reply:data});
      const newContact = {
        request: req.body.MSG,
        response: data
      };
   .
   .
   .
   
  app.post('/send-msg2', (req,res) => {
  runSample(req.body.MSG).then(data => {
    res.send({Reply:data});
    const newContact = {
      request: req.body.MSG,
      response: data
    };
    
   .
   .
   .
   
  app.post('/send-msg3', (req, res)=>{
    msg=req.body.MSG;
    console.log("python1: " + msg);
      app.post('/', (req2, res2)=>{
        res2.send({'user':msg});
            msg2=req2.body.msg;

    });
    setTimeout(function() {
      res.send({Reply:msg2});
    },3000);
});   
      
```

- 컬러 테라피 실행 코드는 아래와 같습니다.

```c
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
    var max = Math.max(red, orange, yellow, green, blue, purple, pink);
    if(max == red) {
      color_result = "빨간색";
      }
    else if(max == orange) {}
   
   .
   .
   .
   
```
