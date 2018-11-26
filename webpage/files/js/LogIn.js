    
    const auth = firebase.auth();
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    document.getElementById('mySubmit3').addEventListener('click', login);
      function login(e){
        e.preventDefault();
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
      }
      //document.getElementById('mySubmit4').addEventListener('click', logout);
      //function logout(){
      //  firebase.auth().signOut();
      //}
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
      async function wait() {
      await sleep(2000);
      firebase.auth().onAuthStateChanged(firebaseUser =>{ 
        if(firebaseUser) { 
        console.log (firebaseUser); 
        console.log("Logging in...");
        document.location.href = "https://www.google.ca/";
        } else { 
        console.log('not logged in'); 
        }
    });
}
    wait();
    