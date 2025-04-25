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
const Vote = require('./models/Vote');

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  }).catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

app.use(cors({credentials: true, origin:process.env.CORS_URL}));
app.use(express.json());
app.use(cookieParser());

app.post('/register', async (req,res)=>{
    const {name, voterId, emailId, password} = req.body;
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }
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

app.post('/vote', async (req,res)=>{
    const { emailId, candidate } = req.body;
    try {
        const existingVotes = await Vote.find();
        for (let vote of existingVotes) {
            const isMatch = await bcrypt.compare(emailId, vote.emailId);
            if (isMatch) {
                return res.status(400).json({ message: 'You have already voted.' });
            }
        }
        const hashedEmail = await bcrypt.hash(emailId, 10);
        const newVote = new Vote({ emailId: hashedEmail, candidate });
        await newVote.save();
        res.status(201).json({ message: 'Vote cast successfully!' });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Duplicate vote detected.' });
        }
        res.status(500).json({ message: 'Something went wrong.' });
    }
})

app.get('/check-auth', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not authenticated' });
    try {
      const user = jwt.verify(token, secret);
      res.status(200).json({ user });
    } catch (err) {
      res.status(403).json({ message: 'Invalid token' });
    }
});

app.get('/results', async (req, res) => {
    try {
        const results = await Vote.aggregate([
        {
          $group: {
            _id: '$candidate',
            voteCount: { $sum: 1 }
          }
        },
        {
          $sort: { voteCount: -1 }
        },
        {
          $limit: 1
        }
      ]);
      if (results.length === 0) {
        return res.status(200).json({ message: 'No votes cast yet.' });
      }
      res.status(200).json({
        topCandidate: results[0]._id,
        voteCount: results[0].voteCount,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching results' });
    }
});

app.listen(4000, ()=>{
    console.log("app is listening on 4000");
})