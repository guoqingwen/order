/**
 * Created by wenguoqing on 2016/3/25.
 */
var express = require('express');
var http = require('http');
var config = require("./config");
var app = express();
var ejs = require('ejs');

app.engine('html', require('ejs').renderFile);
app.configure(function(){

    app.set('port', config.port);
    app.set('view engine', 'ejs');
    app.engine('.html', ejs.__express);
    app.set('views', __dirname + '/views');

    app.use(express.logger('dev'));
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/test',function(req,res){
    res.render('test.html',{title:'Delete Message'})
});

//admin
app.post('/message', function(req,res){
   console.log("request:", req.body);
    if (req.body.id){
        res.send('true');
    }else{
        res.send('false');
    }
});


//开启服务 监听端口
http.createServer(app).listen(3000, function(){
    console.log("Express server listening on port 3000");
});
