$(document).ready(function() {

  //replaces drop down button text with selection
  $("#drop a").click(function() {
      $("#sort button").html($(this).html());
    });

});

//toggles drop down when button is clicked
function dropDown() {
    document.getElementById("drop").classList.toggle("dropdown-visible");
}

//closes drop down when user clicks somewhere else on the page
window.onclick = function(event) {
    if (!event.target.matches("#sort button")) {
  
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("dropdown-visible")) {
          openDropdown.classList.remove("dropdown-visible");
        }
      }
    }
  }