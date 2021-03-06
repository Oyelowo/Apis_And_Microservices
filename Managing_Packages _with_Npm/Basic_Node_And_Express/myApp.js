let express = require('express');
let app = express();

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
    message = (process.env.MESSAGE_STYLE == "uppercase")
        ? message.toUpperCase()
        : message;
    res.json({"message": message});
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

/** 9)  Get input from client - Route parameters */

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

/** 12) Get data form POST  */

// This would be part of the basic setup of an Express app but to allow FCC to
// run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
