var config = {
    apiKey: "AIzaSyD0bFMT_-dlAfllbPc2rJXhZRnrJIERwv8",
    authDomain: "pickup-1541825853857.firebaseapp.com",
    databaseURL: "https://pickup-1541825853857.firebaseio.com",
    projectId: "pickup-1541825853857",
    storageBucket: "pickup-1541825853857.appspot.com",
    messagingSenderId: "51007491965"
    };
    firebase.initializeApp(config); 
    const auth = firebase.auth();
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    document.getElementById('mySubmit3').addEventListener('click', login);
      function login(e){
        e.preventDefault();
        const txtEmail = txtEmail.value;
        const txtPassword = txtPassword.value;
        const promise = firebase.auth().signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
      }
      firebase.auth() .onAuthStateChanged(firebaseUser =>{ 
        if(firebaseUser) { 
        console.log (firebaseUser); 
        } else { 
        console.log( 'not logged in' ); 
        }
    });