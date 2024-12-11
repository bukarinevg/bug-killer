"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameState_1 = __importDefault(require("@default/GameState"));
var gameStateConfig_1 = __importDefault(require("@config/gameStateConfig"));
var GameStateService = /** @class */ (function () {
    function GameStateService() {
        this.gameState = new GameState_1.default(gameStateConfig_1.default);
    }
    GameStateService.prototype.getGameState = function () {
        return this.gameState;
    };
    GameStateService.prototype.setGameState = function (gameStateNew) {
        this.gameState = gameStateNew;
    };
    return GameStateService;
}());
exports.default = GameStateService;
