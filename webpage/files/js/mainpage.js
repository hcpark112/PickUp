//Javascript for the mainpage

/**Creates the categories buttons.*/
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

  //Hides the extra images.
  $("#slideshow > div:gt(0)").hide();

  //Setting image switch time interval.
  setInterval(function() {
    $('#slideshow > div:first')
      .fadeOut(0)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo('#slideshow');
  },  15000);
  
  //Creating the five categories.
  category("Basketball", "./files/images/basketball.png", "lobbylist.html?Basketball");
  category("Soccer", "./files/images/soccerball.png", "lobbylist.html?Soccer");
  category("Football", "./files/images/football.png", "lobbylist.html?Football");
  category("Baseball", "./files/images/baseball.png", "lobbylist.html?Baseball");
  category("Volleyball", "./files/images/volleyball.png", "lobbylist.html?Volleyball");

});
