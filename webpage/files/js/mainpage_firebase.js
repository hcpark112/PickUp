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

