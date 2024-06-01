
let mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Craving_DB'
});
connection.connect(
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('DB connected successfully!');
        }
    }
);


// add user post method
app.post('/add-user', function (req, res) {

    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    const query = `INSERT INTO user
                    (username, email, password)
                    VALUES
                    ('${user.username}', '${user.email}', '${user.password}');`;
    console.log(query);

    connection.query(query,
        function (err, result) {
            if (err) {
                res.json({
                    error: err,
                })
            } else {
                console.log(result);
                res.json({
                    result: result,
                })
            }
        }
    );
})

// login post method
app.post('/login', function (req, res) {

    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const query = `SELECT * FROM user WHERE email = '${user.email}' AND password = '${user.password}';`;
    console.log(query);

    connection.query(query,
        function (err, result) {
            if (err) {
                res.json({
                    error: err,
                })
            } else {
                console.log(result);
                res.json({
                    result: result,
                })
            }
        }
    );
})


app.get('/api/profile', function(req, res){
    email = req.query.email;
    const query =  `SELECT username, email
                    FROM user
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



app.listen(3000, () => {
    console.log('Server is running on port 3000', 'url: http://localhost:3000/');
});
