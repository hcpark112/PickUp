var config = {
    apiKey: "AIzaSyD0bFMT_-dlAfllbPc2rJXhZRnrJIERwv8",
    authDomain: "pickup-1541825853857.firebaseapp.com",
    databaseURL: "https://pickup-1541825853857.firebaseio.com",
    projectId: "pickup-1541825853857",
    storageBucket: "pickup-1541825853857.appspot.com",
    messagingSenderId: "51007491965"
    };
    firebase.initializeApp(config);
    var usersRef= firebase.database().ref().child('PickUp').child('Users').push();
    
    var user = firebase.auth().currentUser;
    document.getElementById('mySubmit').addEventListener('click', submitForm);
    function submitForm(e){
              
            e.preventDefault();
            //console.log(123);
           
            window.localStorage.setItem("name",document.getElementById("name").value);
            window.sessionStorage.setItem("password",document.getElementById("password").value);
            window.sessionStorage.setItem("emailfield2",document.getElementById("emailfield2").value);
            window.sessionStorage.setItem("addressfield",document.getElementById("addressfield").value);
            window.sessionStorage.setItem("gender",document.getElementById("gender").value);
            var name = window.localStorage.getItem("name");
            console.log(name);
    }
    
    function getInputVal(id){
            return document.getElementById(id).value;
    }