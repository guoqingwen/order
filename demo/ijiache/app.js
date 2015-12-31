var express = require('express');
var http = require('http');
var config = require("./config");
var models = require('./dao/models');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var loginController = require('./controllers/LoginController');
var commonController = require('./controllers/CommonController');
var jiaxiaoController = require('./controllers/JiaxiaoController');
var storeController = require('./controllers/JiaxiaoStoreController');
var orderController = require('./controllers/JiaxiaoOrderController');
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

app.get('/', commonController.index);
app.get('/init', commonController.init);
app.get('/login', commonController.login);
app.get('/register', commonController.register);
app.get('/admin', commonController.admin);
app.get('/checkUserName', loginController.checkUserName);
app.get('/users', loginController.users);
app.get('/logout',function(req,res){
    req.session.user = null;
    res.redirect('/login');
});
app.get('/demo',function(req,res){
    res.render('demo/index.html');
});

//用户后台接口
app.get('/userUpdatePwd', commonController.updatePwd);
app.get('/userOrderClass', commonController.orderClass);


//驾校管理接口
app.post('/jiaxiao/new', jiaxiaoController.new);
app.post('/jiaxiao/:id/edit', jiaxiaoController.save);
app.get('/getJiaxiaoName', jiaxiaoController.getName);
app.get('/getJiaxiaos', jiaxiaoController.getList);

app.get('/jiaxiao', jiaxiaoController.index);
app.get('/jiaxiao/:id', jiaxiaoController.view);
app.get('/jiaxiao/:id/edit', jiaxiaoController.edit);
app.get('/jiaxiao/:id/delete', jiaxiaoController.delete);
app.get('/jiaxiao/:id/finish', jiaxiaoController.finish);

//驾校门店管理接口
app.post('/store/add', storeController.add);
app.post('/store/:id/edit', storeController.update);
app.get('/store', storeController.index);
app.get('/stores', storeController.getList);
app.get('/getJiaxiaoStores', storeController.getList);
app.get('/checkAdmin', storeController.checkAdmin);
app.get('/store/:id', storeController.view);
app.get('/store/:id/edit', storeController.edit);
app.get('/store/:id/delete', storeController.delete);
app.get('/store/:id/available', storeController.available);

//define post
app.post('/user/login', loginController.userLogin);
app.post('/user/register', loginController.userRegister);
app.post('/user/updatePwd', loginController.updatePwd);
app.post('/user/orderList', orderController.index);

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
