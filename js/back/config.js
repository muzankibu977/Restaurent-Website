const port = 3000;

const mysql = require("mysql");
const express = require("express");
const cors = require('cors');

let app = express();
app.use(cors());
app.use(express.json());
let db_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Craving_DB'
});
db_connection.connect(
    function(err){
        if(err){
            console.log(err);
        } 
        else{
            console.log('Database connected successfully.');
        }
    }
);


// add user post method
app.post('/profile', function (req, res) {

    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    const query =  `INSERT INTO account (username, email, password)
                    VALUES('${user.username}', '${user.email}', '${user.password}');`;
    console.log(query);

    db_connection.query(query,
        function (err, result) {
            if (err) {
                res.json({error: err,})
            } else {
                console.log(result);
                res.json({result: result,})
            }
        }
    );
})

// login post method
app.post('/login', function (req, res) {

    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    const query =   `SELECT * 
                     FROM account WHERE email = '${user.email}' AND password = '${user.password}';`;
    console.log(query);

    db_connection.query(query,
        function (err, result) {
            if (err) {
                res.json({error: err,})
            } else {
                console.log(result);
                res.json({ result: result,})
            }
        }
    );
})


app.get('/profile', function(req, res){
    email = req.query.email;
    const query =  `SELECT username, email
                    FROM account
                    WHERE email = "${email}";`;

    db_connection.query(query, function(err, result){
        if(err){
            console.log(err);
            res.json({error: err},);
        } else {
            res.json({result: result[0],});
        }
    });
});



app.put('/profile', function(req, res){
    const profile = {
        username: req.body.username,
        email: req.body.email,
        old_email: req.body.old_email
    };

    const query =  `UPDATE account
                    SET username = '${profile.username}', 
                    email = '${profile.email}'
                    WHERE email = '${profile.old_email}';`;

    db_connection.query(query, function(err, result){
        if(err){
            res.json({error: err,});
        } else {
            console.log(result);
            res.json({result: result,});
        }
    });
})


app.delete("/profile", function(req, res){
    const query =   `DELETE FROM account
                     WHERE email = '${req.body.email}';`;

    db_connection.query(query, function(err, result){
        if(err){
            console.log(err);
            res.json({error: err,});
        } else {
            console.log(result);
            res.json({result: result});
        }
    });
})



// starting server
app.listen(port, 
    function(){
    console.log("Server here! I am listening for your HTTP requests on port " + port + "!");
    }
);