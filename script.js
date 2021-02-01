const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");
const gameOver = document.querySelector(".game-over");

let questionCounter = 0;
let currentQuestion;
let availableQuestion = [];
let availableOptions = [];

function shuffleArray(array) {
   for (var i = array.length - 1; i > 0; i--) {
       var j = Math.floor(Math.random() * (i + 1));

       var temp = array[i];
       array[i] = array[j];
       array[j] = temp;
   }

   return array;
}

//if start quiz is clicked
start_btn.onclick = function(){
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
  getNewQuestion();
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

const result_box = document.querySelector(".result_box");
const quit_quiz = result_box.querySelector(".buttons .quit");


quit_quiz.onclick = function(){
  window.location.reload();
}

//if correct option is clicked
function next(){
  if (que_count < 2) {
    que_count+=1;
    que_numb+=1;
    getNewQuestion();
    queCounter(que_numb);
    timeOff.textContent = "Time Left";
  } else {
      clearInterval(counter);
      clearInterval(counterLine);
      generateResults();
  }
}

//get new // QUESTION:
function getNewQuestion() {

  var operators = [{
        sign: "+",
        method: function(a,b){ return parseFloat((a + b).toFixed(2)); }
    },
    {
        sign: "-",
        method: function(a,b){ return parseFloat((a - b).toFixed(2)); }
    },
    {
        sign: "*",
        method: function(a,b){ return parseFloat((a * b).toFixed(2)); }
    },
    {
        sign: "/",
        method: function(a,b){ return parseFloat((a / b).toFixed(2)); }
    }
  ];
  var numAll = [0, 1, 2 , 3, 4, 5, 6, 7, 8, 9];

  var selectedOperator = Math.floor(Math.random()*operators.length);
  var rnum1 = Math.floor(Math.random()*(numAll.length));
  var num1= numAll[rnum1];
  numAll.splice(rnum1, 1);
  var rnum2 = Math.floor(Math.random()*(numAll.length));
  var num2= numAll[rnum2];
  numAll.splice(rnum2, 1);
  operators[selectedOperator].sign;
  operators[selectedOperator].method(num1, num2);
  var optionArr = [6, 2, 9];

  if (optionArr.includes(operators[selectedOperator].method(num1, num2))) {
    optionArr.push(10);
  } else {
    optionArr.push(operators[selectedOperator].method(num1, num2));
  }

  var randomOptions = shuffleArray(optionArr);
  var questions = {
      question: `what is ${num1} ${operators[selectedOperator].sign} ${num2} ?`,
      answer: operators[selectedOperator].method(num1, num2),
      options: [
        optionArr[0],
        optionArr[1],
        optionArr[2],
        optionArr[3]
      ]
  }

  //set ques textContent //random ques
  const que_text = document.querySelector(".que_text");

  var que_tag = '<span>'+ (questionCounter +1) + ". " + questions.question+'</span>';
  // create options in html
  var option_tag = '<div class="option"><span>'+ questions.options[0] +'</span></div>'
                  + '<div class="option"><span>'+questions.options[1] +'</span></div>'
                  + '<div class="option"><span>'+ questions.options[2] +'</span></div>'
                  +'<div class="option"><span>'+ questions.options[3] +'</span></div>';

  que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  var correctans = questions.answer;
  const option = option_list.querySelectorAll(".option");

  for (var i = 0; i < option.length; i++) {
    option[i].setAttribute('onClick','optionSelected(this,'+questions.answer+')');
  }
  questionCounter+=1;
}


var tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
var crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer, correctAns){
  var userAns = answer.textContent;
  var allOptions = option_list.children.length;

  if (userAns == correctAns) {
    userScore+=1;
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);

    for (var i = 0; i < allOptions; i++) {
      option_list.children[i].classList.add("disabled");
    }
    next();

  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    gameOver.classList.add("activeOver");
    clearInterval(counter);
    clearInterval(counterLine);
  }
}


function showResultBox(a,b) {
  info_box.classList.remove("activeInfo"); //hide info box
  quiz_box.classList.remove("activeQuiz"); //hide quiz box
  result_box.classList.add("activeResult"); //show result box
  const scoreText =  result_box.querySelector(".score_text");

  if (a === "YOU") {
    let scoreTag = '<span>and the winner is <p>'+ 'YOU' +'</p>with time<p>'+b+'</p>s</span>';
    scoreText.innerHTML = scoreTag;
  } else {
    let scoreTag = '<span>The winner is <p>Player</p><p>'+a+'</p><p>with time</p><p>'+b+'</p>s</span>';
    scoreText.innerHTML = scoreTag;
  }

}

function startTimer(time){
  counter = setInterval(timer, 1000);
  function timer(){
    timeCount.textContent = time;
    time-=1;

    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0"+ addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
      timeOff.textContent = "Time Off";
      var t = document.querySelector(".timer_sec");
      info_box.classList.remove("activeInfo"); //hide info box
      quiz_box.classList.remove("activeQuiz"); //hide quiz box
      gameOver.classList.add("activeOver");
    }
  }
}

function startTimerLine(time){
  counterLine = setInterval(timer, 29);
  function timer(){
    time+=1;
    timeLine.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterLine);

    }
  }
}


function queCounter(index){
  const bottom_ques_counter = quiz_box.querySelector(".total_que");
  var totalQuesCount = '<span><p>'+ index +'</p>of<p>'+ 3 +'</p>Questions</span>';
  bottom_ques_counter.innerHTML = totalQuesCount;
}


//generate Leaderboard
function generateResults(){
    var t = document.querySelector(".timer_sec");
    clearInterval(counter);
    clearInterval(counterLine);
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box

    let users = {};
    for (let i=0;i<5;i++)
      users[i] = parseFloat((Math.random() * 14 ).toFixed(2));
    users[5] = (15 - t.textContent);
    let usersArray = Object.entries(users).sort((a,b)=>{return a[1]-b[1]})
    let showResults = document.querySelector(".showResults");
    showResults.classList.add("activeScore");

        for (var j = 1; j<7;j++) {
            if (usersArray[j-1][1] == (15 - t.textContent)) {
              let div = document.createElement('div');
              div.innerHTML = "YOU" + " : " + usersArray[j-1][1];
              showResults.appendChild(div);
            } else {
              let div = document.createElement('div');
              div.innerHTML = "PLAYER" + usersArray[j-1][0] + " : " + usersArray[j-1][1];
              showResults.appendChild(div);
            }
          }
          let winnerFinal = document.createElement('button');
          winnerFinal.innerHTML = "WINNER";
          var att = document.createAttribute("class");       // Creating a "class" attribute for winner
          att.value = "winner";                           // Setting the value of the class as winner
          winnerFinal.setAttributeNode(att);
          showResults.appendChild(winnerFinal);

          if (usersArray[0][1] == (15 - t.textContent)) {
            a = "YOU";
            b = usersArray[0][1];
          } else {
              a = usersArray[0][0];
              b = usersArray[0][1];
          }

          showResults.childNodes[3].style.color="green";

          var winnerButton = document.querySelector(".winner");
          winnerButton.onclick = function(){
            showResults.classList.remove("activeScore"); //hide Leaderboard box
            showResultBox(a,b);
          };

  }
