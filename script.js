//Set default mode: Circle.
var mode = "Circle";
var newWidget;
var selectedWidget;

$( ".controlButton" ).click(function(event) {
   mode = event.target.id;
   //console.log("Mode is changed to: " + mode + ".");
   $(".controlButton").css("background-color", "#0ba5fe");
   $(".moveButton").css("background-color", "#d593d5");
   this.style.backgroundColor = '#0bfe9a';
});

$( ".clearButton" ).click(function() {
  $('svg').empty();
});

$('svg').mousedown(function(e){
  //Make new widget.
  switch(mode) {
    case "Rectangle":
      console.log("Mode: " + mode + ".");
      newWidget = new Rectangle(e.pageX, e.pageY);
      break;
    case "Square":
      console.log("Mode: " + mode + ".");
      newWidget = new Square(e.pageX, e.pageY);
      break;
    case "Ellipse":
      console.log("Mode: " + mode + ".");
      newWidget = new Ellipse(e.pageX, e.pageY);
      break;
    case "Circle":
      console.log("Mode: " + mode + ".");
      newWidget = new Circle(e.pageX, e.pageY);
      break;
    case "Textbox":
      console.log("Mode: " + mode + ".");
      newWidget = new Textbox(e.pageX, e.pageY);
      break;
    case "Move":
      //If mode is Move, widgets own mousedown event is used.
      console.log("Mode: " + mode + ".");
      break;
  }
});

$('svg').mousemove(function(e){
  // if newWidget is defined, calculate distance and run changeSize.
  if (newWidget !== undefined) {
    //dx & dy = pointer distance from center.
    var dx = newWidget.x - e.pageX;
    var dy = newWidget.y - e.pageY;
    newWidget.changeSize(dx, dy);
  }
  // if selectedWidget is defined, update CenterPoint for dragging.
  else if (selectedWidget !== undefined) {
    selectedWidget.setCenterPoint(e.pageX, e.pageY);
  }
});

// On mouseup, make newWidget and selectedWidget undefined.
$('svg').mouseup(function(e){

      if(mode === "Textbox"){
        //For textbox, run changeText method.
        newWidget.changeText();
        newWidget = undefined;
      }else{
        newWidget = undefined;
      }
      selectedWidget = undefined;

      if(mode !== "Move"){

        console.log("New " + mode + " is created!");

      }
});
