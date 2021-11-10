/* global $ */
/* global fetch */
$(document).ready(function(){
    let page_titles = {}; //page_id and page_title indexed by chapter_id
    let simplemde;
    loadChapterTitles();

    async function loadChapterTitles() {
        let url = "/pages?action=titles";
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data); //For testing purposes only

        //Display dropdown menu of chapters and build page_titles object.
        $("#chapter").html("");
        $("#chapter").append(`<option value=""> ----- </option>`);
        for(let i = 0; i < data.length; i++){
            if (page_titles[data[i].chapter_id] == undefined) {
                page_titles[data[i].chapter_id] = [];
                $("#chapter").append(`<option value="${data[i].chapter_id}"> ${data[i].chapter_title} </option>`);
            }
            page_titles[data[i].chapter_id].push({page_id: data[i].page_id, page_title: data[i].page_title});
        }
    }

    //Load page titles into page dropdown based upon change in chapter dropdown
    $('#chapter').on("change", function(){
        $("#page").html("");
        clearPage();
        disableTextInputs();
        if ($('#chapter').val()) {
            $("#page").append(`<option value=""> ----- </option>`);
            let pages = page_titles[$('#chapter').val()];
            for(let i = 0; i < pages.length; i++){
                $("#page").append(`<option value="${pages[i].page_id}"> ${pages[i].page_title} </option>`);
            }
        }
    });

    //Load page title and body based upon change in page dropdown
    $("#page").on("change", function(){
        clearPage();
        if ($('#page').val()) {
            loadPage($("#page").val());
        } else {
            disableTextInputs();
        }
    });

    //Load page from API into page and make new SimpleMDE object to build the markdown editor
    async function loadPage(page_id) {
        let url = `/pages?action=page&id=${page_id}`;
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data); //For testing purposes only

        if (data.length == 1) {
            $('#title').val(data[0].title);
            $('#body').val(data[0].body);
            $('#title').attr('disabled', false);
            $('#body').attr('disabled', false);
            simplemde = new SimpleMDE();
        } else {
            loadChapterTitles();
        }
    }

    function clearPage(){
        if (simplemde) {
            simplemde.toTextArea();
            simplemde = null;
        }
        $('#title').val('');
        $('#body').val('');
    }

    function disableTextInputs(){
        $('#title').attr('disabled', true);
        $('#body').attr('disabled', true);
    }

});//JQuery Ready function
