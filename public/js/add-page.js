/* global $ */
/* global fetch */
$(document).ready(function(){
    let simplemde = null;
    loadData();

    async function loadData() {
        let url = "/api/chapters?action=titles";
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data); //For testing purposes only

        //Display dropdown menu of chapters.
        $("#chapter").append(`<option value=""> ----- </option>`);
        for(let i = 0; i < data.length; i++){
            $("#chapter").append(`<option value="${data[i].id}"> ${data[i].title} </option>`);
        }
    }

    //Load chapter info into title and description fields once chapter is chosen from dropdown
    $("#chapter").on("change", function(){
        if ($("#chapter").val() != "") {
            $('#title').attr('disabled', false);
            $('#body').attr('disabled', false);
            if(!simplemde){
                simplemde = new SimpleMDE();
            }
        } else {
            if (simplemde) {
                simplemde.toTextArea();
                simplemde = null;
            }
            $('#title').val('');
            $('#body').val('');
            $('#title').attr('disabled', true);
            $('#body').attr('disabled', true);
        }
    });

});//JQuery Ready function
