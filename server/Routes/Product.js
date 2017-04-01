module.exports = (router) => {
    var path           = require('path');
    var multer         = require('multer');
    var pool           = require('../Models/database-config.js');
    var productmanager = require('../Database/ProductDataManager.js');
    var usermanager   = require('../Database/UserDataManager');

    const togetRouteAction = (req, res) => res.sendFile(path.join(__dirname, "../..", "build/index.html"));
    
    router.get('/gallery/:categrory', togetRouteAction)

    var fileName = '';
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, path.resolve(__dirname, "../public/upload/"));
        },
        filename: function(req, file, cb){
            var normalFileName = file.originalname;
            var uploadFileName = normalFileName + "_" + Date.now() + normalFileName.substr(normalFileName.indexOf('.'));
            cb(false, uploadFileName);
            fileName = "/public/upload/" + uploadFileName;
        }
    })
    var upload = multer({storage: storage});


    router.post('/gallery/:category', (req, res) => {
        var category = req.params.category;
        console.log('Get ');
        productmanager.getProductsCategory(category, (result) => {
            if(result === false){
                return res.send("Not_Data");
            }
            
            var dataOf = [];
            result.map((data, index) => {
                var dataOC = new Object();
                dataOC.Id        = data.id;
                dataOC.Image     = data.image;
                dataOC.ImageName = data.name;
                dataOC.Love      = data.love;
                dataOC.UserName  = data.username;
                dataOC.Avatar    = "";

                dataOf.push(dataOC)
            })
            
            res.send(dataOf);
        })
    })

    router.post('/add-new-product', upload.any(), (req, res) => {
        var NewProduct      = new Object;
        NewProduct.name     = req.body.imagename;
        NewProduct.category = req.body.category;
        NewProduct.username = req.user.username;
        NewProduct.image    = fileName;
        NewProduct.date     = new Date().toLocaleDateString();

        // Send and insert data to database         
        productmanager.addProduct(NewProduct, (result) => {
            if(result) {
                return res.redirect('/my-gallerys');                
            }
            return res.send('That bai ..');
        })
        
        fileName = '';
    })

    router.post('/get-user-avatar', (res, req) => {
        usermanager.getUserAvatar(res.body.username, avatar => {
            req.send(avatar);
        })
    })

    router.get('/public/upload/:imagename', (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "public/upload/" + req.params.imagename));
    })

    router.get('/public/upload/user/avatar/default', (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "public/upload/user/avatar/default/nija-icon.png"));
    })
};