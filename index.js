
var async   = require( 'async' );
var makejs  = require( './lib/makejs' );

module.exports = function( args, callback ){
    if( !args.files || args.files.length === 0 ){
        args.files = [ 'make.js' ];
    }

    var failed  = false;
    var queue   = async.queue( function( file, callback ){
        var command = makejs.generateCommand( args, file );
        makejs.exec( command, callback );
    }, args.jobs );

    queue.drain = function( err ){
        if( !failed ){
            callback();
        }
    };

    queue.push( args.files, function( err ){
        if( err && !failed ){
            failed = true;
            callback( err );
        }
    });
};
