/* global $ */
/* global fetch */
$(document).ready(function(){
    loadData(getUrlParameter("id"));
    var pages = [];
    var pageInd = 0;
    if(getUrlParameter("pageInd")) {
        pageInd = getUrlParameter("pageInd");
    }
    async function loadData(id) {
        let url = "/chapters?action=single&id="+id;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data); //For testing purposes only

        //Display dropdown menu of chapters.
        
          
            await loadPages(id);
            displayPage(pageInd);
    }
    $("#chapter-title").on("click", "[data-page]", function () {
        window.location = "/chapter?id="+$(this).attr()
        
    })
    $("#chapter-title").on("click", "[data-page-nav]", function () {
       pageInd = parseInt($(this).attr("data-page-nav"));
       displayPage(pageInd)
        
    })
    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    };
    async function loadPages(id, displayPage) {
        let url = "/pages?action=chapter&id="+id;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data); //For testing purposes only
        pages = data;        
    }
    var displayPage = function displayPage(i) {
        $('#chapter-title').html('');
        $("#chapter-title").append(`<div data-page = "${pages[i].id}"> ${pages[i].title} </div>`);
        $("#chapter-title").append(`<div"> ${marked.parse(pages[i].body)} </div>`);
        if(i != 0 && i != (pages.length - 1)) {
            $("#chapter-title").append(`<div data-page-nav="${i - 1}" class="btn btn-primary"> Prev </div>`);
            $("#chapter-title").append(`<div data-page-nav="${i + 1}" class="btn btn-primary" style ="float:right"> Next </div>`);
        } else if (i == (pages.length - 1)) {
            $("#chapter-title").append(`<div data-page-nav="${i - 1}" class="btn btn-primary"> Prev </div>`);
            $("#chapter-title").append(`<a href="/table-of-content" class="btn btn-primary" style ="float:right"> Return to Table of Contents </a>`);
        } else {
            $("#chapter-title").append(`<div data-page-nav="${i + 1}" class="btn btn-primary" style = "float: right"> Next </div>`);
        }
    
    }

});//JQuery Ready function
