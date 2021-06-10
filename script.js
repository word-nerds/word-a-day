// pseudo code:

// add an Event Listener to the user input on button click and obtain the value.
// create a randomizer function to be called as needed.
// create a function that will loop through the selected day of the week(based on the user's value)
// call the randomizer function, to obtain the word and return it.

const wordApp = {};
wordApp.url = `https://wordsapiv1.p.rapidapi.com/words`;

// array of words by day of the week
wordApp.monday = [
  'jaunty','quandary','beseech','gumption','panache','rigmarole','feckless','sartorial','nudnik','ambiguous'
];
wordApp.tuesday = [
  'bricolage','serendipity','bedevil','flummox','fanfare','bamboozle','brouhaha','zeal','flimflam','emaciate'
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

// Event listener for the form submit
wordApp.usersChoice = () => {
  wordApp.form = document.querySelector('form');
  
  wordApp.form.addEventListener('submit', function(e) {
    e.preventDefault();
    const day = document.querySelector('input[type=radio]:checked').value;

    const wordArray = wordApp[day];
    console.log(wordArray);

    // Call randomizer function to get random word
    const selectedIndex = wordApp.randomizer(wordArray);

    const chosenWord =  wordArray[selectedIndex];
    // wordApp.chosenWord = wordArray[selectedIndex];
    console.log(chosenWord);
    wordApp.getData(chosenWord);
    wordApp.gifListener(chosenWord);
  })
}

// Randomizer function using array length of words
wordApp.randomizer = (wordArray) => {
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  return randomIndex;
};

// Our first API data call
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

// Display function to 
wordApp.displayInfo = (dataFromApi) => {
  // console.log(dataFromApi);
  document.querySelector('input[type=radio]:checked').checked = false;
  const wordContainer = document.querySelector('.word-container');
  // console.log(wordContainer);
  wordContainer.innerHTML = `
  <h3> ${dataFromApi.word} </h3>
  <p id="pronunciation"> ${dataFromApi.pronunciation.all}</p>
  <p id="definition">Definition: ${dataFromApi.results[0].definition}.</p>
  <p id="synonym"></p>
  `;
  // error handling for words with no synonym data to display
  if (dataFromApi.results[0].synonyms === undefined) {
    document.getElementById('synonym').innerHTML = `
    <p> Synonym: Whomp! This word is one of a kind.</p>
    `;
  } else {
    document.getElementById('synonym').innerHTML = `
    <p> Synonym: ${dataFromApi.results[0].synonyms[0]} </p>
    `;
  }
}

wordApp.gifFinder = (chosenWord) => {
  const gifUrl = new URL('https://api.giphy.com/v1/gifs/search');
  gifUrl.search = new URLSearchParams({
    api_key: "BbrPWjSba6HH8wrtz8PPt5CY6XDTT5qa",
    q: chosenWord,
    limit: 1
  });
  
  fetch(gifUrl)
    .then(gifData => {
      return gifData.json();
    })
    .then(gifObject => {
      const chosenGif = gifObject.data[0].images.original.url;
      console.log(chosenGif);
      wordApp.displayGif(chosenGif);
    })
}

wordApp.gifListener = (chosenWord) => {
  wordApp.tile = document.querySelector('.blank-tile');
  wordApp.tile.addEventListener('click', function(){
    wordApp.gifFinder(chosenWord);
  })
}

wordApp.displayGif = (chosenGif) => {
  // find the img to replace in gif container section
  const newImage = document.querySelector('.giphy-gif img');

  // replace src on image, remove existing image class add class for gif styling
  newImage.src = chosenGif;
  newImage.alt = "a random gif image generated from the word of the day.";
  newImage.classList.remove('blank-tile');
  newImage.classList.add('gif-styles');
}

wordApp.init = () => {
  wordApp.usersChoice();
}

wordApp.init();