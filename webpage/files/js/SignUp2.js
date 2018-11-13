
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
                $( "#tennis" ).click(function() {
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
