"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gameConfig_1 = __importDefault(require("@config/gameConfig"));
var BugGameScene_1 = __importDefault(require("@scenes/BugGameScene"));
var StartScene_1 = __importDefault(require("@scenes/StartScene"));
var config = {
    type: Phaser.AUTO,
    width: gameConfig_1.default.width,
    height: gameConfig_1.default.height,
    backgroundColor: gameConfig_1.default.backgroundColor,
    scene: [StartScene_1.default, BugGameScene_1.default],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                x: 0,
                y: gameConfig_1.default.gravity.y,
                enableBody: gameConfig_1.default.gravity.enableBody
            }
        }
    }
};
new Phaser.Game(config);
