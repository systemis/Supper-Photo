module.exports = (router) => {
    var path           = require('path');
    var multer         = require('multer');
    var pool           = require('../Models/database-config.js');
    var productmanager = require('../Database/ProductDataManager.js');
    var usermanager    = require('../Database/UserDataManager');

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


    // Get image 
    router.get('/public/upload/:imagename', (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "public/upload/" + req.params.imagename));
    })
    // Get user avatar
    router.get('/public/upload/user/avatar/default', (req, res) => {
        res.sendFile(path.resolve(__dirname, "..", "public/upload/user/avatar/default/nija-icon.png"));
    })

    // Get galley of choiced category
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

    // Add new porduct from client 
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

    // Check to recognize user has liked the product ?
    router.post('/check-is-liked', (req, res) => {
        var user  = "%" + req.user.username;
        var productId = req.body.productId;
        productmanager.checkIsLiked(productId, user, (result) => {
            console.log("Check is" + result);
            if(result !== 'err'){
                return res.send(result);
            }
            res.send('Error 66');
        })
    });

    router.post('/change-love-amout', (req, res) => {
        var user      = "%" + req.user.username;
        var productId = req.body.productId;
        var amout     = req.body.amout;
        productmanager.changeProductLoveAmout(productId, user, amout, (result) => {
            console.log("update love amout of the product: " + result);
            return res.send(result);
        })
    })

    router.post('/get-char-image', (req, res) => {
        productmanager.getProductsList((result) => {
            for(var i = 0; i < result.length; i++){
                for(var j = 0; j < result.length; j++){
                    if(parseInt(result[i].love) > parseInt(result[j].love)){
                        var N = result[i];
                        result[i] = result[j];
                        result[j] = N;
                    }
                }
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

    router.post('/get-user-avatar', (res, req) => {
        usermanager.getUserAvatar(res.body.username, avatar => {
            req.send(avatar);
        })
    })

    router.post('/get-my-gallerys', (req, res) => {
        if(req.isAuthenticated()){
            productmanager.getMyProducts(req.user.username, (result) => {
                console.log(result);
                if(result !== 'err'){
                    res.send(result);
                }else{
                    res.send("err");
                }
            })
        }
    })
};