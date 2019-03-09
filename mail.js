'use strict'
// --------------------------------------------------------------------------------------
// 读取csv中的邮箱数据，并保存为列表
var fs = require('fs');
var mailList = fs.readFileSync('mail.csv')
mailList = mailList.toString();
var list = new Array();
list = mailList.split('\r\n');
console.log(list);
// --------------------------------------------------------------------------------------
// 配置发信客户端

const sender_mail = '584972029@qq.com'
// smtp授权码
const smtp_auth = '****'
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service:'qq',
    port:465,
    secureConnection:true,
    auth:{
        user: sender_mail,
        pass: smtp_auth
    }

});

let mailOptions = {
    from:'"智能会议"<584972029@qq.com>',
    to:'xjxtju@163.com',
    subject:'hello',
    text:'这是正文',
    attachments:[
        {
            filename:'桥梁用机器人.docx',
            path:'./桥梁用机器人.docx'
        }

    ]
};

// --------------------------------------------------------------------------------------

// 发信函数
function send(mailOptions){
    transporter.sendMail(mailOptions,(error,info) => {
        if(error){
            return console.log(error)
        }
        console.log('Message sent: %s', info.messageId);
    })
}

// ---------------------------------------------------------------------
// 休息函数
function sleep(){
    console.log('休息');
}

// ------------------------------------------------------------------------------------------
// 主函数 发送信件
for(let i=0;i<list.length;i++){
    if(list[i]){
        mailOptions.to = list[i];
        send(mailOptions);
        console.log(list[i]);
    }
}
