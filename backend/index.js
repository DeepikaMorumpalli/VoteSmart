const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const cookieParser = require('cookie-parser');

mongoose.connect(process.env.MONGO_URL);

app.use(cors({credentials: true, origin:process.env.CORS_URL}));
app.use(express.json());
app.use(cookieParser());

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
})

app.get('/profile', (req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info)=>{
        res.json(info);
    })
})

app.post('/logout', (req,res)=>{
    res.cookie('token', '').json('ok');
})

app.listen(4000, ()=>{
    console.log("app is listening on 4000");
})