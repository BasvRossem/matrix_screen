var COLOR_GREEN;
var COLOR_LIGHT_GREEN;
var COLOR_BLACK;
var COLOR_BLACK_TRANSPARENT;

var streams = [];
var symbolSize = 30;
var symbolAmountMax = 20;

function setup() {
    // Set colors
    COLOR_GREEN = color(0, 255, 70);
    COLOR_LIGHT_GREEN = color(140, 255, 170);
    COLOR_BLACK = color(0, 0, 0);
    COLOR_BLACK_TRANSPARENT = color(0, 0, 0, 90);

    // Create canvas
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);

    // Init streams
    var pos_x = 0;
    for (var i = 0; i <= width / symbolSize; i++) {
        stream = new Stream(pos_x, random(-500, -4000));
        streams.push(stream);
        pos_x += symbolSize;
    }

    // Text settings
    if (window.innerWidth < 1000) {
        symbolSize = window.innerWidth / 12;
        symbolAmountMax = round((window.innerHeight / symbolSize) * 0.75);
    }
    textFont("Consolas");
    textSize(symbolSize);
}

function draw() {
    time_start = new Date().getTime();

    background(COLOR_BLACK_TRANSPARENT);
    streams.forEach((stream) => stream.render());
}

class MySymbol {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.character = String.fromCharCode(0x30a0 + round(random(0, 96)));
        this.changeCharacterInterval = round(random(150, 300));
    }

    setCharacter() {
        this.character = String.fromCharCode(0x30a0 + round(random(0, 90)));
    }

    render() {
        text(this.character, this.x, this.y);
        if (frameCount % this.changeCharacterInterval == 0) {
            this.setCharacter();
        }
    }
}

class Stream {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        this.symbols = [];
        this.amountOfSymbols = round(random(5, symbolAmountMax));
        this.firstStream = round(random(0, 2)) == 0;
        this.moveDownInterval = round(random(10, 30));

        while (this.symbols.length < this.amountOfSymbols) {
            this.generateSymbol();
        }
    }

    generateSymbol() {
        if (this.y > innerHeight) {
            this.y = symbolSize * -1;
        }
        this.symbols.unshift(new MySymbol(this.x, this.y));
        this.y += symbolSize;
    }

    render() {
        this.symbols.forEach(function (symbol, index) {
            this.firstStream && index == 0 ? fill(COLOR_LIGHT_GREEN) : fill(COLOR_GREEN);
            symbol.render();
        }, this);

        if (frameCount % this.moveDownInterval == 0) {
            this.symbols.pop();
            this.generateSymbol();
        }
    }
}
