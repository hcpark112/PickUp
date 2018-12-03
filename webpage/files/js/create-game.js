// Initialize Firebase
var config = {
  apiKey: "AIzaSyD0bFMT_-dlAfllbPc2rJXhZRnrJIERwv8",
  authDomain: "pickup-1541825853857.firebaseapp.com",
  databaseURL: "https://pickup-1541825853857.firebaseio.com",
  projectId: "pickup-1541825853857",
  storageBucket: "pickup-1541825853857.appspot.com",
  messagingSenderId: "51007491965"
};
firebase.initializeApp(config);

var createRef = firebase.database().ref().child('PickUp').child('CreatedGames');

/**Creates a new game in a database.*/
function createGame(name, sport, size, location, date, time, duration, owner){
  createRef.child(name).set({
    sport: sport,
    size: size,
    location: location,
    date: date,
    time: time,
    duration: duration,
    owner: owner
  });
}


/*******************************************************************************
***************************MISC PAGE FUNCTIONS**********************************
********************************************************************************/

/**Goes to mainpage.html when you click the back button.*/
function goBack() {
  window.location.href = "mainpage.html";
}

/**Grabs the values from the form and passes them to the create game function.*/
function parseForm(form) {
  let name = form.LobbyName.value;
  let sport = form.SportList.value;
  let size = form.Size.value;
  let location = form.Location.value;
  let date = convertDate(form.Date.value);
  let time = form.Time.value;
  let duration = form.Hours.value;

  createGame(name, sport, size, location, date, time, duration, "test");
}

/**
 * Converts the date to MMM/DD/YYY Format. Example: SEP/01/2010
 *
 * @param date the date taken from the form.
 */
function convertDate(date) {
  let dateArr = date.split("-"), month = formatMonth(dateArr[1]);
  return month + "/" + dateArr[2] + "/" + dateArr[0];
}

/**
 * Converts the month number into a string.
 *
 * @param month the month number from the form.
 */
function formatMonth(month) {
  switch(parseInt(month)) {
    case 01:
      return "JAN";
    case 02:
      return "FEB";
    case 03:
      return "MAR";
    case 04:
      return "APR";
    case 05:
      return "MAY";
    case 06:
      return "JUN";
    case 07:
      return "JUL";
    case 08:
      return "AUG";
    case 09:
      return "SEP";
    case 10:
      return "OCT";
    case 11:
      return "NOV";
    case 12:
      return "DEC";
    default:
      throw "Error: Not valid month";
  }
}
