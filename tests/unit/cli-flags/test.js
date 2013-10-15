///
/// This tests the build program's most basic functionality: building single
/// files with the language explicitly given.
///
/*global describe:false it:false*/

var should  = require( 'should' );
var makejs  = require( '../../../' );

describe( 'makejs', function(){
    describe( '--compiler flag', function(){
        it( 'should compile a file with the given application', function( done ){
            makejs({
                compiler : 'g++',
                files : [ 'tests/unit/cli-flags/cpp-code.cpp' ]
            }, done );
        });
        
        it( 'should compile a project with the given application', function( done ){
            makejs({
                compiler : 'g++',
                files : [ 'tests/unit/cli-flags/cpp-project.json' ]
            }, done );
        });
    });
});
