
var Epub = require("epub-gen")
var mammoth = require("mammoth");
const path = require('path');
var fs = require('fs');
require('os').homedir()
var recursive = require("recursive-readdir");

var destinationPath = "/Users/kvanamac3/Downloads/Verse_doc_Chapter\ Wise/CH18";
var ePubDirectory = destinationPath + "/ePubs"

if (!fs.existsSync(ePubDirectory)){
    fs.mkdirSync(ePubDirectory);
}

recursive(destinationPath, function (err, files) {
    // `files` is an array of file paths
    // console.log(files);
    files.forEach(function (file) {
        pareseDocument(file)
    });
})

    function pareseDocument(file) {
        console.log(path.parse(file).name);

        var fileName = path.parse(file).name
        mammoth.extractRawText({path: file})
            .then(function(result){
                var text = result.value; // The raw text
                // console.log(text);
                var messages = result.messages;
                createePub(fileName, text)
            })
            .done();

    }

function createePub(name,text) {
    var option = {
        title: name,
        publisher: null,
        version: 3,
        appendChapterTitles: false,
        cover:null,
        excludeFromToc: true,
        beforeToc: true,
        author: [""],
        tocTitle: text,
        customNcxTocTemplatePath: "./custome_toc.ncx.ejs",
        customHtmlTocTemplatePath:"./toc_template.xhtml.ejs",
        content: [
            // {
            //     data: "<pre> "+ text +"<pre>"
            // }
        ]
    };

     new Epub(option, ePubDirectory+"/"+name+".epub");
}


function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
