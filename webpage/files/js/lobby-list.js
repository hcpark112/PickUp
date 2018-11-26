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
var dbRef = firebase.database();
var gamesRef = firebase.database().ref().child('PickUp').child('Games');

$(document).ready(function() {
  //replaces drop down button text with selection
  $("#drop a").click(function() {
      $("#sort button").html($(this).html());
    });
});

//creates a random number of lobbies if no argument given,
//else creates a lobby argument[0] number of times
function numLobby() {
  if(arguments[0] == null) {
    var rand = ((Math.random() * 20) + 6) | 0;

    for(var i = 0; i < rand; i++) {
      createLobby();
    }
  } else {
    for(var i = 0; i < arguments[0]; i++) {
      createLobby();
    }
  }
}

//creates a lobby
function createLobby() {
  var date = randDate();
  var size = randSize();

  var lobbyDiv = $("<div class = 'lobby'></div>");
  $("#lobby-list-content").append(lobbyDiv);

  var boxDiv = $("<div class = 'box'></div>");
  $(lobbyDiv).append(boxDiv);

  var eventDateDiv = $("<div class = 'event-date'></div>");
  $(boxDiv).append(eventDateDiv);
  $(eventDateDiv).append("<img src = './files/images/calendar.png' alt = 'calendar'><div>" + date + "</div>");

  var eventLocationDiv = $("<div class = 'event-location'></div>");
  $(boxDiv).append(eventLocationDiv);
  $(eventLocationDiv).append("<img src = './files/images/mapmarker.png' alt = 'mapmarker'><div>Trout Lake Park</div>");

  var boxDescriptionDiv = $("<div class = 'box-description'></div>");
  $(lobbyDiv).append(boxDescriptionDiv);

  $(boxDescriptionDiv).append("<div class = 'box-profile'><img src = './files/images/person.png' alt = 'pic'></div>");
  $(boxDescriptionDiv).append("<div class = 'user-name'>Username</div>");
  $(boxDescriptionDiv).append("<div class = 'capacity'>" + size + "</div>");
}

//creates a random date for the lobby
function randDate() {

  var month = monthConvert(((Math.random() * 12) + 1) | 0);
  var day = ((Math.random() * 30) + 1) | 0;

  return month + " " + day + ", 2019";
}

//converts a number to it's corresponding month
function monthConvert(monthNum) {

  var month;
  switch(monthNum) {
    case 1:
      month = "January";
      break;
    case 2:
      month = "February";
      break;
    case 3:
      month = "March";
      break;
    case 4:
      month = "April";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "June";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "August";
      break;
    case 9:
      month = "September";
      break;
    case 10:
      month = "October";
      break;
    case 11:
      month = "November";
      break;
    case 12:
      month = "December";
      break;
    default:
      throw "Error: Not valid month number";
  }

  return month;
}

//creates a random player size for the lobby
function randSize() {
  var max;
  do {
    max = ((Math.random() * 10) + 4) | 0;
  }
  while(max % 2 != 0);
  var curr = ((Math.random() * max)) | 0;

  return "" + curr + "/" + max;
}

//toggles drop down when button is clicked
function dropDown() {
    document.getElementById("drop").classList.toggle("dropdown-visible");
}

//closes drop down when user clicks somewhere else on the page
window.onclick = function(event) {
    if (!event.target.matches("#sort button")) {

      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("dropdown-visible")) {
          openDropdown.classList.remove("dropdown-visible");
        }
      }
    }
  }


/******************************************************************************
********************NEW JAVASCRIPT FOR FIREBASE INTEGRATION********************
********************************************************************************/

/*The array of lobby objects.*/
var lobbyArr = [];

/*The max number of games in the data base, set to 2 for developing purposes*/
const MAX_GAMES = 12;

/**
 * Retrieves the "games" branch of the firebase database. Then
 * passes the branch/snapshot into the getLobbyListData function.
 */
