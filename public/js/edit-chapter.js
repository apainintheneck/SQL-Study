/* global $ */
/* global fetch */
$(document).ready(function(){
    let chapters;
    loadData(); //Load chapter info into chapter dropdown

    async function loadData() {
        let url = "/chapters?action=all";
        let response = await fetch(url);
        chapters = await response.json();
        // console.log(data); //For testing purposes only

        //Display dropdown menu of chapters.
        $("#chapter").html("");
        $("#chapter").append(`<option value=""> ----- </option>`);
        for(let i = 0; i < chapters.length; i++){
            $("#chapter").append(`<option value="${chapters[i].id}"> ${chapters[i].title} </option>`);
        }
    }

    //Load chapter info into title and description fields once chapter is chosen from dropdown
    $("#chapter").on("change", function(){
        let chapter_id = $("#chapter").val();

        if (chapter_id != "") {
            let chapter = chapters.find(elem => elem.id == chapter_id);

            if (chapter != undefined) {
                $('#description').val(chapter.description);
                $('#description').attr('disabled', false);
                $('#title').val(chapter.title);
                $('#title').attr('disabled', false);
            } else {
                loadData();
            }
        } else {
            $('#description').attr('disabled', true);
            $('#title').attr('disabled', true);
        }
    });


});//JQuery Ready function
