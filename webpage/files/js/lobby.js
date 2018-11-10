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

  function friends(name, status){
    var friend = $("<div class='friend'></div>");
    $(friend).attr("ondblclick", "window.location.href='https://www.google.com'");

    var stat = $("<div class='stat'></div>");

    var online = {"background-color": "green"};
    var offline = {"background-color": "red"};

    var namediv = $("<div class='namediv'></div>");
    var username = $("<span class='username'></span>");
    $(username).html(name);

    if(status == "online"){
      $(stat).css(online);
        $("#leftbar").prepend(friend);
    } else {
      $(stat).css(offline);
        $("#leftbar").append(friend);
    }

    $(friend).append(stat);
    $(friend).append(namediv);
    $(namediv).append(username);
  }

  function chats(name, chattext){
    chatcount++;
    var chatDiv = $("<div class='chat'></div>");
    var chatcontent = $("<p></p>");

    var textform = $("<form class='textform'></form>");
    var textinput = $("<input class='textinput' type='text' name='text' placeholder='Enter Text' autocomplete='off'/>");
    var textsubmit = $("<input class='textinput' type='image' name='submit' src='./files/images/enter.png' alt='enter'/>");

    $(textform).append(textinput);
    $(textform).append(textsubmit);
    $(chatDiv).append(textform);

    $(chatcontent).html(chattext);

    var button = $("<button class='collapsible'></button>");
    $(button).html(name);

    $("#friendstab").append(chatDiv);
    $(chatDiv).append(chatcontent);
    $("#friendstab").append(button);
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



    friends("Alec Martin", "online");
    friends("Will Loftus", "offline");
    friends("Stella Tran", "offline");
    friends("Jeavin Shoker", "offline");
    friends("Emilio Ditrocchio", "online");
    friends("Edward Lee", "online");
    friends("Kevin Park", "online");

    chats("Kevin", "Kevin: Hey, how's it going?");

    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.previousElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }

    var addlink = $("<a></a>");
    $(addlink).attr("href", "https://www.google.com");

    var addicon = $("<img id='addicon' alt='Add Friend' src='./files/images/addfriendwhite.png'>");
    $("#friendstab").append(addlink);
    $(addlink).append(addicon);

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
