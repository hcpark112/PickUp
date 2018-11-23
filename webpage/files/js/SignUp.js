var config = {
    apiKey: "AIzaSyD0bFMT_-dlAfllbPc2rJXhZRnrJIERwv8",
    authDomain: "pickup-1541825853857.firebaseapp.com",
    databaseURL: "https://pickup-1541825853857.firebaseio.com",
    projectId: "pickup-1541825853857",
    storageBucket: "pickup-1541825853857.appspot.com",
    messagingSenderId: "51007491965"
    };
    firebase.initializeApp(config);
    var usersRef = firebase.database().ref().child('PickUp').child('Users');
    
    document.getElementById('mySubmit').addEventListener('click', submitForm);
    function submitForm(e){
              
            e.preventDefault();
            //console.log(123);
           
            var name = getInputVal('name');
            var pass = getInputVal('password');
            var email = getInputVal('emailfield2');
            var address = getInputVal('addressfield');
            var gender = getInputVal('gender');

            createUser(name, pass, email, address, gender);
    }
    function getInputVal(id){
            return document.getElementById(id).value;
    }
      
    function createUser(userNum, fullName, password, email, gender, base, basket, foot, soccer, volley) {
    usersRef.child(userNum).set({
    fullname: fullName,
    password: password,
    email: email,
    gender: gender,
    karma: "5000",
    })  
}