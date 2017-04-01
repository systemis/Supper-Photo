var express        = require("express");
var app            = express();
var path           = require('path');
var bodyParser     = require("body-parser");
var cookieParser   = require("cookie-parser");
var expresssession = require("express-session");
var passport       = require("passport");
var passportLocal  = require("passport-local");
var pool           = require('./server/Models/database-config.js');

app.set("views", "./views");

app.use(cookieParser());
app.use(expresssession( {
    secret: process.env.SESSION_SECRET || 'secret', 
    resave: false,
    saveUninitialized: false
} ));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, ".", "build")));

const routerTogether = (req, res) => res.sendFile(path.join(__dirname, ".","build/index.html"));

// Custom passport 
passport.use(new passportLocal.Strategy((username, password, done) => {
    pool.connect((err, client, dones) => {
        if(!err){
            client.query("Select * from usermanager WHERE username='"+username+"'", (err, result) => {
                if(!err){
                    if(result.rows.length > 0){
                        if(username === result.rows[0].username && password === result.rows[0].password){
                            console.log(result.rows[0]);
                            var user = {
                                id: result.rows[0].username, 
                                username: result.rows[0].username,
                                password: result.rows[0].password
                            }
                            done(null, user);
                        }else{
                            done(null, null);
                        }
                    }else{
                        done(null, null);
                    }
                }
            })
        }
    })
}));


// Handling data
passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user);
})
// Gán kịch bản cho passport 
passport.deserializeUser((user, done) => {
    done(null, user);
})



// Show home page 
app.get("/",       routerTogether)

// Show login design tamplate 
const loginRoute = (req, res) => {
    //console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        res.send('Da dang nhap roi ');
    }else{
        res.sendFile(path.join(__dirname, ".", "build/index.html"));
    }
}
app.get("/sign-in", loginRoute);
app.get("/sign-up", loginRoute);

app.get("/log-out", (req, res) => {
    req.logout();
    res.redirect("/");
})

app.post("/", (req, res) => {
    console.log(req.user);
    var user = req.user;
    res.send({
        name: user.username,
        password: user.password
    })
});

// Handling when user login 
app.post("/sign-in", passport.authenticate('local'), (req, res) => {
    res.redirect('/');
});
app.post("/sign-up", (req, res) => {
    var email    = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    pool.query("insert into usermanager(email, username, password, avatar) VALUES('"+email+"', '"+username+"', '"+password+"', '"+"/public/upload/user/avatar/default"+"')", (err, result) => {
        if(err) { 
            console.log(err);
            return res.redirect('/sign-up')
        }else{ 
            return res.redirect('/sign-in'); 
        }
    })
});

app.post('/check-login', (req, res) => {
    console.log(req.isAuthenticated());
    res.send({result: req.isAuthenticated() });
})

app.use(require('./server/main.js'));

app.listen(3000);