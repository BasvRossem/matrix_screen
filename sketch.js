var streams = [];
symbolSize = 0;
symbolAmountMax = 20;

function setup(){
  if( window.innerWidth < 1000 ) {
    symbolSize = window.innerWidth / 12;
    console.log(window.innerWidth);
    symbolAmountMax = round((window.innerHeight / symbolSize) * 0.75);
  } else {
    symbolSize = 30;
    console.log(window.innerWidth);
  }
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  
  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    stream = new Stream;
    stream.setStreamValues(x, random(-1000, 0));
    streams.push(stream);
    x += symbolSize;
  }
  textFont('Consolas');
  textSize(symbolSize);
}

function draw() {
  background(0, 90);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y){
  this.x = x;
  this.y = y;
  this.character;
  
  var switchInterval = round(random(20, 100));

  this.setCharacter = function(){
    this.character = String.fromCharCode(0x30A0 + round(random(0, 96)));
  }

  this.render = function(){
    fill(0, 255, 70);
    text(this.character, this.x, this.y);
    if(frameCount % switchInterval == 0){
      this.setCharacter();
    }
  }

  this.renderFirst = function(){
    fill(140, 255, 170);
    text(this.character, this.x, this.y);
    if(frameCount % switchInterval == 0){
      this.setCharacter();
    }
  }
}

function Stream(){
  this.x = 0;
  this.y = 0;
  this.symbols = [];
  this.amountOfSymbols = round(random(5,symbolAmountMax));
  
  var firstStream = round(random(0,2)) == 0;
  var lastRendered = 0;
  var switchInterval = round(random(10, 30));

  this.setStreamValues = function(x, y){
    this.x = x;
    this.y = y;
  }

  this.generateSymbol = function(){
    if(this.y > innerHeight){
      this.y = -30;
    }
    symbol = new Symbol(this.x, this.y);
    symbol.setCharacter();
    this.symbols.unshift(symbol);
    this.y += symbolSize;
  }

  this.render = function(){
    if(this.symbols.length < this.amountOfSymbols){
      this.generateSymbol();
    }
    this.symbols.forEach(function(symbol, index) {
      if(index == 0 && firstStream){
        symbol.renderFirst();
      } else{
        symbol.render();
      }
    });
    if(frameCount % switchInterval == 0){
      this.symbols.pop();
      this.generateSymbol();
    }
  }
}