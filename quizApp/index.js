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
  return `<div class="start-page js-start-page">
  <h1 class="intro1">Think You Know Disney Princesses?</h2>
  <p class="intro2">Take this quiz to find out!</p>
  <button class="introButton" type="submit">Let's Begin~</button>
</div>`;
}

function questionTemplate() {
  // Create elements for the questions page
  return `<div>
  <h1 class="current-question">Question ${STORE.currentQuestion + 1}/5</h1>
  <p class="question-content">${STORE.questionnaire[currentQuestion].question}</p>
</div>
<div>
  <label for="option1">${STORE.questionnaire[currentQuestion].option1}</label>
  <input type="radio" name="options" id="option1" required><br>
  <label for="option2">${STORE.questionnaire[currentQuestion].option2}</label>
  <input type="radio" name="options" id="option2" required><br>
  <label for="option3">${STORE.questionnaire[currentQuestion].option3}</label>
  <input type="radio" name="options" id="option3" required><br>
  <label for="option4">${STORE.questionnaire[currentQuestion].option4}</label>
  <input type="radio" name="options" id="option4" required><br>
</div>
<div class="feedback-box">
    <span><i class="fas fa-times"></i></span><p class="feedback-answer">Nice try. The correct answer is actually: ${STORE.questionnaire[currentQuestion].answer}</p>
</div>
<div id="score-counter">
  <h3 class="score">Score:</h3>
  <span class="correct-icon"></span>${STORE.score}<span class="correct-count">#</span><br>
  <span class="wrong-icon"></span>${5 - STORE.currentQuestion} <span class="wrong-count">#</span>
</div>
<div>
  <button type="button" class="submit-button">SUBMIT</button>
</div>`;
}

function resultTemplate() {
  // Create elements for the result page
  return `<div class="start-page js-start-page">
  <h1 class="intro1">Quiz Complete!</h2>
  <p class="intro2 js-score">Score</p>
  <button class="introButton" type="submit">Try Again</button>
  </div>`;
}

function startPage() {
  // Create the start page
  $('main').html(startTemplate());
}

function presentQuestion() {
  // Before question is presented, checks a few items
  if(currentQuestion===1 && startQuiz === true){
    $('feedback-box').hide();
    $('main').html(questionTemplate());
  }
}

function startQuiz() {
  // Start the quiz when Begin or Play Again is clicked
  $('js-start-page').on('click', '.introButton', event => {
    presentQuestion();
    STORE.startQuiz = true;
    STORE.score = 0,
    STORE.currentQuestion = 1;
  });
}

function submitAnswer() {
  // Check answer and run the next question
  $('main').on('click', '.submit-button', event => {
    let answerSubmit = $('input[name=options]: checked').val();
    if (STORE.questionnaire[currentQuestion].answer === answerSubmit) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }
  });
}

function correctAnswer(){
  // If answer is correct
  $(STORE.questionnaire[currentQuestion].answer).toggleClass('color', 'green');
}

function incorrectAnswer() {
  // If answer is incorrect
  $('feedback-box').show();
}

function renderQuiz() {
  // Render app when loads
  startPage();
  startQuiz();
  submitAnswer();
}

$(renderQuiz);


