// pseudo code:
// create an array of 10 words for each day of the week.
// add an Event Listener to the user input on button click and obtain the value.
// create a randomizer function to be called as needed.
// create a function that will loop through the selected day of the week(based on the user's value)
// call the randomizer function, to obtain the word and return it.

// fetch(`https://wordsapiv1.p.rapidapi.com/words/tenacity`, {
//   'method': 'GET',
//   'headers': {
//     'x-rapidapi-key': 'fc2f5f842fmsh9040c3bedc1e59ep161878jsn8475b76c4099',
//     'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
//   }
// })
//   .then(response => {
//     return response.json();
//   })
//   .then(result => {
//     console.log(result);
//   })

const wordApp = {};
wordApp.url = `https://wordsapiv1.p.rapidapi.com/words/lollygag`;


wordApp.getData = () => {
  const apiUrl = new URL(wordApp.url);
  fetch(apiUrl, {
    'method': 'GET',
    'headers': {
      'x-rapidapi-key': 'fc2f5f842fmsh9040c3bedc1e59ep161878jsn8475b76c4099',
      'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
    }
  })
    .then(response => {
      return response.json();
    })
    .then(result => {
      console.log(result);
    })
}


wordApp.init = () => {
  wordApp.getData();
}

wordApp.init();