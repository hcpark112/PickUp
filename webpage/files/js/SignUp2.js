/**
 * JAVASCRIPT FOR LogIn.html PAGE
 *
 * @author Alec Martin, A01059594
 */
/**
 * Gets modal ID
 */
var modal = document.getElementById('myModal');
/**
 * Gets button ID
 */
var btn = document.getElementById("myBtn");
/**
 * Gets the close button for modal
 */
var done = document.getElementsByClassName("close")[0];
/**
 * Displays pop up on click
 */
btn.onclick = function() {
        modal.style.display = "block";
}
/**
 * Displays none on close
 */
done.onclick = function() {
        modal.style.display = "none";
}
/**
 * Displays Baseball box as if it has been clicked.
 */
$( "#baseball2" ).click(function() {
        $( this ).toggleClass( "active" ); 
});
/**
 * Displays Basketball box as if it has been clicked.
 */
$( "#basketball2" ).click(function() {
        $( this ).toggleClass( "active" ); 
});
/**
 * Displays Soccerball as if it has been clicked.
 */
$( "#soccerball" ).click(function() {
        $( this ).toggleClass( "active" ); 
        
});
/**
 * Displays Tennis box as if it has been clicked.
 */
$( "#tennis2" ).click(function() {
        $( this ).toggleClass( "active" ); 
        
});
/**
 * Displays Volleyball box as if it has been clicked.
 */
$( "#volleyball" ).click(function() {
        $( this ).toggleClass( "active" ); 
});
/**
 * Displays Football box as if it has been clicked. 
 */
$( "#foot" ).click(function() {
        $( this ).toggleClass( "active" ); 
});
/**
 * Displays Football range slider
 */
function baseballShow() {
        var x = document.getElementById("test");
        var y = document.getElementById("test7");
        if (x.style.display === "block") {
                x.style.display = "none";
                
        } else {
                x.style.display = "block";
        }
        if (y.style.display === "block") {
                y.style.display = "none";
                
        } else {
                y.style.display = "block";
        }
}
/**
 * Displays Football range slider as on or off
 */
function basketballShow() {
        var x = document.getElementById("test2");
        var y = document.getElementById("test8");
        if (x.style.display === "block") {
                x.style.display = "none";
                
        } else {
                x.style.display = "block";
        }
        if (y.style.display === "block") {
                y.style.display = "none";
                
        } else {
                y.style.display = "block";
        }
}
/**
 * Displays Football range slider as on or off
 */
function soccerballShow() {
        var x = document.getElementById("test3");
        var y = document.getElementById("test9");
        if (x.style.display === "block") {
                x.style.display = "none";
                
        } else {
                x.style.display = "block";
        }
        if (y.style.display === "block") {
                y.style.display = "none";
                
        } else {
                y.style.display = "block";
        }
}
/**
 * Displays Football range slider as on or off
 */
function tennisShow() {
        var x = document.getElementById("test4");
        var y = document.getElementById("test10");
        if (x.style.display === "block") {
                x.style.display = "none";
                
        } else {
                x.style.display = "block";
        }
        if (y.style.display === "block") {
                y.style.display = "none";
                
        } else {
                y.style.display = "block";
        }
}
/**
 * Displays Football range slider as on or off
 */
function volleyballShow() {
        var x = document.getElementById("test5");
        var y = document.getElementById("test11");
        if (x.style.display === "block") {
                x.style.display = "none";
                
        } else {
                x.style.display = "block";
        }
        if (y.style.display === "block") {
                y.style.display = "none";
                
        } else {
                y.style.display = "block";
        }
}
/**
 * Displays Football range slider as on or off
 */
function plusShow() {
        var x = document.getElementById("test6");
        var y = document.getElementById("test12");
        if (x.style.display === "block") {
                x.style.display = "none";
                
        } else {
                x.style.display = "block";
        }
        if (y.style.display === "block") {
                y.style.display = "none";
                
        } else {
                y.style.display = "block";
        }
}
$('#ex1').slider({
        formatter: function(value) {
                return 'Current value: ' + value;
        }
});
      // Initialize Firebase
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
       * Data base reference
       */
      var dbRef = firebase.database();
      const auth = firebase.auth();
      /**
       * User reference
       */
      var usersRef = firebase.database().ref().child('PickUp').child('Users');
        /**
        * Makes a sleep function that is used for signing out
        * @param {Milliseconds} ms 
        */
        function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
        }
      /**
       * Checks if back button has been clicked.
       */
      document.getElementById('mySubmit').addEventListener('click', back);
            /**
       * Gets the values of the items stored in local storage from SignUp1
       */
      var name = window.localStorage.getItem("name");
      var pass = window.localStorage.getItem("password");
      var email = window.localStorage.getItem("emailfield2");
      var address = window.localStorage.getItem("addressfield");
      var gender = window.localStorage.getItem("gender");
      /**
       * Checks if next has been clicked. If it has then add the user to the database
       */
      document.getElementById('mySubmit2').addEventListener('click', submitForm);
      document.getElementById('mySubmit2').addEventListener('click', next);
      function submitForm(e){
                
              e.preventDefault();
              //console.log(123);
              
              var base = getInputVal('base');
              var basket = getInputVal('basket');
              var soccer = getInputVal('soccer');
              var tennis = getInputVal('tennis');
              var volley = getInputVal('volley');
              var foot = getInputVal('foot');
              
              
              createUser( name, name, pass, email, address, gender, base, basket, soccer, tennis, volley, foot);
              const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
              promise.catch(e => console.log(e.message));
             
              
      }
        document.getElementById('mySubmit2').addEventListener('click', next);
        function next(e){
                e.preventDefault();
                window.location.href = "LogIn.html";
        }

      /**
       * Gets the inputed value of a range slider
       * @param {Id of form} id 
       */
      function getInputVal(id){
              return document.getElementById(id).value;   
      }
      function back(e){
        e.preventDefault();
        window.location.href = "SignUp1.html";
        }

        
      /**
       * Creates the user in the database when called.
       * @param {*} fullName 
       * @param {*} fullName 
       * @param {*} password 
       * @param {*} email 
       * @param {*} address 
       * @param {*} gender 
       * @param {*} base 
       * @param {*} basket 
       * @param {*} soccer 
       * @param {*} tennis 
       * @param {*} volley 
       * @param {*} foot 
       */
      function createUser(fullName, fullName, password, email, address, gender, base, basket, soccer, tennis, volley, foot) {
        usersRef.child(fullName).set({
        fullname: fullName,
        password: password,
        email: email,
        address: address,
        gender: gender,
        karma: "5000",
        sports: {
            baseball: base,
            basketball: basket,
            tennis: tennis,
            soccer: soccer,
            volleyball: volley,
            football: foot
        }
        });
}
