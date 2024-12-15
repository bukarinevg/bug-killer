import Phaser from "phaser";
import gameConfig from "@config/gameConfig";
import Basic from "@default/Basic";

class StartScene extends Phaser.Scene{
    defaultTextColor: string;

    constructor(){
        super({key: "StartSceneUniqueKey"});
        this.defaultTextColor = "white"; // Define default text color as a property
    }

    preload(){
        this.load.setBaseURL('https://labs.phaser.io');
    }

    create(){
        if(!this.input.keyboard){
            alert("No keyboard detected");
            this.add.text( gameConfig.width * 0.5,  gameConfig.height * 0.5, "No keyboard detected", {
                fontSize: "2rem", 
                shadow: { fill: true, blur: 0, offsetY: 0 }
            })
            .setOrigin(0.5);
            ;
            return;
        }

        this.cameras.main.setBackgroundColor('#64b740');

        this.createWelcomeText();
        this.createInstructions();
    }

    update(){
        if(this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.F).isDown){
            this.scene.stop("StartScene");
            this.scene.start("BugGameScene");
        }
    }

    createWelcomeText(){
        const welcomeText = this.add.text( gameConfig.width * 0.5,  gameConfig.height * 0.25, "Welcome to Bug Killer", {
            fontSize: "2rem", 
            color: this.defaultTextColor,
            shadow: { fill: true, blur: 0, offsetY: 0 }
        })
        .setOrigin(0.5);

        const startText = this.add.text( gameConfig.width * 0.5, gameConfig.height * 0.5, "Press F to start the game", { 
                fontSize: "1rem", 
                color: this.defaultTextColor,
                shadow: { fill: true, blur: 0, offsetY: 0 }
            })
            .setOrigin(0.5);

        const welcomeTextGroup = this.add.group();
        welcomeTextGroup.add(welcomeText);
        welcomeTextGroup.add(startText);
    }

    createInstructions(){
        const instructions = this.add.group();

        const controlsArray = [
            ['←', '→'],
            // ['a', 'd'],
        ];
        const itemsPerRow = 2;

        controlsArray.forEach((controls, i) => {
            const yPosition = gameConfig.height * 0.75 + (i * 60);

            controls.forEach((control, j) => {
                const xPosition = j % itemsPerRow === 0 ? gameConfig.width * 0.25 : gameConfig.width * 0.75;

                const arrowButton = this.add.graphics();
                arrowButton.fillStyle(0x000000, 0.2);
                arrowButton.fillRect(xPosition - 25, yPosition - 25, 50, 50); 
        
                const arrow = this.add.text(xPosition, yPosition, control, {
                    fontSize: "1.5rem",
                    color: this.defaultTextColor
                }).setOrigin(0.5);

                instructions.add(arrowButton);
                instructions.add(arrow);
            });
        });

        const spaceButton = this.add.graphics();
        spaceButton.fillStyle(0x000000, 0.2);
        spaceButton.fillRect(gameConfig.width * 0.5 - 50, gameConfig.height * 0.75 - 25, 100, 50);

        const spaceText = this.add.text(gameConfig.width * 0.5, gameConfig.height * 0.75, 'SPACE', {
            fontSize: "1.5rem",
            color: this.defaultTextColor
        }).setOrigin(0.5);

        const instructionsText = this.add.text( gameConfig.width * 0.5,  gameConfig.height * 0.9, "Use the arrow keys to move and space to shoot", {
            fontSize: "1rem", 
            color: this.defaultTextColor,
            shadow: { fill: true, blur: 0, offsetY: 0 }
        }).setOrigin(0.5);

        instructions.add(spaceButton);
        instructions.add(spaceText);
        instructions.add(instructionsText);
    }

}

export default StartScene;