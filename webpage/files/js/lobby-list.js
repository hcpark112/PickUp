/**
 * JAVASCRIPT FOR lobbylist.html PAGE
 *
 * @author William Loftus, A01022399
 */

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



/*******************************************************************************
***************************MISC PAGE FUNCTIONS**********************************
********************************************************************************/

/**
 * Contains JQuery click functions for different buttons on the page.
 */
$(document).ready(function() {

  /***/
  let sport = parseURL(window.location.href);

  /***/
  updatePage(sport);

  /**Replaces drop-down text with selection from drop-down menu.*/
  $("#drop a").click(function() {
      $("#sort button").html($(this).html());
    });

  /**Sorts the lobby divs by date.*/
  $("#date").click(function() {
    dateSort();
  });

  /**Sorts the lobby divs by max number of players.*/
  $("#players").click(function() {
    capacitySort();
  })

  /**No functionality yet, randomizes the order of the lobby divs.*/
  $("#distance").click(function() {
    randomize();
  })
});

/**
 * Displays the drop-down menu when the button is clicked.
 */
function dropDown() {
    document.getElementById("drop").classList.toggle("dropdown-visible");
}

/**
 * Closes the drop-down menu when something else on the screen is clicked.
 */
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

/**
 * Uses data-owner attribute to extract owner of div
 */
function toLobby(lobbyDiv) {
  let owner = lobbyDiv.getAttribute("data-owner");
  window.location.href = "lobby.html?" + owner.replace(" ", "+");
}

/**
 *
 */
function parseURL(url) {
  let index = url.indexOf("?");
  return url.substring(index + 1);
}

/**
 *
 */
function updatePage(sport) {
  $("h1").html(sport);
}
/*******************************************************************************
********************************************************************************/



/*******************************************************************************
****************FUNCTIONS TO RETRIEVE DATA FROM FIREBASE************************
********************************************************************************/

/**The array of lobby objects.*/
var lobbyArr = [];

/**The max number of games in the data base, set to 12 for testing purposes*/
const MAX_GAMES = 12;

/**
 *
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
 *
 * @param snapshot
 * @return obj
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
        maxSize: parseInt(capacity),
        date   : parseDate(date),
        owner  : owner,
        html   : createLobbyHTML(date, capacity, owner)
      }
      return true;
    }
  });
  return obj;
}
/*******************************************************************************
********************************************************************************/



/*******************************************************************************
*************************FUNCTIONS FOR MAKING HTML******************************
********************************************************************************/

/**
 *
 * @param date
 * @param capacity
 * @param owner
 * @return
 */
function createLobbyHTML(date, capacity, owner) {
  let lobbyDiv = $("<div class = 'lobby'></div>");

  //onclick
  let boxDiv = $("<div class = 'box' data-owner = '" + owner + "' onclick = 'toLobby(this)'></div>");
  $(lobbyDiv).append(boxDiv);

  let eventDateDiv = $("<div class = 'event-date'></div>");
  $(boxDiv).append(eventDateDiv);
  $(eventDateDiv).append("<img src = './files/images/calendar.png' alt = 'calendar'><div class = 'transparent'>" + formatDate(date) + "</div>");

  let eventLocationDiv = $("<div class = 'event-location'></div>");
  $(boxDiv).append(eventLocationDiv);
  $(eventLocationDiv).append("<img src = './files/images/mapmarker.png' alt = 'mapmarker'><div class = 'transparent'>Trout Lake Park</div>");

  //onclick
  let boxDescriptionDiv = $("<div class = 'box-description' data-owner = '" + owner + "' onclick = 'toLobby(this)'></div>");
  $(lobbyDiv).append(boxDescriptionDiv);

  $(boxDescriptionDiv).append("<div class = 'box-profile'><img src = './files/images/person.png' alt = 'pic'></div>");
  $(boxDescriptionDiv).append("<div class = 'user-name'>" + owner + "</div>");
  $(boxDescriptionDiv).append("<div class = 'capacity'>" + formatCapacity(capacity) + "</div>");

  return lobbyDiv;
}

/**
 *
 * @param date
 * @return
 */
function formatDate(date) {
  let arr = date.split("/");
  let month = formatMonth(arr[0]), day = arr[1], year = arr[2];

  if (day.substring(0, 1) == "0") {
    day = day.substring(1);
  }

  return month + " " + day + ", " + year;
}

/**
 *
 * @param month
 */
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
      throw "Error: Not valid month";
  }
}

/**
 *
 * @param capacity
 * @return
 */
function formatCapacity(capacity) {
  var currPlayers = ((Math.random() * capacity)) | 0;
  return currPlayers + "/" + capacity;
}

/**
 *
 */
function appendToPage() {
  for(let i = 0; i < lobbyArr.length; i++) {
    $("#lobby-list-content").append(lobbyArr[i].html);
  }
}
/*******************************************************************************
********************************************************************************/



/*******************************************************************************
********************HELPER FUNCTIONS FOR COMPARISONS****************************
********************************************************************************/

/**
 *
 * @param date
 * @return
 */
function parseDate(date) {
  let arr = date.split("/");
  let monthStr = arr[0], dayStr = arr[1], yearStr = arr[2];

  // console.log(parseInt(dayStr) + monthVal(monthStr) + yearVal(yearStr));
  return parseInt(dayStr) + monthVal(monthStr) + yearVal(yearStr);

}

/**
 *
 * @param month
 * @return
 */
function monthVal(month) {
  switch(month) {
    case "JAN":
      return 100;
    case "FEB":
      return 200;
    case "MAR":
      return 300;
    case "APR":
      return 400;
    case "MAY":
      return 500;
    case "JUN":
      return 600;
    case "JUL":
      return 700;
    case "AUG":
      return 800;
    case "SEP":
      return 900;
    case "OCT":
      return 1000;
    case "NOV":
      return 1100;
    case "DEC":
      return 1200;
    default:
      throw "Error: Not valid month";
  }
}

/**
 *
 * @param year
 * @return
 */
function yearVal(year) {
  switch(year) {
    case "2018":
      return 10000;
    case "2019":
      return 20000;
    default:
      return 0;
  }
}
/*******************************************************************************
********************************************************************************/



/*******************************************************************************
*******************************SORT FUNCTIONS***********************************
********************************************************************************/

/**
 *
 */
function dateSort() {
  for (let i = 1; i < lobbyArr.length; ++i) {
    let temp = lobbyArr[i];
    let j = i - 1;

    while (j >= 0 && lobbyArr[j].date > temp.date) {
      lobbyArr[j + 1] = lobbyArr[j];
      j = j - 1;
    }
    lobbyArr[j + 1] = temp;
  }
  $(".lobby").remove();
  appendToPage();
}

/**
 *
 */
function capacitySort() {
  for (let i = 1; i < lobbyArr.length; ++i) {
    let temp = lobbyArr[i];
    let j = i - 1;

    while (j >= 0 && lobbyArr[j].maxSize > temp.maxSize) {
      lobbyArr[j + 1] = lobbyArr[j];
      j = j - 1;
    }
    lobbyArr[j + 1] = temp;
  }
  $(".lobby").remove();
  appendToPage();
}

/**
 *
 */
function randomize() {
  let rand, temp;
  for (let i = 0; i < lobbyArr.length; i++) {
    rand = ((Math.random() * lobbyArr.length) ) | 0;

    temp = lobbyArr[i];
    lobbyArr[i] = lobbyArr[rand];
    lobbyArr[rand] = temp;
  }
  $(".lobby").remove();
  appendToPage();
}
/*******************************************************************************
********************************************************************************/
