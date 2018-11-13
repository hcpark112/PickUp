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
  $(eventDateDiv).append("<img src = './files/images/calendar.png' alt = 'calendar'><div>January 1, 2019</div>");

  var eventLocationDiv = $("<div class = 'event-location'></div>");
  $(boxDiv).append(eventLocationDiv);
  $(eventLocationDiv).append("<img src = './files/images/mapmarker.png' alt = 'mapmarker'><div>Trout Lake Park</div>");

  var boxDescriptionDiv = $("<div class = 'box-description'></div>");
  $(lobbyDiv).append(boxDescriptionDiv);

  $(boxDescriptionDiv).append("<div class = 'box-profile'><img src = './files/images/person.png' alt = 'pic'></div>");
  $(boxDescriptionDiv).append("<div class = 'user-name'>Username</div>");
  $(boxDescriptionDiv).append("<div class = 'capacity'>12/24</div>");
}

function randDate() {
  //creates a random date for the lobby
}

function randSize() {
  //creates a random player size for the lobby
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