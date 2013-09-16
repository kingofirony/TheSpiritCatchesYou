var score = 0;
var speed = 2;
var displayAlert = true;
var imageTitles = ['../static/mountains.jpg','../static/ocean.jpg','../static/field.jpg','../static/island.jpg','../static/desert.jpg','../static/snow.jpg'];

function up(){
    var y = parseInt($("#sprite").attr("y"));
    $("#sprite").attr("y",y - 20);
}

function down(){
    var y = parseInt($("#sprite").attr("y"));
    $("#sprite").attr("y",y + 20);
}

function refreshScore(){
    $("#score").replaceWith("<h1 id = \"score\"> Score: " + score + "</h1>");
}

function redrawStick(){
    var y = parseInt($("#hole").attr("y"));
    $("#hole").attr("y",Math.floor(Math.random()*380));
}

function changePicture(){
    $("#back-image").attr("xlink:href",imageTitles[speed-2]);
}

function fall(){
    
    var x =parseInt($("#sprite2").attr("x"));
    var y =  parseInt($("#sprite2").attr("y"));
    if(y<340){
    $("#sprite2").attr("x",x-10);
    $("#sprite2").attr("y",y+10);
   
    }
 if(displayAlert && y >330){
    alert("Oh no - you lost! Refresh the page to play again and get the soul back to it's placenta.");
    displayAlert=false;}

   }

function end(){
    clearInterval(intervalId);
    $("#svg-canvas").css("opacity",0);
    $("#score").text("You Won! You successfully guided the soul back to it's placenta.");
    $("#score").css("color","red");
    $('#jacket').show();
}

$('#jacket').hide();


function flow(){
    var x = parseInt($("#sprite").attr("x"));
    $("#sprite").attr("x",x +speed);

    if(parseInt($("#sprite").attr("x"))>503){
	if(Math.abs(parseInt($("#sprite").attr("y")) - parseInt($("#hole").attr("y"))) < 25 || Math.abs(parseInt($("#hole").attr("y")) - parseInt($("#sprite").attr("y")))< 25){
	    score++;
	    refreshScore();
	    
	    if(score==18){
		end();}
	    if (score%3 ==0){
		speed++;
		changePicture();} 
    	$("#sprite").attr("x",x=0);
	redrawStick();
	}}
    if(parseInt($("#sprite").attr("x"))>510){
	speed = 0;
	
	$("#sprite").attr("height",0);
	var x =parseInt($("#sprite").attr("x"));
	var y =  parseInt($("#sprite").attr("y"));
	$("#sprite2").attr("x",x);
	$("#sprite2").attr("y",y);
	$("#sprite2").attr("height",75);
	
	setInterval(fall,20);
	
}

}
   


$("#svg-canvas").css("opacity",0);
$("#score").hide();

var intervalId;

$("#start-game").click(function(){
	intervalId=setInterval(flow,20);
	$('#start-game-div').hide();
	$("#svg-canvas").css("opacity",1);
	$("#score").show(); 
 });


$(document).keydown(function(e){
	if (e.keyCode == 87) { 
	    up();
	}
	if (e.keyCode == 83){
	    down();
	}
    });
