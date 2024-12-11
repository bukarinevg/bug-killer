import { getWindowHeight } from "@utils/windowUtils";
import { getWindowWidth } from "@utils/windowUtils";

const height = getWindowHeight();
const width = getWindowWidth();

const gameConfig = {
    width:  500, 
    height: 500,
    backgroundColor: "b9eaff",
    gravity: {
        y: 200,
        enableBody: true,
    },     
    enemyScale: 0.7,
    playerScale: 0.5, 
};

export default gameConfig; 