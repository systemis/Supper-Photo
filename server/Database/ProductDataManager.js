function ProductDataManager(){
    var pool = require('../Models/database-config');
    
    // Get all product list 
    this.getProductList = call => {
        pool.query("Select * from productmanager", (err, result) => {
            if(!err && result.rows.length > 0){
                call(result.rows);
            }
        })
    }

    // Get products by category 
    this.getProductsCategory = (category, call) => {
        pool.query("Select * from productmanager where category='"+ category +"'", (err, result) => {
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
}

module.exports = new ProductDataManager();