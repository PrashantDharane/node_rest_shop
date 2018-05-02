const conf = {
    dbUrl : "mongodb://localhost:27017/temp",
    getDbUrl : function(){
        return this.dbUrl;
    }

};

module.exports = conf;