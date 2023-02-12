import nodemailer from 'nodemailer';

const sendEmail =async (email,subject,text) =>{
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            post: process.env.EMAIL_PORT,
            secure: Boolean(process.env.SECURE),
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        })
        await transporter.sendMail({
            from : process.env.USER,
            to:email,
            subject:subject,
            text:`This link will expired within 15 minutes use it befor expired or else generate new link and continue the process  ${text}`,
            // html:"<b><h1>deepakkumar</h1></b>"
        });
        console.log('email send successfully');
    } catch (error) {
        console.log('email not send');
        console.log(error);
    }
}

export default sendEmail ;