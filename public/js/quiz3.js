$(document).ready(function(){
    //global variables
    var score = 0;

    displayQ1Choices();

    function displayQ1Choices(){
        let q1ChoicesArray = ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL JOIN"];
        q1ChoicesArray = _.shuffle(q1ChoicesArray);

        for (let i = 0; i < q1ChoicesArray.length; i++){
            $("#q1Choices").append(` <input type="radio" name="q1" id="${q1ChoicesArray[i]}"
            value="${q1ChoicesArray[i]}"> <label for="${q1ChoicesArray[i]}"> ${q1ChoicesArray[i]}</label>`);
        }
    }

    displayQ3Choices();

    function displayQ3Choices(){
        let q3ChoicesArray = ["Before", "After"];
        q3ChoicesArray = _.shuffle(q3ChoicesArray);

        for (let i = 0; i < q3ChoicesArray.length; i++){
            $("#q3Choices").append(` <input type="radio" name="q3" id="${q3ChoicesArray[i]}"
            value="${q3ChoicesArray[i]}"> <label for="${q3ChoicesArray[i]}"> ${q3ChoicesArray[i]}</label>`);
        }
    }
    displayQ5Choices();

    function displayQ5Choices(){
        let q5ChoicesArray = ["OUTER JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN"];
        q5ChoicesArray = _.shuffle(q5ChoicesArray);

        for (let i = 0; i < q5ChoicesArray.length; i++){
            $("#q5Choices").append(` <input type="radio" name="q5" id="${q5ChoicesArray[i]}"
            value="${q5ChoicesArray[i]}"> <label for="${q5ChoicesArray[i]}"> ${q5ChoicesArray[i]}</label>`);
        }
    }

    function rightAnswer(index){
         $(`#q${index}Feedback`).html(`<span class="badge bg-success w-25 m-3">Correct!</span>`);
         score += 20;
    }

    function wrongAnswer(index){
         $(`#q${index}Feedback`).html(`<span class="badge bg-danger w-25 m-3">Incorrect!</span>`);
    }

   //Grade quiz
    $("form").on("submit", e => {
        e.preventDefault();
        //variables
        score = 0;

        let q1Response = $("input[name=q1]:checked").val();
        let q2Response = $("#q2").val().toLowerCase();
        let q3Response = $("input[name=q3]:checked").val();
        let q4Response = $("#q4").val().toLowerCase();
        let q5Response = $("input[name=q5]:checked").val();

        //Question 1
        if(q1Response == "INNER JOIN") {
            rightAnswer(1);
        }else{
            wrongAnswer(1);
        }

        //Question 2
        if(q2Response == "on") {
            rightAnswer(2);
        }else{
            wrongAnswer(2);
        }

        //Question 3
        if(q3Response == "After") {
            rightAnswer(3);
        }else{
            wrongAnswer(3);
        }

        //Question 4
        if(q4Response == "as"){
            rightAnswer(4);
        }else{
            wrongAnswer(4);
        }

        //Question 5
        if(q5Response == "OUTER JOIN"){
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

      });

})
