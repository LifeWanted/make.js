///
/// This tests make.js' support for generating project files for other applications (i.e.
/// VisualStudio, Autotools, Eclipse, etc).
///
/*global describe:false it:false*/

var should  = require( 'should' );
var makejs  = require( '../../../' );

describe( 'makejs', function(){
    describe( '--make-project flag', function(){
        it( 'should create a VisualStudio 2010 solution with "vs10"' );
        it( 'should create a VisualStudio 2012 solution with "vs11"' );
        it( 'should create an Eclipse project with "eclipse"' );
        it( 'should create a Makefile with "make"' );
        it( 'should create an Autotools configure file with "autotools"' );
        it( 'should create a Netbeans project with "netbeans"' );
        it( 'should create a CMakeLists.txt file with "cmake"' );
        
        it( 'should fail gracefully for unknown project formats' );
        
        it( 'should be case insensitive' );
    });
});
