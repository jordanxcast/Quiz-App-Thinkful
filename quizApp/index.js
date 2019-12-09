/* eslint-disable indent */
/* eslint-disable strict */

// Quiz questions
const STORE = {
  questionnaire: [
    {question: 'Who is the youngest Disney princess?',
      option1: 'Mulan',
      option2: 'Cinderella',
      option3: 'Snow White',
      option4: 'Belle',
      answer: 'Snow White'},
    {question: 'Who is the only Disney Princess who isn’t royalty',
      option1: 'Mulan',
      option2: 'Jasmine',
      option3: 'Pocahontas',
      option4: 'Ariel',
      answer: 'Mulan'}, 
    {question: 'Who was the first Disney Princess to demonstrate an intellectual persona?',
      option1: 'Mulan',
      option2: 'Aurora',
      option3: 'Jasmine',
      option4: 'Belle',
      answer: 'Belle'}, 
    {question: 'Who is the only Disney Princess with dimples?',
      option1: 'Jasmine',
      option2: 'Tiana',
      option3: 'Ariel',
      option4: 'Belle',
      answer: 'Tiana'}, 
    {question: 'Who is the only Disney Princess with hazel eyes?',
      option1: 'Aurora',
      option2: 'Jasmine',
      option3: 'Ariel',
      option4: 'Belle',
      answer: 'Belle'}, 
    {question: 'Who is the only Disney Princess with a tattoo?',
      option1: 'Mulan',
      option2: 'Jasmine',
      option3: 'Pocahontas',
      option4: 'Ariel',
      answer: 'Pocahontas'}, 
  ],
  score: 0,
  startQuiz: false,
  currentQuestion: 0
};
 
/**
 *
 * Your app should include a render() function, that regenerates
 * the view each time the store is updated. See your course
 * material, consult your instructor, and reference the slides
 * for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 */

function startTemplate() {
  // Create elements for the start page
  return `
    <div class="start-page js-start-page">
      <h1 class="intro1">Think You Know Disney Princesses?</h1>
      <p class="intro2">Take this quiz to find out!</p>
      <button class="introButton" type="submit">Let's Begin~</button>
    </div>
  `;
}

function questionTemplate() {
  // Create elements for the questions page
  return `
<div class="questionContainer">
  <h1 class="current-question">Question ${STORE.currentQuestion +1}/6</h1>
  <p class="question-content">${STORE.questionnaire[STORE.currentQuestion].question}</p>
</div>
<form id=quizOptions>
  <label for="option1"><input type="radio" name="options" id="option1"
  >${STORE.questionnaire[STORE.currentQuestion].option1}</label><br>

  <label for="option2"><input type="radio" name="options" id="option2" 
  >${STORE.questionnaire[STORE.currentQuestion].option2}</label><br>

  <label for="option3"><input type="radio" name="options" id="option3" 
  >${STORE.questionnaire[STORE.currentQuestion].option3}</label><br>

  <label for="option4"><input type="radio" name="options" id="option4" 
  >${STORE.questionnaire[STORE.currentQuestion].option4}</label><br>
</form>
<div class="feedback-box">
    <span><i class="fas fa-times"></i></span><span><p class="feedback-answer">Nice try. The correct answer is actually: ${STORE.questionnaire[STORE.currentQuestion].answer}</p></span>
</div>
<section class="bottom">
  <div id="score-counter">
    <h3 class="score">Score:</h3>
    <span class="correct-count">${STORE.score}</span>
  </div>
  <div class="button-container">
    <button type="button" class="submit-button">SUBMIT</button>
    <button type="button" class="next-button">NEXT</button>
  </div>
</section>`;
}

function resultTemplate() {
  // Create elements for the result page
  return `
  <div class="start-page js-start-page">
    <h1 class="intro1">Quiz Complete!</h2>
        <p class="intro2">Score:</p>
        <p class="correct-icon score-result">${STORE.score}</p>
    <button class="introButton" type="submit">Try Again</button>
  </div>`;
}

function startPage() {
  // Create the start page
  $('main').html(startTemplate());
  startQuiz();
}

function startQuiz() {
  // Start the quiz when Begin or Play Again button is clicked
  $('main').on('click', '.introButton', event => {
    event.preventDefault();
    //console.log('startQuiz');
    STORE.startQuiz = true;
    STORE.score = 0;
    STORE.currentQuestion = 0;
    presentQuestion();
  }); 
}


function presentQuestion() {
  // Show question
  //Generate html from question template
  $('main').html(questionTemplate());
  //Hide feedback bos in html
  $('.feedback-box').hide();
  //Hide next button - only show submit button
  $('.next-button').hide();

  handlesNextButton();
  // handlesSubmitButton();
}

function nextQuestion() {
  //If the current question is not the last question, then we generate the next question
  event.preventDefault();
  if(STORE.currentQuestion < 5 && STORE.startQuiz === true){
    updateQuestionNum();
    presentQuestion();    

    $('.submit-button').show();
    $('.next-button').hide();
  }
  else{
    showResult();
  }
}

function updateQuestionNum(){
  STORE.currentQuestion++;
}

function handlesNextButton() {
  // Show next question 
  if(STORE.currentQuestion === 0 && STORE.startQuiz === true){
    $('main').on('click', '.next-button', nextQuestion);
  }
}

function checkForSelection() {
  // Check to see if one radio option is selected
 if($('input:radio').is(':checked')) {
  let answerSubmit = $("input[name='options']:checked").parent('label');

  if (STORE.questionnaire[STORE.currentQuestion].answer === answerSubmit.text()) {
    correctAnswer(answerSubmit);
  } else {
    incorrectAnswer();
  }

  $('.submit-button').hide();
  $('.next-button').show();
  $('form input[name="options"]:radio').attr('disabled',true);
  }
  else {
    alert('Please choose an option');
    return false;
  }
}

function handlesSubmitButton() {
  //Checking for if the submit button is clicked and then check for the solution
  $('main').on('click', '.submit-button', event => {
    event.preventDefault();
    checkForSelection();
  });
}

function correctAnswer(answer){
  //and change css to green
  answer.css('color', 'green');
  //call update score function
  updateScore();
}

function updateScore(){
  STORE.score++;
}

function incorrectAnswer() {
  // If answer is incorrect show the feedback box the right answer 
  $('.feedback-box').show();
}

function showResult() {
  //shows the result page html
  //if the try again button is clicked then restart quiz 
  $('main').html(resultTemplate());
}

function restartQuiz(){
  $('main').on('click', '.introButton', event => {
    event.preventDefault();
    STORE.startQuiz = false;
    renderQuiz();
  });
}

function renderQuiz() {
  // Render app when loads
  startPage();
  // if (STORE.startQuiz = true){
  //   startQuiz();
  // }
  handlesNextButton();
  handlesSubmitButton();
}

$(renderQuiz());


