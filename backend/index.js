const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/register', (req,res)=>{
    const {emailId, password} = req.body;
    res.json({requiredData: {emailId, password}});
})

app.listen(4000, ()=>{
    console.log("app is listening on 4000");
})