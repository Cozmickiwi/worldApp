import {World} from "./World/World.js";
import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js';
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
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

function animate() {

	stats.begin();

	// monitored code goes here

	stats.end();

	requestAnimationFrame( animate );

}

requestAnimationFrame( animate );