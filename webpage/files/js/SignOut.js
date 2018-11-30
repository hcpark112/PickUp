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
     * On load of page make the user sign out
     * used for log in page
     */
    window.onload = function(e) {
        firebase.auth().signOut();
        console.log("Signing out...")
    };