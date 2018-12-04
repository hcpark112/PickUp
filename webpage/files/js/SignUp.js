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
            // let hasName = false, hasPass = false, hasEmail = false, hasAddress = false
            //e.preventDefault();
            //console.log(123);
            window.localStorage.setItem("name",document.getElementById("name").value);
            window.localStorage.setItem("password",document.getElementById("password").value);
            window.localStorage.setItem("emailfield2",document.getElementById("emailfield2").value);
            window.localStorage.setItem("addressfield",document.getElementById("addressfield").value);
            window.localStorage.setItem("gender",document.getElementById("gender").value);
            window.localStorage.setItem("day",document.getElementById("day").value);
            window.localStorage.setItem("month",document.getElementById("month").value);
            window.localStorage.setItem("year",document.getElementById("year").value);
            window.localStorage.setItem("check",document.getElementById("check").value);

            if(isFilled()) {
              let enteredPass = window.localStorage.getItem("password");
              if(enteredPass.length < 6) {
                alert("**Pasword must be at least 6 characters**");
              } else {
                window.location.href = "SignUp2.html";
              }              
            } else {
            }
    }

    /**Checks that all the fields are filled*/
    function isFilled() {
      let localName =  window.localStorage.getItem("name");
      let hasName = localName.trim().length != 0;

      let localPass =  window.localStorage.getItem("password");
      let hasPass = localPass.trim().length != 0;

      let localEmail =  window.localStorage.getItem("emailfield2");
      let hasEmail = checkEmailFormat(localEmail);

      let localAddress =  window.localStorage.getItem("addressfield");
      let hasAddress = localAddress.trim().length != 0;

      let localGender =  window.localStorage.getItem("gender");
      let hasGender = localGender.trim().length != 0;

      let localDay =  window.localStorage.getItem("day");
      let hasDay = localDay != "day";

      let localMonth =  window.localStorage.getItem("month");
      let hasMonth = localMonth != "month";

      let localYear =  window.localStorage.getItem("year");
      let hasYear = localYear != "year";

      //let localCheck =  window.localStorage.getItem("check");
      let localCheck = document.getElementById("check");

      // console.log(localCheck.checked);

      return hasName && hasPass && hasEmail && hasAddress && hasGender && hasDay && hasMonth && hasYear && localCheck.checked;
    }

    /**Makes sure that the email field is in email format*/
    function checkEmailFormat(localEmail) {
      let isEmpty = localEmail.trim().length == 0;
      let hasAt = localEmail.indexOf("@") > 0;
      if(!isEmpty && hasAt) {
        let str = localEmail.substring(localEmail.indexOf("@"));
        return str.indexOf(".") > 0;
      } else {
        return false;
      }
    }

    function getInputVal(id){
            return document.getElementById(id).value;
    }
    function back(e){
        e.preventDefault();
        window.location.href = "LogIn.html";
}
$( document ).ready(function() {
  $('.ui.form')
  .form({
    fields: {
      name: {
        identifier: 'name',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your name'
          }
        ]
      },
      password: {
        identifier: 'password',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a password'
          },
          {
            type   : 'minLength[6]',
            prompt : 'Your password must be at least {ruleValue} characters'
          }
        ]
      },
      email: {
        identifier: 'emailfield2',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your email'
          }
        ]
      },
      address: {
        identifier: 'addressfield',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter your address'
          }
        ]
      },
      gender: {
        identifier: 'gender',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please select a gender'
          }
        ]
      },
<<<<<<< Updated upstream
      day: {
        identifier: 'day',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please select a day'
          }
        ]
      },
      month: {
        identifier: 'month',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please select a month'
          }
        ]
      },
      year: {
        identifier: 'year',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please select a year'
          }
        ]
      },
=======
>>>>>>> Stashed changes
      terms: {
        identifier: 'check',
        rules: [
          {
            type   : 'checked',
            prompt : 'You must agree to the terms and conditions'
          }
        ]
      }
    }
  })
;
});

