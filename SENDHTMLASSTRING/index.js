const express = require("express");
const app = express();

const port = 8080;

const snippet = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            background-color: cadetblue;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100vh;
        }
        h1 {
            color: black;
        }
    </style>
</head>
<body>
    <h1>Express get Request</h1>
</body>
</html>
`;

app.listen(port,() => {
    console.log(`App is listening at port ${8080}`);
});


app.get("/login",(req,res) => {
    res.send(snippet);
})