gamesRef.on('child_added', function(snapshot) {
  let obj = getLobbyListData(snapshot);
  lobbyArr.push(obj);

  //if the lobby list has all the games, do this
  if(lobbyArr.length == MAX_GAMES) {
    appendToPage();
  }
});

/**
 * Pulls the capacity and date data from each game. It then passes this
 * information to the createLobbyObj function.
 *
 * @param snapshot the "Games" branch containing list of all current games
 */
function getLobbyListData(snapshot) {
  let hasDate = false, hasCapacity = false, hasOwner = false;
  var date, capacity, owner, obj;

  snapshot.forEach(function(childSnapshot) {
    if(childSnapshot.key == "date") {
      date = childSnapshot.val();
      hasDate = true;

    } else if(childSnapshot.key == "capacity") {
      capacity = childSnapshot.val();
      hasCapacity = true;

    } else if(childSnapshot.key == "owner") {
      owner = childSnapshot.val();
      hasOwner = true;

    }

    if(hasDate && hasCapacity && hasOwner) {
      obj = {
        maxSize: capacity,
        date   : date,
        owner  : owner,
        html   : createLobbyHTML(date, capacity, owner)
      }
      return true;
    }
  });
  return obj;
}

/*
 * Uses JQuery to create the HTML for a lobby div.
 *
 * @param date the Date of the lobby.
 * @param capacity the max capacity of the lobby.
 * @returns the Completed Lobby Div, with a unique date and capacity.
 */
function createLobbyHTML(date, capacity, owner) {
  let lobbyDiv = $("<div class = 'lobby'></div>");

  let boxDiv = $("<div class = 'box'></div>");
  $(lobbyDiv).append(boxDiv);

  let eventDateDiv = $("<div class = 'event-date'></div>");
  $(boxDiv).append(eventDateDiv);
  $(eventDateDiv).append("<img src = './files/images/calendar.png' alt = 'calendar'><div class = 'transparent'>" + formatDate(date) + "</div>");

  let eventLocationDiv = $("<div class = 'event-location'></div>");
  $(boxDiv).append(eventLocationDiv);
  $(eventLocationDiv).append("<img src = './files/images/mapmarker.png' alt = 'mapmarker'><div class = 'transparent'>Trout Lake Park</div>");

  let boxDescriptionDiv = $("<div class = 'box-description'></div>");
  $(lobbyDiv).append(boxDescriptionDiv);

  $(boxDescriptionDiv).append("<div class = 'box-profile'><img src = './files/images/person.png' alt = 'pic'></div>");
  $(boxDescriptionDiv).append("<div class = 'user-name'>" + owner + "</div>");
  $(boxDescriptionDiv).append("<div class = 'capacity'>" + formatCapacity(capacity) + "</div>");

  return lobbyDiv;
}

function formatDate(date) {
  let arr = date.split("/");
  let month = formatMonth(arr[0]), day = arr[1], year = arr[2];

  if (day.substring(0, 1) == "0") {
    day = day.substring(1);
  }

  return month + " " + day + ", " + year;
}

function formatMonth(month) {
  switch(month) {
    case "JAN":
      return "January";
    case "FEB":
      return "February";
    case "MAR":
      return "March";
    case "APR":
      return "April";
    case "MAY":
      return "May";
    case "JUN":
      return "June";
    case "JUL":
      return "July";
    case "AUG":
      return "August";
    case "SEP":
      return "September";
    case "OCT":
      return "October";
    case "NOV":
      return "November";
    case "DEC":
      return "December";
    default:
      throw "Error: Not valid month number";
  }
}

function formatCapacity(capacity) {
  var currPlayers = ((Math.random() * capacity)) | 0;
  return currPlayers + "/" + capacity;
}

//grabs the contents of lobbyArr and appends the html of each obj to the page
function appendToPage() {
  for(let i = 0; i < lobbyArr.length; i++) {
    $("#lobby-list-content").append(lobbyArr[i].html);
  }
}
