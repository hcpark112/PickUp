$(document).ready(function() {

  numLobby(12);

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
  var lobbyDiv = $("<div class = 'lobby'></div>");
  $("#lobby-list-content").append(lobbyDiv);

  var boxDiv = $("<div class = 'box'></div>");
  $(lobbyDiv).append(boxDiv);

  var eventDateDiv = $("<div class = 'event-date'></div>");
  $(boxDiv).append(eventDateDiv);
  $(eventDateDiv).append("<img src = './files/images/calendar.png' alt = 'calendar'><div>" + randDate() + "</div>");

  var eventLocationDiv = $("<div class = 'event-location'></div>");
  $(boxDiv).append(eventLocationDiv);
  $(eventLocationDiv).append("<img src = './files/images/mapmarker.png' alt = 'mapmarker'><div>Trout Lake Park</div>");

  var boxDescriptionDiv = $("<div class = 'box-description'></div>");
  $(lobbyDiv).append(boxDescriptionDiv);

  $(boxDescriptionDiv).append("<div class = 'box-profile'><img src = './files/images/person.png' alt = 'pic'></div>");
  $(boxDescriptionDiv).append("<div class = 'user-name'>Username</div>");
  $(boxDescriptionDiv).append("<div class = 'capacity'>" + randSize() + "</div>");
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
    max = ((Math.random() * 24) + 4) | 0;
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