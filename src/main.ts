import gameConfig from '@config/gameConfig';
import BugGameScene from '@scenes/BugGameScene';
import StartScene from '@scenes/StartScene';

const config = {
    type: Phaser.AUTO,
    width: gameConfig.width,
    height: gameConfig.height,
    backgroundColor: gameConfig.backgroundColor,
    scene: [StartScene, BugGameScene],
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
