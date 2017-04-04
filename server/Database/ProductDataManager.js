function ProductDataManager(){
    var pool = require('../Models/database-config');
    
    // Bien call o day la call back phia product truyen vao de xu ly thong tin 

    // Get all product list 
    this.getProductsList = call => {
        pool.query("Select * from productmanager ORDER BY id ASC", (err, result) => {
            if(!err && result.rows.length > 0){
                call(result.rows);
            }else{
                console.log(err);
                call(false);
            }
        })
    }

    // Get products by category 
    this.getProductsCategory = (category, call) => {
        pool.query("Select * from productmanager where category='"+ category +"' ORDER BY id ASC", (err, result) => {
            if(!err && result.rows.length > 0){
                call(result.rows);
            }else{
                call(false);
            }
        })
    }

    // Add product list 
    this.addProduct = (DataAdd, call) => {
        // user,
        pool.query("INSERT INTO productmanager(name, category, username, date, image, love) VALUES('"+DataAdd.name+"', '"+DataAdd.category+"', '"+DataAdd.username+"', '"+DataAdd.date+"', '"+DataAdd.image+"', '"+0+"')", (err) => {
            if(err){
                console.log(err);
                return call(false);
            }
            call(true);
        })
    }

    // Change love amout 
    this.changeProductLoveAmout = (idProduct, username, amout, call) => {
        pool.query("select * from productmanager where id='"+  parseInt(idProduct) +"'", (err, result) => {
            if(!err && result.rows.length > 0){
                var nowLoveAmout = result.rows[0].love;
                var loveuser     = result.rows[0].loveuser;
                if(nowLoveAmout  >= 0 && amout > 0 || nowLoveAmout > 0 && amout < 0){
                    var updateLoveAmout = parseInt(nowLoveAmout) + parseInt(amout);
                    
                    if(amout > 0){
                        loveuser = loveuser + username;
                    }else if(amout < 0){
                        loveuser = loveuser.replace(username, "");
                        console.log("D " + loveuser);
                    }

                    pool.query("update productmanager set love='"+ updateLoveAmout +"', loveuser='"+ loveuser +"' where id='"+idProduct+"'", (err) => {
                        if(err){
                            return call(false);
                        }
                        return call(true);
                    })
                }
            }else{
                console.log('Error update product love amout ' + err);
                return call('err');
            }
        })
    }

    this.checkIsLiked = (productId, user, call) => {
        pool.query("select * from productmanager where id='"+ parseInt(productId) +"'", (err, result) => {
            if(!err && result.rows.length > 0){
                var productInfo = result.rows[0];
                if(productInfo.love > 0 && productInfo.loveuser.indexOf(user) !== -1){
                    return call(true);
                }else{
                    return call(false);
                }
            }else{
                console.log(err);
                call('err');
            }
        })
    }

    this.getMyProducts = (username, call) => {
        pool.query("select * from productmanager where username='"+username+"' order by id ASC", (err, result) => {
            if(!err && result.rows.length > 0){
                call(result.rows);
            }else{
                call('err');
                console.log(err);
            }
        })
    }
}

module.exports = new ProductDataManager();