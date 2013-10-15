
var path    = require( 'path' );
var spawn   = require( 'child_process' ).spawn;
var makejs  = module.exports;

const DEFAULT_COMMAND_MAP   = require( './maps/defaultCommand' );
const EXTENSION_MAP         = require( './maps/extensionToCompiler' );

makejs.generateCommand = function( args, file ){
    var command = '';
    if( args.compiler ){
        if( args.compiler.indexOf( ' ' ) > 0 ){
            command = args.compiler;
        }
        else {
            command = DEFAULT_COMMAND_MAP[ args.compiler ];
        }
    }
    else {
        command = makejs.getDefaultCommand( file );
    }
    
    var filename    = path.basename( file );
    var dirname     = path.dirname( file );
    var ext         = path.extname( file );
    var basename    = path.basename( file, ext );

    return command
        .replace( /<options>/g, args.compilerOptions || '' )
        .replace(
            /<(infile(?:path|name|dir)|basename|ext)>/g,
            function( m, $1 ){
                return  $1 == 'infilepath'  ? file      :
                        $1 == 'infilename'  ? filename  :
                        $1 == 'infiledir'   ? dirname   :
                        $1 == 'basename'    ? basename  :
                        $1 == 'ext'         ? ext       :
                        m;
            }
        )
    ;
};

// ---------------------------------------------------------------------------------------------- //

makejs.getDefaultCommand = function( file ){
    var ext = path.extname( file );
    if( EXTENSION_MAP[ ext ] ){
        return DEFAULT_COMMAND_MAP[ EXTENSION_MAP[ ext ] ];
    }

    throw new Error( 'Unknown file format "' + ext + '"')
};

// ---------------------------------------------------------------------------------------------- //

makejs.exec = function( command, callback ){
    var spawnArgs   = command.split( /\s+/g );
    var child       = spawn( spawnArgs.shift(), spawnArgs );
    var err         = [];

    child.stderr.on( 'data', function( data ){
        err.push( data );
    });

    child.on( 'close', function( code ){
        if( code || err.length ){
            err = new Error( 'Exec error: ' + err.join( ' ' ) );
            err.code = code;
            callback( err );
        }
        else {
            callback();
        }
    });
};
