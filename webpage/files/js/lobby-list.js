$(document).ready(function() {
    $("#drop a").click(function() {
        $("#sort button").html($(this).html());
    });
});

function dropDown() {
    document.getElementById("drop").classList.toggle("dropdown-visible");
}

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