var nodemailer= require ('nodemailer');




var transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'holahyeankah12@gmail.com',
        pass:'holayinka12'
    }
});

var mailOptions={
    from:'holahyeankah12@gmail.com',
    to:'cwizard2011@gmail.com',
    subject:'sending Email using node.js',
    text:'That was so easy'
};
transporter.sendMail(mailOptions, function(err, info){
    if(err){
        console.log('error')
    }else{
        console.log('Email sent:'+ info.response)
    }
})