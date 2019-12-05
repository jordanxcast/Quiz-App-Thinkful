/* eslint-disable strict */

function startTemplate() {
  // Create elements for the start page
  return `<div class="start-page js-start-page">
  <h1 class="intro1">Think You Know Disney Princesses?</h2>
  <p class="intro2">Take this quiz to find out!</p>
  <button class="introButton" type="submit">Let's Begin~</button>
</div>`;
}

function quizTemplate() {
  // Create elements for the questions page

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
  $('main').html(startTemplate);
}

function renderQuiz() {
  // Render app when loads
  startPage();
}

