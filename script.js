// pseudo code:
// create an array of 10 words for each day of the week.
// add an Event Listener to the user input on button click and obtain the value.
// create a randomizer function to be called as needed.
// create a function that will loop through the selected day of the week(based on the user's value)
// call the randomizer function, to obtain the word and return it.

const wordApp = {};
wordApp.url = `https://wordsapiv1.p.rapidapi.com/words/jaunty`;

wordApp.monday = [
  'jaunty','quandary','beseech','gumption','panache','rigmarole','feckless','sartorial','nudnik','ambiguous'
],
wordApp.tuesday = [
  'bricolage','lucida','petrichor','flummox','dowdy','bamboozle','brouhaha','zeal','flimflam','emaciate'
],
wordApp.wednesday = [
  'colloquial','sempiternal','reticent','clandestine','ennui','supine','ephemeral','raconteur','lassitude','paradox'
],
wordApp.thursday = [
  'effervescent','tryst','ebullience','gossamer','mondegreen','saunter','bucolic','forbearance','talisman','frondeur'
],
wordApp.friday = [
  'lollygag','scofflaw','ineffable','screenager','thwart','noxious','wayfarer','opine','altruistic','reverie'
],
wordApp.saturday = [
  'voracity','cantankerous','umbra','salient','hubris','uncouth','minutiae','octothorp','capricious','flippant'
],
wordApp.sunday = [
  'mercurial','stoicism','persnickety','hyperbolic','crestfallen','rambunctious','ubiquitous','languish','whimsical','incognito'
]


wordApp.usersChoice = () => {
  wordApp.form = document.querySelector('form');
  
  wordApp.form.addEventListener('submit', function(e) {
    e.preventDefault();
    const day = document.querySelector('input[type=radio]:checked').value;
    console.log(day);

    if (day === wordApp.day) {
      // call randomizer function
    }
  })
}

wordApp.randomizer = () => {
  const randomIndex = Math.floor(Math.random() * 10) + 1;
  console.log(randomIndex);
}
wordApp.randomizer(wordApp.monday);

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
  wordApp.usersChoice();
  wordApp.getData();
}

wordApp.init();