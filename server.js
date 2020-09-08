
var app = require("express")();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended:false
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

var msg2='';
var msg1='';

  app.post('/send-msg', (req, res)=>{
    //res.send({'user':'나 걱정이 너무 많아'});
      msg=req.body.MSG;
      console.log("python: " + msg);

        app.post('/', (req2, res2)=>{
          res2.send({'user':msg});
            msg2=req2.body.msg;
            console.log("python: " + msg2);

      });

        res.send({Reply:msg2});
  });



function pythonwrite () {

  app.post('/send-msg', (req, res)=>{
    res.send({'user':'나 걱정이 너무 많아'});
      var msg=req.body.msg;
      console.log("python: " + msg);
  });
}



http.listen(3000, function(){
 console.log('listening...');
 });
