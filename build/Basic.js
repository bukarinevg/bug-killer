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
var GameStateService_1 = __importDefault(require("@services/GameStateService"));
var gameConfig_1 = __importDefault(require("@config/gameConfig"));
var Basic = /** @class */ (function (_super) {
    __extends(Basic, _super);
    function Basic(_a) {
        var key = _a.key;
        var _this = _super.call(this, { key: key }) || this;
        _this.gameStateService = new GameStateService_1.default();
        _this.gameState = _this.gameStateService.getGameState();
        return _this;
    }
    // Helper Methods below:    
    // sortedEnemies() returns an array of enemy sprites sorted by their x coordinate
    Basic.prototype.sortedEnemies = function () {
        if (!this.gameState.enemies)
            return [];
        var orderedByXCoord = this.gameState.enemies
            .getChildren()
            .sort(function (a, b) { return a.x - b.x; });
        return orderedByXCoord;
    };
    // numOfTotalEnemies() returns the number of total enemies
    Basic.prototype.numOfTotalEnemies = function () {
        if (!this.gameState.enemies)
            return 0;
        var totalEnemies = this.gameState.enemies.getChildren().length;
        return totalEnemies;
    };
    Basic.prototype.finishGame = function () {
        this.gameState.active = false;
        this.physics.pause();
        this.gameState.pelletsLoop.destroy();
        this.add.text(gameConfig_1.default.width / 2, gameConfig_1.default.height / 2, "Game Over", {
            fontSize: "2rem",
            color: "#000"
        })
            .setDepth(1)
            .setOrigin(0.5, 0.5);
        this.add.text(gameConfig_1.default.width * 0.5, gameConfig_1.default.height * 0.75, "Press F to start the game", {
            fontSize: "1rem",
            color: "black",
            shadow: { fill: true, blur: 0, offsetY: 0 }
        })
            .setOrigin(0.5);
    };
    Basic.prototype.showScore = function () {
        if (!this.gameState.scoreText || !this.gameState.enemies)
            return;
        this.gameState.scoreText.setText("Enemies Left: ".concat(this.numOfTotalEnemies()));
    };
    Basic.prototype.restartGame = function () {
        this.scene.restart();
        this.gameState.active = true;
        this.gameState.lostState = false;
        this.gameState.currentLevel = 1;
        this.gameState.enemyVelocity = 1.5;
    };
    Basic.prototype.generateEnemies = function (enemies) {
        for (var yVal = 1; yVal <= 3; yVal++) {
            for (var xVal = 1; xVal <= 8; xVal++) {
                enemies
                    .create(50 * xVal, 50 * yVal, "bug1")
                    .setGravityY(-gameConfig_1.default.gravity.y)
                    .setScale(0.6);
            }
        }
    };
    return Basic;
}(phaser_1.default.Scene));
exports.default = Basic;
