/* global $ */
/* global fetch */
$(document).ready(function(){
    loadData();

    async function loadData() {
        let url = "/chapters?action=all";
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data); //For testing purposes only

        //Display dropdown menu of chapters.
        for(let i = 0; i < data.length; i++){
            $("#chapter-title").append(`
            <a href="/chapter?id=${data[i].id}">
              <div class="card mt-2">
                <div class="card-body">
                  <h5 class="card-title"><span class="badge bg-primary">${data[i].title}</span></h5>
                  <p class="card-text">${data[i].description}</p>
                </div>
              </div>
            </a>`);
        }
    }
});//JQuery Ready function
