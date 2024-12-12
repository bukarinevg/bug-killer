import Phaser from "phaser";
import gameConfig from "@config/gameConfig";
import Basic from "@default/Basic";

class StartScene extends Phaser.Scene{

    constructor(){
        super({key: "StartSceneUniqueKey"});
    }

    preload(){
        this.load.setBaseURL('https://labs.phaser.io');
    }

    create(){
        if(!this.input.keyboard){
            alert("No keyboard detected");
            this.add.text( gameConfig.width * 0.5,  gameConfig.height * 0.5, "No keyboard detected", {
                fontSize: "2rem", 
                color: "black",
                shadow: { fill: true, blur: 0, offsetY: 0 }
            })
            .setOrigin(0.5);
            ;
            return;
        }

        const welcomeText = this.add.text( gameConfig.width * 0.5,  gameConfig.height * 0.5, "Welcome to Bug Invaders", {
            fontSize: "2rem", 
            color: "black",
            shadow: { fill: true, blur: 0, offsetY: 0 }
        })
        .setOrigin(0.5);

        const startText = this.add.text( gameConfig.width * 0.5, gameConfig.height * 0.75, "Press F to start the game", { 
                fontSize: "1rem", 
                color: "black",
                shadow: { fill: true, blur: 0, offsetY: 0 }
            })
            .setOrigin(0.5);

        const welcomeTextGroup = this.add.group();
        welcomeTextGroup.add(welcomeText);
        welcomeTextGroup.add(startText);
    }

    update(){
        if(this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.F).isDown){
            this.scene.stop("StartScene");
            this.scene.start("BugGameScene");
        }
    }

   

}

export default StartScene;