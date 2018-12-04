    /**
     * JAVASCRIPT FOR LogIn.html PAGE
     *
     * @author Alec Martin, A01059594
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
     * Creates Authentication constant for firebase
     */
    const auth = firebase.auth();
    /**
     * Gets the text for email
     */
    const txtEmail = document.getElementById('txtEmail');
    /**
     * Gets the text for password
     */
    const txtPassword = document.getElementById('txtPassword');
    /**
     * Gets the input of the Log in button
     */
    const input = document.querySelector('#mySubmit3');
    /**
     * Gets the input of the Password Form
     */
    const input2 = document.querySelector('#txtPassword');
    /**
     * Gets the input of the Sign up button
     */
    const input3 = document.querySelector('#mySubmit4');

    /******************STUFF I ADDED - WILL**********************/
    // var userRef = firebase.database().ref().child('PickUp').child('Users');

    // userRef.orderByChild("email").equalTo("amartin@gmail.com").once('child_added', function(snapshot) {
    //   console.log(snapshot.key); //remove this
    //   window.localStorage.setItem("User", snapshot.key);
    // });
    /************************************************************/

    var userRef = firebase.database().ref().child('PickUp').child('Users');
    /**
     * Checks if the Log in button has been pressed
     */
    input.addEventListener('click', login);
    /**
     * Authenticates user if there Email and Password is correct
     * else it returns an alert
     * @param {} e
     */
      function login(e){
        e.preventDefault();
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
        promise.catch(e => alert("Email and/or Password is incorrect"));
        userRef.orderByChild("email").equalTo(email).once('child_added', function(snapshot) {
          console.log(snapshot.key);
          window.localStorage.setItem("User", snapshot.key);
        });

      }
      /**
       * Checks if a enter has been pressed on the password form
       */
      input2.addEventListener('keyup',function(e){
        if (e.keyCode === 13) {
            e.preventDefault();
            const email = txtEmail.value;
            const pass = txtPassword.value;
            const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
            promise.catch(e => alert("Email and/or Password is incorrect"));
            userRef.orderByChild("email").equalTo(email).once('child_added', function(snapshot) {
              console.log(snapshot.key);
              let rand = (Math.random() * 100000) | 0;
              window.localStorage.setItem("User", snapshot.key);
              window.localStorage.setItem("SessionID", rand);
            });
      }
    });
    var user = window.localStorage.getItem("User");
    console.log(user);
    /**
     * Checks if the Sign up button has been pressed
     */
    input3.addEventListener('click', signup);
    /**
     * Takes user to sign up page.
     * @param {} e
     */
    function signup(e){
      e.preventDefault();
      window.location.href = "SignUp1.html";
    }
    /**
     * Makes a sleep function that is used for signing out
     * @param {Milliseconds} ms
     */
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    /**
     * Makes the program wait before checking if the user is signed in
     */
      async function wait() {
      await sleep(2000);
      /**
       * Checks if the user is signed in
       */
        firebase.auth().onAuthStateChanged(firebaseUser =>{
          if(firebaseUser) {
          console.log (firebaseUser);
          console.log("Logging in...");
          window.location.href = "mainpage.html";

          } else {
          console.log('not logged in');
          }
    });
}
     /**
     * Makes the program wait before checking if the user is signed in
     */
    wait();
