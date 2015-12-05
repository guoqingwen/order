var express = require('express')
 , loginContrller = require('./controllers/LoginController')
 , commonContrller = require('./controllers/CommonController')
  , http = require('http')
  , config = require("./config");
var models = require('./dao/models');
var app = express();

app.engine('html', require('ejs').renderFile);
app.configure(function(){

  app.set('port', config.port);
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');

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
app.get('/users', loginContrller.users);
app.get('/login', commonContrller.login);
app.post('/user/login', loginContrller.userLogin);

models.connect(function(error){
    if (error) throw error;
});
app.on('close', function(errno) {
    models.disconnect(function(err) { });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
