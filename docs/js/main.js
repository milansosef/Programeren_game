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
    function Part(b, p, offset, row, column, allowed) {
        this.bridge = b;
        this.parent = p;
        this.row = row;
        this.column = column;
        this.width = 125;
        this.height = 100;
        this.x = (column * 125) + offset + 77;
        this.y = row * 100;
        this.allowed = allowed;
        this.createDiv();
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
    Part.prototype.createDiv = function () {
        if (this.row % 2 == 0) {
            this.allowed = true;
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
            var currentPassables = [];
            for (var column = 0; column < 4; column++) {
                var state = Boolean((Math.floor(Math.random() * 100)) % 2 == 0);
                currentPassables.push(state);
                if (column == 3 && currentPassables.indexOf(true) == -1) {
                    state = true;
                }
                var p = new Part(this, this.parent, this.x, row, column, state);
                this.parts.push(p);
                if (p.allowed == false) {
                    this.collidingparts.push(p);
                }
            }
        }
    };
    Bridge.prototype.refreshParts = function () {
        for (var i = 0; i < this.parts.length; i++) {
            var p = this.parts[i];
            this.removePart(p);
        }
        this.parts = [];
        for (var i = 0; i < this.collidingparts.length; i++) {
            var p = this.collidingparts[i];
            this.removePart(p);
        }
        this.collidingparts = [];
        this.createParts();
    };
    Bridge.prototype.removePart = function (p) {
        p.div.remove();
    };
    return Bridge;
}(GameObject));
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(l, parent) {
        var _this = _super.call(this, "character", parent, 400, 670, 61, 102) || this;
        _this.level = l;
        _this.setPosition();
        _this.callback = function (e) { return _this.onKeyDown(e); };
        window.addEventListener("keydown", _this.callback);
        return _this;
    }
    Character.prototype.setPosition = function () {
        this.x = window.innerWidth / 2 - 61 / 2 + 125 / 2;
        this.y = window.innerHeight - 102 + 35;
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
                    this.level.bridgeCrossed();
                }
                break;
            case 83:
                this.y += 100;
                if (this.y > 670)
                    this.y = 670;
                break;
        }
    };
    Character.prototype.removeMe = function () {
        this.div.remove();
        window.removeEventListener("keydown", this.callback);
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
        TweenLite.set(this.button, { x: window.innerWidth / 2 - 345 / 2, y: -230 });
        TweenLite.to(this.button, 1, { y: window.innerHeight / 2 - 131 / 2, ease: Bounce.easeOut });
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
        this.wind = new Array();
        this.game = g;
        this.createLevel();
        this.score = new Score();
        this.bridge = new Bridge(this.div);
        this.character = new Character(this, this.div);
        this.intervalID = setInterval(function () { return _this.createWind(); }, 1400);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Level.prototype.createLevel = function () {
        this.div = document.createElement("level");
        this.game.container.appendChild(this.div);
    };
    Level.prototype.createWind = function () {
        this.wind.push(new Wind(this, this.div));
    };
    Level.prototype.removeWind = function (w) {
        var i = this.wind.indexOf(w);
        if (i != -1) {
            this.wind.splice(i, 1);
        }
    };
    Level.prototype.gameLoop = function () {
        var _this = this;
        var collision = false;
        for (var _i = 0, _a = this.bridge.collidingparts; _i < _a.length; _i++) {
            var p = _a[_i];
            if (Util.checkCollision(p, this.character)) {
                collision = true;
            }
        }
        this.character.update();
        this.bridge.update();
        for (var _b = 0, _c = this.wind; _b < _c.length; _b++) {
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
        clearInterval(this.intervalID);
        this.div.remove();
        this.character.removeMe();
        this.score.removeMe();
        var level = this;
        level = undefined;
        this.character = undefined;
        this.bridge = undefined;
        this.wind = undefined;
        var endscreen = new Endscreen(this.game, this.score);
        this.game.showView(endscreen);
    };
    Level.prototype.bridgeCrossed = function () {
        this.score.addScore(1);
        this.bridge.refreshParts();
    };
    return Level;
}());
var Endscreen = (function () {
    function Endscreen(g, s) {
        this.game = g;
        this.score = s;
        this.createGameOver();
        this.createScore();
        this.createButton();
    }
    Endscreen.prototype.createGameOver = function () {
        this.gameOver = document.createElement("score");
        this.gameOver.innerHTML = "GAME OVER";
        document.body.appendChild(this.gameOver);
        var gameOverX = window.innerWidth / 2 - 150;
        var gameOverY = window.innerHeight / 2 - 100;
        this.gameOver.style.transform = "translate(" + gameOverX + "px, " + gameOverY + "px)";
    };
    Endscreen.prototype.createScore = function () {
        this.scoreDiv = document.createElement("score");
        this.scoreDiv.innerHTML = "Your score: " + this.score.getScore();
        document.body.appendChild(this.scoreDiv);
        var scoreDivX = window.innerWidth / 2 - 150;
        var scoreDivY = window.innerHeight / 2;
        this.scoreDiv.style.transform = "translate(" + scoreDivX + "px, " + scoreDivY + "px)";
    };
    Endscreen.prototype.createButton = function () {
        var _this = this;
        this.button = document.createElement("button");
        document.body.appendChild(this.button);
        TweenLite.set(this.button, { x: window.innerWidth / 2 - 345 / 2, y: -230 });
        TweenLite.to(this.button, 1, { y: window.innerHeight / 2 + 131 / 2, ease: Bounce.easeOut });
        this.button.addEventListener("click", function (e) { return _this.startGame(e); });
    };
    Endscreen.prototype.startGame = function (e) {
        this.button.remove();
        this.gameOver.remove();
        this.scoreDiv.remove();
        var level = new Level(this.game);
        this.game.showView(level);
    };
    return Endscreen;
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
var Score = (function () {
    function Score() {
        this.scoreCount = 0;
        this.createDiv();
    }
    Score.prototype.addScore = function (n) {
        this.scoreCount = this.scoreCount + n;
        this.div.innerHTML = "SCORE: " + this.scoreCount;
    };
    Score.prototype.getScore = function () {
        return this.scoreCount;
    };
    Score.prototype.createDiv = function () {
        this.div = document.createElement("score");
        this.div.innerHTML = "SCORE: " + this.scoreCount;
        document.body.appendChild(this.div);
        this.div.style.transform = "translate(" + 20 + "px, " + 20 + "px)";
    };
    Score.prototype.removeMe = function () {
        this.div.remove();
    };
    return Score;
}());
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
var Wind = (function (_super) {
    __extends(Wind, _super);
    function Wind(l, parent) {
        var _this = _super.call(this, "wind", parent, -168, Math.ceil(Math.random() * 5) * 110, 168, 108) || this;
        _this.speed = 0;
        _this.level = l;
        _this.y = Math.ceil(Math.random() * 5) * 110;
        _this.speed = Math.random() * 2 + 2;
        _this.update();
        return _this;
    }
    Wind.prototype.update = function () {
        this.x += this.speed;
        if (this.x > window.innerWidth - 50) {
            this.removeMe();
        }
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Wind.prototype.removeMe = function () {
        this.div.remove();
        this.level.removeWind(this);
    };
    return Wind;
}(GameObject));
//# sourceMappingURL=main.js.map