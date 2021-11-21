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
            $("#chapter-title").append(`<div data-chapter = "${data[i].id}"> ${data[i].title} </div>`);
        }
    }
    $("#chapter-title").on("click", "[data-chapter]", function () {
        window.location = "/chapter?id="+$(this).attr("data-chapter");
    })
});//JQuery Ready function
