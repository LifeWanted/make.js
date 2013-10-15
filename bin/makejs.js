#! /usr/bin/env node

var cmd     = require( 'commander' );
var os      = require( 'os' );
var pkg     = require( '../package' );
var makejs  = require( '../' );

// Parse the command line.
cmd
    .name( 'makejs' )
    .version( pkg.version )
    .usage( '[options] <files...>' )
    .description( 'Node-based build scripts.' )

    .on( '--help', function(){
        console.log(
            '  Examples:\n'                                             +
            '\n'                                                        +
            '    Specify g++ with C++11 as compiler:\n'                 +
            '      $ makejs --compiler "g++ --std=c++11" code.cpp\n'    +
            '\n'
        );
    })

    .option( '-c, --compiler <command>',    'Set the compiler to use.' )
    .option( '-v, --verbose',               'Extra logging.' )
    .option( '-q, --quiet',                 'Silence makejs.' )
    .option( '-j, --jobs <number>',         'How many files to compile simultaneously.', parseInt )

    .parse( process.argv );

// Normalize verbosity.
if( cmd.quiet ){
    cmd.verbose = 0;
}
else if( cmd.verbose ){
    cmd.verbose = 2;
}
else {
    cmd.verbose = 1;
}

// Normalize job count.
if( !cmd.jobs ){
    cmd.jobs = os.cpus().length;
}
else {
    cmd.jobs = Math.max( 1, cmd.jobs );
}

// Clean up the compiler option, if one is provided
if( cmd.compiler ){
    cmd.compiler = cmd.compiler.trim();
}

// Merge the files array and make it so.
cmd.files = [].concat( cmd.args );
if( cmd.files.length > 0 ){
    switch( cmd.files[ 0 ] ){
        case "init":
            var subcommand = cmd.files.shift();
            makejs[ subcommand ]( cmd, function( err ){
                if( err ){
                    console.error( '`makejs ' + subcommand + '` failed:', err );
                    process.exit( err.code || -1 );
                }
            });
            break;
        
        case "compile":
            cmd.files.shift();
            // Fall through.

        default:
            makejs( cmd, function( err ){
                if( err ){
                    console.error( 'Failed to compile project:', err );
                    process.exit( err.code || -1 );
                }
            });
    }
}
