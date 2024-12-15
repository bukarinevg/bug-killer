import IGameState from '@interfaces/IGameState';

class GameState {
    active: boolean;
    scoreText?:Phaser.GameObjects.Text;
    levelText?: Phaser.GameObjects.Text;
    player?: Phaser.Physics.Arcade.Sprite;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    enemies?: Phaser.Physics.Arcade.Group;
    pelletsLoop: any;
    playerProjectile: any;
    enemyVelocity: number;
    currentLevel: number = 1;
    platform?: Phaser.Physics.Arcade.StaticGroup;
    enemyPellets?: Phaser.Physics.Arcade.Group;
    welcomeTextGroup?: Phaser.GameObjects.Group;
    lostState: boolean = false;   
    mainAudio?: Phaser.Sound.BaseSound;
    loseAudio?: Phaser.Sound.BaseSound;
    winAudio?: Phaser.Sound.BaseSound;
    score?: number = 0;
    keyboard?: Phaser.Input.Keyboard.KeyboardPlugin;

    constructor({
        active,
        scoreText,
        player,
        cursors,
        enemies,
        pelletsLoop ,
        playerProjectile,
        enemyVelocity ,
        currentLevel
    }: IGameState
    ){
        console.log(`active: ${active}`);
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
}

export default GameState;