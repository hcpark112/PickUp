    /**
     * JAVASCRIPT FOR LogIn.html PAGE
     *
     * @author Alec Martin, A01059594
     */
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
      }
    });
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
          
          } else { 
          console.log('not logged in'); 
          }
    });
}
     /**
     * Makes the program wait before checking if the user is signed in
     */
    wait();