
var Epub = require("epub-gen")

    var option = {
        title: "V1",
        publisher: null,
        version: 3,
        appendChapterTitles: false,
        cover:null,
        excludeFromToc: true,
        beforeToc: true,
        author: [""],
        customHtmlTocTemplatePath:"./toc_template.xhtml.ejs",
        content: [
            {
                data: "<p>Alice was beginning to get very tired...</p>"
            }
        ]
    };

    new Epub(option, "./v1.epub");
