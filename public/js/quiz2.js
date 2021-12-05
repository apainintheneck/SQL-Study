$(document).ready(function(){
    //global variables
    var score = 0;
    var attempts = localStorage.getItem("total_attempts");

    displayQ2Choices();

    function displayQ2Choices(){
        let q2ChoicesArray = ["NONE", "NULL", "ZERO", "EMPTY"];
        q2ChoicesArray = _.shuffle(q2ChoicesArray);

        for (let i = 0; i < q2ChoicesArray.length; i++){
            $("#q2Choices").append(` <input type="radio" name="q2" id="${q2ChoicesArray[i]}"
            value="${q2ChoicesArray[i]}"> <label for="${q2ChoicesArray[i]}"> ${q2ChoicesArray[i]}</label>`);
        }
    }

    displayQ4Choices();

    function displayQ4Choices(){
        let q4ChoicesArray = ["Entries > 0", "The first entry", "All table entries", "The final entry"];
        q4ChoicesArray = _.shuffle(q4ChoicesArray);

        for (let i = 0; i < q4ChoicesArray.length; i++){
            $("#q4Choices").append(` <input type="radio" name="q4" id="${q4ChoicesArray[i]}"
            value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`);
        }
    }

    displayQ5Choices();

    function displayQ5Choices(){
        let q5ChoicesArray = ["WHERE", "GROUP BY", "DISTINCT", "ASC"];
        q5ChoicesArray = _.shuffle(q5ChoicesArray);

        for (let i = 0; i < q5ChoicesArray.length; i++){
            $("#q5Choices").append(` <input type="radio" name="q5" id="${q5ChoicesArray[i]}"
            value="${q5ChoicesArray[i]}"> <label for="${q5ChoicesArray[i]}"> ${q5ChoicesArray[i]}</label>`);
        }
    }

   function rightAnswer(index){
        $(`#q${index}Feedback`).html("Correct!");
        $(`#q${index}Feedback`).attr("class", "bg-success text-white");
        $(`#markImg${index}`).html("<img src ='/img/checkmark.png'>");
        score += 20;
   }

   function wrongAnswer(index){
        $(`#q${index}Feedback`).html("Incorrect!");
        $(`#q${index}Feedback`).attr("class", "bg-warning text-white");
        $(`#markImg${index}`).html("<img src ='/img/xmark.png'>");
   }

   //Grade quiz
    $("form").on("submit", e => {
        e.preventDefault();
        //variables
        score = 0;
        let q1Response = $("#q1").val().toLowerCase();

        let q2Response = $("input[name=q2]:checked").val();
        let q4Response = $("input[name=q4]:checked").val();
        let q5Response = $("input[name=q5]:checked").val();

        //Question 1
        if(q1Response == "select") {
            rightAnswer(1);
        }else{
            wrongAnswer(1);
        }

        //Question 2
        if(q2Response == "NULL") {
            rightAnswer(2);
        }else{
            wrongAnswer(2);
        }

        //Question 3
        if ($("#FLOAT").is(":checked") && $("#DATE").is(":checked") && !$("#DOLLARS").is(":checked") && $("#VARCHAR").is(":checked")) {
            rightAnswer(3);
        } else {
            wrongAnswer(3);
        }

        //Question 4
        if(q4Response == "All table entries"){
            rightAnswer(4);
        }else{
            wrongAnswer(4);
        }

        //Question 5
        if(q5Response == "WHERE"){
            rightAnswer(5);
        }else{
            wrongAnswer(5);
        }

        //$("totalScore").html(`Total Score: ${score}`);

      if(score >= 80 )
        {
            $("#totalScore").html("Your final score is: " + score).attr("class", "correct");
            $("#congratulations").html("Congrats on a great score!").attr("class", "correct");
        }
        else{

            $("#totalScore").html("Your final score is: " + score).attr("class", "incorrect");
            $("#congratulations").html("Better luck next time...").attr("class", "incorrect");
        }
        $("#totalAttempts").html(`Total Attempts: ${++attempts}`);
        localStorage.setItem("total_attempts", attempts);


      });

})
