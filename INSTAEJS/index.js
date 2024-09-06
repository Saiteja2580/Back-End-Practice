const express = require('express');
const path = require('path');
const app = express();

const port = 8080;

app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
});
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.get('/',(req,res)=>{
    res.render('home.ejs');
});
app.get('/:username',(req,res)=>{
    let followers = ['Sai Teja','Achyuth','Dhatri','Kowmudi','Manoj','Navaneeth']
    let {username} = req.params;
    console.log(username);
    let likes = Math.floor(Math.random()*100)+1;
    res.render('inst.ejs',{
        name : username,
        like : likes,
        followers : followers, 
    });
});