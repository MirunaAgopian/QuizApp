let questions = [
  {
    "question": "Wer hat HTML erfunden?",
    "answers": [
      "Michael Jackson",
      "Miruna Agopian",
      "Tim Berners-Lee",
      "Lady Gaga",
    ],
    "right_answer": 2,
  },
  {
    "question": "Welches Attribut kann man NICHT für Textarea verwenden?",
    "answers": [
      "readonly",
      "max",
      "from",
      "spellcheck",
    ],
    "right_answer": 0,
  },
  {
    "question": "Wie wählt man alle Elemente vom Typ &lt;a&gt; mit dem Attribut title aus?",
    "answers": [
      "a[title]{...}",
      "a > title {...}",
      "a.title {...}",
      "a=title {...}",
    ],
    "right_answer": 0,
  },
  {
    "question": "Wie definiert man eine Variable in JavaScript?",
    "answers": [
      "let 100 = rate;",
      "100 = let rate;",
      "rate = 100;",
      "let rate = 100;",
    ],
    "right_answer": 3,
  },
  {
    "question": "Was bedeutet das HTML Tag &lt;a&gt;?",
    "answers": [
      "Text Fett",
      "Container",
      "Ein Link",
      "Kursiv",
    ],
    "right_answer": 2,
  },
  {
    "question": "Wie bindet man eine Webseite in eine andere ein?",
    "answers": [
      "&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;",
      "&lt;iframe&gt;",
      "&lt;frame&gt;",
      "&lt;frameset&gt;",
    ],
    "right_answer": 3,
  },
   {
    "question": "Welches Attribut muss man in einem &lt;a&gt; hinzufügen?",
    "answers": [
      "src",
      "alt",
      "max",
      "href",
    ],
    "right_answer": 3,
  }  
];

let currentQuestion = 0;
let rightNrOfQuestions = 0;
let audioSuccess = new Audio('./audio/correct.wav');
let audioFail = new Audio('./audio/wrong.wav');

function render(){
    let questionTotal = document.getElementById('all_questions');
    questionTotal.innerHTML = questions.length;

    showCurrentQuestion();
}

//Like so should a good refractored funcion look!
function showCurrentQuestion(){
  if(gameIsOver()){
    showEndScreen();
  } else {
    updateProgressBar();
    showQuestionScreen();
  }
}

function gameIsOver(){
 return currentQuestion >= questions.length;
}

function showEndScreen(){
    document.getElementById('quizz_end').classList.remove('d-none');
    document.getElementById('quizz_body').classList.add('d-none');
    document.getElementById('right_nr_questions').innerHTML = rightNrOfQuestions;
    document.getElementById('total_questions').innerHTML = questions.length;
    document.getElementById('quizz_img').src = "./assets/win.webp";
}

function showQuestionScreen(){
    let question = questions[currentQuestion];
    document.getElementById('question_text').innerHTML = question.question;
    document.getElementById('answer_0').innerHTML = question.answers[0];
    document.getElementById('answer_1').innerHTML = question.answers[1];
    document.getElementById('answer_2').innerHTML = question.answers[2];
    document.getElementById('answer_3').innerHTML = question.answers[3];
}

function updateProgressBar(){
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress_bar').innerHTML = `${percent}%`;
    document.getElementById('progress_bar').style = `width: ${percent}%;`;
}

function evaluateAnswer(selection){ 
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1) ; //to select the index, not the element
    let idOfRightAnswer =`answer_${question.right_answer}`; 
    
    if(rightAnswerSelected(selectedQuestionNumber)) {
        document.getElementById(selection).parentNode.classList.add('bg-success-subtle');
        audioSuccess.play();
        rightNrOfQuestions++;
        
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger-subtle');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success-subtle');
        audioFail.play();
    }
    document.getElementById("next_btn").disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber){
  let question = questions[currentQuestion];
  return selectedQuestionNumber == question.right_answer;
}

function changeQuestion(){
  currentQuestion++;
  document.getElementById("next_btn").disabled = true;
  resetAnswerColor();
  changeNrOfCurrenrQuestion();
  showCurrentQuestion();
}

function resetAnswerColor(){
  document.getElementById('answer_0').parentNode.classList.remove('bg-danger-subtle');
  document.getElementById('answer_0').parentNode.classList.remove('bg-success-subtle');

  document.getElementById('answer_1').parentNode.classList.remove('bg-danger-subtle');
  document.getElementById('answer_1').parentNode.classList.remove('bg-success-subtle');

  document.getElementById('answer_2').parentNode.classList.remove('bg-danger-subtle');
  document.getElementById('answer_2').parentNode.classList.remove('bg-success-subtle');

  document.getElementById('answer_3').parentNode.classList.remove('bg-danger-subtle');
  document.getElementById('answer_3').parentNode.classList.remove('bg-success-subtle');
}

function changeNrOfCurrenrQuestion(){
  let currentQuestionNr =  document.getElementById('current_question_nr');
  let currentValue = parseInt(currentQuestionNr.innerText, 10);

    currentValue++;
    currentQuestionNr.innerText = currentValue;

}


function restartGame(){
  document.getElementById('quizz_img').src = "./assets/quiz_img.jpg";
  document.getElementById('quizz_end').classList.add('d-none');
  document.getElementById('quizz_body').classList.remove('d-none');

  currentQuestion = 0;
  rightNrOfQuestions = 0;
  
  let currentQuestionNr =  document.getElementById('current_question_nr');
  currentQuestionNr.innerText = 1;

  render();
}
