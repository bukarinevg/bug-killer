import Phaser from "phaser";
import GameStateService from "@services/GameStateService";
import GameState from "@default/GameState"; 
import gameConfig from "@config/gameConfig";


class Basic extends Phaser.Scene{
    gameStateService: GameStateService;
    gameState: GameState;
    
    constructor(config = {}){
        super();
        this.gameStateService = new GameStateService();
        this.gameState = this.gameStateService.getGameState();
    }
    // Helper Methods below:    
    // sortedEnemies() returns an array of enemy sprites sorted by their x coordinate
    sortedEnemies() {
        if(!this.gameState.enemies) return [];
        const orderedByXCoord = this.gameState.enemies
            .getChildren()
            .sort(
                (a, b) => (a as Phaser.Physics.Arcade.Sprite).x - (b as Phaser.Physics.Arcade.Sprite).x
            );
        
        return orderedByXCoord;
    }

    // numOfTotalEnemies() returns the number of total enemies
    numOfTotalEnemies() {
        if(!this.gameState.enemies) return 0;
        const totalEnemies = this.gameState.enemies.getChildren().length;
        return totalEnemies;
    }

    finishGame(){
        this.gameState.active = false;
        this.physics.pause();
        this.gameState.pelletsLoop.destroy();
        this.add.text(gameConfig.width / 2, gameConfig.height / 2, "Game Over", {
            fontSize: "2rem",
            color: "#000"
        })
        .setDepth(1)
        .setOrigin(0.5, 0.5);
        this.add.text( gameConfig.width * 0.5,  gameConfig.height * 0.75, "Press F to start the game", { 
            fontSize: "1rem", 
            color: "black",
            shadow: { fill: true, blur: 0, offsetY: 0 }
            })
            .setOrigin(0.5);
    }
    
    showScore(){
        if(!this.gameState.scoreText  || !this.gameState.enemies ) return ;  
        this.gameState.scoreText.setText(`Enemies Left: ${this.numOfTotalEnemies()}`);
    }   

    restartGame() {
        this.scene.restart();
        this.gameState.active = true;
        this.gameState.lostState = false;
        this.gameState.currentLevel = 1;
        this.gameState.enemyVelocity = 1.5;

    }

    generateEnemies(enemies: Phaser.Physics.Arcade.Group){
        for (let yVal = 1; yVal <= 3; yVal++) {
            for (let xVal = 1; xVal <= 8; xVal++) {
                enemies
                    .create(50 * xVal, 50 * yVal, "bug1")
                    .setGravityY(-gameConfig.gravity.y)
                    .setScale(0.6);
            }
        }
    }
}

export default Basic;