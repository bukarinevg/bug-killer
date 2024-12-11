interface IGameState {
    active: boolean;
    scoreText?: any;
    player: any;
    cursors?: any;
    enemies: any;
    pelletsLoop: any;
    playerProjectile: any;
    enemyVelocity: number;
    currentLevel?: number;
}

export default IGameState;