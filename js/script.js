//const { default: test } = require("node:test");

//select all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const time_text = document.querySelector(".timer .time_left_txt");
const time_count = document.querySelector(".timer .timer_sec");

start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //shows info box
}

// i exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    show_questions(0); // calling show_questions function
    que_counter(1); // passing 1 parameter to que_counter
    start_timer(15); //calling start_timer function
    start_timer_line(0); //calling start_timer_line function
}

let time_value = 15;
let que_count = 0;
let que_numb = 1;
let user_score = 0;
let counter;
let counter_line;
let width_value = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit"); 

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    console.log("restarting");
    quiz_box.classList.add("activeQuiz"); //show quiz box 
    result_box.classList.remove("activeResult"); //hide result box
    time_value = 15;
    que_count = 0;
    que_numb = 1;
    user_score = 0;
    width_value = 0;
    show_questions(que_count); // calling show_questions function
    que_counter(que_numb); // passing que_numb value to que_counter
    clearInterval(counter); //clear counter
    clearInterval(counter_line); //clear counter_line
    start_timer(time_value); //calling start_timer function
    start_timer_line(width_value); //calling start_timer_lineto function
    time_text.textContent = "Time Left"; //change the text of time_text to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less that total question length 
        que_count++; //increment the que_count value
        que_numb++; //increment the que_number value
        show_questions(que_count); // calling show_questions function
        que_counter(que_numb); // passing que_numb value to que_counter
        clearInterval(counter); //clear counter
        clearInterval(counter_line); //clear counter_line
        start_timer(time_value); //calling start_timer function
        start_timer_line(width_value); //calling start_timer_line function
        time_text.textContent = "Time Left"; //change the time_text to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counter_line); //clear counter_line
        show_result(); //calling show_result function
    }
}   

//get questions and options from array
function show_questions(index)
{
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for questions and options and passing the value using array
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '';
    var n = 0;
    do{
        if(questions[index].options[n]!==undefined)
        {
            console.log(questions[index].options[n]);
            option_tag = option_tag+'<div class="option"><span>'+ questions[index].options[n] +'</span></div>';
        }
        n = n+1;
    }while(n<=3);
    que_text.innerHTML = que_tag; // adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "option_selected(this)");
    }
}

//creating a new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-close"></i></div>';  

// if user clicked on option
function option_selected(answer)
{
    clearInterval(counter); //clear counter
    clearInterval(counter_line); //clear counter_line
    let userAns = answer.textContent; //get user selected  option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; // getting all option items

    if(userAns == correcAns)
	{ //if user selected option is equal to array's correct answer
        user_score += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); // adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answer = " + user_score);
    }
	else
	{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); // adding cross icon to correct selected option
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which matches to an array answer
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to correct answer
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //add tick icon to correct answer
                console.log("auto select correct answer.");
            }
        }
    }

    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");//once user select an option then disable
    }
    next_btn.classList.add("show");// show the next button if user selected any option
}

function show_result()
{
	quiz_box.classList.remove("activeQuiz"); //hide quiz_box
    info_box.classList.remove("activeInfo"); //hide info_box
    result_box.classList.add("activeResult"); //show result_box
    const scoreText = result_box.querySelector(".score_text");
    if(user_score >3){ //if user scored more than 3
    //creating  a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats!🎉, You got <p>' + user_score + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag; //adding new span tag score_Text
    }
    else if(user_score > 1){ // if user scored more than 1
        let scoreTag = '<span>and nice!😎, You got <p>' + user_score + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag; //adding new span tag score_Text;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry!😕, You got only <p>' + user_score + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag; //adding new span tag score_Text;
    }
}

function start_timer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        time_count.textContent = time; //changing the value of time_count with time value
        time--; //decrement the time value
        if(time < 9){ //if timer is less than 9
            let addZero = time_count.textContent;
            time_count.textContent = "0" + addZero; //add a 0 before time value
        }
        if(time < 0){ // if timer is less than 0
            clearInterval(counter); //clear counter
            time_text.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for(i-0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //if there is an option which matched an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //add tick icon to matched option
                    console.log("time off: Auto selected correct answer");
                }
            }
            for(i-0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled");//once user select an option then disabled all options
            }
            next_btn.classList.add("show");// show the next button if user selected any option
        }
    }
}

function start_timer_line(time){
    counter_line = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increase if width of time_line with px by time value
        if(time > 549){ //if timer is less than 549
            clearInterval(counter_line); //clear counter_line
        }
    }
}

function que_counter(index){
    ////creating  a new span tag and passing the question number and total question 
    let totalQueCountTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCountTag; //adding new span tag inside bottom_ques_counter
}