$(document).ready(function() {
    lobby("Will Loftus", "Basketball", "./files/images/basketball.png");
    lobby("Jeavin Shoker", "Soccer", "./files/images/soccerball.png");
    lobby("Emilio Ditrocchio", "Baseball", "./files/images/baseball.png");
  
    var addlink = $("<a></a>");
    $(addlink).attr("href", "https://www.google.com");
  
  });
  
function lobby(name, sport, image_src){
  var lobby = $("<div class='side-lobby'></div>");
  $(lobby).attr("ondblclick", "window.location.href='https://www.google.com'");

  var image = $("<img class='roomicon'>");
  $(image).attr("src", image_src);
  $(image).attr("alt", sport);

  var namediv = $("<div class='namediv'></div>");
  var roomname = $("<span class='roomname'></span>");
  $(roomname).html(name + "'s lobby");

  $("#leftbar").append(lobby);
  // $(lobby).append(image);
  $(lobby).append(namediv);
  $(lobby).prepend(image);
  $(namediv).append(roomname);
}