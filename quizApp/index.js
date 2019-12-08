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
<div>
  <h1 class="current-question">Question ${STORE.currentQuestion +1}/6</h1>
  <p class="question-content">${STORE.questionnaire[STORE.currentQuestion].question}</p>
</div>
<form id=quizOptions>
  <label for="option1"><input type="radio" name="options" id="option1" 
  required>${STORE.questionnaire[STORE.currentQuestion].option1}</label><br>

  <label for="option2"><input type="radio" name="options" id="option2" 
  required>${STORE.questionnaire[STORE.currentQuestion].option2}</label><br>

  <label for="option3"><input type="radio" name="options" id="option3" 
  required>${STORE.questionnaire[STORE.currentQuestion].option3}</label><br>

  <label for="option4"><input type="radio" name="options" id="option4" 
  required>${STORE.questionnaire[STORE.currentQuestion].option4}</label><br>
</form>
<div class="feedback-box">
    <span><i class="fas fa-times"></i></span><p class="feedback-answer">Nice try. The correct answer is actually: ${STORE.questionnaire[STORE.currentQuestion].answer}</p>
</div>
<div id="score-counter">
  <h3 class="score">Score:</h3>
  <span class="correct-icon"></span>${STORE.score}<span class="correct-count">#</span><br>
</div>
<div>
  <button type="button" class="submit-button">SUBMIT</button>
  <button type="button" class="next-button">NEXT</button>
</div>`;
}

function resultTemplate() {
  // Create elements for the result page
  return `
  <div class="start-page js-start-page">
    <h1 class="intro1">Quiz Complete!</h2>
        <p class="intro2">Score:</p>
        <p class="correct-icon intro2">${STORE.score}</p>
    <button class="introButton" type="submit">Try Again</button>
  </div>`;
}

function startPage() {
  // Create the start page
  $('main').html(startTemplate());
}


function startQuiz() {
  // Start the quiz when Begin or Play Again button is clicked
    $('main').on('click', '.introButton', event => {
      event.preventDefault();
      console.log('startQuiz');
      STORE.startQuiz = true;
      STORE.score = 0;
      STORE.currentQuestion = 0;
      presentQuestion();
    }); 
}

function presentQuestion() {
  // Show question
  console.log('presentQ');
  //generate html from question template
  $('main').html(questionTemplate());
  //hide feedback bos in html
  $('.feedback-box').hide();
  //hide next button - only show submit button
  $('.next-button').hide();

  nextQuestion();
  addEventHandlerToSubmitButton();
}

function nextButtonEventHandler() {
  event.preventDefault();
  console.log('nextQ');
  STORE.currentQuestion++;
  console.log(STORE.currentQuestion);
  if(STORE.currentQuestion < 5 && STORE.startQuiz === true){
    presentQuestion();
    $('.submit-button').show();
    $('.next-button').hide();
  }
  else{
    showResult();
  }
}

function nextQuestion() {
  // Show next question 
  if(STORE.currentQuestion === 0 && STORE.startQuiz === true){
    $('main').on('click', '.next-button', nextButtonEventHandler);
  }
}

function addEventHandlerToSubmitButton() {
  $('main').on('click', '.submit-button', event => {
    event.preventDefault();
    //console.log('event listener working for submit button');
    let answerSubmit = $("input[name='options']:checked").parent('label');
    console.log(answerSubmit.text());
    console.log(STORE.questionnaire[STORE.currentQuestion].answer);

    if (STORE.questionnaire[STORE.currentQuestion].answer === answerSubmit.text()) {
      correctAnswer(answerSubmit);
    } else {
      incorrectAnswer();
    }
     //if you click the submit button without selecting an answer, alert user to choose an option 
    let selectedOption = $("input[name=options]:checked").val();
    if (!selectedOption){
      alert('Please choose an option');
    }
  
    $('.submit-button').hide();
    $('.next-button').show();
    $('form input[name="options"]:radio').attr('disabled',true);
  });
}

function correctAnswer(answer){
  // If answer is correct add score
  STORE.score++;
  answer.css('color', 'green');
}

function incorrectAnswer() {
  // If answer is incorrect
  $('.feedback-box').show();
}

function showResult() {
  console.log(STORE.score);
  $('main').html(resultTemplate());
  console.log(STORE.score);
  $('main').on('click', '.introButton', event => {
    event.preventDefault();
    STORE.startQuiz = false;
    renderQuiz();
  });
}

function renderQuiz() {
  // Render app when loads
  startPage();

  if(STORE.startQuiz === false){
  startQuiz();
  }
}

$(renderQuiz());


