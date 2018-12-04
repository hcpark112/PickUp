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

  /**
   * Grabs the url of the page, passes it into parseURL and stores the sport
   * query into "sport". Removes a '#' character if present, it can show up in the
   * URL when you refresh the page.
   */
  let sport = parseURL(window.location.href.replace("#", ""));

  /**Sets sport to the lobby list header (h1).*/
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
 * Uses data-owner attribute to extract owner of div. It then sends the appropiate
 * owner to lobby.html through the url. This function is called through a onclick()
 * attribute attached to all the lobby divs.
 *
 * @param lobbyDiv the lobby that the user clicks. Has a onclick attribute and passes
 *                 itself as a parameter.
 */
function toLobby(lobbyDiv) {
  let sport = parseURL(window.location.href.replace("#", ""));
  let owner = lobbyDiv.getAttribute("data-owner");
  window.location.href = "lobby.html?" + owner.replace(" ", "+") + "&" + sport;
}

/**
 * Parses the modified URL to extract data sent from the previous page (mainpage.html).
 * If the URL includes symbols from the search bar, the url is passed to parseSearch().
 *
 * @param url The URL of lobbylist.html upon loading.
 */
function parseURL(url) {
  let index = url.indexOf("?");
  let query = url.substring(index + 1);

  if (query.substring(0,1) == "q") {
    return parseSearch(query);
  } else {
    return query;
  }
}

/**
 * Extracts the data sent from the mainpage search bar. For testing purposes
 * it does not use the date. It does set the location to whichever location the
 * user specified in the search.
 *
 * @param query The URL of lobbylist.html after the '?' symbol.
 */
function parseSearch(query) {
  query = query.replace(/q=/g, "");
  let arr = query.split("&");

  appendLocation(arr[1]);

  return arr[0].replace(/\+/g, " ");
}

/**
 * Replaces the location input placeholder with the user's specified location.
 *
 * @param location the location entered by the user through the mainpage search
 *                 bar.
 */
function appendLocation(location) {
  if(location != "") {
    location = location.replace(/\+/g, " ");
    $("#location input").remove();
    $("#location div").append("<input type = 'text' placeholder = '" + location + "'>");
  }
}

/**
 * Updates the page to put the sport in the h1.
 *
 * @param sport The sport for the lobbylist.html page.
 */
function updatePage(sport) {
  $("h1").html(sport);
}

/**
 * Called by a onclick() attribute on the back button. Takes you back to the
 * main page.
 */
function goBack() {
  window.location.href = "mainpage.html";
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
 * Iterates through each game in 'gamesRef'. Grabs the information of each game
 * using getLobbyListData(), and stores it into a object. It then pushes this
 * object into an array. If it has all the games, it will append them to the page.
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
 * Using the data snapshot from gamesRef.on(), which represents one game in
 * gamesRef, this function goes through each child node and grabs the values of
 * the ones we want.
 *
 * We grab the date, capacity, owner, and number of members, then short circuit the search. These
 * pieces of data are converted into the format we want and stored into an object.
 *
 * @param snapshot A single game in gamesRef.
 * @return obj Represents a game and holds capacity, date, owner, and raw html that
 *             will be appended to the page. Stored into a array after being returned.
 */
function getLobbyListData(snapshot) {
  let hasDate = false, hasCapacity = false, hasOwner = false, hasMembers = false;
  var date, capacity, owner, obj, memberCount = 0;

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
    } else if(childSnapshot.key == "members") {
      childSnapshot.forEach(function(members) {
        memberCount++;
      });
      hasMembers = true;
    }

    if(hasDate && hasCapacity && hasOwner && hasMembers) {
      obj = {
        maxSize: parseInt(capacity),
        date   : parseDate(date),
        owner  : owner,
        html   : createLobbyHTML(date, capacity, owner, memberCount),
        members: memberCount
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
 * Creates the div for a game in gamesRef.
 *
 * @param date the date of the game.
 * @param capacity the max size of the game.
 * @param owner the owner of the game.
 * @return the custom div.
 */
function createLobbyHTML(date, capacity, owner, memberCount) {
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
  $(boxDescriptionDiv).append("<div class = 'capacity'>" + memberCount + "/" + capacity + "</div>");

  return lobbyDiv;
}

/**
 * Formats the date into Month Day, Year. Example: January 1, 2019
 *
 * @param date the date in the game object.
 * @return the formatted date.
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
 * Converts the shortened month name into its full name.
 *
 * @param month the converted month.
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
 * Appends the divs to lobbylist.html page.
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
 * Converts the date into a integer value. Used for comparisons.
 *
 * @param date the date from the firebase.
 * @return the date as a interger value.
 */
function parseDate(date) {
  let arr = date.split("/");
  let monthStr = arr[0], dayStr = arr[1], yearStr = arr[2];

  return parseInt(dayStr) + monthVal(monthStr) + yearVal(yearStr);

}

/**
 * Converts the month into a integer value from 100-1200, in increments of a 100.
 *
 * @param month The month from firebase.
 * @return the month as a integer value.
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
 * Converts the year into a integer value from 10000 to 20000. Only accounts
 * for this year the next for testing purporses.
 *
 * @param year the year from the database.
 * @return the year as a integer value.
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
 * Sorts lobbyArr using a insertion sort algorithm. Sorts by date.
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
 * Sorts lobbyArr using a insertion sort algorithm. Sorts by players.
 */
function capacitySort() {
  for (let i = 1; i < lobbyArr.length; ++i) {
    let temp = lobbyArr[i];
    let j = i - 1;

    while (j >= 0 && lobbyArr[j].members > temp.members) {
      lobbyArr[j + 1] = lobbyArr[j];
      j = j - 1;
    }
    lobbyArr[j + 1] = temp;
  }
  $(".lobby").remove();
  appendToPage();
}

/**
 * Randomizes the order of lobbyArr. Used as a placeholder for distance sort.
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
