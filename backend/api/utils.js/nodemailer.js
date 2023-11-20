const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'css.hamad160@gmail.com',
        pass:"dmrv mzbo zgsd vacf"
    }
})
module.exports={transporter}