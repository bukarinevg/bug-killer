"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameState = /** @class */ (function () {
    function GameState(_a) {
        var active = _a.active, scoreText = _a.scoreText, player = _a.player, cursors = _a.cursors, enemies = _a.enemies, pelletsLoop = _a.pelletsLoop, playerProjectile = _a.playerProjectile, enemyVelocity = _a.enemyVelocity, currentLevel = _a.currentLevel;
        this.currentLevel = 1;
        this.lostState = false;
        this.score = 0;
        console.log("active: ".concat(active));
        this.active = active;
        this.scoreText = scoreText;
        this.player = player;
        this.cursors = cursors;
        this.enemies = enemies;
        this.pelletsLoop = pelletsLoop;
        this.playerProjectile = playerProjectile;
        this.enemyVelocity = enemyVelocity;
        this.currentLevel = currentLevel ? currentLevel : 1;
    }
    return GameState;
}());
exports.default = GameState;
