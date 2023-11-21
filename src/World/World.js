// Import components
import{createCamera} from './components/camera.js';
import{createCube} from './components/cube.js';
import{createScene} from './components/scene.js';
// Import systems
import{createRenderer} from './systems/renderer.js';
import{Resizer} from './systems/Resizer.js';

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
        scene.add(cube, cube2);
        const resizer = new Resizer(container, camera, renderer);
    }
    render(){
        renderer.render(scene, camera);
    }
}
export{World};