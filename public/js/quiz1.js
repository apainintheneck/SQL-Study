$(document).ready(function(){
    //global variables
    var score = 0;
    var attempts = localStorage.getItem("total_attempts");
     //event listeners
    $("button").on("click", gradeQuiz);
    
    displayQ1Choices();
     
    function displayQ1Choices(){
        let q1ChoicesArray = ["Collection", "table", "database, stack"];
        q1ChoicesArray = _.shuffle(q1ChoicesArray);
        
        for (let i = 0; i < q1ChoicesArray.length; i++){
            $("#q1Choices").append(` <input type="radio" name="q1" id="${q1ChoicesArray[i]}" 
            value="${q1ChoicesArray[i]}"> <label for="${q1ChoicesArray[i]}"> ${q1ChoicesArray[i]}</label>`);
        }
    }
    
    displayQ2Choices();
     
    function displayQ2Choices(){
        let q2ChoicesArray = ["Relational","Nonrelational", "Quasirelational"];
        q2ChoicesArray = _.shuffle(q2ChoicesArray);
        
        for (let i = 0; i < q2ChoicesArray.length; i++){
            $("#q2Choices").append(` <input type="radio" name="q2" id="${q2ChoicesArray[i]}" 
            value="${q2ChoicesArray[i]}"> <label for="${q2ChoicesArray[i]}"> ${q2ChoicesArray[i]}</label>`);
        }
    }
    
    displayQ3Choices();
     
    function displayQ3Choices(){
        let q3ChoicesArray = ["TRUE", "FALSE"];
        q3ChoicesArray = _.shuffle(q3ChoicesArray);
        
        for (let i = 0; i < q3ChoicesArray.length; i++){
            $("#q3Choices").append(` <input type="radio" name="q3" id="${q3ChoicesArray[i]}" 
            value="${q3ChoicesArray[i]}"> <label for="${q3ChoicesArray[i]}"> ${q3ChoicesArray[i]}</label>`);
        }
    }
    displayQ5Choices();
     
    function displayQ5Choices(){
        let q5ChoicesArray = ["Nonrelational", "MySQL", "NoSQL", "Document"];
        q5ChoicesArray = _.shuffle(q5ChoicesArray);
        
        for (let i = 0; i < q5ChoicesArray.length; i++){
            $("#q5Choices").append(` <input type="radio" name="q5" id="${q5ChoicesArray[i]}" 
            value="${q5ChoicesArray[i]}"> <label for="${q5ChoicesArray[i]}"> ${q5ChoicesArray[i]}</label>`);
        }
    }

     //functions
    function isFormValid(){
        let isValid = true;
        if ($("#q4").val() == "") {
             isValid = false;
             $("#validationFdbk").html("Question 4 was not answered");
        }   
        return isValid;
    }
    
   function rightAnswer(index){
        $(`#q${index}Feedback`).html("Correct!");
        $(`#q${index}Feedback`).attr("class", "bg-success text-white");
        $(`#markImg${index}`).html("<img src ='img/checkmark.png'>");
        score += 20;
   }
   
   function wrongAnswer(index){
        $(`#q${index}Feedback`).html("Incorrect!");
        $(`#q${index}Feedback`).attr("class", "bg-warning text-white");
        $(`#markImg${index}`).html("<img src ='img/xmark.png'>");
   }
   
    function gradeQuiz(){
            
        $("#validationFdbk").html("");//resets validation feedback
            if(!isFormValid()){
                return;
            }
        //variables
        score = 0;
    
        let q1Response = $("input[name=q1]:checked").val();
        let q2Response = $("input[name=q2]:checked").val();
        let q3Response = $("input[name=q3]:checked").val();
        let q4Response = $("#q4").val().toLowerCase();
        let q5Response = $("input[name=q5]:checked").val();
        
        //Question 1
        if(q1Response == "database") {
            rightAnswer(1);
        }else{
            wrongAnswer(1);
        }

        //Question 2
        if(q2Response == "Quasirelational") {
            rightAnswer(2);
        }else{
            wrongAnswer(2);
        }
            
        //Question 3
        if(q3Response == "FALSE") {
            rightAnswer(3);
        }else{
            wrongAnswer(3);
        }
    
        //Question 4 
        if(q4Response == "relational"){
            rightAnswer(4);
        }else{
            wrongAnswer(4);
        }
   
        //Question 5 
        if(q5Response == "MySql"){
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
    
            
        }

})