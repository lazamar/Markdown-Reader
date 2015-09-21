var remote = require('remote');
var Menu = remote.require('menu');
var markdown = require( "markdown" ).markdown;
var dialog = remote.require('dialog');

var fs = require('fs');
var filename = null;
var fileContent = null;


function readMd(filename){
  fs.readFile(filename,'utf8', function(err,data){
    if(err){
      console.log(err);
      filename = 'Readme.md';
      fileContent = markdown.toHTML( "Hello *World*!" );
    }else{
      fileContent = markdown.toHTML( data );
    }
    if (document.readyState != "complete"){
      document.addEventListener('DOMContentLoaded', function(){
        document.getElementById('md-filename').innerHTML = filename ;
        document.getElementById('md-body').innerHTML = fileContent ;
      }, false);
    }else{
      document.getElementById('md-filename').innerHTML = filename ;
      document.getElementById('md-body').innerHTML = fileContent;
    }
  });
}

readMd('./Readme.md');

var menu = Menu.buildFromTemplate([
  {
    label: "File",
    submenu:[
      {
        label: "Open...",
        click: function(){
            console.log(dialog.showOpenDialog({
              properties: [ 'openFile' ],
              filters: [{ name: 'Markdown File', extensions: ['md'] }],

            }, function(filename){
              filename = filename[0];
              console.log(filename);
              readMd(filename);
            }));
        }
      }
    ]

  }
]);

Menu.setApplicationMenu(menu);
