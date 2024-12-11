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
        return _super.call(this, { key: "StartSceneUniqueKey" }) || this;
    }
    StartScene.prototype.create = function () {
        if (!this.input.keyboard) {
            alert("No keyboard detected");
            this.add.text(gameConfig_1.default.width * 0.5, gameConfig_1.default.height * 0.5, "No keyboard detected", {
                fontSize: "2rem",
                color: "black",
                shadow: { fill: true, blur: 0, offsetY: 0 }
            })
                .setOrigin(0.5);
            ;
            return;
        }
        var welcomeText = this.add.text(gameConfig_1.default.width * 0.5, gameConfig_1.default.height * 0.5, "Welcome to Bug Invaders", {
            fontSize: "2rem",
            color: "black",
            shadow: { fill: true, blur: 0, offsetY: 0 }
        })
            .setOrigin(0.5);
        var startText = this.add.text(gameConfig_1.default.width * 0.5, gameConfig_1.default.height * 0.75, "Press F to start the game", {
            fontSize: "1rem",
            color: "black",
            shadow: { fill: true, blur: 0, offsetY: 0 }
        })
            .setOrigin(0.5);
        var welcomeTextGroup = this.add.group();
        welcomeTextGroup.add(welcomeText);
        welcomeTextGroup.add(startText);
    };
    StartScene.prototype.update = function () {
        if (this.input.keyboard.addKey(phaser_1.default.Input.Keyboard.KeyCodes.F).isDown) {
            this.scene.stop("StartScene");
            this.scene.start("BugGameScene");
        }
    };
    return StartScene;
}(phaser_1.default.Scene));
exports.default = StartScene;
