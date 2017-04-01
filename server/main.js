const express = require('express');
const route   = express.Router();
const path    = require('path');
const fs      = require('fs');

const togetherRoute = (req, res) => res.sendFile(path.join(__dirname, '..', 'build/index.html'));

var Product = require('./Routes/Product.js');
Product(route);

//route.use(new require('./Routes/UserInfo.js'));

route.get('/charts', togetherRoute);

route.get('/my-gallerys', (req, res) => {
    if(req.isAuthenticated()){
        return res.sendFile(path.join(__dirname, '..', 'build/index.html'));
    }
    res.redirect('/');
});


module.exports = route;
