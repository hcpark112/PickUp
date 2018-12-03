/**
* Javascript pertaining to the lobby page's firebase functions.
* @author Kevin Park, a00881241
*/
//---------------------------------------- Database Key -------------------------------------------//


var config = {
  apiKey: "AIzaSyD0bFMT_-dlAfllbPc2rJXhZRnrJIERwv8",
  authDomain: "pickup-1541825853857.firebaseapp.com",
  databaseURL: "https://pickup-1541825853857.firebaseio.com",
  projectId: "pickup-1541825853857",
  storageBucket: "pickup-1541825853857.appspot.com",
  messagingSenderId: "51007491965"
};
firebase.initializeApp(config);



//-------------------------------------- Database References --------------------------------------//


var dbRef = firebase.database();
var usersRef = firebase.database().ref().child('PickUp/Users');
var gamesRef = firebase.database().ref().child('PickUp/Games');



//-------------------------------------- Receiving Local Data -------------------------------------//


let url = window.location.href;
url = url.substring(url.indexOf("?") + 1).replace(/\+/g, " ").replace(/\%20/g, " ");
let urlArr = url.split("&");
url = urlArr[0];
let sport = urlArr[1];


//-------------------------------------- Sending Local Data -------------------------------------//

$("#leavebutton").click(function() {
  window.location.href = "lobbylist.html?" + $("#roominfo h2").html();
});


//------------------------------- Lists to Hold Users for Comparison ------------------------------//

//Stores the names and karma of every user in the database.
var userList = [];

//Stores the names of the members in the game.
var membersList = [];


//--------------------------------------- Populates Room Info -------------------------------------//


//Reads every child in the Games node once
gamesRef.once("value", function(snapshot) {
  snapshot.forEach(function(childSnapshot){

    //Checks to see if the child's node value is the same as the value passed from previous page.
    if(childSnapshot.child('owner').val() == url){

      //Takes a snapshot if the matched node. (Locally storing it's contents)
      gamesRef.child(childSnapshot.key).once("value", function(snapshot) {

        //Snapshot values stored in variable.
        var data = snapshot.val();

        //Creating containers for information.
        var roomname = $('#roominfo');
        var lobbyname = $("<h1><span></span></h1>");
        var sporttype = $("<h2><span></span></h2>");
        var gamedate = $("<span></span><br>");
        var skillrange = $("<span></span>");

        //Injecting each individual piece of information into their respective containers.
        lobbyname.html(data.owner + "'s lobby\n");
        sporttype.html(sport);
        gamedate.html(formatDate(data.date));
        skillrange.html("Skill level: " + data.levels.min + " - " + data.levels.max);

        //Appending all of the room info components.
        roomname.append(lobbyname);
        roomname.append(sporttype);
        roomname.append(gamedate);
        roomname.append(skillrange);
      });
    }
  });
});


//-------------------- Fills userList and membersList; Creates Member Elements --------------------//


//Takes a snapshot of the Games node.
gamesRef.once("value", function(snapshot) {

  //Takes a snapshot of each child node of the the Games node.
  snapshot.forEach(function(childSnapshot){

    //Checks to see if the child's node value is the same as the value passed from previous page.
    if(childSnapshot.child('owner').val() == url){

      //Takes snapshot of the members in the chosen game.
      gamesRef.child(childSnapshot.key + "/members").once("value", function(snapshot) {

        //Passes member snapshots to getMembers method to populate membersList.
        getMembers(snapshot);

        //Takes a snapshot of users.
        usersRef.once('value', function(snapshot){

          //Passes user snapshots to the getUsers method to populate userList.
          getUsers(snapshot);

          //Compares userList and membersList to see if valid user is in the game.
          for(i = 0; i < userList.length; i++){
            for(j = 0; j < membersList.length; j++){
              if(userList[i].fullname == membersList[j]){

                //See which team has less members and adds the next member to the smaller team.
                if(teamPlacement % 2 == 0){
                  partymember(userList[i].fullname, userList[i].karma, "teamone");
                  teamPlacement++;
                } else if(teamPlacement % 2 == 1){
                  partymember(userList[i].fullname, userList[i].karma, "teamtwo");
                  teamPlacement++;
                }
              }
            }
          }
        })
      });
    }
  });
});

/**This function adds all members of a game into the membersList array.*/
function getMembers(snapshot){
  snapshot.forEach(function(childSnapshot){
    var members = childSnapshot.val().replace(" ", "_");
    membersList.push(members);
  });
}

/**This function adds the names and karmas of all users into the userList array.*/
function getUsers(snapshot){
  snapshot.forEach(function(childSnapshot){
    var userNames = childSnapshot.child('fullname').val().replace(" ", "_");
    var userKarma = childSnapshot.child('karma').val().replace(" ", "_");
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
  gamesRef.once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot){
      if(childSnapshot.child('owner').val() == url){
        gamesRef.child(childSnapshot.key + "/members").update({
          testUser: window.localStorage.getItem("User").replace(" ", "_")
        });

        //IF the button was pressed, remove user from lobby + database and change the button status.
        if(stored == 'clicked'){
          $("#joinbutton").html("Join");
          $("#" + window.localStorage.getItem("User").replace(" ", "_")).remove();
          console.log(window.localStorage.getItem("User").replace(" ", "_"));
          teamPlacement--;
          //Removes the user from members list.
          gamesRef.child(childSnapshot.key + "/members/" + "testUser").remove();
          stored = 'unclicked';
        }

        //If the button has not been pressed, add user to smaller team and change button status.
        else if(stored == 'unclicked'){
          $("#joinbutton").html("Leave");
          if(teamPlacement % 2 == 0){
            partymember(window.localStorage.getItem("User").replace(" ", "_"), "5000", "teamone");
            teamPlacement++;
          } else if (teamPlacement % 2 == 1){
            partymember(window.localStorage.getItem("User").replace(" ", "_"), "5000", "teamtwo");
            teamPlacement++;
          }
          stored = 'clicked';
        }
      }
    });
  });
}


//-------------------------------------- Date Formatting -------------------------------------//


//Borrowed from lobbylist.js.
function formatDate(date) {
  let arr = date.split("/");
  let month = formatMonth(arr[0]), day = arr[1], year = arr[2];

  if (day.substring(0, 1) == "0") {
    day = day.substring(1);
  }

  return month + " " + day + ", " + year;
}

//Borrowed from lobbylist.js.
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


//---------------------------- LocalStorage for counts and boolean status ------------------------------//


localStorage['clickStatus'] = 'unclicked';
var stored = localStorage['clickStatus'];


localStorage['membercount'] = 0;
var teamPlacement = localStorage['membercount'];
