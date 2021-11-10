import './reset.css';
import './style.css';
import * as game from './calls.js';

let actualGame;
let scores;
const notice = document.querySelector('.notice');

function setGame() {
  if (window.localStorage.getItem('currentGame')) {
    actualGame = JSON.parse(window.localStorage.getItem('currentGame'));
  } else {
    game.newGame('Quidditch');
    actualGame = JSON.parse(window.localStorage.getItem('currentGame'));
  }
}

function sortingHat() {
  const houseId = Math.floor(Math.random() * 4);
  let house;
  if (houseId === 0) house = 'Gryffindor';
  if (houseId === 1) house = 'Hufflepuff';
  if (houseId === 2) house = 'Ravenclaw';
  if (houseId === 3) house = 'Slytherin';
  return house;
}

function fillScores() {
  document.querySelector('.score-list').innerHTML = '';
  scores.forEach((score) => {
    const li = document.createElement('li');
    li.classList.add('score-unit');
    li.innerText = score.user;
    const house = document.createElement('span');
    house.innerText = sortingHat();
    const span = document.createElement('span');
    span.innerText = score.score;
    li.append(house, span);
    document.querySelector('.score-list').appendChild(li);
  });
}

function getScores() {
  game.fetchScores(actualGame);
  scores = JSON.parse(window.localStorage.getItem('scores'));
  fillScores();
}

document.querySelector('.add-score-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const player = document.querySelector('#name').value;
  const score = document.querySelector('#score').value;
  game.addScore(actualGame, player, score);
  document.querySelector('#name').value = '';
  document.querySelector('#score').value = '';
  notice.style.opacity = 1;
  setTimeout(() => {
    notice.style.opacity = 0;
  }, 500);
});

document.querySelector('#refresh').addEventListener('click', getScores);

setGame();
getScores();
