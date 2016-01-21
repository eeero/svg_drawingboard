//Base class
var Widget = function(element){
  //Create SVG element.
  this.element = document.createElementNS('http://www.w3.org/2000/svg', element);
  //Append element to the SVG drawingBoard.
  document.getElementById('drawingBoard').appendChild(this.element);

  //When mode is Move, on mousedown, widget runs selectElement method. this is binded.
  this.element.onmousedown = this.selectElement.bind(this);
  this.element.setAttributeNS(null, "class", "widget");

};

Widget.prototype = function() {
    //getX and Y and set it to the center of the widget.
    // function getX() {
    //   return this.element.getAttribute('x') - this.element.getAttribute('width') * 0.5;
    // }
    // function getY() {
    //   return this.element.getAttribute('y') - this.element.getAttribute('height') * 0.5;
    // }
    function setCenterPoint(x, y) {
      //Set the new X and Y.
      var newX = x - this.element.getAttribute('width') * 0.5;
      this.element.setAttribute('x', newX);
      var newY = y - this.element.getAttribute('height') * 0.5;
      this.element.setAttribute('y', newY);
    }

    function selectElement() {
      //Bring to front.
      document.getElementById('drawingBoard').appendChild(this.element);
      //Make this the selected widget.
      selectedWidget = this;
      //console.log(this);
    }

    return {
      // getX: getX,
      // getY: getY,
      setCenterPoint: setCenterPoint,
      selectElement: selectElement,
      changeSize: function(){}
    }
}();

var Rectangle = function(x, y){
    Widget.call(this, 'rect');
    this.x = x;
    this.y = y;

    this.element.setAttribute('fill', "red");
}

var Square = function(x, y){
    Widget.call(this, 'rect');
    this.x = x;
    this.y = y;

    this.element.setAttribute('fill', "blue");
}

var Circle = function(x, y){
    Widget.call(this, 'circle');
    this.x = x;
    this.y = y;
    this.element.setAttribute('cx', x);
    this.element.setAttribute('cy', y);
    this.element.setAttribute('fill', "#feab0b");
}

var Ellipse = function(x, y){
    Widget.call(this, 'ellipse');
    this.x = x;
    this.y = y;
    this.element.setAttribute('cx', x);
    this.element.setAttribute('cy', y);
    this.element.setAttribute('fill', "green");
}

var Textbox = function(x, y){
    Widget.call(this, 'text');
    this.x = x;
    this.y = y;
    this.element.setAttribute('x', x);
    this.element.setAttribute('y', y);
    this.element.textContent='Your text goes here.';
}

Rectangle.prototype = Object.create(Widget.prototype);
Square.prototype = Object.create(Widget.prototype);
Circle.prototype = Object.create(Widget.prototype);
Ellipse.prototype = Object.create(Widget.prototype);
Textbox.prototype = Object.create(Widget.prototype);

Rectangle.prototype.changeSize = function(dx, dy){
  console.log("Rectangle.prototype says: DRAW A RECTANGLE!");
  if (dx < 0) {dx = -dx};
  if (dy < 0) {dy = -dy};
  var width = dx*2;
  var height = dy*2;
  var new_x = this.x - width/2;
  var new_y = this.y - height/2;
  this.element.setAttribute('x', new_x);
  this.element.setAttribute('y', new_y);
  this.element.setAttribute('width', width);
  this.element.setAttribute('height', height);
}

Square.prototype.changeSize = function(dx, dy){
  console.log("SQUARE.prototype says: DRAW A SQUARE!");
  if (dx < 0) {dx = -dx};
  if (dy < 0) {dy = -dy};
  var width = dx + dy;
  var height = width;
  var new_x = this.x - width/2;
  var new_y = this.y - height/2;
  console.log("new_x: " + new_x + "new_y: " + new_y)
  this.element.setAttribute('x', new_x);
  this.element.setAttribute('y', new_y);
  this.element.setAttribute('width', width);
  this.element.setAttribute('height', height);
}

Ellipse.prototype.changeSize = function(dx, dy){
  if (dx < 0) {dx = -dx};
  if (dy < 0) {dy = -dy};
  var rx = dx;
  var ry = dy;
  this.element.setAttribute('rx', rx);
  this.element.setAttribute('ry', ry);
}

Circle.prototype.changeSize = function(dx, dy){
  //dx & dy = pointer distance from center.
  // radius = A*A + B*B. Coordinates for a triangle.
  var new_radius = Math.sqrt(dx*dx+dy*dy);
  this.element.setAttribute('r', new_radius);
}

// Circle.prototype.getX = function() {
//   return this.element.getAttribute('cx');
// }
//
// Circle.prototype.getY = function() {
//   return this.element.getAttribute('cy');
// }

//For circle and ellipse, override the default setCenterPoint method.
Circle.prototype.setCenterPoint = function(x, y) {
  this.element.setAttribute('cx', x);
  this.element.setAttribute('cy', y);
}

// Ellipse.prototype.getX = Circle.prototype.getX;
// Ellipse.prototype.getY = Circle.prototype.getY;
Ellipse.prototype.setCenterPoint = Circle.prototype.setCenterPoint;

Textbox.prototype.changeSize = function(dx, dy){
  if (dx < 0) {dx = -dx};
  if (dy < 0) {dy = -dy};
  var fontsize = dx + dy;
  this.element.setAttribute('font-size', fontsize);
}

Textbox.prototype.changeText = function(){
  var text = prompt("What would you like to say?", "");
  this.element.textContent=text;
}
