import {World} from "./World/World.js";

function main(){
    const container = document.getElementById('scene-container');
    const world = new World(container);
    world.render();
}
const button = document.getElementById('button');
button.addEventListener('click', () => {
    button.style.display = 'none';
    main();
});