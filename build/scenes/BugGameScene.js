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
var Basic_1 = __importDefault(require("@default/Basic"));
var gameConfig_1 = __importDefault(require("@config/gameConfig"));
var AssetLoaderService_1 = __importDefault(require("@services/AssetLoaderService"));
var BugGameScene = /** @class */ (function (_super) {
    __extends(BugGameScene, _super);
    function BugGameScene() {
        return _super.call(this, { key: "BugGameScene" }) || this;
    }
    BugGameScene.prototype.preload = function () {
        var urlCodeAcademy = 'https://content.codecademy.com/courses/learn-phaser';
        var urlLabsPhaser = 'https://labs.phaser.io';
        var urlBugInvaders = "".concat(urlCodeAcademy, "/Bug%20Invaders");
        var urlPhysics = "".concat(urlCodeAcademy, "/physics");
        var urlSounds = 'https://cdn.phaserfiles.com/v385';
        AssetLoaderService_1.default.loadAssetImage(this, [
            { key: "bug1", path: "".concat(urlBugInvaders, "/bug_1.png") },
            { key: "bug2", path: "".concat(urlBugInvaders, "/bug_2.png") },
            { key: "bug3", path: "".concat(urlBugInvaders, "/bug_3.png") },
            { key: "platform", path: "".concat(urlPhysics, "/platform.png") },
            { key: "codey", path: "".concat(urlBugInvaders, "/codey.png") },
            { key: "enemyProjectile", path: "".concat(urlBugInvaders, "/bugPellet.png") },
            { key: "playerProjectile", path: "".concat(urlBugInvaders, "/bugRepellent.png") },
        ]);
        AssetLoaderService_1.default.loadAssetAudio(this, [
            { key: "mainAudio", path: "".concat(urlLabsPhaser, "/assets/audio/CatAstroPhi_shmup_normal.mp3") },
            { key: "winAudio", path: "./assets/audio/win_sound.mp3" },
            { key: "loseAudio", path: "./assets/audio/lose_sound.mp3" },
        ]);
    };
    BugGameScene.prototype.create = function () {
        var _this = this;
        var genEnemyPellet = function () {
            if (!_this.gameState.enemies || !_this.gameState.enemyPellets || !_this.gameState.active)
                return;
            var i = 0;
            while (i < _this.gameState.currentLevel) {
                var randomBug = Phaser.Utils.Array.GetRandom(_this.gameState.enemies.getChildren());
                _this.gameState.enemyPellets.create(randomBug.x, randomBug.y, "enemyProjectile");
                i++;
            }
        };
        this.gameState.cursors = this.input.keyboard.createCursorKeys();
        this.initSounds();
        var platformPosition = {
            x: gameConfig_1.default.width / 2,
            y: gameConfig_1.default.height - 10
        };
        var platform = this.initPlatform(platformPosition);
        var enemyPellets = this.physics.add.group();
        this.gameState.enemyPellets = enemyPellets;
        this.gameState.mainAudio.play();
        this.gameState.levelText = this.add.text(gameConfig_1.default.width * 0.5, 10, "Level ".concat(this.gameState.currentLevel), {
            fontSize: "15px",
            color: "black",
            shadow: { fill: true, blur: 1, offsetY: 0, offsetX: 0 },
            fontStyle: "fantasy"
        });
        // Displays the initial number of bugs, this value is initially hardcoded as 24
        this.gameState.scoreText = this.add.text(platformPosition.x, platformPosition.y, "Bugs Left: ", {
            fontSize: "15px"
        })
            .setOrigin(0.5, 0.5);
        // Uses the physics plugin to create Codey
        // Create Collider objects
        this.gameState.player = this.physics.add.sprite(225, 450, "codey")
            .setScale(0.5);
        this.gameState.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.gameState.player, platform);
        // Create enemies
        this.gameState.enemies = this.physics.add.group();
        this.generateEnemies(this.gameState.enemies);
        this.gameState.enemies;
        // Create enemy projectiles
        this.gameState.pelletsLoop = this.time.addEvent({
            delay: 300,
            callback: genEnemyPellet,
            callbackScope: this,
            loop: true,
        });
        this.gameState.playerProjectile = this.physics.add.group();
        // rule restart the Game
        this.input.keyboard.on("keydown-F", function () {
            if (_this.gameState.active)
                return;
            console.log("Starting game");
            _this.gameState.active = true;
            _this.restartGame();
        });
        //coliders
        this.physics.add.collider(enemyPellets, platform, function (platform, pelet) {
            pelet.destroy();
        });
        this.physics.add.collider(enemyPellets, this.gameState.player, function (player, pelet) {
            _this.gameState.lostState = true;
            _this.gameState.loseAudio.play();
            _this.finishGame();
        });
        this.physics.add.collider(this.gameState.enemies, this.gameState.playerProjectile, function (bug, repellent) {
            bug.destroy();
            repellent.destroy();
            _this.gameState.score += 1;
        });
        this.physics.add.collider(this.gameState.enemies, this.gameState.player, function (player, pelet) {
            _this.gameState.lostState = true;
            _this.gameState.loseAudio.play();
            _this.finishGame();
        });
        this.physics.add.collider(platform, this.gameState.enemies, function (platform, enemy) {
            enemy.destroy();
        });
    };
    BugGameScene.prototype.update = function () {
        var _this = this;
        if (!this.gameState.active || !this.gameState.cursors || !this.gameState.player || !this.gameState.enemies) {
            return;
        }
        this.showScore();
        var controlEnemiesPositioning = function () {
            if (!_this.gameState.enemies)
                return;
            var sortedEnemiesArray = _this.sortedEnemies();
            var leftMostEnemy = sortedEnemiesArray[0];
            var rightMostEnemy = sortedEnemiesArray[sortedEnemiesArray.length - 1];
            if (leftMostEnemy.x <= 10 || rightMostEnemy.x >= gameConfig_1.default.width - 10) {
                //change direction
                _this.gameState.enemyVelocity *= -1;
                _this.gameState.enemies.getChildren().forEach(function (enemy) {
                    enemy.y += 10; // Move each bug down
                });
            }
        };
        var genPlayerProjectile = function () {
            if (!_this.gameState.player)
                return;
            _this.gameState.playerProjectile
                .create(_this.gameState.player.x, _this.gameState.player.y, "playerProjectile")
                .setGravityY(-400);
        };
        var managePlayerKeyPress = function () {
            if (!_this.gameState.player || !_this.gameState.cursors)
                return;
            if (Phaser.Input.Keyboard.JustDown(_this.gameState.cursors.space)) {
                genPlayerProjectile();
            }
            if (_this.gameState.cursors.left.isDown && _this.gameState.player.x > 15) {
                _this.gameState.player.setVelocityX(-150);
            }
            else if (_this.gameState.cursors.right.isDown && _this.gameState.player.x < gameConfig_1.default.width - 15) {
                _this.gameState.player.setVelocityX(150);
            }
            else {
                _this.gameState.player.setVelocityX(0);
            }
        };
        var setEnemmiesMovement = function () {
            if (!_this.gameState.enemies)
                return;
            _this.gameState.enemies.getChildren().forEach(function (bug) {
                bug.x += _this.gameState.enemyVelocity;
            });
        };
        if (this.gameState.active) {
            managePlayerKeyPress();
        }
        // Add logic for ending the game below:
        if (this.numOfTotalEnemies() === 0 && this.gameState.currentLevel < gameConfig_1.default.maxLevel) {
            this.gameState.currentLevel++;
            this.gameState.levelText.setText("Level ".concat(this.gameState.currentLevel));
            this.gameState.active = true;
            this.gameState.enemyVelocity = this.gameState.enemyVelocity * 1.25;
            this.physics.resume();
            this.generateEnemies(this.gameState.enemies);
        }
        if (this.numOfTotalEnemies() === 0 && this.gameState.currentLevel === gameConfig_1.default.maxLevel) {
            this.add.text(gameConfig_1.default.width * 0.5, gameConfig_1.default.height * 0.25, "You won!", {
                fontSize: "3rem",
                color: "green"
            })
                .setOrigin(0.5, 0.5);
            this.gameState.winAudio.play();
            this.finishGame();
            return;
        }
        setEnemmiesMovement();
        controlEnemiesPositioning();
    };
    BugGameScene.prototype.initSounds = function () {
        this.gameState.mainAudio = this.sound.add("mainAudio", { loop: true });
        this.gameState.loseAudio = this.sound.add("loseAudio");
        this.gameState.winAudio = this.sound.add("winAudio");
    };
    BugGameScene.prototype.initPlatform = function (_a) {
        var _b = _a === void 0 ? { x: gameConfig_1.default.width / 2, y: gameConfig_1.default.height - 10 } : _a, x = _b.x, y = _b.y;
        var platformPosition = {
            x: x,
            y: y,
        };
        var platformGroup = this.physics.add.staticGroup();
        var platform = platformGroup
            .create(platformPosition.x, platformPosition.y, "platform")
            .setScale(1, 0.3)
            .refreshBody();
        platform.displayWidth = gameConfig_1.default.width;
        this.gameState.platform = platform;
        return platform;
    };
    return BugGameScene;
}(Basic_1.default));
exports.default = BugGameScene;
