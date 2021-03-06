const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// --> 7)  Mount the Logger middleware here --> 11)  Mount the body-parser
// middleware  here

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
// app.get("/",(req, res)=>res.send("Hello Express"))

/** 3) Serve an HTML file */

app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));

/** 4) Serve static assets  */
let path = __dirname + "/public";
let middlewareFunction = express.static(path);
app.use(middlewareFunction)

/** 5) serve JSON on a specific route */
// app.get("/json",(req,res)=>res.json({"message": "Hello json"}))
app.use(express.static(__dirname + "https://aromatic-dime.glitch.me/json"))

/** 6) Use the .env file to configure the app */
// let MESSAGE_STYLE="uppercase";
app.get("/json", (req, res) => {
    let message = "Hello json";
    message = (process.env.MESSAGE_STYLE == "uppercase") ?
        message.toUpperCase() :
        message;
    res.json({
        "message": message
    });
});
// app.use(express.static(__dirname + "https://aromatic-dime.glitch.me/json"))

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
app = express();
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next()
})

/** 8) Chaining middleware. A Time server */
app.get('/now', (req, res, next) => {

    next();
}, (req, res) => {
    let time = new Date().toString();
    console.log('time' + time);
    res.json({
        'time': time
    });
});

/** 9)  Get input from client - Route parameters */
app.route('/:word/echo').get((req, res) => {
    res.json({
        echo: req.params.word
    });
});

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

app.route('/name').get((req, res) => {
    let first = req.query.first;
    let last = req.query.last;
    let jsonObj = {
        name: `${first} ${last}`
    };
    res.send(jsonObj);
}).post()

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.use(bodyParser.urlencoded({
    extended: false
}))


/** 12) Get data form POST  */
app.post('/name', (req, res) => {
    let jsonObj = `${req.body.first} ${req.body.last}`;
    res.send({
        name: jsonObj
    });
    console.log(jsonObj);
})

// This would be part of the basic setup of an Express app but to allow FCC to
// run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;