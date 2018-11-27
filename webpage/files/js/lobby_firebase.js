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
var usersRef = firebase.database().ref().child('PickUp/Users');
var gamesRef = firebase.database().ref().child('PickUp/Games');

/**Updates the room info.*/
gamesRef.child('game1').once("value", function(snapshot) {
  var data = snapshot.val();
  // console.log(data);

  var roomname = $('#roominfo');

  var lobbyname = $("<h1><span></span></h1>");
  var sporttype = $("<h2><span></span></h2>");
  var gamedate = $("<span></span><br>");
  var skillrange = $("<span></span>");
  lobbyname.html(data.owner + "'s lobby\n");
  sporttype.html(data.sport);
  gamedate.html(formatDate(data.date));
  skillrange.html("Skill level: " + data.levels.min + " - " + data.levels.max);
  roomname.append(lobbyname);
  roomname.append(sporttype);
  roomname.append(gamedate);
  roomname.append(skillrange);

});


var userList = [];
var membersList = [];

/**Adds member info to the lobby is the array contents match.*/
gamesRef.child('game1/members').once('value', function(snapshot){
  getMembers(snapshot);
  usersRef.once('value', function(snapshot){
    getUsers(snapshot);
    for(i = 0; i < userList.length; i++){
      for(j = 0; j < membersList.length; j++){
        if(userList[i].fullname == membersList[j]){
          if(teamPlacement % 2 == 0){
            partymember(userList[i].fullname, userList[i].karma, "teamone");
            teamPlacement++;
          } else if(teamPlacement % 2 == 1){
            partymember(userList[i].fullname, userList[i].karma, "teamtwo");
            teamPlacement++;
          }
          // partymember(userList[i].fullname, userList[i].karma);
        }
      }
    }
  })
});


/**This function adds all members of a game into the membersList array.*/
function getMembers(snapshot){
  snapshot.forEach(function(childSnapshot){
    var members = childSnapshot.val();
    membersList.push(members);
  });
}

/**This function adds the names and karmas of all users into the userList array.*/
function getUsers(snapshot){
  snapshot.forEach(function(childSnapshot){
    var userNames = childSnapshot.child('fullname').val();
    var userKarma = childSnapshot.child('karma').val();
    userList.push({
      fullname: userNames,
      karma: userKarma
    });
  });
}

/**
* This function adds the user to the game's members node and loads
* user info to the lobby.
* Made it so you can join and leave. The lobby updates as needed.
*/
function joinGame(){
  //Adds user to database.
  gamesRef.child('game1/members').update({
    testUser: "testName"
  });
  if(stored == 'clicked'){
    $("#joinbutton").html("Join");
    $("#testName").remove();
    teamPlacement--;
    //Removes the user from members list.
    gamesRef.child('game1/members/' + "testUser").remove();
    stored = 'unclicked';
  } 

  else if(stored == 'unclicked'){
    $("#joinbutton").html("Leave");
    if(teamPlacement % 2 == 0){
      partymember("testName", "testKarma", "teamone");
      teamPlacement++;
    } else if (teamPlacement % 2 == 1){
      partymember("testName", "testKarma", "teamtwo");
      teamPlacement++;
    }
    stored = 'clicked';
  }
}

function formatDate(date) {
  let arr = date.split("/");
  let month = formatMonth(arr[0]), day = arr[1], year = arr[2];

  if (day.substring(0, 1) == "0") {
    day = day.substring(1);
  }

  return month + " " + day + ", " + year;
}

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
      throw "Error: Not valid month number";
  }
}

localStorage['clickStatus'] = 'unclicked';
var stored = localStorage['clickStatus'];


localStorage['membercount'] = 0;
var teamPlacement = localStorage['membercount'];