"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var phaser_1 = __importDefault(require("phaser"));
var gameConfig_1 = __importDefault(require("@config/gameConfig"));
var StartScene = /** @class */ (function (_super) {
    __extends(StartScene, _super);
    function StartScene() {
        var _this = _super.call(this, { key: "StartSceneUniqueKey" }) || this;
        _this.defaultTextColor = "white"; // Define default text color as a property
        return _this;
    }
    StartScene.prototype.preload = function () {
        this.load.setBaseURL('https://labs.phaser.io');
    };
    StartScene.prototype.create = function () {
        if (!this.input.keyboard) {
            alert("No keyboard detected");
            this.add.text(gameConfig_1.default.width * 0.5, gameConfig_1.default.height * 0.5, "No keyboard detected", {
                fontSize: "2rem",
                shadow: { fill: true, blur: 0, offsetY: 0 }
            })
                .setOrigin(0.5);
            ;
            return;
        }
        this.cameras.main.setBackgroundColor('#64b740');
        this.createWelcomeText();
        this.createInstructions();
    };
    StartScene.prototype.update = function () {
        if (this.input.keyboard.addKey(phaser_1.default.Input.Keyboard.KeyCodes.F).isDown) {
            this.scene.stop("StartScene");
            this.scene.start("BugGameScene");
        }
    };
    StartScene.prototype.createWelcomeText = function () {
        var welcomeText = this.add.text(gameConfig_1.default.width * 0.5, gameConfig_1.default.height * 0.25, "Welcome to Bug Invaders", {
            fontSize: "2rem",
            color: this.defaultTextColor,
            shadow: { fill: true, blur: 0, offsetY: 0 }
        })
            .setOrigin(0.5);
        var startText = this.add.text(gameConfig_1.default.width * 0.5, gameConfig_1.default.height * 0.5, "Press F to start the game", {
            fontSize: "1rem",
            color: this.defaultTextColor,
            shadow: { fill: true, blur: 0, offsetY: 0 }
        })
            .setOrigin(0.5);
        var welcomeTextGroup = this.add.group();
        welcomeTextGroup.add(welcomeText);
        welcomeTextGroup.add(startText);
    };
    StartScene.prototype.createInstructions = function () {
        var _this = this;
        var instructions = this.add.group();
        var controlsArray = [
            ['←', '→'],
            // ['a', 'd'],
        ];
        var itemsPerRow = 2;
        controlsArray.forEach(function (controls, i) {
            var yPosition = gameConfig_1.default.height * 0.75 + (i * 60);
            controls.forEach(function (control, j) {
                var xPosition = j % itemsPerRow === 0 ? gameConfig_1.default.width * 0.25 : gameConfig_1.default.width * 0.75;
                var arrowButton = _this.add.graphics();
                arrowButton.fillStyle(0x000000, 0.2);
                arrowButton.fillRect(xPosition - 25, yPosition - 25, 50, 50);
                var arrow = _this.add.text(xPosition, yPosition, control, {
                    fontSize: "1.5rem",
                    color: _this.defaultTextColor
                }).setOrigin(0.5);
                instructions.add(arrowButton);
                instructions.add(arrow);
            });
        });
        var spaceButton = this.add.graphics();
        spaceButton.fillStyle(0x000000, 0.2);
        spaceButton.fillRect(gameConfig_1.default.width * 0.5 - 50, gameConfig_1.default.height * 0.75 - 25, 100, 50);
        var spaceText = this.add.text(gameConfig_1.default.width * 0.5, gameConfig_1.default.height * 0.75, 'SPACE', {
            fontSize: "1.5rem",
            color: this.defaultTextColor
        }).setOrigin(0.5);
        var instructionsText = this.add.text(gameConfig_1.default.width * 0.5, gameConfig_1.default.height * 0.9, "Use the arrow keys to move and space to shoot", {
            fontSize: "1rem",
            color: this.defaultTextColor,
            shadow: { fill: true, blur: 0, offsetY: 0 }
        }).setOrigin(0.5);
        instructions.add(spaceButton);
        instructions.add(spaceText);
        instructions.add(instructionsText);
    };
    return StartScene;
}(phaser_1.default.Scene));
exports.default = StartScene;
