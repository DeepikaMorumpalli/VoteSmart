const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const cookieParser = require('cookie-parser');

app.use(cors({origin:process.env.CORS_URL, credentials:true, allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log(e);
});

app.post('/register', async (req,res)=>{
    const {name, voterId, emailId, password} = req.body;
    const userDoc = await User.create({
        name:name, voterId:voterId, 
        emailId:emailId, password:bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
})

app.post('/login', async(req, res)=>{
    const {emailId, password} = req.body;
    const userDoc = await User.findOne({emailId});
    const passOk = await bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        const token = jwt.sign({emailId, id:userDoc._id}, secret);
        res.cookie('token', token).json({
            id: userDoc._id,
            emailId,
        });
    }else{
        res.status(400).json('wrong credentials');
    }
    // res.json({ message: 'Logged in' });
})

app.get('/profile', (req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info)=>{
        res.json(info);
    })
    // console.log('Profile route hit');
    // res.json({ username: 'Madhu' });
})

app.post('/logout', (req,res)=>{
    res.cookie('token', '').json('ok');
})

app.listen(4000, ()=>{
    console.log("app is listening on 4000");
})