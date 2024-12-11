import GameState from "@default/GameState";
import gameStateConfig from "@config/gameStateConfig";

class GameStateService {
    gameState: GameState;

    constructor() {
        this.gameState = new GameState(gameStateConfig);
    }

    getGameState() {
        return this.gameState;
    }

    setGameState(gameStateNew: GameState) {
        this.gameState = gameStateNew;
    }
}

export default GameStateService;