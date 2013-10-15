
module.exports = (function(){
    function ArrayExecutor( context ){
        this.context = context;
    }

    var ArrayExecutorProto = ArrayExecutor.prototype;

    ArrayExecutorProto.exec = function( action ){
        if( Array.isArray( action ) ){
            var step = _recurse.call( this, action );
        }
    };
    
    return ArrayExecutor;
})();
