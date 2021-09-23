const nodemailer =require ('nodemailer');
const dotenv = require ('dotenv');
dotenv.config();

const transporter=nodemailer.createTransport({
    service:process.env.EMAIL_PROVIDER,
    port:587,
    secure:false,
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.USER_PASSWORD
    },
    tls:{
        rejectUnauthorized: false
    }
  
});
  


module.exports={transporter};
