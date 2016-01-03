/**
 * Created by Administrator on 2015/12/15.
 */
var mailer = require('nodemailer');

var transporter = mailer.createTransport({
    name: 'IjiaChe.com',
    service: 'Gmail',
    auth: {
        user: 'wenguoqing1991@gmail.com',
        pass: 'wgq568565953'
    }
});

var mailOptions = {
    from: 'ijiache.com', // sender address
    to: '568565953@qq.com', // list of receivers
    subject: '爱驾车ijiaChe.com验证码', // Subject line
    text: '爱驾车ijiaChe.com验证码', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};
//测试使用方法
/*transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log('error info:');
        console.log(error);
    }else{
        console.log('Message sent: ' + info.response);
    }
});*/

exports.sendMail  = function(message, callback){
    mailOptions.html = '<b>'+message+'</b>';
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent success: ' + info.response);
        }
        callback(error, info.response);
    });
};