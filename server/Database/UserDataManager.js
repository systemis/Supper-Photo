function UserDataManager(){
    var pool = require('../Models/database-config.js');
    
    this.getUserAvatar = (username, call) => {
        pool.query("select * from usermanager WHERE username='"+username+"'", (err, result) => {
            if(!err && result.rows.length > 0){
                return call(result.rows[0].avatar);
            }else{
                console.log(err);
                return call("Image");
            }
        })
    }    
}

module.exports = new UserDataManager();