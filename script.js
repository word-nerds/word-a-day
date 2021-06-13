// pseudo code throughout

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

    // Call randomizer function to get random word
    const selectedIndex = wordApp.randomizer(wordArray);

    const chosenWord =  wordArray[selectedIndex];
    
    // Call the function to initiate API call
    wordApp.getData(chosenWord);
    // Smooth scroll to loaded word data
    const location = document.querySelector('.banner-image');
    location.scrollIntoView();    
    // Call the gif listener function
    wordApp.gifListener(chosenWord);
  })
}

// Randomizer function using array length of words
wordApp.randomizer = (wordArray) => {
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  return randomIndex;
};

// Our first API data call to words api
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
      wordApp.displayInfo(result);
    })
}

// Display function to add HTML with word information to page
wordApp.displayInfo = (dataFromApi) => {
  document.querySelector('input[type=radio]:checked').checked = false;
  const wordContainer = document.querySelector('.word-container');
  
  wordContainer.innerHTML = `
  <h3> ${dataFromApi.word} </h3>
  <p id="pronunciation"> ${dataFromApi.pronunciation.all}</p>
  <p id="definition">Definition: ${dataFromApi.results[0].definition}.</p>
  <p id="synonym"></p>
  `;
  // Error handling for words with no synonym data to display
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

// Second API call to giphy api
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
      // Calling the display function
      wordApp.displayGif(chosenGif);
    })
}

// Function to add event listener on the blank tile click
wordApp.gifListener = (chosenWord) => {
  wordApp.tile = document.querySelector('.blank-tile');
  wordApp.tile.addEventListener('click', function(){
    // Calling the gifFinder function with the word of the day
    wordApp.gifFinder(chosenWord);
  })
}

// Function to display gif on the HTML page
wordApp.displayGif = (chosenGif) => {
  // Find the img to replace in gif container section
  const newImage = document.querySelector('.giphy-gif img');

  // Replace src on image, remove existing image class add class for gif styling
  newImage.src = '';
  newImage.src = chosenGif;
  newImage.alt = "a random gif image generated from the word of the day.";
  newImage.classList.remove('blank-tile');
  newImage.classList.add('gif-styles');
}

wordApp.init = () => {
  wordApp.usersChoice();
}

wordApp.init();