export async function newGame(data) {
  await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
    method: 'POST',
    body: JSON.stringify({ name: data }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => window.localStorage.setItem('currentGame', JSON.stringify(json.result.split(' ')[3])));
}

export async function fetchScores(id) {
  await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores/`)
    .then((response) => response.json())
    .then((json) => window.localStorage.setItem('scores', JSON.stringify(json.result)));
}

export async function addScore(id, playerName, playerScore) {
  await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores/`, {
    method: 'POST',
    body: JSON.stringify({ user: playerName, score: playerScore }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then(() => fetchScores(id));
}
