/* global $ */
/* global fetch */
$(document).ready(function(){
    loadData();

    async function loadData() {
        let url = "/chapters?action=titles";
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data); //For testing purposes only

        //Display dropdown menu of chapters.
        for(let i = 0; i < data.length; i++){
            $("#chapter").append(`<option value="${data[i].id}"> ${data[i].title} </option>`);
        }
    }

});//JQuery Ready function
