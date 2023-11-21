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
        cube.name = 'cube1';
        cube2.name = 'cube2';
        cube.translateZ(-80);
        scene.add(cube, cube2);
        const resizer = new Resizer(container, camera, renderer);
    }
    render(){
        function animate(){
            window.requestAnimationFrame(animate);
            let cube = scene.getObjectByName('cube1');
            let cube2 = scene.getObjectByName('cube2');
            cube2.rotation.z += 0.007;
            cube.rotation.x += 0.02;
            cube.rotation.y += 0.015;
            cube.rotation.z += 0.01;
            
            renderer.render(scene, camera);
        }
        renderer.render(scene, camera);
        animate();
    }
}
export{World};