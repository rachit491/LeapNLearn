var imagePosMap = [];
var matrix = [];
var numMatrix = [];
var prevX = 2;
var prevY = 2;
var x = 2, y = 2;
var paths;
var wordSet = new Set();
function init() {
  var ctl = new Leap.Controller({enableGestures: true});

  var swiper = ctl.gesture('swipe');

  var totalDistance = 0;

  var tolerance = 50;
  var cooloff = 300;


  var updateHighlight = function() {
    $('.grid div').removeClass('highlight');
    $('.grid #d'+x+"_"+y).addClass('highlight');
  }

  var slider = _.debounce(function(xDir, yDir) {
    prevX = x;
    prevY = y;
    var temp = matrix[y][x];
    matrix[y][x] = matrix[(y+5+yDir)%5][(x+xDir+5)%5];
    matrix[(y+5+yDir)%5][(x+xDir+5)%5] = temp; 
    //console.log("prev");
    //console.log(matrix);
    temp = numMatrix[y][x];
    numMatrix[y][x] = numMatrix[(y+5+yDir)%5][(x+xDir+5)%5];
    numMatrix[(y+5+yDir)%5][(x+xDir+5)%5] = temp; 
    //console.log("next");
    //console.log(matrix);
    x += xDir;
    x = (x + 5) % 5;
    y += yDir;
    y = (y + 5) % 5;
    reRender();
    updateHighlight();
  }, cooloff);

  swiper.update(function(g) {
    if (Math.abs(g.translation()[0]) > tolerance || Math.abs(g.translation()[1]) > tolerance) {
      var xDir = Math.abs(g.translation()[0]) > tolerance ? (g.translation()[0] > 0 ? -1 : 1) : 0;
      var yDir = Math.abs(g.translation()[1]) > tolerance ? (g.translation()[1] < 0 ? -1 : 1) : 0;
      slider(xDir, yDir);
    }
  });

  ctl.connect();
  updateHighlight();

  createImageMap();
  loadAssets();
  pyCall();
 // for(var i = 0;i<paths.length;i++)
   // console.log(paths[i]);
}

function pyCall(){
  paths = searchWord(matrix);
  var params = new Array();
   for(i=0;i<paths.length;i++){
    if(!wordSet.has(paths[i]))
      params.add(paths[i]);
    wordSet.add(paths[i]);
  }
  var json_string = JSON.stringify(params);
}


function reRender() {
  for(var i=0; i<5; i++) {
    for(var j=0; j<5; j++) {
      num = numMatrix[i][j];
      var elm = document.getElementById("d"+j+"_"+i);
      elm.style.backgroundImage = "url('../assets/text-gray.jpg')";
      elm.style.backgroundRepeat = "no-repeat";
      elm.style.backgroundPositionX = imagePosMap[num].x + "px";//"-20px";     //-140px to move left
      elm.style.backgroundPositionY = imagePosMap[num].y + "px";//"-14px";     //-115px to move down
      elm.style.backgroundSize = "707%";
      elm.setAttribute("data-value", imagePosMap[num].value);
      //matrix[i].push(imagePosMap[num].value);
      //numMatrix[i].push(num);
    }
  }
  pyCall();
}

function getWeight(char) {
  switch(char) {
    case 'E': return 120;
    case 'T': return 90;
    case 'A':
    case 'I':
    case 'N':
    case 'O':
    case 'S': return 80;
    case 'H': return 64;
    case 'R': return 62;
    case 'D': return 44;
    case 'L': return 40;
    case 'U': return 34;
    case 'C': 
    case 'M': return 30;
    case 'F': return 25;
    case 'Y':
    case 'W': return 20;
    case 'G': 
    case 'P': return 17;
    case 'B': return 16;
    case 'V': return 12;
    case 'K': return 8;
    case 'Q': return 5;
    case 'J': 
    case 'X': return 4;
    case 'Z': return 2;
  }
}

function createImageMap() {
  var char = 'A';
  for(var i=0; i<6; i++) {
    for(var j=0; j<5; j++) {
      imagePosMap.push({x: -20-(j*140), y: -15-(i*115), value: char, weight: getWeight(char)});
      char = String.fromCharCode(char.charCodeAt() + 1);
      if(i==5 && j>=0) {
        break;
      }
    }
  }
  //console.log(imagePosMap);
}

function getRandomLetters() {
  //return Math.floor(Math.random() * 26);
  var sumOfWeights = 0;
  for(var i=0; i<26; i++) {
    sumOfWeights += imagePosMap[i].weight;
  }
  var randomWeight = Math.floor(Math.random() * sumOfWeights) + 1;
  for(var i=0; i<26; i++) {
    randomWeight = randomWeight - imagePosMap[i].weight;
      if(randomWeight <= 0)
        return i;
  }
}

function loadAssets() {
  var num;
  for(var i=0; i<5; i++) {
    matrix[i] = [];
    numMatrix[i] = [];
    for(var j=0; j<5; j++) {
      num = getRandomLetters();
      var elm = document.getElementById("d"+j+"_"+i);
      elm.style.backgroundImage = "url('../assets/text-gray.jpg')";
      elm.style.backgroundRepeat = "no-repeat";
      elm.style.backgroundPositionX = imagePosMap[num].x + "px";//"-20px";     //-140px to move left
      elm.style.backgroundPositionY = imagePosMap[num].y + "px";//"-14px";     //-115px to move down
      elm.style.backgroundSize = "707%";
      elm.setAttribute("data-value", imagePosMap[num].value);
      matrix[i].push(imagePosMap[num].value);
      numMatrix[i].push(num);
    }
  }
}