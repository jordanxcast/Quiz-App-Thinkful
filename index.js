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
  // Creates elements for the start page
  return `
    <div class="start-page js-start-page">
      <h1 class="intro1">Think You Know Disney Princesses?</h1>
      <p class="intro2">Take this quiz to find out!</p>
      <button class="introButton" type="submit">Let's Begin~</button>
    </div>
  `;
}

function questionTemplate() {
  // Creates elements for the questions page
  return `
<section class="questionContainer">
  <h1 class="current-question">Question ${STORE.currentQuestion +1}/6</h1>
  <p class="question-content">${STORE.questionnaire[STORE.currentQuestion].question}</p>
</section>
<form id=quizOptions aria-label="Answer choice options">
  <label for="option1"><input type="radio" name="options" id="option1"
  >${STORE.questionnaire[STORE.currentQuestion].option1}</label><br>

  <label for="option2"><input type="radio" name="options" id="option2" 
  >${STORE.questionnaire[STORE.currentQuestion].option2}</label><br>

  <label for="option3"><input type="radio" name="options" id="option3" 
  >${STORE.questionnaire[STORE.currentQuestion].option3}</label><br>

  <label for="option4"><input type="radio" name="options" id="option4" 
  >${STORE.questionnaire[STORE.currentQuestion].option4}</label><br>
</form>
<section class="feedback-box">
    <span><i class="fas fa-times"></i></span><span><p class="feedback-answer">Nice try. The correct answer is actually: ${STORE.questionnaire[STORE.currentQuestion].answer}</p></span>
</section>
<section class="bottom">
  <div id="score-counter">
    <h2 class="score">Score:</h2>
    <span class="correct-count">${STORE.score}</span>
  </div>
  <div class="button-container">
    <button type="button" class="submit-button">SUBMIT</button>
    <button type="button" class="next-button">NEXT</button>
  </div>
</section>`;
}

function resultTemplate() {
  // Creates elements for the result page
  return `
  <div class="start-page js-start-page">
    <h1 class="intro1">Quiz Complete!</h2>
        <p class="intro2">Score:</p>
        <p class="correct-icon score-result">${STORE.score}</p>
    <button class="introButton" type="submit">Try Again</button>
  </div>`;
}

function startPage() {
  // Creates the start page
  $('main').html(startTemplate());
  startQuiz();
}

function startQuiz() {
  // Listens for when to start the quiz
  $('main').on('click', '.introButton', event => {
    event.preventDefault();
    STORE.startQuiz = !STORE.startQuiz;
    STORE.score = 0;
    debugger;
    STORE.currentQuestion = 0;
    debugger;
    presentQuestion();
  }); 
}

function presentQuestion() {
  // Shows question
  $('main').html(questionTemplate());
  $('.feedback-box').hide();
  $('.next-button').hide();
  debugger;
  //handlesNextButton();
}

function updateQuestionNum(){
  // Increments the current question
  debugger;
  STORE.currentQuestion++;
  console.log(STORE.currentQuestion);
}

function nextQuestion() {
  // Shows the next question or if it's the last question, shows the results
  event.preventDefault();
  if(STORE.currentQuestion < 5){
    debugger;
    updateQuestionNum();
    presentQuestion();    
    $('.submit-button').show();
    $('.next-button').hide();
  }
  else{
    showResult();
  }
}

function handlesNextButton() {
  // Listens for when to display the next question
  //if(STORE.currentQuestion === 0 && STORE.startQuiz === true){
    $('main').on('click', '.next-button', nextQuestion);
  //}
}

function checkForSelection() {
  // Checks the answer if an option is selected, else alert the user
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
  // Listens for when user submits to check the answer
  $('main').on('click', '.submit-button', event => {
    event.preventDefault();
    checkForSelection();
  });
}

function correctAnswer(answer){
  // Highlights the correct answer
  answer.css('color', 'green');
  // Calls the function to update score
  updateScore();
}

function updateScore(){
  // Increments the score
  STORE.score++;
}

function incorrectAnswer() {
  // Shows the correct answer if user selection is incorrect
  $('.feedback-box').show();
}

function showResult() {
  // Shows the result page html
  $('main').html(resultTemplate());
}

function restartQuiz(){
  // Listens for when the user wants to play again
  $('main').on('click', '.introButton', event => {
    event.preventDefault();
    STORE.startQuiz = false;
    renderQuiz();
  });
}

function renderQuiz() {
  // Render app when loads
  startPage();
  handlesNextButton();
  handlesSubmitButton();
}

$(renderQuiz());


