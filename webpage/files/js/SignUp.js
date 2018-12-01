/**
 * JAVASCRIPT FOR LogIn.html PAGE
 *
 * @author Alec Martin, A01059594
 */
/**
 * FireBase config
 */
var config = {
    apiKey: "AIzaSyD0bFMT_-dlAfllbPc2rJXhZRnrJIERwv8",
    authDomain: "pickup-1541825853857.firebaseapp.com",
    databaseURL: "https://pickup-1541825853857.firebaseio.com",
    projectId: "pickup-1541825853857",
    storageBucket: "pickup-1541825853857.appspot.com",
    messagingSenderId: "51007491965"
    };
    firebase.initializeApp(config);
    /**
     * References user in firebase
     */
    var usersRef= firebase.database().ref().child('PickUp').child('Users').push();
    
    var user = firebase.auth().currentUser;
    /**
     * Checks if next button is pressed
     */
    document.getElementById('mySubmit').addEventListener('click', submitForm);
    /**
     * Checks if back button is pressed
     */
    document.getElementById('mySubmit2').addEventListener('click', back);
    /**
     * Gives all the forms to local storage so they can be used
     * in the next page
     * @param {} e 
     */
    function submitForm(e){
              
            e.preventDefault();
            //console.log(123);
           
            window.localStorage.setItem("name",document.getElementById("name").value);
            window.localStorage.setItem("password",document.getElementById("password").value);
            window.localStorage.setItem("emailfield2",document.getElementById("emailfield2").value);
            window.localStorage.setItem("addressfield",document.getElementById("addressfield").value);
            window.localStorage.setItem("gender",document.getElementById("gender").value);
            window.location.href = "SignUp2.html";
    }
    function getInputVal(id){
            return document.getElementById(id).value;
    }
    function back(e){
        e.preventDefault();
        window.location.href = "LogIn.html";
}