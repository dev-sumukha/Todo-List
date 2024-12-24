require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const cors = require('cors')
const connectDB = require('./utils/db');
const authRoutes = require('./routes/auth.routes');
const todoRoutes = require('./routes/todo.routes');
const cookieParser = require('cookie-parser');

const Todo = require('./models/todo.models');
const sendEmail = require('./utils/mail.utils');

const app = express();
const corsOptions = {
    origin:'http://localhost:5173',
    methods:'GET, POST, PUT, PATCH, DELETE',
    credentials: true
}


app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/todo',todoRoutes);

async function sendEmails(emailsToSend) {
    for(const email of emailsToSend){
        console.log(email);
        try {
            const res = await sendEmail(email);
            console.log(res);

            if(res){
                email.sent = true;
                await email.save();
                console.log('mail sent')
            } else {
                console.log('failed to send email : ',email.to);
            }
        } catch (error) {
            console.log('Error sending email : ',error);
        }
    }
}


connectDB().then(() => {
    app.listen(process.env.PORT, function() {
        console.log('Server started on port 3000');
    });
})
.then(()=>{
    cron.schedule('* * * * *',async function(){
        const now = new Date();
        const todoEmailToSend = await Todo.find({sent: false, sendAt:{$lte: now}});
    
        try {
            await sendEmails(todoEmailToSend);
            console.log('All emails finished processing');
        } catch (error) {
            console.log('Email Processing fails ',error);
        }
    }); 
})
.catch((e) => {
    console.log('Failed to start server:', e);
});



