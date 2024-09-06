const express = require('express');
const app = express();
const path = require('path');
const port = 8080;


//this line is set to use the view engine toejs
app.set('view engine','ejs');
//to search views in a folder if we start server from any other folder
app.set('views',path.join(__dirname,'/views'));
 
//by default ejs checks view folder for ejs templates or views
app.get('/',(req,res)=>{
    res.render('home.ejs');
});


app.get('/rolldice',(req,res)=>{
    let diceval = Math.floor(Math.random()*6)+1;
    res.render('rolldic.ejs',{
        num : diceval,
    });
});


app.listen(port,()=>{
    console.log(`app listening at port ${port}`);
});