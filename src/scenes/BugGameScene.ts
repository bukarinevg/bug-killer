import Basic from "@default/Basic";
import gameConfig from "@config/gameConfig";
import AssetLoaderService from "@services/AssetLoaderService";


class BugGameScene extends Basic
{
    constructor(){
        super({key: "BugGameScene"});
    }

    preload(){
        const urlCodeAcademy = 'https://content.codecademy.com/courses/learn-phaser'
        const labsPhaser = 'https://labs.phaser.io';
        const urlBugInvaders = `${urlCodeAcademy}/Bug%20Invaders`;
        const urlPhysics = `${urlCodeAcademy}/physics`;

        AssetLoaderService.loadAssetImage(this, [
            { key: "bug1", path: `${urlBugInvaders}/bug_1.png` },
            { key: "bug2", path: `${urlBugInvaders}/bug_2.png` },
            { key: "bug3", path: `${urlBugInvaders}/bug_3.png` },
            { key: "platform", path: `${urlPhysics}/platform.png` },
            { key: "codey", path: `${urlBugInvaders}/codey.png` },
            { key: "enemyProjectile", path: `${urlBugInvaders}/bugPellet.png` },
            { key: "playerProjectile", path: `${urlBugInvaders}/bugRepellent.png` },
        ]);
        AssetLoaderService.loadAssetAudio(this, [
            { key: "mainAudio", path: `${labsPhaser}/assets/audio/CatAstroPhi_shmup_normal.mp3` },
            { key: "winAudio", path: "/src/assets/audio/win_sound.mp3" },
            { key: "loseAudio", path: "/src/assets/audio/lose_sound.mp3" },
        ]);
       
    }
 
    create (){
        const genEnemyPellet = () => {
            if(!this.gameState.enemies || !this.gameState.enemyPellets || !this.gameState.active) return;
            let i = 0;
            while( i < this.gameState.currentLevel) {
                let randomBug: any = Phaser.Utils.Array.GetRandom(
                    this.gameState.enemies.getChildren()
                );
                this.gameState.enemyPellets.create(randomBug.x, randomBug.y, "enemyProjectile");
                i++;
            }
        };

        this.gameState.cursors = this.input.keyboard!.createCursorKeys();
        this.initSounds();

        const platformPosition = {
            x: gameConfig.width / 2,
            y: gameConfig.height -10
        }
        const platform = this.initPlatform(platformPosition);

        let enemyPellets = this.physics.add.group();
        this.gameState.enemyPellets = enemyPellets;

        this.gameState.mainAudio!.play();

        this.gameState.levelText = this.add.text( gameConfig.width * 0.5, 10, `Level ${this.gameState.currentLevel}`, {
            fontSize: "2rem", 
            color: "black",
            shadow: { fill: true, blur: 1, offsetY: 0, offsetX: 0 },
            fontStyle: "fantasy"
        });
        // Displays the initial number of bugs, this value is initially hardcoded as 24
        this.gameState.scoreText = this.add.text( platformPosition.x , platformPosition.y , "Bugs Left: ", {
            fontSize: "15px"
        })
        .setOrigin(0.5, 0.5)
        ;
    
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

        // rule restart the game
        this.input.keyboard!.on("keydown-F", () => {
            if(this.gameState.lostState) {
                this.restartGame();
                return;
            }
            if(this.gameState.active) return;
            console.log("Starting game");
            this.gameState.active = true;
        });

        //coliders
        this.physics.add.collider(enemyPellets, platform, (platform , pelet) => {
            pelet.destroy();
        });
        this.physics.add.collider(enemyPellets, this.gameState.player, (player, pelet) => {
            this.gameState.lostState = true;
            this.gameState.loseAudio!.play();
            this.finishGame();
        });
        this.physics.add.collider( this.gameState.enemies, this.gameState.playerProjectile, (bug, repellent) => {
            bug.destroy();
            repellent.destroy();
        });
        this.physics.add.collider(this.gameState.enemies, this.gameState.player, (player,pelet) => {
            this.gameState.lostState = true;
            this.gameState.loseAudio!.play();
            this.finishGame();
        });
        this.physics.add.collider(platform, this.gameState.enemies, ( platform, enemy) => {
            enemy.destroy();
        });
    }

