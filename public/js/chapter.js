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

    const chapterId = getUrlParameter("id")
    loadData(chapterId);
    var pages = [];
    var pageInd = 0;
    if(getUrlParameter("pageInd")) {
        pageInd = getUrlParameter("pageInd");
    }
    async function loadData() {
        let url = "/chapters?action=single&id="+chapterId;
        let response = await fetch(url);
        let data = await response.json();
        //console.log(data); //For testing purposes only

        //Display dropdown menu of chapters.
        await loadPages();
        displayPage();
    }
    $("#page-nav").on("click", "[data-page]", function () {
        window.location = "/chapter?id="+$(this).attr()

    })
    $("#page-nav").on("click", "[data-page-nav]", function () {
       pageInd = parseInt($(this).attr("data-page-nav"));
       displayPage()

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
    async function loadPages() {
        let url = "/pages?action=chapter&id="+chapterId;
        let response = await fetch(url);
        let data = await response.json();
        console.log(data); //For testing purposes only
        pages = data;
    }
    async function displayPage() {
        //Update page title
        $('#page-title').html('');
        $("#page-title").append(`<div data-page="${pages[pageInd].id}"> ${pages[pageInd].title} </div>`);
        //Update page body
        $('#page-body').html('');
        $("#page-body").append(`<div"> ${marked.parse(pages[pageInd].body)} </div><hr>`);
        //Update page nav
        $('#page-nav').html('');
        if(pageInd != 0) {
            $("#page-nav").append(`<button data-page-nav="${pageInd - 1}" class="btn btn-primary">\< Prev </div>`);
        }
        $("#page-nav").append(`<a href="/lecture" class="btn btn-primary"> Chapters </a>`);
        if (pageInd < (pages.length - 1)) {
            $("#page-nav").append(`<button data-page-nav="${pageInd + 1}" class="btn btn-primary"> Next \></div>`);
        }
        //Add styles to page body elements
        $("#page-body table").addClass('table');
        $("#page-body img").addClass('img-fluid');

        //Send visited information to database
        await fetch(`/pages?action=visit&chapterId=${chapterId}&pageInd=${pageInd}`);
    }

});//JQuery Ready function
