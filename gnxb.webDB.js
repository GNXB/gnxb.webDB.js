/**
  * GNXB 2016 All Right Reserved
  * Author: Apiwith Potisuk (po.apiwith@gmail.com)
  * Version: 1.0.0
*/

// Check for Namespace
if (!gnxb) {
    var gnxb = {};
}

gnxb.webDB = function(dbname, version, description, dbsize, callback) {
    // dbname:String, version:String, description:String, 
    // dbsize:Number, callback:Function
    var _this = this;
    
    // Check if Database are not supported
    if (!window.openDatabase) {
        console.error('[gnxb.webDB] Client Side Database are not supported in this browser.');
        return false;
    }
    
    // Check arguements are existed
    if (!(dbname && version && description && dbsize)) {
        console.error('[gnxb.webDB] Construct(): Missing arguements');
        return false;
    }
    if (!callback) {
        callback = function(){};
    }
    
    // [Public] db
    _this.db = openDatabase(dbname, version, description, dbsize, callback);
    
    // [Public] select()
    _this.select = function(sql, params, next) {
        _query('select', sql, params, next);
    };
    
    // [Public] query()
    _this.query = function(sql, params, next) {
        _query('query', sql, params, next);
    };
    
    // [Private] _query()
    function _query(mode, sql, params, next) {
        // mode:String, sql:String,
        // params:Array, next:Function
        if (!(sql && params)) {
            console.error('[gnxb.webDB] '+ mode +'(): Missing arguements');
            return false;
        }
        if (!next) { next = function(){}; }
        
        switch (mode) {
            case 'select':
                _this.db.readTransaction(function(tx) {
                    tx.executeSql(sql, params, _next, _error);
                });
                break;
            case 'query':
                _this.db.transaction(function(tx) {
                    tx.executeSql(sql, params, _next, _error);
                });
                break;
        }
        
        function _next(tx, res) {
            next(res);
        }
    };
    
    // [Private] _error()
    function _error(tx, err) {
        console.error('[gnxb.webDB] Error occurred: ' + err.code + ' | ' + err.message);
    }
}