const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");


//if start quiz is clicked
start_btn.onclick = function(){
  // console.log("hello");
  info_box.classList.add("activeInfo"); //shows info box
};

//if exit button is clicked
exit_btn.onclick = function(){
  info_box.classList.remove("activeInfo"); //hide info box
};

//continue button is clicked
continue_btn.onclick = function(){
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.add("activeQuiz"); //show quiz box
  showQuestions(0);
  queCounter(1);
  startTimer(15);
  startTimerLine(0);
};


var que_count = 0;
var que_numb = 1;
var counter;
var counterLine;
var timeValue = 15;
var widthValue = 0;
var userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = function(){
  quiz_box.classList.add("activeQuiz");
  result_box.classList.remove("activeResult");
  var que_count = 0;
  var que_numb = 1;
  var timeValue = 15;
  var widthValue = 0;
  var userScore = 0;
  showQuestions(que_count);
  queCounter(que_numb);
  clearInterval(counter); // ye hatana hai apne 3 ques k 15 sec k liye
  startTimer(timeValue);
  clearInterval(counterLine); // ye hatana hai apne 3 ques k 15 sec k liye
  startTimerLine(widthValue);
  next_btn.style.display = "none"; //ye dekhna hai for sidha next
  timeOff.textContent = "Time Left";

}

quit_quiz.onclick = function(){
  window.location.reload();
}

//if next btn is clicked;
next_btn.onclick = function(){
  if(que_count < questions.length-1){
    que_count+=1;
    que_numb+=1;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter); // ye hatana hai apne 3 ques k 15 sec k liye
    startTimer(timeValue);
    clearInterval(counterLine); // ye hatana hai apne 3 ques k 15 sec k liye
    startTimerLine(widthValue);
    next_btn.style.display = "none"; //ye dekhna hai for sidha next
    timeOff.textContent = "Time Left";

  }else{
    clearInterval(counter); // ye hatana hai apne 3 ques k 15 sec k liye
    clearInterval(counterLine); // ye hatana hai apne 3 ques k 15 sec k liye
    console.log("ques completed");
    showResultBox();
  }

}


//taking questions and options from array
function showQuestions(index){
  const que_text = document.querySelector(".que_text");

  var que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question+'</span>';
  var option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
                  + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
                  + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                  +'<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll(".option");
  for (var i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

var tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
var crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
  clearInterval(counter); // ye hatana hai apne 3 ques k 15 sec k liye
  clearInterval(counterLine);// ye hatana hai apne 3 ques k 15 sec k liye
  var userAns = answer.textContent;
  var correctAns = questions[que_count].answer;
  var allOptions = option_list.children.length;
  if(userAns == correctAns){
    userScore+=1;
    console.log(userScore);
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
    console.log(correctAns);
  }else{
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);

    //if ans is incorrect then automatically selected the correct ans
    for (var i = 0; i < allOptions; i++) {
      if(option_list.children[i].textContent == correctAns){
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);

      }
    }
  }

  //once user selected disbled all
  for (var i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display = "block"; //ye dekhna hai for sidha next
}


function showResultBox() {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.remove("activeQuiz"); //hide quiz box
  result_box.classList.add("activeResult"); //show result box
  const scoreText =  result_box.querySelector(".score_text");
  if(userScore >   3){
    let scoreTag = '<span>and congrats, You got <p>'+ userScore +'</p> out of <p>'+ questions.length+'</p></span>';
    scoreText.innerHTML = scoreTag;
  }
  else if(userScore >   1){
    let scoreTag = '<span>and nice, You got <p>'+ userScore +'</p> out of <p>'+ questions.length+'</p></span>';
    scoreText.innerHTML = scoreTag;
  }
  else{
    let scoreTag = '<span>and sorry, You got only<p>'+ userScore +'</p> out of <p>'+ questions.length+'</p></span>';
    scoreText.innerHTML = scoreTag;
  }
}

function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
    timeCount.textContent = time;
    time-=1;
    if(time < 9){
      let addZero = timeCount.textContent;
      timeCount.textContent = "0"+ addZero;
    }
    if(time < 0){
      clearInterval(counter);
      timeCount.textContent = "00";
      timeOff.textContent = "Time Off";

      var correctAns = questions[que_count].answer;
      var allOptions = option_list.children.length;

      //timesup then show correct ans
      for (var i = 0; i < allOptions; i++) {
        if(option_list.children[i].textContent == correctAns){
          option_list.children[i].setAttribute("class", "option correct");
          option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);

        }
      }

      //and disable all options and display next btn
      for (var i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
      }
      next_btn.style.display = "block"; //ye dekhna hai for sidha next
    }
  }
}

function startTimerLine(time){
  counterLine = setInterval(timer, 29);
  function timer(){
    // timeLine.textContent = time;
    time+=1;
    timeLine.style.width = time + "px";
    if(time > 549){
      clearInterval(counterLine);
    }
  }
}


function queCounter(index){
  const bottom_ques_counter = quiz_box.querySelector(".total_que");
  var totalQuesCount = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
  bottom_ques_counter.innerHTML = totalQuesCount;
}
