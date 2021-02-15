const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'testguy',
    database: 'join_us'
})

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res)=>{
    // res.send('Aloha! You got me!!!')
    var queryStr = "SELECT COUNT(*) AS count FROM users";
    connection.query(queryStr, function(error, results, fields){
        if(error) res.sendStatus(502);
        else{
            count = results[0];
            res.render("home", {count: count.count, subtitle: 'Good try!'});
        }
    });
});

app.post("/register", (req, res)=>{
    console.log('/register', req);
    user = {
        email: req.body.email
    }
    connection.query('INSERT INTO users SET ?', user, function(error, results, fields){
        if(error) res.sendStatus(502);
        console.log('solution is: ', results);
        res.redirect("/");
    });
});

app.get("/joke", (req, res)=>{
    var joke = "Do you think you really gonna get a joke? haha";
    res.send(joke);
});

app.get("/random_num", (req, res)=>{
    var num = Math.floor(Math.random()*10) + 1;
    res.send("You random number is "+ num);
});

app.get("/user_count", (req, res)=>{
    var queryStr = "SELECT COUNT(*) AS count FROM users";
    connection.query(queryStr, function(error, results, fields){
        if(error) res.sendStatus(502);
        else{
            count = results[0];
            console.log('solution is: ', count);
            res.send("total number of users is "+count.count);
        }
    });
});

app.listen(8080, ()=>{
    console.log('App listening on port 8080');
});