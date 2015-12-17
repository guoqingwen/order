var express = require('express');
var http = require('http');
var config = require("./config");
var models = require('./dao/models');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var loginContrller = require('./controllers/LoginController');
var commonContrller = require('./controllers/CommonController');
var jiaxiao = require('./controllers/JiaxiaoController');
var store = require('./controllers/JiaxiaoStoreController');
var app = express();

app.engine('html', require('ejs').renderFile);
app.configure(function(){

  app.set('port', config.port);
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');

  //use cookie session
  app.use(cookieParser('ijiache.com'));
  app.use(session({
      name: 'ijiache.com',
      cookie: { maxAge: 600000 },
      resave:true,
      saveUninitialized:true,
      secret:'ijiache.com'
  }));

  //拦截所有请求
  app.use(function(req, res, next){
    if(req.session){//所有message通过session传递
      res.locals.message = req.session.message;
      res.locals.errmsg = req.session.errmsg;
    }
    next();
  });
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', commonContrller.index);
app.get('/init', commonContrller.init);
app.get('/login', commonContrller.login);
app.get('/register', commonContrller.register);
app.get('/admin', commonContrller.admin);
app.get('/checkUserName', loginContrller.checkUserName);
app.get('/users', loginContrller.users);
app.get('/logout',function(req,res){
    req.session.user = null;
    res.redirect('/login');
});
app.get('/demo',function(req,res){
    //res.redirect('demo/index.html');
    res.render('demo/index.html');
});

//驾校管理接口
app.post('/jiaxiao/new', jiaxiao.new);
app.post('/jiaxiao/:id/edit', jiaxiao.save);
app.get('/jiaxiao', jiaxiao.index);
app.get('/jiaxiao/:id', jiaxiao.view);
app.get('/jiaxiao/:id/edit', jiaxiao.edit);
app.get('/jiaxiao/:id/delete', jiaxiao.delete);
app.get('/jiaxiao/:id/finish', jiaxiao.finish);

//驾校门店管理接口
app.post('/store/add', store.add);
app.post('/store/:id/edit', store.update);
app.get('/store', store.index);
app.get('/stores', store.list);
app.get('/checkAdmin', store.checkAdmin);
app.get('/store/:id', store.view);
app.get('/store/:id/edit', store.edit);
app.get('/store/:id/delete', store.delete);
app.get('/store/:id/available', store.available);

//define post
app.post('/user/login', loginContrller.userLogin);
app.post('/user/register', loginContrller.userRegister);

models.connect(function(error){
    if (error) throw error;
});
app.on('close', function(errno) {
    models.disconnect(function(err) { });
});

//开启服务 监听端口
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
