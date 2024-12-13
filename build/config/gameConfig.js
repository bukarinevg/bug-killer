"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var windowUtils_1 = require("@utils/windowUtils");
var windowUtils_2 = require("@utils/windowUtils");
var height = (0, windowUtils_1.getWindowHeight)();
var width = (0, windowUtils_2.getWindowWidth)();
var gameConfig = {
    width: 500,
    height: 500,
    backgroundColor: "b9eaff",
    gravity: {
        y: 200,
        enableBody: true,
    },
    enemyScale: 0.7,
    playerScale: 0.5,
    maxLevel: 3,
};
exports.default = gameConfig;
