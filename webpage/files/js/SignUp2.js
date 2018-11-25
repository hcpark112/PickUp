
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var done = document.getElementsByClassName("close")[0];
btn.onclick = function() {
        modal.style.display = "block";
}
done.onclick = function() {
        modal.style.display = "none";
}
$( "#baseball2" ).click(function() {
        $( this ).toggleClass( "active" ); 
});
$( "#basketball2" ).click(function() {
        $( this ).toggleClass( "active" ); 
});
$( "#soccerball" ).click(function() {
        $( this ).toggleClass( "active" ); 
        
});
$( "#tennis2" ).click(function() {
        $( this ).toggleClass( "active" ); 
        
});
$( "#volleyball" ).click(function() {
        $( this ).toggleClass( "active" ); 
});
$( "#plus2" ).click(function() {
        $( this ).toggleClass( "active" ); 
});

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
      
      var dbRef = firebase.database();
      
      var usersRef = firebase.database().ref().child('PickUp').child('Users').push();
      //usersRef.update({ title: "New title", body: "This is the new body" }) 
      console.log(document.getElementById('base').value)
      document.getElementById('mySubmit2').addEventListener('click', submitForm);
      function submitForm(e){
                
              e.preventDefault();
              //console.log(123);
              
              var base = getInputVal('base');
              var basket = getInputVal('basket');
              var soccer = getInputVal('soccer');
              var tennis = getInputVal('tennis');
              var volley = getInputVal('volley');
              
              
              createUser( name, pass, email, address, gender, base, basket, soccer, tennis, volley);
              
      }
      function getInputVal(id){
              return document.getElementById(id).value;   
      }
        var name = window.localStorage.getItem("name");
        var pass = window.localStorage.getItem("password");
        var email = window.localStorage.getItem("emailfield2");
        var address = window.localStorage.getItem("addressfield");
        var gender = window.localStorage.getItem("gender");
      console.log(name);
      function createUser(fullName, password, email, gender, base, basket, soccer, tennis, volley) {
        usersRef.set({
        fullname: fullName,
        password: password,
        email: email,
        gender: gender,
        karma: "5000",
            baseball: base,
            basketball: basket,
            tennis: tennis,
            soccer: soccer,
            volleyball: volley
          
        });
}
