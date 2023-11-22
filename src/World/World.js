// Import components
import{createCamera} from './components/camera.js';
import{createCube} from './components/cube.js';
import{createScene} from './components/scene.js';
import{createLights} from './components/lights.js';
// Import systems
import{createRenderer} from './systems/renderer.js';
import{Resizer} from './systems/Resizer.js';
import{animateMod} from './systems/animation.js';
import{createControls} from './systems/controls.js';

let camera;
let renderer;
let scene;
class World{
    constructor(container){
        camera = createCamera();
        scene = createScene();
        renderer = createRenderer();
        container.append(renderer.domElement);
        const cube = createCube(true);
        const cube2 = createCube(false);
        cube.name = 'cube1';
        cube2.name = 'cube2';
        cube.translateZ(-80);
        const light = createLights();
        scene.add(cube, cube2, light);
        const resizer = new Resizer(container, camera, renderer);
    }
    render(){
        function animate(){
            window.requestAnimationFrame(animate);
            animateMod(scene, camera);
            renderer.render(scene, camera);
        }
        renderer.render(scene, camera);
        animate();
    }
}
export{World};