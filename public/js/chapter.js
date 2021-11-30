/* global $ */
/* global fetch */
$(document).ready(function(){
      // Create reference instance
    const marked = window.marked;

    // Set options
    // `highlight` example uses https://highlightjs.org
    marked.setOptions({
    renderer: new marked.Renderer(),
    pedantic: false,
    gfm: true,
    breaks: true,
    smartLists: true,
    smartypants: false,
    xhtml: false
    });

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
        //console.log(data); //For testing purposes only

        //Display dropdown menu of chapters.


            await loadPages(id);
            displayPage(pageInd);
    }
    $("#page-nav").on("click", "[data-page]", function () {
        window.location = "/chapter?id="+$(this).attr()

    })
    $("#page-nav").on("click", "[data-page-nav]", function () {
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
        //console.log(data); //For testing purposes only
        pages = data;
    }
    var displayPage = function displayPage(i) {
        //Update page title
        $('#page-title').html('');
        $("#page-title").append(`<div data-page="${pages[i].id}"> ${pages[i].title} </div>`);
        //Update page body
        $('#page-body').html('');
        $("#page-body").append(`<div"> ${marked.parse(pages[i].body)} </div><hr>`);
        //Update page nav
        $('#page-nav').html('');
        if(i != 0) {
            $("#page-nav").append(`<button data-page-nav="${i - 1}" class="btn btn-primary">\< Prev </div>`);
        }
        $("#page-nav").append(`<a href="/lecture" class="btn btn-primary"> Chapters </a>`);
        if (i < (pages.length - 1)) {
            $("#page-nav").append(`<button data-page-nav="${i + 1}" class="btn btn-primary"> Next \></div>`);
        }
        //Add styles to page body elements
        $("#page-body table").addClass('table');
        $("#page-body img").addClass('img-fluid');
    }

});//JQuery Ready function
