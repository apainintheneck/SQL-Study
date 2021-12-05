$(document).ready(function(){
    //global variables
    var score = 0;
    var attempts = localStorage.getItem("total_attempts");

    displayQ1Choices();

    function displayQ1Choices(){
        let q1ChoicesArray = ["FLOAT", "NUMERIC", "DECIMAL", "CHARACTER"];
        q1ChoicesArray = _.shuffle(q1ChoicesArray);

        for (let i = 0; i < q1ChoicesArray.length; i++){
            $("#q1Choices").append(` <input type="radio" name="q1" id="${q1ChoicesArray[i]}"
            value="${q1ChoicesArray[i]}"> <label for="${q1ChoicesArray[i]}"> ${q1ChoicesArray[i]}</label>`);
        }
    }

    displayQ2Choices();

    function displayQ2Choices(){
        let q2ChoicesArray = ["256 bytes", "128 bytes", "65,535 bytes", "255 bytes"];
        q2ChoicesArray = _.shuffle(q2ChoicesArray);

        for (let i = 0; i < q2ChoicesArray.length; i++){
            $("#q2Choices").append(` <input type="radio" name="q2" id="${q2ChoicesArray[i]}"
            value="${q2ChoicesArray[i]}"> <label for="${q2ChoicesArray[i]}"> ${q2ChoicesArray[i]}</label>`);
        }
    }

    displayQ3Choices();

    function displayQ3Choices(){
        let q3ChoicesArray = ["INSERT NEW", "INSERT", "INSERT INTO", "UPDATE"];
        q3ChoicesArray = _.shuffle(q3ChoicesArray);

        for (let i = 0; i < q3ChoicesArray.length; i++){
            $("#q3Choices").append(` <input type="radio" name="q3" id="${q3ChoicesArray[i]}"
            value="${q3ChoicesArray[i]}"> <label for="${q3ChoicesArray[i]}"> ${q3ChoicesArray[i]}</label>`);
        }
    }

    displayQ4Choices();

    function displayQ4Choices(){
        let q4ChoicesArray = ["DELETE", "CREATE", "SELECT", "REMOVE"];
        q4ChoicesArray = _.shuffle(q4ChoicesArray);

        for (let i = 0; i < q4ChoicesArray.length; i++){
            $("#q4Choices").append(` <input type="radio" name="q4" id="${q4ChoicesArray[i]}"
            value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`);
        }
    }

    displayQ5Choices();

    function displayQ5Choices(){
        let q5ChoicesArray = ["INSERT", "MODIFY", "UPDATE", "All three"];
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
        score = 0;

        let q1Response = $("input[name=q1]:checked").val();
        let q2Response = $("input[name=q2]:checked").val();
        let q3Response = $("input[name=q3]:checked").val();
        let q4Response = $("input[name=q4]:checked").val();
        let q5Response = $("input[name=q5]:checked").val();

        //Question 1
        if(q1Response == "DECIMAL") {
            rightAnswer(1);
        }else{
            wrongAnswer(1);
        }

        //Question 2
        if(q2Response == "255 bytes") {
            rightAnswer(2);
        }else{
            wrongAnswer(2);
        }

        //Question 3
        if(q3Response == "INSERT INTO") {
            rightAnswer(3);
        }else{
            wrongAnswer(3);
        }

        //Question 4
        if(q4Response == "REMOVE"){
            rightAnswer(4);
        }else{
            wrongAnswer(4);
        }

        //Question 5
        if(q5Response == "MODIFY"){
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
