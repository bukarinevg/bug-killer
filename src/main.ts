import gameConfig from '@config/gameConfig';
import BugGame from '@scenes/BugGame';

const config = {
    type: Phaser.AUTO,
    width: gameConfig.width,
    height: gameConfig.height,
    backgroundColor: gameConfig.backgroundColor,
    scene: BugGame,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { 
                x: 0, 
                y: gameConfig.gravity.y, 
                enableBody: gameConfig.gravity.enableBody 
            }
        }
    }
};

new Phaser.Game(config);