    update(){   
        if(!this.gameState.active || !this.gameState.cursors || !this.gameState.player || !this.gameState.enemies  ) {
            return;
        }
        this.showScore();

        const controlEnemiesPositioning = () => {
            if(!this.gameState.enemies) return;
            let sortedEnemiesArray = this.sortedEnemies();
            let leftMostEnemy = sortedEnemiesArray[0] as Phaser.Physics.Arcade.Sprite;
            let rightMostEnemy = sortedEnemiesArray[sortedEnemiesArray.length - 1] as Phaser.Physics.Arcade.Sprite;      
            if (leftMostEnemy.x <= 10 || rightMostEnemy.x >= gameConfig.width - 10) {
                //change direction
                this.gameState.enemyVelocity *= -1; 
                this.gameState.enemies.getChildren().forEach((enemy) => {
                    (enemy as Phaser.Physics.Arcade.Sprite).y += 10; // Move each bug down
                });
            }
        }
        
        const genPlayerProjectile = () => {
            if(! this.gameState.player) return; 
            this.gameState.playerProjectile
                .create(this.gameState.player.x, this.gameState.player.y, "playerProjectile")
                .setGravityY(-400);
        }

        const managePlayerKeyPress = () => {
            if (!this.gameState.player || !this.gameState.cursors) return;
            if (Phaser.Input.Keyboard.JustDown(this.gameState.cursors.space!)) {
                genPlayerProjectile();
            }
            if (this.gameState.cursors.left!.isDown && this.gameState.player.x > 15) {
                this.gameState.player.setVelocityX(-150);
            } else if (this.gameState.cursors.right!.isDown && this.gameState.player.x < gameConfig.width - 15) {
                this.gameState.player.setVelocityX(150);
            } else {
                this.gameState.player.setVelocityX(0);
            }
        }

        const setEnemmiesMovement = () => {
            if(!this.gameState.enemies ) return;
            this.gameState.enemies.getChildren().forEach(( 
                bug) => {
                    (bug as Phaser.Physics.Arcade.Sprite).x += this.gameState.enemyVelocity;          
            });
        }

        if (this.gameState.active) {
            managePlayerKeyPress();
        }
        
        // Add logic for ending the game below:
        if (this.numOfTotalEnemies() === 0 && this.gameState.currentLevel < 3) {
            this.gameState.currentLevel++;
            this.gameState.levelText!.setText(`Level ${this.gameState.currentLevel}`);
            this.gameState.active = true;
            this.gameState.enemyVelocity  = this.gameState.enemyVelocity * 1.5;
            this.physics.resume();
            this.generateEnemies(this.gameState.enemies);
        }     

        if (this.numOfTotalEnemies() === 0 && this.gameState.currentLevel === 3) {
            this.add.text(gameConfig.width *0.5, gameConfig.height * 0.25, "You won!", {
                fontSize: "3rem",
                color: "green"
            })
            .setOrigin(0.5, 0.5);
            ;
            this.finishGame();
            return;
        }
        setEnemmiesMovement();
        controlEnemiesPositioning();
  
    }

    initSounds(){
        this.gameState.mainAudio = this.sound.add("mainAudio", { loop: true });
        this.gameState.loseAudio = this.sound.add("loseAudio");
        this.gameState.winAudio = this.sound.add("winAudio");
    }

    initPlatform(
        { x, y }: { x: number, y: number } = { x: gameConfig.width / 2, y: gameConfig.height -10 }
    ) : Phaser.Physics.Arcade.StaticGroup {
        const platformPosition = {
            x: x,
            y: y,
        }
        let platformGroup = this.physics.add.staticGroup();
        let platform = platformGroup
            .create(platformPosition.x, platformPosition.y, "platform")
            .setScale(1, 0.3)
            .refreshBody();
        platform.displayWidth = gameConfig.width;
        this.gameState.platform = platform;
        
        return platform;
    }
}

export default BugGameScene;