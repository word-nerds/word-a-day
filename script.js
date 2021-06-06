// pseudo code:
// create an array of 10 words for each day of the week.
// add an Event Listener to the user input on button click and obtain the value.
// create a randomizer function to be called as needed.
// create a function that will loop through the selected day of the week(based on the user's value)
// call the randomizer function, to obtain the word and return it.

const wordApp = {};
wordApp.url = `https://wordsapiv1.p.rapidapi.com/words`;

wordApp.monday = [
  'jaunty','quandary','beseech','gumption','panache','rigmarole','feckless','sartorial','nudnik','ambiguous'
];
wordApp.tuesday = [
  'bricolage','serendipity','bedevil','flummox','dowdy','bamboozle','brouhaha','zeal','flimflam','emaciate'
];
wordApp.wednesday = [
  'colloquial','sempiternal','reticent','clandestine','ennui','supine','ephemeral','raconteur','lassitude','paradox'
];
wordApp.thursday = [
  'effervescent','tryst','ebullience','gossamer','encumber','saunter','bucolic','forbearance','talisman','pablum'
];
wordApp.friday = [
  'lollygag','scofflaw','ineffable','pettifog','thwart','noxious','wayfarer','opine','altruistic','reverie'
];
wordApp.saturday = [
  'voracity','cantankerous','umbra','salient','hubris','uncouth','bombastic','fluvial','capricious','flippant'
];
wordApp.sunday = [
  'mercurial','stoicism','persnickety','hyperbolic','crestfallen','rambunctious','ubiquitous','languish','whimsical','incognito'
];


wordApp.usersChoice = () => {
  wordApp.form = document.querySelector('form');
  
  wordApp.form.addEventListener('submit', function(e) {
    e.preventDefault();
    const day = document.querySelector('input[type=radio]:checked').value;
    // console.log(day);
    // console.log(wordApp[day]);
    const wordArray = wordApp[day];
    console.log(wordArray);
    // access the array using a randomized number
    // store the chosen word in a variable
    const selectedIndex = wordApp.randomizer();
    // console.log(selectedIndex);
    const chosenWord =  wordArray[selectedIndex];
    console.log(chosenWord);
    wordApp.getData(chosenWord);  
  })
}

wordApp.randomizer = () => {
  const randomIndex = Math.floor(Math.random() * 10);
  return randomIndex;
}

wordApp.getData = (chosenWord) => {
  const apiUrl = new URL(`${wordApp.url}/${chosenWord}`);
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
      // console.log(result);
      wordApp.displayInfo(result);
    })
}

wordApp.displayInfo = (dataFromApi) => {
  console.log(dataFromApi);
  const wordContainer = document.querySelector('.word-container');
  console.log(wordContainer);
  wordContainer.innerHTML = `
  <h2> ${dataFromApi.word} </h2>
  <p> ${dataFromApi.pronunciation.all} </p>
  <p> ${dataFromApi.results[0].definition} </p>
  <p> Synonym: ${dataFromApi.results[0].synonyms[0]} </p>
  `;
  // need to remove last <p>, put into an if statement to catch the NO SYNONYM error
}

wordApp.init = () => {
  wordApp.usersChoice();
  // wordApp.getData();
}

wordApp.init();