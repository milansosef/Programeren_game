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
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rect = this.div.getBoundingClientRect();
    }
    GameObject.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return GameObject;
}());
var bridge = (function (_super) {
    __extends(bridge, _super);
    function bridge() {
        var _this = _super.call(this, "character", document.body, 400, 670, 650, 960) || this;
        _this.setPosition();
        return _this;
    }
    bridge.prototype.setPosition = function () {
        this.x = window.innerWidth / 2 - this.rect.width / 2;
        this.div.style.left = this.x + "px";
        this.div.style.top = this.y + "px";
    };
    return bridge;
}(GameObject));
var Character = (function (_super) {
    __extends(Character, _super);
    function Character() {
        var _this = _super.call(this, "character", document.body, 400, 670, 61, 102) || this;
        console.log("test");
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        return _this;
    }
    Character.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 65:
                this.x -= this.width;
                console.log("up");
                break;
            case 68:
                this.x += this.width;
                break;
            case 87:
                this.y -= 30;
                break;
            case 83:
                this.y += 30;
                break;
        }
    };
    Character.prototype.update = function () {
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Character;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.createParts();
        this.objects = new Array();
        this.character = new Character();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.createParts = function () {
        for (var row = 0; row < 6; row++) {
            this.passable = false;
            while (this.passable == false) {
                for (var column = 0; column < 4; column++) {
                    var p = new Part(row, column);
                    if (p.allowed == 1) {
                        this.passable = true;
                    }
                }
            }
        }
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.character.update();
        for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
            var o = _a[_i];
            o.update();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
    console.log("Game started");
});
var Part = (function () {
    function Part(row, column) {
        var _this = this;
        this.row = row;
        this.column = column;
        var div = document.createElement("div");
        document.body.appendChild(div);
        if (this.row % 2 == 0) {
            this.allowed = 1;
        }
        else {
            this.allowed = Math.round(Math.random());
        }
        div.className = (this.allowed) ? "filledpart" : "brokenpart";
        this.x = column * 125;
        this.y = row * 100;
        div.addEventListener("click", function () { return _this.partClicked(); });
        div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
    Part.prototype.partClicked = function () {
        console.log("row: " + this.row + " column: " + this.column);
        console.log(this.allowed);
    };
    return Part;
}());
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function (part, character) {
        return (part.x < character.x + character.width &&
            part.x + part.width > character.x &&
            part.y < character.y + character.height &&
            part.height + part.y > character.y);
    };
    return Util;
}());
var hit = Util.checkCollision(obj1, obj2);
//# sourceMappingURL=main.js.map