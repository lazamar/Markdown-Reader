var markdown = require( "markdown" ).markdown;



var filename = null;
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('md-filename').innerHTML = filename || "No file chosen";
    document.getElementById('md-body').innerHTML = markdown.toHTML( "Hello *World*!" );
});
