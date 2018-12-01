/**
* Non-database related javascript functions.
* @author Kevin Park, a00881241
*/
/**Function pulled from google for the maps API*/
function myMap() {
  var mapProp = {
      center:new google.maps.LatLng(49.2835, -123.1153),
      zoom: 15,
    };
  var map = new google.maps.Map(document.getElementById("location"),mapProp);
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(49.2835, -123.1153),
    map: map,
    title: 'BCIT DT Campus'
  });
}

/**
*Called in lobby_firebase.js
*Takes in three parameters and creates tiles for the lobby teams.
*/
function partymember(username, karma, team){
  var player = $("<div class='member'></div>");
  var playernamediv = $("<div class='playernamediv'></div>");
  var playername = $("<span class='playername'></span>");
  var playerkarmadiv = $("<div class='playerkarmadiv'></div>");
  var playerkarma = $("<span class='playerkarma'></span>");

  $(playerkarma).html(karma);
  $(playername).html(username);

  $(player).attr('id', username);

  $(playerkarmadiv).append(playerkarma);
  $(playernamediv).append(playername);
  $(player).append(playerkarmadiv);
  $(player).append(playernamediv);

  if(team == "teamone") {
    $("#teamone").append(player);
  } else if (team == "teamtwo") {
    $("#teamtwo").append(player);
  } else {
    return;
  }
}
