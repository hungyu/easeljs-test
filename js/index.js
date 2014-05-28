// Add new prototype to createjs
createjs.Bitmap.prototype.setWidth = function(w){
  'use strict';
  if (this.image.width == 0) return;
  this.scaleX = w / this.image.width;
}

  
createjs.Bitmap.prototype.setHeight = function(h){
  'use strict';
  if (this.image.height == 0) return;
  this.scaleY = h / this.image.height;
}

// Global variable
var IMAGE_NUMBER = 3;
var imageSet = [];
var stage = {};
var imageLoadedCount = 0;

$(function(){
  "use strict";

  // Entry point
  preLoading();

  // Preloading image set
  function preLoading(){
    var length = window.IMAGE_NUMBER;
    
    for (var i = 0; i < length; i++){
      window.imageSet[i] = new Image();
    }
    
    for (var i = 0; i < length; i++){ 
      window.imageSet[i].onload = function(){
        console.log('image.onload');
        afterLoaded();
      }
    }

    imageSet[0].src = $('#fire').attr('src');
    imageSet[1].src = $('#floor').attr('src');
    imageSet[2].src = $('#fire-bottom').attr('src');
  }

  // After image set loaded
  function afterLoaded(){
    window.imageLoadedCount += 1;

    if (window.imageLoadedCount === window.IMAGE_NUMBER){
      console.log('iin');

      // Creating canvas
      var newCanvas = 
        $('<canvas/>',{
          'class':'canvas',
          'id'   :'canvas1',
        })
        .appendTo('body');

      $('#canvas1').attr('width',$('#floor').width());
      $('#canvas1').attr('height',$('#floor').height());

      window.stage = new createjs.Stage($('#canvas1').get(0));

      // Draw background image
      var background = new createjs.Bitmap(imageSet[1]);

      window.stage.addChild(background);
      window.stage.update();
      console.log(background);

      // Draw other things
      var test = new createjs.Bitmap(imageSet[2]);
      test.x = 20;
      test.y = 30;
      window.stage.addChild(test);
      window.stage.update();

      console.log(window.stage.children)
    }
  }

});