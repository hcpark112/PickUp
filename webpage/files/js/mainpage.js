function lobby(name, sport, image_src){
    var lobby = $("<div class='lobby'></div>");
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

function category(sport, image_src, target){
  var catediv = $("<div class='catediv'></div>");
  var newlink = $("<a class='newlink'></a>");
  $(newlink).attr("href", target);

  var cate = $("<div class='cate'></div>");

  var image = $("<img class='icon'>");
  $(image).attr("src", image_src);
  $(image).attr("alt", sport);

  var sportname = $("<p class='sportname'></p>");
  $(sportname).html(sport);
  var namelink = $("<a class='namelink'></a>");
  $(namelink).attr("href", target);

  $("#categories").append(catediv);
  $(catediv).append(newlink);
  $(newlink).append(cate);
  $(cate).append(image);
  $(catediv).append(namelink);
  $(namelink).append(sportname);
}

$(document).ready(function() {
  $("#slideshow > div:gt(0)").hide();

  setInterval(function() {
    $('#slideshow > div:first')
      .fadeOut(0)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo('#slideshow');
  },  15000);
  
  lobby("Will Loftus", "Basketball", "./files/images/basketball.png");
  lobby("Jeavin Shoker", "Soccer", "./files/images/soccerball.png");
  lobby("Emilio Ditrocchio", "Baseball", "./files/images/baseball.png");

  category("Basketball", "./files/images/basketball.png", "https://www.google.com");
  category("Soccer", "./files/images/soccerball.png", "https://www.google.com");
  category("Football", "./files/images/football.png", "https://www.google.com");
  category("Baseball", "./files/images/baseball.png", "https://www.google.com");
  category("Volleyball", "./files/images/volleyball.png", "https://www.google.com");

  var addlink = $("<a></a>");
  $(addlink).attr("href", "https://www.google.com");

});
