var chatcount = 0;

  function myMap() {
    var mapProp = {
        center:new google.maps.LatLng(49.2835, -123.1153),
        zoom: 15,
      };
    var map = new google.maps.Map(document.getElementById("location"),mapProp);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(49.2835, -123.1153),
      map: map,
      title: 'Hello World!'
    });
  }

  function partymember(username, karma, team){
    var player = $("<div class='member'></div>");
    var playernamediv = $("<div class='playernamediv'></div>");
    var playername = $("<span class='playername'></span>");
    var playerkarmadiv = $("<div class='playerkarmadiv'></div>");
    var playerkarma = $("<span class='playerkarma'></span>");

    $(playerkarma).html(karma);
    $(playername).html(username);

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

    var addlink = $("<a></a>");
    $(addlink).attr("href", "https://www.google.com");

    partymember("Kevin", "5000", "teamone");
    partymember("Will", "5000", "teamtwo");
    partymember("Jeavin", "4000", "teamone");
    partymember("Alec", "6000", "teamtwo");
    partymember("Stella", "3000", "teamtwo");
    partymember("Rose", "4000", "teamtwo");
    partymember("Hannah", "7000", "teamone");
    partymember("Edward", "9999", "teamone");


  });
  /*]]>*/
