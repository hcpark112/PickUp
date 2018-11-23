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
var usersRef = firebase.database().ref().child('PickUp').child('Users');
var gamesRef = firebase.database().ref().child('PickUp').child('Games');

gamesRef.child('game1').on("value", function(snapshot) {
  var data = snapshot.val();
  console.log(data);

  var roomname = $('#roominfo');

  var lobbyname = $("<h1><span></span></h1>");
  var sporttype = $("<h2><span></span></h2>");
  var gamedate = $("<span></span><br>");
  var skillrange = $("<span></span>");
  lobbyname.html(data.owner + "'s lobby\n");
  sporttype.html(data.sport);
  gamedate.html(data.date);
  skillrange.html("Skill level: " + data.levels.min + " - " + data.levels.max);
  roomname.append(lobbyname);
  roomname.append(sporttype);
  roomname.append(gamedate);
  roomname.append(skillrange);
});
