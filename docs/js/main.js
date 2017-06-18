var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(tag, parent, x, y, width, height) {
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
        this.rect = this.div.getBoundingClientRect();
        this.x = this.rect.left;
        this.y = this.rect.top;
        this.width = width;
        this.height = height;
    }
    GameObject.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return GameObject;
}());
var Part = (function () {
    function Part(b, p, offset, row, column) {
        this.bridge = b;
        this.parent = p;
        this.row = row;
        this.column = column;
        this.width = 125;
        this.height = 100;
        this.x = (column * 125) + offset + 77;
        this.y = row * 100;
        this.createDiv();
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
    Part.prototype.createDiv = function () {
        if (this.row % 2 == 0) {
            this.allowed = 1;
        }
        else {
            this.allowed = Math.round(Math.random());
        }
        if (this.allowed) {
            this.div = document.createElement("filledpart");
            this.parent.appendChild(this.div);
        }
        else {
            this.div = document.createElement("brokenpart");
            this.parent.appendChild(this.div);
        }
    };
    return Part;
}());
var Bridge = (function (_super) {
    __extends(Bridge, _super);
    function Bridge(parent) {
        var _this = _super.call(this, "bridge", parent, 0, 0, 650, 960) || this;
        _this.parent = parent;
        _this.setPosition();
        _this.createParts();
        return _this;
    }
    Bridge.prototype.setPosition = function () {
        this.x = window.innerWidth / 2 - 325;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Bridge.prototype.createParts = function () {
        this.parts = new Array();
        this.collidingparts = new Array();
        for (var row = 0; row < 7; row++) {
            this.passable = false;
            while (this.passable == false) {
                for (var column = 0; column < 4; column++) {
                    var p = new Part(this, this.parent, this.x, row, column);
                    this.parts.push(p);
                    if (p.allowed == 1) {
                        this.passable = true;
                    }
                    if (p.allowed == 0) {
                        this.collidingparts.push(p);
                    }
                }
            }
        }
    };
    Bridge.prototype.removePart = function (p) {
        p.div.remove();
    };
    return Bridge;
}(GameObject));
var Car = (function () {
    function Car(g) {
        this.speed = 0;
        this.div = document.createElement("car");
        document.body.appendChild(this.div);
        this.game = g;
        this.x = -168;
        this.y = Math.ceil(Math.random() * 5) * 110;
        this.width = 168;
        this.height = 108;
        this.speed = Math.random() * 2 + 2;
        this.setColor();
        this.update();
    }
    Car.prototype.update = function () {
        this.x += this.speed;
        if (this.x > window.innerWidth) {
            console.log("Auto uit beeld: " + this.x);
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Car.prototype.setColor = function () {
        var color = Math.random() * 360;
        this.div.style.webkitFilter = "hue-rotate(" + color + "deg)";
        this.div.style.filter = "hue-rotate(" + color + "deg)";
    };
    return Car;
}());
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(l, parent) {
        var _this = _super.call(this, "character", parent, 400, 670, 61, 102) || this;
        _this.level = l;
        _this.x = window.innerWidth / 2 - 61 / 2 + 125 / 2;
        _this.y = window.innerHeight - 102 + 35;
        console.log(_this.x);
        console.log("ik ben " + _this.width);
        _this.callback = function (e) { return _this.onKeyDown(e); };
        window.addEventListener("keydown", _this.callback);
        return _this;
    }
    Character.prototype.removeMe = function () {
        this.div.remove();
        window.removeEventListener("keydown", this.callback);
    };
    Character.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 65:
                this.x -= 125;
                if (this.x < 550)
                    this.level.gameOver();
                break;
            case 68:
                this.x += 125;
                if (this.x > 925)
                    this.level.gameOver();
                break;
            case 87:
                this.y -= 100;
                if (this.y < -50) {
                    this.y = 670;
                    this.level.scoreCount();
                }
                break;
            case 83:
                this.y += 100;
                break;
        }
    };
    Character.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Character;
}(GameObject));
var Start = (function () {
    function Start(g) {
        this.game = g;
        this.createButton();
    }
    Start.prototype.createButton = function () {
        var _this = this;
        this.button = document.createElement("button");
        document.body.appendChild(this.button);
        TweenLite.set(this.button, { x: 550, y: -230 });
        TweenLite.to(this.button, 1, { y: 300, ease: Bounce.easeOut });
        this.button.addEventListener("click", function (e) { return _this.startGame(e); });
    };
    Start.prototype.startGame = function (e) {
        this.button.remove();
        var level = new Level(this.game);
        this.game.showView(level);
    };
    return Start;
}());
var Level = (function () {
    function Level(g) {
        var _this = this;
        this.cars = new Array();
        this.game = g;
        this.score = 0;
        this.createLevel();
        setInterval(function () { return _this.createCar(); }, 1400);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Level.prototype.createCar = function () {
    };
    Level.prototype.createLevel = function () {
        this.div = document.createElement("level");
        this.game.container.appendChild(this.div);
        this.bridge = new Bridge(this.div);
        this.character = new Character(this, this.div);
    };
    Level.prototype.gameLoop = function () {
        var _this = this;
        var collision = false;
        for (var _i = 0, _a = this.bridge.collidingparts; _i < _a.length; _i++) {
            var p = _a[_i];
            if (Util.checkCollision(p, this.character)) {
                p.div.style.opacity = 0.2.toString();
                collision = true;
            }
            else {
                p.div.style.opacity = 1 + "";
            }
        }
        this.character.update();
        this.bridge.update();
        for (var _b = 0, _c = this.cars; _b < _c.length; _b++) {
            var c = _c[_b];
            c.update();
        }
        if (collision) {
            this.gameOver();
        }
        else {
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    Level.prototype.gameOver = function () {
        this.div.remove();
        this.character.removeMe();
        var score = new Score(this.game, this.score);
        this.game.showView(score);
    };
    Level.prototype.scoreCount = function () {
        this.score++;
        console.log("Scored! Score = " + this.score);
        for (var i = 0; i < this.bridge.parts.length; i++) {
            var p = this.bridge.parts[i];
            this.bridge.removePart(p);
        }
        this.bridge.parts = [];
        this.bridge.createParts();
    };
    return Level;
}());
var Game = (function () {
    function Game() {
        this.container = document.createElement("container");
        document.body.appendChild(this.container);
        var start = new Start(this);
        this.showView(start);
    }
    Game.prototype.showView = function (v) {
        this.view = v;
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function (part, character) {
        return (part.x < character.x + character.width &&
            part.x + part.width > character.x &&
            part.y < character.y + character.height &&
            part.height + part.y > character.y + 40);
    };
    return Util;
}());
var Score = (function () {
    function Score(g, s) {
        this.game = g;
        this.score = s;
        this.createButton();
        console.log("Game over newb");
        console.log("Score: " + this.score);
        this.div = document.createElement("start");
        g.container.appendChild(this.div);
    }
    Score.prototype.createButton = function () {
        var _this = this;
        this.button = document.createElement("button");
        document.body.appendChild(this.button);
        TweenLite.set(this.button, { x: 550, y: -230 });
        TweenLite.to(this.button, 1, { y: 300, ease: Bounce.easeOut });
        this.button.addEventListener("click", function (e) { return _this.startGame(e); });
    };
    Score.prototype.startGame = function (e) {
        this.button.remove();
        var level = new Level(this.game);
        this.game.showView(level);
    };
    return Score;
}());
//# sourceMappingURL=main.js.map